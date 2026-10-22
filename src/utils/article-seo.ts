/**
 * SEO helpers for article templates (g10-05 affiliate refresh).
 * - niceTitle: some generated articles carry their URL slug as title; humanize it.
 * - seoDescription: slug/empty/overlong meta descriptions fall back to the first body paragraph.
 * - parseBodyFaqs: lift "## FAQ" Q/A pairs from markdown so FAQPage JSON-LD can be emitted.
 */
const SLUGLIKE = /^[a-z0-9]+(?:-[a-z0-9]+){2,}$/;
const SMALL = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'vs', 'with']);

export function isSlugLike(s: string | undefined): boolean {
  return !!s && SLUGLIKE.test(s.trim());
}

export function niceTitle(raw: string): string {
  const s = (raw || '').trim();
  if (!isSlugLike(s)) return s;
  return s
    .split('-')
    .map((w, i) => (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

function plain(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 60)).replace(/[,;:\s-]+$/, '') + '\u2026';
}

export function seoDescription(meta: string | undefined, excerpt: string | undefined, body: string): string {
  const ok = (s: string | undefined) => !!s && !isSlugLike(s.trim()) && s.trim().length >= 70;
  if (ok(meta)) return clip(meta!.trim(), 158);
  if (ok(excerpt)) return clip(excerpt!.trim(), 158);
  const paras = (body || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^(#|---|\||!\[|<|[-*]\s|\d+\.\s)/.test(p));
  const first = paras.map(plain).find((p) => p.length >= 70);
  return first ? clip(first, 158) : (meta || excerpt || '').trim();
}

export interface Faq { question: string; answer: string }

export function parseBodyFaqs(body: string, max = 10): Faq[] {
  const lines = (body || '').split('\n');
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+(?!#)/.test(lines[i]) && /faq|frequently asked/i.test(lines[i])) { start = i + 1; break; }
  }
  if (start < 0) return [];
  let end = lines.length;
  for (let i = start; i < lines.length; i++) if (/^##\s+(?!#)/.test(lines[i])) { end = i; break; }
  const sec = lines.slice(start, end).join('\n');
  const out: Faq[] = [];
  // Pattern A: **Q: question?** / **A:** answer
  const qa = /\*\*Q:\s*(.+?)\*\*\s*\n+\s*\*\*A:\*\*\s*([\s\S]*?)(?=\n\s*\n\s*\*\*Q:|$)/g;
  let m: RegExpExecArray | null;
  while ((m = qa.exec(sec))) out.push({ question: plain(m[1]), answer: plain(m[2]) });
  // Pattern B: ### question / answer paragraphs
  if (!out.length) {
    const parts = sec.split(/^###\s+/m).slice(1);
    for (const p of parts) {
      const nl = p.indexOf('\n');
      if (nl < 0) continue;
      out.push({ question: plain(p.slice(0, nl)), answer: plain(p.slice(nl + 1)) });
    }
  }
  return out.filter((f) => f.question.length > 8 && f.answer.length > 20).slice(0, max).map((f) => ({ question: f.question, answer: clip(f.answer, 600) }));
}
