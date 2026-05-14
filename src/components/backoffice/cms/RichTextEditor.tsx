import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Link, Image, Heading1, Heading2, Heading3 } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const toolbarButtons = [
    { icon: <Bold className="w-4 h-4" />, command: "bold", title: "Gras" },
    { icon: <Italic className="w-4 h-4" />, command: "italic", title: "Italique" },
    { icon: <Underline className="w-4 h-4" />, command: "underline", title: "Souligné" },
    { icon: <Strikethrough className="w-4 h-4" />, command: "strikeThrough", title: "Barré" },
    { icon: <List className="w-4 h-4" />, command: "insertUnorderedList", title: "Liste" },
    { icon: <ListOrdered className="w-4 h-4" />, command: "insertOrderedList", title: "Liste numérotée" },
    { icon: <Heading1 className="w-4 h-4" />, command: "formatBlock", value: "h1", title: "Titre 1" },
    { icon: <Heading2 className="w-4 h-4" />, command: "formatBlock", value: "h2", title: "Titre 2" },
    { icon: <Heading3 className="w-4 h-4" />, command: "formatBlock", value: "h3", title: "Titre 3" },
    { icon: <Link className="w-4 h-4" />, command: "createLink", value: prompt("URL:") || "", title: "Lien" },
    { icon: <Image className="w-4 h-4" />, command: "insertImage", value: prompt("URL de l'image:") || "", title: "Image" },
  ];

  return (
    <Card className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b border-[#e6dfd8] bg-[#efe9de] flex-wrap">
        {toolbarButtons.map((btn, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => execCommand(btn.command, btn.value)}
            className="p-2 text-[#3d3d3a] hover:bg-[#e6dfd8] rounded-md transition-colors"
            title={btn.title}
          >
            {btn.icon}
          </button>
        ))}
      </div>
      <CardContent className="p-0">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          className={`min-h-32 p-4 text-[#141413] text-sm focus:outline-none ${
            isEditing ? "ring-2 ring-[#cc785c]" : ""
          }`}
          style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
        {!value && placeholder && (
          <div className="absolute top-3 left-3 text-[#8e8b82] pointer-events-none">
            {placeholder}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface PreviewPanelProps {
  content: string;
  title?: string;
}

export function PreviewPanel({ content, title }: PreviewPanelProps) {
  return (
    <Card className="bg-white border border-[#e6dfd8] rounded-xl">
      <div className="p-3 border-b border-[#e6dfd8]">
        <span className="text-xs text-[#6c6a64] font-medium">Aperçu</span>
        {title && <span className="text-xs text-[#6c6a64] ml-2">- {title}</span>}
      </div>
      <CardContent className="p-4">
        <div
          className="prose prose-sm max-w-none text-[#141413]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardContent>
    </Card>
  );
}