import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, GripVertical, X, Link2 } from "lucide-react";
import type { NavigationItem } from "@/types/backoffice";

interface NavigationEditorProps {
  items?: NavigationItem[];
  onSave?: (items: NavigationItem[]) => void;
}

export function NavigationEditor({ items: initialItems, onSave }: NavigationEditorProps) {
  const [items, setItems] = useState<NavigationItem[]>(initialItems || [
    { id: "1", label: "Accueil", href: "/", order: 0, isEnabled: true },
    { id: "2", label: "À propos", href: "/#about", order: 1, isEnabled: true },
    { id: "3", label: "Projets", href: "/#projects", order: 2, isEnabled: true },
    { id: "4", label: "Contact", href: "/#contact", order: 3, isEnabled: true },
  ]);

  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const newItems = [...items];
    const draggedIdx = newItems.findIndex(item => item.id === draggedId);
    const targetIdx = newItems.findIndex(item => item.id === targetId);
    
    const [dragged] = newItems.splice(draggedIdx, 1);
    newItems.splice(targetIdx, 0, dragged);
    
    newItems.forEach((item, idx) => item.order = idx);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    onSave?.(items);
  };

  const addItem = () => {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      label: "Nouveau lien",
      href: "/#",
      order: items.length,
      isEnabled: true,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<NavigationItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    onSave?.(items.filter(item => item.id !== id));
  };

  return (
    <Card className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl">
      <CardHeader className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413] flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#cc785c]" />
            Éditeur de navigation
          </CardTitle>
          <Button onClick={addItem} className="bg-[#cc785c] hover:bg-[#a9583e] text-white gap-2">
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-2">
          {items
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 p-3 bg-[#efe9de] rounded-lg border border-[#e6dfd8] ${
                  draggedId === item.id ? "opacity-50" : ""
                }`}
              >
                <GripVertical className="w-4 h-4 text-[#8e8b82] cursor-grab" />
                
                <Input
                  value={item.label}
                  onChange={(e) => updateItem(item.id, { label: e.target.value })}
                  className="flex-1 bg-white border-[#e6dfd8] text-[#141413] h-9"
                  placeholder="Label"
                />
                
                <Input
                  value={item.href}
                  onChange={(e) => updateItem(item.id, { href: e.target.value })}
                  className="flex-1 bg-white border-[#e6dfd8] text-[#141413] h-9"
                  placeholder="/path"
                />
                
                <Switch
                  checked={item.isEnabled}
                  onCheckedChange={(checked) => updateItem(item.id, { isEnabled: checked })}
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteItem(item.id)}
                  className="text-[#c64545] hover:text-[#a9583e] hover:bg-[#c64545]/10 p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-8 text-[#6c6a64] flex flex-col items-center gap-2">
            <Link2 className="w-8 h-8 text-[#8e8b82]" />
            Aucun lien de navigation
          </div>
        )}
      </CardContent>
    </Card>
  );
}