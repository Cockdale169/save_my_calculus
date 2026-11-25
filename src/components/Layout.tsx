import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, CheckCircle2, Search, Moon, Sun } from 'lucide-react';
import { NODE_SUMMARIES } from '../data/curriculumIndex';
import { SpotlightSearch } from './SpotlightSearch';

interface LayoutProps {
  children: React.ReactNode;
  readNodes: string[];
}

export const Layout: React.FC<LayoutProps> = ({ children, readNodes }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return false;
    return true;
  });
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return localStorage.getItem('csk-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('csk-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlightOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const verifiedNodes = NODE_SUMMARIES.filter((n) => n.contentStatus === 'verified');
  const plannedNodes = NODE_SUMMARIES.filter((n) => n.contentStatus !== 'verified');
  const readPct = verifiedNodes.length > 0 ? Math.round((readNodes.length / verifiedNodes.length) * 100) : 0;

  return (
    <div className="app-shell">
      {scrollPct > 1 && <div className="reading-progress-bar" style={{ width: `${scrollPct}%` }} />}

      <header className="topbar">
        <div className="topbar-left">
          <button
            className="btn btn-sm"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="切換側邊導覽"
            title="切換側邊導覽"
          >
            {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
          <Link to="/" className="brand">
            <span className="brand-mark">
              <BookOpen size={16} />
            </span>
            <span>Calculus Survival Kit</span>
          </Link>
        </div>

        <nav className="topnav" aria-label="主導覽">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            學習總覽
          </NavLink>
          <NavLink to="/course/c1" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            微積分（一）
          </NavLink>
          <NavLink to="/course/c2" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            微積分（二）
          </NavLink>
          <NavLink to="/map" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            先備依賴圖
          </NavLink>
          <NavLink to="/practice" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            題庫與錯題本
          </NavLink>
          <NavLink to="/glossary" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            術語表
          </NavLink>
        </nav>

        <div className="topbar-right">
          <button
            type="button"
            className="cmdk-trigger"
            onClick={() => setSpotlightOpen(true)}
            title="快速搜尋教材 (Ctrl+K / ⌘K)"
          >
            <Search size={14} />
            <span>搜尋</span>
            <span className="kbd-pill">⌘K</span>
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-label={theme === 'light' ? '切換至深色專業模式' : '切換至淺色陶瓷模式'}
            title={theme === 'light' ? '切換至深色專業模式' : '切換至淺色陶瓷模式'}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>
      </header>

      <div className={`workspace-grid ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        {sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        {sidebarOpen && (
          <aside className="sidebar" aria-label="章節導覽">
            <div className="sidebar-mobile-header">
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>章節導覽</span>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setSidebarOpen(false)}
                aria-label="關閉章節導覽"
              >
                <X size={15} /> 關閉
              </button>
            </div>
            <div className="sidebar-progress-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 600 }}>
                <span>學習進度</span>
                <span style={{ color: 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>
                  {readNodes.length}/{verifiedNodes.length} ({readPct}%)
                </span>
              </div>
              <div className="sidebar-progress-track">
                <div className="sidebar-progress-fill" style={{ width: `${readPct}%` }} />
              </div>
            </div>

            <div className="sidebar-section-title">已上線教材模塊 ({verifiedNodes.length})</div>
            {verifiedNodes.map((node) => {
              const isRead = readNodes.includes(node.id);
              return (
                <NavLink
                  key={node.id}
                  to={`/module/${node.id}`}
                  className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <span>{node.title}</span>
                  {isRead && <CheckCircle2 size={14} color="var(--ok)" />}
                </NavLink>
              );
            })}

            {plannedNodes.length > 0 && (
              <>
                <div className="sidebar-section-title">後續規劃節點 ({plannedNodes.length})</div>
                {plannedNodes.map((node) => (
                  <Link
                    key={node.id}
                    to={`/course/${node.courseTags.includes('C2') && !node.courseTags.includes('C1') ? 'c2' : 'c1'}`}
                    className="sidebar-item"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span>{node.title}</span>
                    <span className="badge badge-planned">規劃中</span>
                  </Link>
                ))}
              </>
            )}
          </aside>
        )}
        <main className="main-content">{children}</main>
      </div>

      <SpotlightSearch open={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
    </div>
  );
};
