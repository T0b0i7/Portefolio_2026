import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface GeoData {
  country: string;
  city?: string;
  count: number;
  lat: number;
  lng: number;
  id?: string;
}

interface GeoMapProps {
  data?: GeoData[];
}

export function GeoMap({ data }: GeoMapProps) {
  const locations = data || [];
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleReset() {
    setPosition({ coordinates: [0, 20], zoom: 1 });
  }

  return (
    <Card className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl overflow-hidden shadow-sm group">
      <CardHeader className="pb-4 px-6 pt-6 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-serif font-normal tracking-[-0.3px] text-[#141413]">
          Visiteurs en temps réel
        </CardTitle>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleZoomIn}
            className="p-1.5 rounded-md hover:bg-[#efe9de] text-[#6c6a64] transition-colors"
            title="Zoom avant"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="p-1.5 rounded-md hover:bg-[#efe9de] text-[#6c6a64] transition-colors"
            title="Zoom arrière"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={handleReset}
            className="p-1.5 rounded-md hover:bg-[#efe9de] text-[#6c6a64] transition-colors"
            title="Réinitialiser"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div className="h-72 w-full bg-[#efe9de] relative">
          <ComposableMap
            projectionConfig={{
              scale: 147,
              center: [0, 0]
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates as [number, number]}
              onMoveEnd={(pos) => setPosition(pos)}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#e6dfd8"
                      stroke="#faf9f5"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#cc785c", outline: "none", opacity: 0.1 },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {locations.map((loc, idx) => (
                <Marker key={idx} coordinates={[loc.lng, loc.lat]}>
                  <g className="cursor-pointer">
                    <circle
                      r={4 / position.zoom}
                      fill="#cc785c"
                      stroke="#faf9f5"
                      strokeWidth={1 / position.zoom}
                      className="animate-pulse"
                    />
                    <title>{`${loc.city || loc.country}: ${loc.count} visite(s)`}</title>
                  </g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
          
          {locations.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-[#6c6a64] text-sm bg-[#efe9de]/50 backdrop-blur-[1px]">
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-[#8e8b82] animate-bounce" />
                <div>En attente de visiteurs...</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#e6dfd8] bg-[#faf9f5]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#141413]">Top Villes</span>
            <span className="text-[10px] text-[#8e8b82] uppercase tracking-wider font-bold">
              {locations.length} localisations actives
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {locations.length > 0 ? (
              locations.slice(0, 6).map((loc, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] group/item">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#cc785c]" />
                    <span className="text-[#6c6a64] truncate group-hover/item:text-[#141413] transition-colors">
                      {loc.city || loc.country}
                    </span>
                  </div>
                  <span className="font-mono text-[#8e8b82]">{loc.count}</span>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-2 text-[10px] text-[#8e8b82]">
                Aucune activité récente
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}