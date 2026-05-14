import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Download, Search, Globe, Image, Key, FileText, Eye } from "lucide-react";
import type { SeoSettings } from "@/types/backoffice";

interface SEOSettingsProps {
  settings?: Partial<SeoSettings>;
  onSave?: (settings: SeoSettings) => void;
}

export function SEOSettings({ settings, onSave }: SEOSettingsProps) {
  const [seo, setSeo] = useState<SeoSettings>({
    title: settings?.title || "Portfolio - Développeur Full Stack",
    description: settings?.description || "Portfolio professionnel présentant mes compétences en développement web et projets.",
    keywords: settings?.keywords || ["développeur", "portfolio", "react", "typescript"],
    ogImage: settings?.ogImage || "/og-image.jpg",
    canonicalUrl: settings?.canonicalUrl || "https://portfolio.dev",
    noIndex: settings?.noIndex || false,
  });

  const [keywordsInput, setKeywordsInput] = useState(seo.keywords.join(", "));

  const handleSave = () => {
    const updatedSeo: SeoSettings = {
      ...seo,
      keywords: keywordsInput.split(",").map(k => k.trim()).filter(Boolean),
    };
    setSeo(updatedSeo);
    onSave?.(updatedSeo);
  };

  const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${seo.canonicalUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${seo.canonicalUrl}/#about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${seo.canonicalUrl}/#projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${seo.canonicalUrl}/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
    
    const blob = new Blob([sitemap], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl">
        <CardHeader className="px-6 pt-6 pb-4">
          <CardTitle className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413] flex items-center gap-2">
            <Search className="w-5 h-5 text-[#cc785c]" />
            Paramètres SEO
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 px-6 pb-6">
          <div>
            <label className="text-sm text-[#6c6a64] block mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Title (Meta Title)
            </label>
            <Input
              value={seo.title}
              onChange={(e) => setSeo({ ...seo, title: e.target.value })}
              className="bg-white border-[#e6dfd8] text-[#141413]"
              maxLength={60}
            />
            <span className="text-xs text-[#8e8b82]">{seo.title.length}/60</span>
          </div>

          <div>
            <label className="text-sm text-[#6c6a64] block mb-2 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Description (Meta Description)
            </label>
            <Textarea
              value={seo.description}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
              className="bg-white border-[#e6dfd8] text-[#141413]"
              rows={3}
              maxLength={160}
            />
            <span className="text-xs text-[#8e8b82]">{seo.description.length}/160</span>
          </div>

          <div>
            <label className="text-sm text-[#6c6a64] block mb-2">Mots-clés (séparés par virgules)</label>
            <Input
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              className="bg-white border-[#e6dfd8] text-[#141413]"
              placeholder="react, typescript, développement web"
            />
          </div>

          <div>
            <label className="text-sm text-[#6c6a64] block mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              URL Canonique
            </label>
            <Input
              value={seo.canonicalUrl}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
              className="bg-white border-[#e6dfd8] text-[#141413]"
            />
          </div>

          <div>
            <label className="text-sm text-[#6c6a64] block mb-2 flex items-center gap-2">
              <Image className="w-4 h-4" />
              Image OG
            </label>
            <Input
              value={seo.ogImage}
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              className="bg-white border-[#e6dfd8] text-[#141413]"
              placeholder="/og-image.jpg"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#6c6a64]" />
              <div>
                <div className="text-sm text-[#3d3d3a]">Indexer le site</div>
                <div className="text-xs text-[#8e8b82]">Permet aux moteurs de recherche d'indexer</div>
              </div>
            </div>
            <Switch
              checked={!seo.noIndex}
              onCheckedChange={(checked) => setSeo({ ...seo, noIndex: !checked })}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="bg-[#cc785c] hover:bg-[#a9583e] text-white gap-2">
              <Save className="w-4 h-4" />
              Enregistrer
            </Button>
            <Button variant="outline" onClick={generateSitemap} className="border-[#e6dfd8] text-[#3d3d3a] hover:bg-[#efe9de] gap-2">
              <Download className="w-4 h-4" />
              Générer Sitemap
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl">
        <CardHeader className="px-6 pt-6 pb-4">
          <CardTitle className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413] flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#cc785c]" />
            Aperçu Google
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="bg-white rounded-lg p-4 max-w-xl border border-[#e6dfd8]">
            <div className="text-blue-700 text-lg truncate">{seo.title}</div>
            <div className="text-green-700 text-sm truncate">{seo.canonicalUrl}</div>
            <div className="text-[#3d3d3a] text-sm line-clamp-2">{seo.description}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}