import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type ChartData = {
  date: string;
  views: number;
};

type Props = {
  period: "today" | "7days" | "30days";
};

export function VisitsChart({ period }: Props) {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;

    let startDate: Date;
    const now = new Date();

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "7days":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30days":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
    }

    const fetchData = async () => {
      const { data: views, error } = await supabase
        .from("page_views")
        .select("occurred_at")
        .gte("occurred_at", startDate.toISOString());

      if (error || !views) {
        setLoading(false);
        return;
      }

      const grouped: Record<string, number> = {};

      views.forEach((v) => {
        const date = new Date(v.occurred_at);
        let key: string;

        if (period === "today") {
          key = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        } else {
          key = date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
        }

        grouped[key] = (grouped[key] || 0) + 1;
      });

      const chartData = Object.entries(grouped)
        .map(([date, views]) => ({ date, views }))
        .sort((a, b) => {
          if (period === "today") {
            return a.date.localeCompare(b.date);
          }
          const [da, ma] = a.date.split("/").map(Number);
          const [db, mb] = b.date.split("/").map(Number);
          return new Date(2024, ma - 1, da).getTime() - new Date(2024, mb - 1, db).getTime();
        });

      setData(chartData);
      setLoading(false);
    };

    fetchData();
  }, [period]);

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center text-slate-500">Chargement...</div>;
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={false}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              color: "#f8fafc"
            }}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#8b5cf6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}