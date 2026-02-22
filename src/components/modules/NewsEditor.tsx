import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Image as ImageIcon, Youtube, Save, Send, X, Loader2, Upload } from 'lucide-react';
import { uploadImageToGAS, getGoogleDriveImageUrl } from '@/src/services/googleAppsScript';
import { NewsItem } from '@/src/assets';
import Swal from 'sweetalert2';

interface NewsEditorProps {
  onSave: (news: NewsItem) => void;
  onCancel: () => void;
  authorName: string;
}

export const NewsEditor: React.FC<NewsEditorProps> = ({ onSave, onCancel, authorName }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
      ],
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileId = await uploadImageToGAS(file);
      setThumbnail(getGoogleDriveImageUrl(fileId));
      Swal.fire({
        title: 'Berhasil!',
        text: 'Thumbnail berhasil diunggah.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error: any) {
      Swal.fire('Gagal', error.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInsertImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
        const fileId = await uploadImageToGAS(file);
        const url = getGoogleDriveImageUrl(fileId);
        
        const quill = quillRef.current?.getEditor();
        const range = quill?.getSelection();
        if (quill && range) {
          quill.insertEmbed(range.index, 'image', url);
        }
      } catch (error: any) {
        Swal.fire('Gagal', error.message, 'error');
      } finally {
        setIsUploading(false);
      }
    };
  };

  const handleInsertYoutube = () => {
    Swal.fire({
      title: 'Insert YouTube Video',
      input: 'text',
      inputLabel: 'Masukkan URL YouTube',
      inputPlaceholder: 'https://www.youtube.com/watch?v=...',
      showCancelButton: true,
      confirmButtonColor: '#9E1B9E',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const url = result.value;
        const videoId = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n]+)/)?.[1];
        
        if (videoId) {
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection();
          if (quill && range) {
            quill.insertEmbed(range.index, 'video', embedUrl);
          }
        } else {
          Swal.fire('Error', 'URL YouTube tidak valid', 'error');
        }
      }
    });
  };

  const handleAction = (status: 'draft' | 'published') => {
    if (!title || !content) {
      Swal.fire('Peringatan', 'Judul dan konten tidak boleh kosong', 'warning');
      return;
    }

    const news: NewsItem = {
      id: Date.now().toString(),
      title,
      content,
      thumbnail: thumbnail || 'https://picsum.photos/seed/news/800/400',
      author: authorName,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status
    };

    onSave(news);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <div className="border-b border-neutral-100 p-4 flex items-center justify-between bg-neutral-50">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 hover:bg-neutral-200 rounded-full transition-colors">
            <X size={20} />
          </button>
          <h2 className="font-bold text-lg">Tulis Berita Baru</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleAction('draft')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            <Save size={18} /> Simpan Draft
          </button>
          <button 
            onClick={() => handleAction('published')}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-[#9E1B9E] hover:bg-[#821682] rounded-lg transition-colors shadow-sm"
          >
            <Send size={18} /> Posting Berita
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Thumbnail Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-700">Thumbnail Berita</label>
            <div 
              className="relative aspect-video w-full rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center overflow-hidden group cursor-pointer"
              onClick={() => document.getElementById('thumb-input')?.click()}
            >
              {thumbnail ? (
                <>
                  <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold flex items-center gap-2">
                      <Upload size={20} /> Ganti Thumbnail
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-neutral-400">
                  <ImageIcon size={48} strokeWidth={1} />
                  <p className="font-medium">Klik untuk unggah thumbnail</p>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <Loader2 className="animate-spin text-[#9E1B9E]" size={32} />
                </div>
              )}
              <input 
                id="thumb-input"
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleThumbnailUpload}
              />
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-700">Judul Berita</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul berita yang menarik..."
              className="w-full text-3xl font-bold border-none focus:ring-0 placeholder:text-neutral-300 p-0"
            />
          </div>

          {/* Editor Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
              <button 
                onClick={handleInsertImage}
                className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-600 flex items-center gap-2 text-sm font-medium transition-colors"
                title="Insert Image"
              >
                <ImageIcon size={18} /> Gambar
              </button>
              <button 
                onClick={handleInsertYoutube}
                className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-600 flex items-center gap-2 text-sm font-medium transition-colors"
                title="Insert YouTube"
              >
                <Youtube size={18} /> YouTube
              </button>
            </div>
            
            <div className="prose prose-neutral max-w-none">
              <ReactQuill 
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="Tuliskan isi berita di sini..."
                className="news-editor"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .news-editor .ql-container {
          border: none !important;
          font-family: inherit;
          font-size: 1.125rem;
        }
        .news-editor .ql-editor {
          padding: 0;
          min-height: 400px;
        }
        .news-editor .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #f5f5f5 !important;
          padding: 8px 0 !important;
          position: sticky;
          top: 0;
          z-index: 10;
          background: white;
        }
        .news-editor .ql-toolbar button.ql-active {
          color: #9E1B9E !important;
          background: #9E1B9E10 !important;
          border-radius: 4px;
        }
        .news-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: #9E1B9E !important;
        }
        .news-editor .ql-toolbar button.ql-active .ql-fill {
          fill: #9E1B9E !important;
        }
      `}</style>
    </div>
  );
};
