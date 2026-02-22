import React, { useState } from 'react';
import { 
  Home, 
  Newspaper, 
  Activity, 
  MessageSquare, 
  Stethoscope, 
  ShieldCheck,
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { BRAND, COLORS } from '@/src/assets';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isAdmin = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'berita', label: 'Berita', icon: Newspaper },
    { id: 'kemo-score', label: 'Kemo Score', icon: Activity },
    { id: 'cerita-konco', label: 'Cerita Konco', icon: MessageSquare },
    { id: 'konco-dokter', label: 'Konco Dokter', icon: Stethoscope },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <div 
      className={cn(
        "relative flex flex-col border-r border-neutral-200 bg-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-bottom border-neutral-100">
        {!isCollapsed && (
          <span className="text-xl font-bold" style={{ color: COLORS.PRIMARY }}>
            {BRAND.NAME}
          </span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-lg p-1.5 hover:bg-neutral-100"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              activeTab === item.id 
                ? "bg-[#9E1B9E]/10 text-[#9E1B9E]" 
                : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {isAdmin && (
        <div className="border-t border-neutral-100 p-2">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={20} />
            {!isCollapsed && <span>Keluar</span>}
          </button>
        </div>
      )}
    </div>
  );
};
