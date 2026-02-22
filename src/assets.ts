/**
 * SahabatKemo Assets
 */

export const ASSETS = {
  LOGO: "https://picsum.photos/seed/sahabatkemo/200/200",
  FAVICON: "https://picsum.photos/seed/sahabatkemo/32/32",
  HERO_IMAGE: "https://picsum.photos/seed/kemo/1200/600",
  IDEATOR_PHOTO: "https://picsum.photos/seed/ideator/400/400",
  NEWS_PLACEHOLDER: "https://picsum.photos/seed/news/800/400",
  SPREADSHEET_ID: "1hkAdTSQduupE5dgpKnORRU9lTvVC-okIdPAmGcTwkaU",
};

export interface ScoringItem {
  kategori: string;
  kriteria: string;
  skor: number;
}

export interface InterpretationItem {
  kategori: string;
  skorRange: [number, number];
  rekomendasi: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  author: string;
  date: string;
  status: 'draft' | 'published';
}

export const KEMO_SCORING: ScoringItem[] = [
  { kategori: "Mual dan Muntah", kriteria: "Mual", skor: 1 },
  { kategori: "Mual dan Muntah", kriteria: "Muntah kurang dari 3 kali sehari", skor: 1 },
  { kategori: "Mual dan Muntah", kriteria: "Muntah 3-5 kali sehari", skor: 2 },
  { kategori: "Mual dan Muntah", kriteria: "Muntah lebih dari 5 kali sehari", skor: 3 },
  { kategori: "Nyeri", kriteria: "Nyeri (Umum)", skor: 1 },
  { kategori: "Nyeri", kriteria: "Nyeri hilang timbul / Nyeri tidak hilang timbul", skor: 2 },
  { kategori: "Nyeri", kriteria: "Nyeri hilang dengan istirahat / tidur", skor: 1 },
  { kategori: "Nyeri", kriteria: "Nyeri tidak hilang dengan istirahat / tidur", skor: 2 },
  { kategori: "Nyeri", kriteria: "Nyeri muncul sepanjang hari", skor: 3 },
  { kategori: "Nyeri", kriteria: "Nyeri mengganggu kehidupan sehari-hari", skor: 3 },
  { kategori: "Nyeri", kriteria: "Sering terbangun / tidak bisa tidur karena nyeri", skor: 2 },
  { kategori: "Leukopenia", kriteria: "Sel darah putih rendah", skor: 1 },
  { kategori: "Leukopenia", kriteria: "Disertai demam, sariawan, atau diare", skor: 1 },
  { kategori: "Leukopenia", kriteria: "Gejala muncul < 7 hari", skor: 1 },
  { kategori: "Leukopenia", kriteria: "Gejala muncul 7-14 hari", skor: 3 },
  { kategori: "Leukopenia", kriteria: "Gejala muncul > 14 hari", skor: 2 },
  { kategori: "Dehidrasi", kriteria: "Merasa cepat haus / Bibir dan lidah kering / Liur kental / Demam", skor: 1 },
  { kategori: "Mukositis", kriteria: "Kemerahan / Bengkak pada lidah, pipi, atau bibir dalam", skor: 1 },
  { kategori: "Mukositis", kriteria: "Ada luka pada rongga mulut", skor: 1 },
  { kategori: "Mukositis", kriteria: "Jumlah luka 1-4", skor: 1 },
  { kategori: "Mukositis", kriteria: "Jumlah luka > 4", skor: 2 },
  { kategori: "Mukositis", kriteria: "Ada darah pada luka", skor: 1 },
  { kategori: "Pucat", kriteria: "Anda/keluarga merasa anda pucat / Telapak tangan pucat", skor: 1 },
  { kategori: "Sesak Napas", kriteria: "Sesak napas (Umum)", skor: 1 },
  { kategori: "Sesak Napas", kriteria: "Muncul / Tidak muncul saat aktivitas berat", skor: 1 },
  { kategori: "Sesak Napas", kriteria: "Tidak berkurang dengan istirahat", skor: 1 },
  { kategori: "Sesak Napas", kriteria: "Mengganggu tidur", skor: 1 },
];

export const KEMO_INTERPRETATION: InterpretationItem[] = [
  { kategori: "Mual dan Muntah", skorRange: [1, 2], rekomendasi: "Periksa ke puskesmas terdekat" },
  { kategori: "Mual dan Muntah", skorRange: [3, 4], rekomendasi: "Periksa ke spesialis penyakit dalam" },
  { kategori: "Mual dan Muntah", skorRange: [5, 10], rekomendasi: "Periksa ke SPPD KHOM" },
  { kategori: "Diare", skorRange: [1, 2], rekomendasi: "Periksa ke dokter umum/puskesmas" },
  { kategori: "Diare", skorRange: [3, 4], rekomendasi: "Periksa ke spesialis penyakit dalam" },
  { kategori: "Nyeri", skorRange: [4, 16], rekomendasi: "Periksa ke spesialis penyakit dalam" },
  { kategori: "Nyeri", skorRange: [7, 18], rekomendasi: "Periksa ke konsultan hematologi onkologi medik" },
  { kategori: "Mukositis", skorRange: [1, 3], rekomendasi: "Periksa ke dokter umum/puskesmas" },
  { kategori: "Mukositis", skorRange: [4, 6], rekomendasi: "Periksa ke spesialis penyakit dalam" },
  { kategori: "Mukositis", skorRange: [7, 10], rekomendasi: "Periksa ke konsultan hematologi onkologi medik" },
  { kategori: "Leukopenia", skorRange: [2, 5], rekomendasi: "Periksa ke dokter umum/puskesmas" },
  { kategori: "Leukopenia", skorRange: [6, 9], rekomendasi: "Periksa ke spesialis penyakit dalam" },
  { kategori: "Leukopenia", skorRange: [10, 11], rekomendasi: "Periksa ke konsultan hematologi onkologi medik" },
  { kategori: "Pucat", skorRange: [1, 2], rekomendasi: "Periksa ke spesialis penyakit dalam" },
  { kategori: "Sesak Napas", skorRange: [1, 2], rekomendasi: "Periksa ke dokter umum/puskesmas" },
  { kategori: "Sesak Napas", skorRange: [3, 5], rekomendasi: "Periksa ke spesialis penyakit dalam" },
  { kategori: "Sesak Napas", skorRange: [6, 10], rekomendasi: "Periksa ke konsultan hematologi onkologi medik" },
];

export const COLORS = {
  PRIMARY: "#9E1B9E",
  BACKGROUND: "#FFFFFF",
  TEXT: "#1A1A1A",
  MUTED: "#666666",
  BORDER: "#E5E5E5",
};

export const BRAND = {
  NAME: "SahabatKemo",
  TAGLINE: "Pendamping Setia Perjalanan Kesembuhan Anda",
};
