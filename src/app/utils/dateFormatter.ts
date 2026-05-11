const MONTHS_ID: Record<string, number> = {
  Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
  Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
};
const MONTH_NAMES = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember"
];

export function formatArticleDate(dateStr: string): string {
  // Format ISO: "2026-04-28"
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return `${day} ${MONTH_NAMES[month - 1]} ${year}`;
  }
  // Format teks Indonesia: "5 April 2026"
  const parts = dateStr.trim().split(" ");
  if (parts.length === 3) {
    const [, monthStr, yearStr] = parts;
    const monthIdx = MONTHS_ID[monthStr] ?? 0;
    return `${parts[0]} ${MONTH_NAMES[monthIdx]} ${yearStr}`;
  }
  // Fallback
  return dateStr;
}