import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Bell, Zap, LogOut, Menu } from "lucide-react";

interface HeaderProps {
  onSearch?: (query: string) => void;
  notifications?: number;
  onLogout?: () => void;
  onMenuClick?: () => void;
}

export function Header({ onSearch, notifications = 0, onLogout, onMenuClick }: HeaderProps) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch?.(search);
  };

  return (
    <header className="h-16 bg-[#faf9f5] border-b border-[#e6dfd8] px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-[#efe9de] text-[#6c6a64] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-xs md:max-w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8b82]" />
          <Input
            type="search"
            placeholder="Recherche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 bg-white border-[#e6dfd8] text-[#141413] placeholder:text-[#8e8b82] w-full h-10 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2 ml-2">
        <button 
          className="relative w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#6c6a64] hover:bg-[#efe9de] transition-colors"
        >
          <Bell className="w-4 h-4" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#cc785c] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>
        
        <button 
          className="hidden md:flex w-10 h-10 rounded-lg bg-[#faf9f5] border border-[#e6dfd8] items-center justify-center text-[#6c6a64] hover:bg-[#efe9de] transition-colors"
        >
          <Zap className="w-4 h-4" />
        </button>
        
        <button 
          className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#6c6a64] hover:bg-[#efe9de] transition-colors"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}