// The product copy is written in capitals for labels; headings read better in title or
// sentence case, so these convert it while keeping the acronyms whole.
const KEEP = new Set(['ERP', 'POS', 'VAT', 'AI', 'KDS', 'P&L', 'PDF', 'ID', 'CRM', 'UAE', '4TP'])
const SMALL = new Set(['of', 'and', 'the', 'to', 'a', 'on', 'in', 'for', '&', 'with'])

const word = (w, i, title) => {
  if (KEEP.has(w)) return w
  const lower = w.toLowerCase()
  if (title ? i > 0 && SMALL.has(lower) : i > 0) return lower
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

export const titleCase = (s) => s.split(' ').map((w, i) => word(w, i, true)).join(' ')
export const sentenceCase = (s) => s.split(' ').map((w, i) => word(w, i, false)).join(' ')
