import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type TrackPayload = {
  sessionToken?: string;
  eventType: "page_view" | "click" | "section_view";
  pagePath: string;
  pageTitle?: string;
  sectionId?: string;
  linkId?: string;
  elementText?: string;
  elementHref?: string;
  location?: {
    country?: string;
    city?: string;
    lat?: number;
    lng?: number;
  };
  device?: string;
  browser?: string;
  os?: string;
  language?: string;
  referrer?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as TrackPayload;
    if (!payload.pagePath || !payload.eventType) {
      return new Response(JSON.stringify({ error: "invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const sessionToken = payload.sessionToken || crypto.randomUUID();

    const { data: existingSession } = await supabase
      .from("visitor_sessions")
      .select("id")
      .eq("session_token", sessionToken)
      .maybeSingle();

    let sessionId = existingSession?.id as string | undefined;

    if (!sessionId) {
      const { data, error } = await supabase
        .from("visitor_sessions")
        .insert({
          session_token: sessionToken,
          country: payload.location?.country,
          city: payload.location?.city,
          lat: payload.location?.lat,
          lng: payload.location?.lng,
          device: payload.device,
          browser: payload.browser,
          os: payload.os,
          language: payload.language,
          referrer: payload.referrer,
        })
        .select("id")
        .single();

      if (error) throw error;
      sessionId = data.id as string;
    } else {
      await supabase
        .from("visitor_sessions")
        .update({
          last_seen_at: new Date().toISOString(),
          country: payload.location?.country,
          city: payload.location?.city,
          lat: payload.location?.lat,
          lng: payload.location?.lng,
        })
        .eq("id", sessionId);
    }

    if (payload.eventType === "page_view") {
      const { error } = await supabase.from("page_views").insert({
        session_id: sessionId,
        page_path: payload.pagePath,
        page_title: payload.pageTitle,
        event_type: "page_view",
      });
      if (error) throw error;
    }

    if (payload.eventType === "click") {
      const { error } = await supabase.from("click_events").insert({
        session_id: sessionId,
        page_path: payload.pagePath,
        section_id: payload.sectionId,
        link_id: payload.linkId,
        element_text: payload.elementText,
        element_href: payload.elementHref,
        event_type: "click",
      });
      if (error) throw error;
    }

    if (payload.eventType === "section_view" && payload.sectionId) {
      const { error } = await supabase.from("section_events").insert({
        session_id: sessionId,
        page_path: payload.pagePath,
        section_id: payload.sectionId,
        event_type: "section_view",
      });
      if (error) throw error;
    }

    return new Response(JSON.stringify({ ok: true, sessionToken }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

