import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Compass, BookOpen } from 'lucide-react';
import { NODE_SUMMARIES } from '../data/curriculumIndex';

interface SpotlightSearchProps {
  open: boolean;
  onClose: () => void;
}

interface SearchEntry {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  kind: 'module' | 'page';
  badges: string[];
}

const QUICK_PAGES: SearchEntry[] = [
  { id: 'page-home', title: '學習總覽 Dashboard', subtitle: '進度圓環、期末考直達車與全站教材', path: '/', kind: 'page', badges: ['導覽'] },
  { id: 'page-c1', title: '微積分（一）課程地圖', subtitle: 'W1–W16 課綱週次與連貫脈絡', path: '/course/c1', kind: 'page', badges: ['C1'] },
  { id: 'page-c2', title: '微積分（二）課程地圖', subtitle: 'ODE、多變數、機率與統計週次地圖', path: '/course/c2', kind: 'page', badges: ['C2'] },
  { id: 'page-practice', title: '題庫與錯題複習中心', subtitle: '全站練習題篩選與錯題自動追蹤', path: '/practice', kind: 'page', badges: ['練習'] },
  { id: 'page-map', title: '先備依賴知識圖譜', subtitle: '高中弱點到大學微積分的依賴關聯', path: '/map', kind: 'page', badges: ['圖譜'] },
  { id: 'page-glossary', title: '微積分雙語術語表', subtitle: '中英名詞對照與快速查詢', path: '/glossary', kind: 'page', badges: ['術語'] },
];

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const allEntries = useMemo<SearchEntry[]>(() => {
    const modules: SearchEntry[] = NODE_SUMMARIES.filter((n) => n.contentStatus === 'verified').map((n) => ({
      id: n.id,
      title: n.title,
      subtitle: n.englishTitle,
      path: `/module/${n.id}`,
      kind: 'module',
      badges: [...n.courseTags, n.priority],
    }));
    return [...modules, ...QUICK_PAGES];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allEntries.slice(0, 10);
    return allEntries
      .filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.subtitle.toLowerCase().includes(q) ||
          e.badges.some((b) => b.toLowerCase().includes(q))
      )
      .slice(0, 12);
  }, [allEntries, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  if (!open) return null;

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      e.preventDefault();
      go(results[selectedIdx].path);
    }
  };

  return (
    <div className="cmdk-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="快速搜尋教材">
      <div className="cmdk-modal" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="cmdk-input-row">
          <Search size={18} color="var(--text-muted)" />
          <input
            ref={inputRef}
            className="cmdk-input"
            placeholder="搜尋章節、微積分主題、英文名詞（如 Riemann, Taylor, ODE）..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="kbd-pill">ESC</span>
        </div>
        <div className="cmdk-list">
          {results.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              找不到符合「{query}」的教材或頁面
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`cmdk-item ${idx === selectedIdx ? 'selected' : ''}`}
                onMouseEnter={() => setSelectedIdx(idx)}
                onClick={() => go(item.path)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', minWidth: 0 }}>
                  <span style={{ color: 'var(--primary)', display: 'inline-flex' }}>
                    {item.kind === 'module' ? <BookOpen size={16} /> : <Compass size={16} />}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                  {item.badges.slice(0, 2).map((b) => (
                    <span key={b} className="badge badge-ext">{b}</span>
                  ))}
                  <ArrowRight size={14} color="var(--text-muted)" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
