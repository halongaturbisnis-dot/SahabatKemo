import React from 'react';
import { ASSETS, BRAND } from '@/src/assets';
import { motion } from 'motion/react';
import { Newspaper, User, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <img 
          src={ASSETS.HERO_IMAGE} 
          alt="Hero" 
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {BRAND.NAME}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl"
          >
            {BRAND.TAGLINE}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* News Section */}
        <section id="news">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Newspaper className="text-[#9E1B9E]" />
              <h2 className="text-2xl font-bold">Berita Terkini</h2>
            </div>
            <button className="text-[#9E1B9E] font-medium flex items-center gap-1 hover:underline">
              Lihat Semua <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm"
              >
                <img 
                  src={`https://picsum.photos/seed/news${i}/400/250`} 
                  alt="News" 
                  className="w-full h-48 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4">
                  <span className="text-xs font-semibold text-[#9E1B9E] uppercase tracking-wider">Kesehatan</span>
                  <h3 className="text-lg font-bold mt-1 mb-2">Tips Menjaga Nutrisi Selama Kemoterapi</h3>
                  <p className="text-neutral-600 text-sm line-clamp-2">
                    Penting bagi pasien untuk tetap menjaga asupan nutrisi yang seimbang guna mendukung proses penyembuhan...
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ideator Profile */}
        <section id="profile" className="bg-neutral-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#9E1B9E]/20 flex-shrink-0">
              <img 
                src={ASSETS.IDEATOR_PHOTO} 
                alt="Ideator" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <User className="text-[#9E1B9E]" />
                <h2 className="text-2xl font-bold">Profil Ideator</h2>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#9E1B9E]">Dr. Sahabat Kemo</h3>
              <p className="text-neutral-700 leading-relaxed mb-6">
                "Aplikasi ini lahir dari kepedulian mendalam terhadap perjalanan para pejuang kemoterapi. 
                Kami ingin memastikan tidak ada yang merasa sendirian dalam proses ini. SahabatKemo hadir 
                sebagai jembatan informasi, dukungan, dan manajemen perawatan yang terintegrasi."
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white px-4 py-2 rounded-md border border-neutral-200 text-sm font-medium">
                  Spesialis Onkologi
                </div>
                <div className="bg-white px-4 py-2 rounded-md border border-neutral-200 text-sm font-medium">
                  10+ Tahun Pengalaman
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
