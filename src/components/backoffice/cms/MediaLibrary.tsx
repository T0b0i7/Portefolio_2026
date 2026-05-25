import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Search,
  Image,
  Video,
  FileText,
  Upload,
  Copy,
  Trash2,
  X,
  Loader2,
  RefreshCw,
  File,
} from "lucide-react";

interface StorageFile {
  name: string;
  url: string;
  type: "image" | "video" | "document";
  size: number;
  updated_at: string;
}

const BUCKET = "media";

export function MediaLibrary() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<"all" | "image" | "video" | "document">("all");
  const [search, setSearch] = useState("");
  const [previewFile, setPreviewFile] = useState<{ name: string; url: string; type: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<StorageFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from(BUCKET).list("", {
        sortBy: { column: "updated_at", order: "desc" },
      });
      if (error) throw error;

      const mapped: StorageFile[] = (data || []).map((item) => {
        const ext = item.name.split(".").pop()?.toLowerCase() || "";
        const type: "image" | "video" | "document" =
          ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext) ? "image" :
          ["mp4", "webm", "ogg"].includes(ext) ? "video" : "document";

        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(item.name);

        return {
          name: item.name,
          url: urlData?.publicUrl || "",
          type,
          size: item.metadata?.size || 0,
          updated_at: item.updated_at || item.created_at || "",
        };
      });

      setFiles(mapped);
    } catch {
      toast.error("Erreur chargement des fichiers");
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadFiles(); }, [loadFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const fileType = selected.type.startsWith("image/") ? "image"
      : selected.type.startsWith("video/") ? "video" : "document";
    setPreviewFile({
      name: selected.name,
      url: URL.createObjectURL(selected),
      type: fileType,
    });
  };

  const uploadFile = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !supabase) return;

    setUploading(true);
    try {
      const path = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;

      toast.success("Fichier uploadé");
      setPreviewFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      loadFiles();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur upload");
    }
    setUploading(false);
  };

  const deleteFile = async (name: string) => {
    if (!supabase) return;
    try {
      const { error } = await supabase.storage.from(BUCKET).remove([name]);
      if (error) throw error;
      toast.success("Fichier supprimé");
      setSelectedFile(null);
      setFiles((prev) => prev.filter((f) => f.name !== name));
    } catch {
      toast.error("Erreur suppression");
    }
  };

  const filteredFiles = files.filter((f) => {
    const matchesFilter = filter === "all" || f.type === filter;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatSize = (bytes: number) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="w-12 h-12 text-[#cc785c]" />;
      case "video": return <Video className="w-12 h-12 text-[#cc785c]" />;
      case "document": return <FileText className="w-12 h-12 text-[#cc785c]" />;
      default: return <File className="w-12 h-12 text-[#cc785c]" />;
    }
  };

  if (loading) {
    return (
      <Card className="bg-white border-[#e6dfd8] p-12">
        <div className="flex flex-col items-center gap-3 text-[#6c6a64]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-sm">Chargement des fichiers...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#6c6a64]">{files.length} fichier{files.length > 1 ? "s" : ""}</p>
          <Button onClick={loadFiles} variant="ghost" size="sm" className="text-[#8e8b82]">
            <RefreshCw className="w-3 h-3 mr-1" /> Recharger
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8b82]" />
            <Input
              type="search"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-48 sm:w-64 bg-white border-[#e6dfd8] text-[#141413]"
            />
          </div>

          <div className="flex gap-1">
            {(["all", "image", "video", "document"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1.5 text-xs rounded-lg flex items-center gap-1.5 ${
                  filter === f
                    ? "bg-[#cc785c] text-white"
                    : "bg-[#efe9de] text-[#6c6a64] hover:bg-[#e6dfd8]"
                }`}
              >
                {f === "all" ? "Tout" : f === "image" ? "Images" : f === "video" ? "Vidéos" : "Docs"}
              </button>
            ))}
          </div>

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#cc785c] hover:bg-[#a9583e] text-white gap-2"
            size="sm"
          >
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileSelect}
          />
        </div>
      </div>

      {!supabase && (
        <Card className="bg-amber-50 border-amber-200 p-4">
          <p className="text-sm text-amber-700">
            Supabase non configuré. Les fichiers ne peuvent pas être uploadés.
          </p>
        </Card>
      )}

      {files.length === 0 && supabase && (
        <Card className="bg-white border-[#e6dfd8] p-12">
          <div className="text-center">
            <Image className="w-8 h-8 mx-auto text-[#8e8b82] mb-3" />
            <p className="text-[#8e8b82] text-sm mb-4">Aucun fichier. Uploadez votre première image.</p>
            <Button onClick={() => fileInputRef.current?.click()} className="bg-[#cc785c] hover:bg-[#a9583e] text-white" size="sm">
              <Upload className="w-4 h-4 mr-1" /> Uploader
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredFiles.map((file) => (
          <Card
            key={file.name}
            className={`bg-[#efe9de] border-none cursor-pointer hover:-translate-y-0.5 transition-all ${
              selectedFile?.name === file.name ? "ring-2 ring-[#cc785c]" : ""
            }`}
            onClick={() => setSelectedFile(file)}
          >
            <div className="aspect-square flex items-center justify-center bg-[#f5f0e8] rounded-t-lg overflow-hidden">
              {file.type === "image" ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                getIcon(file.type)
              )}
            </div>
            <CardContent className="p-2">
              <div className="text-xs text-[#141413] truncate">{file.name}</div>
              <div className="text-xs text-[#6c6a64]">{formatSize(file.size)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && files.length > 0 && (
        <div className="text-center py-12 text-[#6c6a64]">Aucun fichier trouvé</div>
      )}

      {/* Upload Preview */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => { setPreviewFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}>
          <Card className="bg-[#faf9f5] border border-[#e6dfd8] w-96" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413]">Aperçu</div>
                <button onClick={() => { setPreviewFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="p-1 text-[#6c6a64] hover:text-[#141413]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {previewFile.type === "image" ? (
                <img src={previewFile.url} alt={previewFile.name} className="w-full h-48 object-cover rounded-lg border border-[#e6dfd8]" />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-[#f5f0e8] rounded-lg">
                  <FileText className="w-12 h-12 text-[#cc785c]" />
                </div>
              )}
              <p className="text-sm text-[#141413] truncate">{previewFile.name}</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { setPreviewFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="flex-1 border-[#e6dfd8] text-[#141413]">
                  Annuler
                </Button>
                <Button onClick={uploadFile} disabled={uploading || !supabase} className="flex-1 bg-[#cc785c] hover:bg-[#a9583e] text-white gap-2">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? "Upload..." : "Uploader"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* File Details */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setSelectedFile(null)}>
          <Card className="bg-[#faf9f5] border border-[#e6dfd8] w-96" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413]">Détails</div>
                <button onClick={() => setSelectedFile(null)} className="p-1 text-[#6c6a64] hover:text-[#141413]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedFile.type === "image" && (
                <img src={selectedFile.url} alt={selectedFile.name} className="w-full h-40 object-cover rounded-lg border border-[#e6dfd8]" />
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6c6a64]">Nom:</span>
                  <span className="text-[#141413]">{selectedFile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6c6a64]">Type:</span>
                  <span className="text-[#141413] capitalize">{selectedFile.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6c6a64]">Taille:</span>
                  <span className="text-[#141413]">{formatSize(selectedFile.size)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs text-[#cc785c] bg-[#efe9de] px-2 py-1 rounded truncate">{selectedFile.url}</code>
                  <button
                    onClick={() => { navigator.clipboard.writeText(selectedFile.url); toast.success("URL copiée"); }}
                    className="p-1.5 rounded hover:bg-[#e6dfd8] text-[#6c6a64] shrink-0"
                    title="Copier l'URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#e6dfd8] text-[#141413] gap-2"
                  onClick={() => { navigator.clipboard.writeText(selectedFile.url); toast.success("URL copiée"); }}
                >
                  <Copy className="w-4 h-4" />
                  Copier URL
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 gap-2"
                  onClick={() => deleteFile(selectedFile.name)}
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
