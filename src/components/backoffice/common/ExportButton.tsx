import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, Table, Code } from "lucide-react";
import type { ExportFormat } from "@/types/backoffice";

interface ExportButtonProps {
  onExport: (format: ExportFormat) => void;
  data?: Record<string, unknown>[];
}

export function ExportButton({ onExport, data = [] }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async (type: 'pdf' | 'csv' | 'json') => {
    setLoading(true);
    
    try {
      const format: ExportFormat = {
        type,
        period: "7days",
      };
      
      if (type === 'csv' || type === 'json') {
        downloadData(type, data);
      } else if (type === 'pdf') {
        generatePDF();
      }
      
      onExport(format);
    } finally {
      setLoading(false);
    }
  };

  const downloadData = (type: 'csv' | 'json', data: Record<string, unknown>[]) => {
    let content: string;
    let mimeType: string;
    let extension: string;

    if (type === 'csv') {
      const headers = Object.keys(data[0] || {}).join(',');
      const rows = data.map(row => Object.values(row).join(',')).join('\n');
      content = `${headers}\n${rows}`;
      mimeType = 'text/csv';
      extension = 'csv';
    } else {
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export_${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Rapport Analytics - Portfolio</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 20px; }
            h1 { color: #141413; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f5f5f5; }
          </style>
        </head>
        <body>
          <h1>Rapport Analytics</h1>
          <p>Généré le ${new Date().toLocaleDateString()}</p>
          <p>Période: 7 derniers jours</p>
          <pre>${JSON.stringify(data.slice(0, 10), null, 2)}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-[#e6dfd8] text-[#141413] hover:bg-[#efe9de] gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#faf9f5] border border-[#e6dfd8]">
        <DropdownMenuItem 
          onClick={() => handleExport('pdf')}
          className="text-[#141413] focus:bg-[#efe9de] focus:text-[#141413] gap-2"
        >
          <FileText className="w-4 h-4" />
          PDF
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleExport('csv')}
          className="text-[#141413] focus:bg-[#efe9de] focus:text-[#141413] gap-2"
        >
          <Table className="w-4 h-4" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleExport('json')}
          className="text-[#141413] focus:bg-[#efe9de] focus:text-[#141413] gap-2"
        >
          <Code className="w-4 h-4" />
          JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}