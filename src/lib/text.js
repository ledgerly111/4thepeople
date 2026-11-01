// The product copy is written in capitals for labels; headings read better in title or
// sentence case, so these convert it while keeping the acronyms whole.
const KEEP = new Set(['ERP', 'POS', 'VAT', 'AI', 'KDS', 'P&L', 'PDF', 'ID', 'CRM', 'UAE', '4TP', 'BYTE', 'MCP', 'IMEI', 'BOQ', 'OK.'])
const SMALL = new Set(['of', 'and', 'the', 'to', 'a', 'on', 'in', 'for', '&', 'with'])

// `start` is true for the first word and for a word after a full stop.
const word = (w, start, title) => {
  if (KEEP.has(w)) return w
  const lower = w.toLowerCase()
  if (title ? !start && SMALL.has(lower) : !start) return lower
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

const recase = (s, title) =>
  s.split(' ').map((w, i, all) => word(w, i === 0 || all[i - 1].endsWith('.'), title)).join(' ')

export const titleCase = (s) => recase(s, true)
export const sentenceCase = (s) => recase(s, false)
