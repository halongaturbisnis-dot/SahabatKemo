import { ASSETS, ScoringItem, InterpretationItem } from '../assets';

async function fetchCSV(sheetName: string): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${ASSETS.SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  const response = await fetch(url);
  const text = await response.text();
  
  // Simple CSV parser (handles quoted strings)
  const rows: string[][] = [];
  const lines = text.split(/\r?\n/);
  
  for (const line of lines) {
    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    rows.push(parts.map(p => p.replace(/^"|"$/g, '').trim()));
  }
  
  return rows;
}

export async function getScoringData(): Promise<ScoringItem[]> {
  try {
    const rows = await fetchCSV('Scoring');
    // Skip header row
    return rows.slice(1).filter(row => row.length >= 3).map(row => ({
      kategori: row[0],
      kriteria: row[1],
      skor: parseInt(row[2]) || 0
    }));
  } catch (error) {
    console.error('Error fetching scoring data:', error);
    return [];
  }
}

export async function getInterpretationData(): Promise<InterpretationItem[]> {
  try {
    const rows = await fetchCSV('Interpretation');
    // Skip header row
    return rows.slice(1).filter(row => row.length >= 3).map(row => {
      const rangeStr = row[1].replace(/\s/g, '').replace('−', '-'); // Handle different dash types
      let min = 0, max = 0;
      
      if (rangeStr.includes('-')) {
        const parts = rangeStr.split('-');
        min = parseInt(parts[0]) || 0;
        max = parseInt(parts[1]) || min;
      } else {
        min = parseInt(rangeStr) || 0;
        max = min;
      }
      
      return {
        kategori: row[0],
        skorRange: [min, max] as [number, number],
        rekomendasi: row[2]
      };
    });
  } catch (error) {
    console.error('Error fetching interpretation data:', error);
    return [];
  }
}
