import { Card, CardContent } from "@/components/ui/card";
import { Eye, Users, MousePointer, FileText, TrendingUp, Target } from "lucide-react";

interface KPICardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
}

interface KPICardsProps {
  data?: KPICardProps[];
}

const defaultIcons = [
  <Eye key="eye" className="w-6 h-6" />,
  <Users key="users" className="w-6 h-6" />,
  <MousePointer key="mouse" className="w-6 h-6" />,
  <FileText key="file" className="w-6 h-6" />,
  <TrendingUp key="trend" className="w-6 h-6" />,
  <Target key="target" className="w-6 h-6" />,
];

export function KPICards({ data }: KPICardsProps) {
  const defaultKpis: KPICardProps[] = [
    { icon: defaultIcons[0], label: "Pages vues", value: "0", change: 0, trend: "neutral" },
    { icon: defaultIcons[1], label: "Visiteurs uniques", value: "0", change: 0, trend: "neutral" },
    { icon: defaultIcons[2], label: "Durée moy.", value: "N/A", change: 0, trend: "neutral" },
    { icon: defaultIcons[3], label: "Taux de rebond", value: "N/A", change: 0, trend: "neutral" },
    { icon: defaultIcons[4], label: "Pages/session", value: "N/A", change: 0, trend: "neutral" },
    { icon: defaultIcons[5], label: "Conversions", value: "0", change: 0, trend: "neutral" },
  ];

  const kpis = data || defaultKpis;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
      {kpis.map((kpi, idx) => (
        <KpiCard key={idx} {...kpi} />
      ))}
    </div>
  );
}

function KpiCard({ icon, label, value, change, trend }: KPICardProps) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";
  
  return (
    <Card className="bg-white border border-[#e6dfd8] rounded-xl hover:border-[#cc785c]/30 hover:shadow-md transition-all duration-300 group overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-0 bg-[#cc785c] group-hover:h-full transition-all duration-300" />
      <CardContent className="p-3 md:p-6">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-[#faf9f5] text-[#cc785c] group-hover:bg-[#cc785c] group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
          {change !== undefined && change !== 0 && (
            <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
              (isPositive && change > 0) || (!isPositive && change < 0) 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {isPositive ? "↑" : "↓"}{Math.abs(change)}%
            </div>
          )}
        </div>
        <div className="mt-3 md:mt-4">
          <div className="text-[10px] md:text-sm font-medium text-[#6c6a64] tracking-tight leading-tight">{label}</div>
          <div className="text-lg md:text-2xl font-serif font-normal text-[#141413] mt-0.5">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}