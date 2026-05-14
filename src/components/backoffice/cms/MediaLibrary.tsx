import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Image, Video, FileText, Upload, Copy, Trash2, X, Check, File } from "lucide-react";
import type { MediaFile } from "@/types/backoffice";

interface MediaLibraryProps {
  files?: MediaFile[];
  onUpload?: (file: File) => void;
  onDelete?: (id: string) => void;
  onSelect?: (file: MediaFile) => void;
}

export function MediaLibrary({ 
  files: initialFiles, 
  onUpload, 
  onDelete, 
  onSelect 
}: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles || []);
  const [filter, setFilter] = useState<"all" | "image" | "video" | "document">("all");
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockFiles: MediaFile[] = [
    { id: "1", name: "hero-image.jpg", url: "/images/hero.jpg", type: "image", size: 245000, uploadedAt: new Date() },
    { id: "2", name: "project-preview.png", url: "/images/project.png", type: "image", size: 189000, uploadedAt: new Date() },
    { id: "3", name: "demo-video.mp4", url: "/videos/demo.mp4", type: "video", size: 15200000, uploadedAt: new Date() },
    { id: "4", name: "resume.pdf", url: "/docs/resume.pdf", type: "document", size: 98000, uploadedAt: new Date() },
  ];

  const displayFiles = files.length > 0 ? files : mockFiles;
  
  const filteredFiles = displayFiles.filter(f => {
    const matchesFilter = filter === "all" || f.type === filter;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && onUpload) {
      onUpload(selected);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getIcon = (type: MediaFile["type"]) => {
    switch (type) {
      case "image": return <Image className="w-12 h-12 text-[#cc785c]" />;
      case "video": return <Video className="w-12 h-12 text-[#cc785c]" />;
      case "document": return <FileText className="w-12 h-12 text-[#cc785c]" />;
      default: return <File className="w-12 h-12 text-[#cc785c]" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8b82]" />
          <Input
            type="search"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-64 bg-white border-[#e6dfd8] text-[#141413]"
          />
        </div>
        
        <div className="flex gap-1">
          {(["all", "image", "video", "document"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? "bg-[#cc785c] text-white gap-1.5" : "border-[#e6dfd8] text-[#3d3d3a] gap-1.5"}
            >
              {f === "all" && <Image className="w-3.5 h-3.5" />}
              {f === "image" && <Image className="w-3.5 h-3.5" />}
              {f === "video" && <Video className="w-3.5 h-3.5" />}
              {f === "document" && <FileText className="w-3.5 h-3.5" />}
              {f === "all" ? "Tout" : f === "image" ? "Images" : f === "video" ? "Vidéos" : "Docs"}
            </Button>
          ))}
        </div>

        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#cc785c] hover:bg-[#a9583e] text-white gap-2"
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

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredFiles.map((file) => (
          <Card
            key={file.id}
            className={`bg-[#efe9de] border-none cursor-pointer hover:-translate-y-0.5 transition-all ${
              selectedFile?.id === file.id ? "ring-2 ring-[#cc785c]" : ""
            }`}
            onClick={() => {
              setSelectedFile(file);
              onSelect?.(file);
            }}
          >
            <div className="aspect-square flex items-center justify-center bg-[#f5f0e8] rounded-t-lg">
              {file.type === "image" ? (
                <div className="w-full h-full bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${file.url})` }} />
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

      {filteredFiles.length === 0 && (
        <div className="text-center py-12 text-[#6c6a64]">
          Aucun fichier trouvé
        </div>
      )}

      {selectedFile && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setSelectedFile(null)}>
          <Card className="bg-[#faf9f5] border border-[#e6dfd8] w-96" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413]">Détails du fichier</div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="p-1 text-[#6c6a64] hover:text-[#141413]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
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
                <div className="flex justify-between items-center">
                  <span className="text-[#6c6a64]">URL:</span>
                  <code className="text-xs text-[#cc785c] bg-[#efe9de] px-2 py-1 rounded">{selectedFile.url}</code>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#e6dfd8] text-[#141413] gap-2"
                  onClick={() => navigator.clipboard.writeText(selectedFile.url)}
                >
                  <Copy className="w-4 h-4" />
                  Copier URL
                </Button>
                {onDelete && (
                  <Button
                    variant="destructive"
                    className="flex-1 gap-2"
                    onClick={() => {
                      onDelete(selectedFile.id);
                      setSelectedFile(null);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}