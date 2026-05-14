import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import type { BackofficeTab } from "@/types/backoffice";

interface BackofficeLayoutProps {
  children: ReactNode;
  activeTab: BackofficeTab;
  onTabChange: (tab: BackofficeTab) => void;
  onLogout?: () => void;
}

export function BackofficeLayout({
  children,
  activeTab,
  onTabChange,
  onLogout,
}: BackofficeLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#faf9f5] flex relative overflow-x-hidden">
      {/* Overlay for mobile sidebar */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          onTabChange(tab);
          setMobileMenuOpen(false);
        }} 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
        <Header
          onSearch={setSearchQuery}
          onLogout={onLogout}
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        
        <main className="p-4 md:p-8 flex-1 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
        
        <footer className="p-6 border-t border-[#e6dfd8] text-center text-[10px] text-[#8e8b82] uppercase tracking-[0.2em]">
          Portfolio OS &copy; 2026 &bull; Systéme de gestion propriétaire
        </footer>
      </div>
    </div>
  );
}