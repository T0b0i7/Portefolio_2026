import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

export function RichTextEditor({ value, onChange, placeholder = "Écrivez ici...", rows = 6 }: Props) {
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  const insertFormat = useCallback((before: string, after: string = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  }, [value, onChange]);

  const formats = [
    { label: "B", prefix: "**", suffix: "**", title: "Gras" },
    { label: "I", prefix: "_", suffix: "_", title: "Italique" },
    { label: "H1", prefix: "# ", suffix: "", title: "Titre 1" },
    { label: "H2", prefix: "## ", suffix: "", title: "Titre 2" },
    { label: "•", prefix: "- ", suffix: "", title: "Liste" },
    { label: "🔗", prefix: "[", suffix: "](url)", title: "Lien" },
    { label: "``", prefix: "`", suffix: "`", title: "Code" },
  ];

  if (mode === "preview") {
    return (
      <div className="space-y-2">
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          <Button variant="outline" size="sm" onClick={() => setMode("edit")}>
            Éditer
          </Button>
        </div>
        <div className="prose prose-sm max-w-none p-4 bg-slate-50 rounded-lg min-h-[200px]">
          {value.split("\n").map((line, i) => {
            if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold mt-2">{line.slice(2)}</h1>;
            if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-semibold mt-2">{line.slice(3)}</h2>;
            if (line.startsWith("- ")) return <li key={i} className="ml-4">{line.slice(2)}</li>;
            if (line.includes("[")) {
              const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
              if (match) return <a key={i} href={match[2]} className="text-blue-500 underline">{match[1]}</a>;
            }
            return <p key={i}>{line || <br />}</p>;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-1 flex-wrap border-b border-slate-200 pb-2">
        {formats.map((f) => (
          <button
            key={f.label}
            onClick={() => insertFormat(f.prefix, f.suffix)}
            title={f.title}
            className="px-2 py-1 text-xs rounded hover:bg-slate-100 font-mono"
          >
            {f.label}
          </button>
        ))}
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={() => setMode("preview")}>
          Aperçu
        </Button>
      </div>
      <textarea
        rows={rows}
        className="w-full rounded-lg border border-slate-200 p-3 font-mono text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <p className="text-xs text-slate-500">
        Format: Markdown simple (**gras**), (italique), # Titre, - Liste, [texte](url)
      </p>
    </div>
  );
}