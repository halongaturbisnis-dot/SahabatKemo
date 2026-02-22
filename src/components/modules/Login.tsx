import React, { useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Shield, Lock, User, Loader2, X } from 'lucide-react';
import Swal from 'sweetalert2';

interface LoginProps {
  onLoginSuccess: (adminData: { nama: string; kode: string }) => void;
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onClose }) => {
  const [kode, setKode] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('admins')
        .select('nama, kode')
        .eq('kode', kode)
        .eq('password', password)
        .single();

      if (error || !data) {
        throw new Error('Kode atau Password salah.');
      }

      Swal.fire({
        title: 'Berhasil Login!',
        text: `Selamat datang, ${data.nama}`,
        icon: 'success',
        confirmButtonColor: '#9E1B9E',
        timer: 2000,
        showConfirmButton: false
      });

      onLoginSuccess(data);
    } catch (error: any) {
      Swal.fire({
        title: 'Gagal Login',
        text: error.message || 'Terjadi kesalahan saat login.',
        icon: 'error',
        confirmButtonColor: '#9E1B9E'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#9E1B9E]/10 rounded-full flex items-center justify-center text-[#9E1B9E] mb-4">
              <Shield size={32} />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Admin Login</h2>
            <p className="text-neutral-500 text-sm">Masuk untuk mengelola SahabatKemo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <User size={16} /> Kode Admin
              </label>
              <input
                type="text"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#9E1B9E]/20 focus:border-[#9E1B9E] outline-none transition-all"
                placeholder="Masukkan kode admin"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <Lock size={16} /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#9E1B9E]/20 focus:border-[#9E1B9E] outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#9E1B9E] text-white py-3 rounded-xl font-bold hover:bg-[#821682] transition-all shadow-lg shadow-[#9E1B9E]/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Masuk Sekarang'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
