import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/modules/LandingPage';
import { KemoScore } from './components/modules/KemoScore';
import { Login } from './components/modules/Login';
import { LoadingOverlay } from './components/ui/LoadingOverlay';
import { motion, AnimatePresence } from 'motion/react';
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
    if (tab === 'admin' && !isAdmin) {
      setShowLogin(true);
    } else {
      setActiveTab(tab);
    }
  };

  // Example of manual save trigger
  const handleManualSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    
    Swal.fire({
      title: 'Berhasil!',
      text: 'Data telah disimpan dengan aman.',
      icon: 'success',
      confirmButtonColor: '#9E1B9E',
      timer: 2000,
      showConfirmButton: false
    });
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
            {isAdmin && adminData && (
              <div className="flex items-center gap-2 px-3 py-1 bg-[#9E1B9E]/10 rounded-full border border-[#9E1B9E]/20">
                <div className="w-2 h-2 rounded-full bg-[#9E1B9E] animate-pulse" />
                <span className="text-xs font-bold text-[#9E1B9E]">{adminData.nama}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleManualSave}
              className="bg-[#9E1B9E] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#821682] transition-colors shadow-sm"
            >
              Simpan Manual
            </button>
            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/user/32/32" alt="User" />
            </div>
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
              {activeTab === 'kemo-score' && <KemoScore />}
              {activeTab !== 'beranda' && activeTab !== 'kemo-score' && (
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
