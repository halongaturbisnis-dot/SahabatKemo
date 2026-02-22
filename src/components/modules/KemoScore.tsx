import React, { useState, useMemo, useEffect } from 'react';
import { 
  KEMO_SCORING as FALLBACK_SCORING, 
  KEMO_INTERPRETATION as FALLBACK_INTERPRETATION,
  ScoringItem,
  InterpretationItem
} from '@/src/assets';
import { getScoringData, getInterpretationData } from '@/src/services/googleSheets';
import { motion } from 'motion/react';
import { Activity, AlertCircle, CheckCircle2, Info, RefreshCw, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const KemoScore: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<number>>(new Set());
  const [scoringData, setScoringData] = useState<ScoringItem[]>(FALLBACK_SCORING);
  const [interpretationData, setInterpretationData] = useState<InterpretationItem[]>(FALLBACK_INTERPRETATION);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    
    try {
      const [sData, iData] = await Promise.all([
        getScoringData(),
        getInterpretationData()
      ]);
      
      if (sData.length > 0) setScoringData(sData);
      if (iData.length > 0) setInterpretationData(iData);
    } catch (error) {
      console.error('Failed to sync with spreadsheet:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    scoringData.forEach(item => cats.add(item.kategori));
    return Array.from(cats);
  }, [scoringData]);

  const toggleSymptom = (index: number) => {
    const newSelected = new Set(selectedSymptoms);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedSymptoms(newSelected);
  };

  const scoresByCategory = useMemo(() => {
    const scores: Record<string, number> = {};
    categories.forEach(cat => scores[cat] = 0);
    
    selectedSymptoms.forEach(index => {
      const item = scoringData[index];
      if (item) {
        scores[item.kategori] += item.skor;
      }
    });
    
    return scores;
  }, [selectedSymptoms, categories, scoringData]);

  const recommendations = useMemo(() => {
    const recs: { kategori: string; rekomendasi: string; skor: number }[] = [];
    
    Object.entries(scoresByCategory).forEach(([cat, score]) => {
      if (score === 0) return;
      
      // Find all matching interpretations for this category and score
      const matching = interpretationData.filter(interp => 
        interp.kategori === cat && 
        score >= interp.skorRange[0] && 
        score <= interp.skorRange[1]
      );
      
      if (matching.length > 0) {
        // Take the last one (usually the most specific/severe in the list)
        recs.push({
          kategori: cat,
          rekomendasi: matching[matching.length - 1].rekomendasi,
          skor: score
        });
      }
    });
    
    return recs;
  }, [scoresByCategory, interpretationData]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#9E1B9E]" />
          <p className="text-neutral-500 font-medium">Memuat data skoring...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-neutral-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2 relative">
          <button 
            onClick={() => fetchData(true)}
            disabled={isRefreshing}
            className="absolute right-0 top-0 p-2 text-neutral-400 hover:text-[#9E1B9E] transition-colors disabled:opacity-50"
            title="Sinkronisasi dengan Spreadsheet"
          >
            <RefreshCw size={20} className={cn(isRefreshing && "animate-spin")} />
          </button>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#9E1B9E]/10 text-[#9E1B9E] mb-2">
            <Activity size={24} />
          </div>
          <h1 className="text-2xl font-bold">Kemo Score Calculator</h1>
          <p className="text-neutral-600 max-w-lg mx-auto">
            Pilih gejala yang Anda rasakan untuk mendapatkan penilaian skor dan rekomendasi tindakan medis yang tepat.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Symptoms List */}
          <div className="lg:col-span-2 space-y-6">
            {categories.map((cat) => (
              <div key={cat} className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm">
                <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200">
                  <h3 className="font-semibold text-sm text-[#9E1B9E] uppercase tracking-wider">{cat}</h3>
                </div>
                <div className="p-2 space-y-1">
                  {scoringData.filter(item => item.kategori === cat).map((item, idx) => {
                    // Find original index in scoringData
                    const originalIdx = scoringData.findIndex(s => s.kriteria === item.kriteria && s.kategori === item.kategori);
                    const isSelected = selectedSymptoms.has(originalIdx);
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleSymptom(originalIdx)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-md text-left text-sm transition-all",
                          isSelected 
                            ? "bg-[#9E1B9E]/5 border border-[#9E1B9E]/20 text-[#9E1B9E]" 
                            : "hover:bg-neutral-50 border border-transparent"
                        )}
                      >
                        <span className="flex-1">{item.kriteria}</span>
                        <div className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                          isSelected ? "bg-[#9E1B9E] border-[#9E1B9E]" : "border-neutral-300"
                        )}>
                          {isSelected && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Activity size={20} className="text-[#9E1B9E]" />
                  Hasil Penilaian
                </h3>
                
                {recommendations.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                      <Info size={24} />
                    </div>
                    <p className="text-sm text-neutral-500">
                      Silakan pilih gejala di samping untuk melihat hasil penilaian.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendations.map((rec, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={idx} 
                        className="p-4 rounded-lg bg-[#9E1B9E]/5 border border-[#9E1B9E]/10 space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-[#9E1B9E] uppercase">{rec.kategori}</span>
                          <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-[#9E1B9E]/20">
                            Skor: {rec.skor}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-neutral-800 leading-tight">
                          {rec.rekomendasi}
                        </p>
                      </motion.div>
                    ))}
                    
                    <div className="pt-4 border-t border-neutral-100">
                      <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-800">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <p className="text-xs leading-relaxed">
                          <strong>Peringatan:</strong> Hasil ini hanya bersifat edukatif. Segera hubungi tenaga medis profesional jika kondisi memburuk.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setSelectedSymptoms(new Set())}
                className="w-full py-3 text-sm font-medium text-neutral-600 hover:text-[#9E1B9E] transition-colors"
              >
                Reset Pilihan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
