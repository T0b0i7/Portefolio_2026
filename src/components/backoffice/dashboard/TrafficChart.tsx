import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrafficChartProps {
  data?: { hour: number; count: number }[];
}

export function TrafficChart({ data }: TrafficChartProps) {
  const chartData = data || [];
  const maxCount = Math.max(...chartData.map(d => d.count), 1);

  return (
    <Card className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413]">Trafic par heure</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {chartData.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-[#6c6a64]">
           Aucune donnée disponible
          </div>
        ) : (
          <div className="h-40 flex items-end gap-1">
            {chartData.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 bg-[#cc785c]/80 hover:bg-[#cc785c] transition-colors rounded-t"
              style={{ height: `${(item.count / maxCount) * 100}%` }}
              title={`${item.hour}h: ${item.count} visites`}
            />
            ))}
          </div>
        )}
        <div className="flex justify-between mt-4 text-xs text-[#8e8b82]">
          <span>0h</span>
          <span>6h</span>
          <span>12h</span>
          <span>18h</span>
          <span>24h</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface ComparisonChartProps {
  current: { date: string; value: number }[];
  previous: { date: string; value: number }[];
}

export function ComparisonChart({ current, previous }: ComparisonChartProps) {
  const maxValue = Math.max(
    ...current.map(c => c.value),
    ...previous.map(p => p.value),
    1
  );

  return (
    <Card className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413]">Comparaison périodes</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-[#6c6a64] mb-2">Période actuelle</div>
            <div className="flex items-end gap-1 h-16">
              {current.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-[#cc785c] rounded-t"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                  title={`${item.date}: ${item.value}`}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#6c6a64] mb-2">Période précédente</div>
            <div className="flex items-end gap-1 h-16">
              {previous.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-[#e6dfd8] rounded-t"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                  title={`${item.date}: ${item.value}`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TopReferrersProps {
  referrers?: { source: string; count: number }[];
}

export function TopReferrers({ referrers }: TopReferrersProps) {
  const data = referrers || [];
  const maxCount = data[0]?.count || 1;

  return (
    <Card className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413]">Top référents</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {data.length === 0 ? (
          <div className="py-8 text-center text-[#6c6a64] text-sm">Aucune donnée disponible</div>
        ) : (
          <div className="space-y-3">
            {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs text-[#6c6a64] w-20 truncate">{item.source}</span>
              <div className="flex-1 h-2 bg-[#e6dfd8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#cc785c] rounded-full"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#3d3d3a] font-mono w-12 text-right">{item.count}</span>
            </div>
          ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface TopCountriesProps {
  countries?: { country: string; count: number }[];
}

export function TopCountries({ countries }: TopCountriesProps) {
  const data = countries || [];
  const maxCount = data[0]?.count || 1;

  return (
    <Card className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413]">Top pays</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {data.length === 0 ? (
          <div className="py-8 text-center text-[#6c6a64] text-sm">Aucune donnée disponible</div>
        ) : (
          <div className="space-y-3">
            {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs text-[#6c6a64] w-24 truncate">{item.country}</span>
              <div className="flex-1 h-2 bg-[#e6dfd8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5db8a6] rounded-full"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#3d3d3a] font-mono w-12 text-right">{item.count}</span>
            </div>
          ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}