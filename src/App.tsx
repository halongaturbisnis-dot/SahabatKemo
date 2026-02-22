import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/modules/LandingPage';
import { KemoScore } from './components/modules/KemoScore';
import { News } from './components/modules/News';
import { Login } from './components/modules/Login';
import { LoadingOverlay } from './components/ui/LoadingOverlay';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, LogIn } from 'lucide-react';
import Swal from 'sweetalert2';

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [isSaving, setIsSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState<{ nama: string; kode: string } | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = (data: { nama: string; kode: string }) => {
    setAdminData(data);
    setIsAdmin(true);
    setShowLogin(false);
    setActiveTab('admin');
  };

  const handleLogout = () => {
    setAdminData(null);
    setIsAdmin(false);
    setActiveTab('beranda');
    Swal.fire({
      title: 'Logged Out',
      text: 'Anda telah keluar dari sistem admin.',
      icon: 'info',
      confirmButtonColor: '#9E1B9E',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans text-neutral-900 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        isAdmin={isAdmin} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header / Top Bar */}
        <header className="h-16 border-b border-neutral-100 flex items-center justify-between px-6 bg-white z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold capitalize">
              {activeTab === 'beranda' ? 'Beranda' : activeTab.replace('-', ' ')}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            {isAdmin && adminData ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#9E1B9E]/10 rounded-full border border-[#9E1B9E]/20">
                  <div className="w-2 h-2 rounded-full bg-[#9E1B9E] animate-pulse" />
                  <span className="text-xs font-bold text-[#9E1B9E]">{adminData.nama}</span>
                </div>
                <button 
                  onClick={() => setActiveTab('admin')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                    activeTab === 'admin' 
                      ? "bg-[#9E1B9E] text-white shadow-lg shadow-[#9E1B9E]/20" 
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  <Shield size={16} /> Admin
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 px-4 py-1.5 text-neutral-600 hover:text-[#9E1B9E] hover:bg-[#9E1B9E]/5 rounded-lg text-sm font-bold transition-all"
              >
                <LogIn size={16} /> Login Admin
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {activeTab === 'beranda' && <LandingPage />}
              {activeTab === 'berita' && <News isAdmin={isAdmin} adminName={adminData?.nama} />}
              {activeTab === 'kemo-score' && <KemoScore />}
              {activeTab !== 'beranda' && activeTab !== 'berita' && activeTab !== 'kemo-score' && (
                <div className="p-8 flex flex-col items-center justify-center h-full text-neutral-500">
                  <p className="text-xl">Modul {activeTab.replace('-', ' ')} sedang dalam pengembangan.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <LoadingOverlay isVisible={isSaving} />
      
      {showLogin && (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onClose={() => setShowLogin(false)} 
        />
      )}
    </div>
  );
}
