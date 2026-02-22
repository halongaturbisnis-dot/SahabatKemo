import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Calendar, User, ArrowRight, Newspaper } from 'lucide-react';
import { NewsItem } from '@/src/assets';
import { NewsEditor } from './NewsEditor';
import { cn } from '@/src/lib/utils';

interface NewsProps {
  isAdmin: boolean;
  adminName?: string;
}

export const News: React.FC<NewsProps> = ({ isAdmin, adminName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newsList, setNewsList] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Pentingnya Menjaga Nutrisi Selama Kemoterapi',
      content: '<p>Nutrisi yang baik sangat penting untuk membantu tubuh pulih...</p>',
      thumbnail: 'https://picsum.photos/seed/kemo1/800/400',
      author: 'Tim Medis SahabatKemo',
      date: '20 Februari 2024',
      status: 'published'
    },
    {
      id: '2',
      title: 'Cerita Inspiratif: Perjalanan Kesembuhan Ibu Sari',
      content: '<p>Ibu Sari berbagi pengalamannya dalam menghadapi kanker...</p>',
      thumbnail: 'https://picsum.photos/seed/kemo2/800/400',
      author: 'Admin',
      date: '18 Februari 2024',
      status: 'published'
    }
  ]);

  const handleSaveNews = (newNews: NewsItem) => {
    setNewsList([newNews, ...newsList]);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <NewsEditor 
        authorName={adminName || 'Admin'} 
        onSave={handleSaveNews} 
        onCancel={() => setIsEditing(false)} 
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-neutral-50 overflow-hidden">
      {/* Header Section */}
      <div className="bg-white border-b border-neutral-100 p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Berita & Informasi</h1>
            <p className="text-neutral-500 text-sm">Update terbaru seputar kesehatan dan kemoterapi</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari berita..."
                className="pl-10 pr-4 py-2 bg-neutral-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#9E1B9E]/20 w-full md:w-64"
              />
            </div>
            {isAdmin && (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-[#9E1B9E] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#821682] transition-all shadow-lg shadow-[#9E1B9E]/20"
              >
                <Plus size={18} /> Tulis Berita
              </button>
            )}
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {newsList.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden group hover:shadow-xl hover:shadow-[#9E1B9E]/5 transition-all cursor-pointer"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.status === 'draft' && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        Draft
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                      <span className="flex items-center gap-1"><User size={12} /> {item.author}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg leading-tight group-hover:text-[#9E1B9E] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <div 
                      className="text-sm text-neutral-500 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                    
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[#9E1B9E] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Baca Selengkapnya <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {newsList.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
              <Newspaper size={64} strokeWidth={1} className="mb-4" />
              <p className="text-xl font-medium">Belum ada berita yang diterbitkan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
