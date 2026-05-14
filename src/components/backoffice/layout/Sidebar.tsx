import type { BackofficeTab } from "@/types/backoffice";
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  FolderKanban, 
  Settings, 
  Activity,
  LogOut,
  ChevronLeft,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";

const navItems: { tab: BackofficeTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { tab: "dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
  { tab: "analytics", label: "Analytics", icon: BarChart3 },
  { tab: "cms", label: "Contenu (CMS)", icon: FileText },
  { tab: "projects", label: "Projets", icon: FolderKanban },
  { tab: "tracking", label: "Tracking Live", icon: Activity },
  { tab: "settings", label: "Paramètres", icon: Settings },
];

interface SidebarProps {
  activeTab: BackofficeTab;
  onTabChange: (tab: BackofficeTab) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`
      ${collapsed ? 'lg:w-20' : 'lg:w-64'} 
      w-72 bg-white border-r border-[#e6dfd8] flex flex-col h-screen fixed left-0 top-0 transition-all duration-300 z-40 shadow-sm
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6 border-b border-[#e6dfd8] flex items-center justify-between">
        {(!collapsed || isOpen) && (
          <div>
            <div className="flex items-center gap-2 text-[#cc785c]">
              <ShieldCheck className="w-5 h-5" />
              <h1 className="text-xl font-serif font-normal tracking-[-0.5px] text-[#141413]">Admin</h1>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#8e8b82] font-black mt-1">Portfolio OS</p>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          {/* Collapse button - only visible on desktop */}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-[#faf9f5] text-[#8e8b82] transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Close button - only visible on mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[#faf9f5] text-[#8e8b82] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          
          return (
            <button
              key={item.tab}
              onClick={() => onTabChange(item.tab)}
              className={`w-full group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-xl relative overflow-hidden ${
                isActive
                   ? "text-[#cc785c] bg-[#cc785c]/5"
                   : "text-[#6c6a64] hover:bg-[#faf9f5] hover:text-[#141413]"
              }`}
            >
              <div className={`transition-colors duration-300 ${isActive ? 'text-[#cc785c]' : 'text-[#8e8b82] group-hover:text-[#cc785c]'}`}>
                <Icon className="w-5 h-5" />
              </div>
              {(!collapsed || isOpen) && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#cc785c] rounded-r-full" />
              )}
              {isActive && (!collapsed || isOpen) && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#cc785c] animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#e6dfd8]">
        {(!collapsed || isOpen) && (
          <div className="mb-4 px-4">
             <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#cc785c] flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#141413] truncate">Tobi Admin</p>
                  <p className="text-[10px] text-[#8e8b82] truncate">Connecté</p>
                </div>
             </div>
          </div>
        )}
        <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-[#c64545] hover:bg-red-50 rounded-lg transition-colors ${(collapsed && !isOpen) ? 'justify-center' : ''}`}>
          <LogOut className="w-4 h-4" />
          {(!collapsed || isOpen) && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}