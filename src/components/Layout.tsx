import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, CheckCircle2, Search, Moon, Sun, ArrowUp, Languages } from 'lucide-react';
import { NODE_SUMMARIES } from '../data/curriculumIndex';
import { useI18n } from '../store/i18n';
import { SpotlightSearch } from './SpotlightSearch';

interface LayoutProps {
  children: React.ReactNode;
  readNodes: string[];
}

export const Layout: React.FC<LayoutProps> = ({ children, readNodes }) => {
  const { lang, toggleLang, t } = useI18n();
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
    } catch {}
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
            aria-label={t('sidebarTitle')}
            title={t('sidebarTitle')}
          >
            {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
          <Link to="/" className="brand">
            <span className="brand-mark">
              <BookOpen size={16} />
            </span>
            <span>{t('brand')}</span>
          </Link>
        </div>

        <nav className="topnav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('navOverview')}
          </NavLink>
          <NavLink to="/course/c1" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('navC1')}
          </NavLink>
          <NavLink to="/course/c2" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('navC2')}
          </NavLink>
          <NavLink to="/map" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('navMap')}
          </NavLink>
          <NavLink to="/practice" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('navPractice')}
          </NavLink>
          <NavLink to="/glossary" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('navGlossary')}
          </NavLink>
        </nav>

        <div className="topbar-right">
          <button
            type="button"
            className="cmdk-trigger"
            onClick={() => setSpotlightOpen(true)}
            title="Spotlight Search (Ctrl+K / ⌘K)"
          >
            <Search size={14} />
            <span>{t('searchBtn')}</span>
            <span className="kbd-pill">⌘K</span>
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={toggleLang}
            aria-label="Switch Language"
            title={lang === 'en' ? '切換至繁體中文' : 'Switch to English'}
          >
            <Languages size={14} />
            <span>{lang === 'en' ? '中' : 'EN'}</span>
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setTheme((th) => (th === 'light' ? 'dark' : 'light'))}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>
      </header>

      <div className={`workspace-grid ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
        )}
        {sidebarOpen && (
          <aside className="sidebar" aria-label={t('sidebarTitle')}>
            <div className="sidebar-mobile-header">
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t('sidebarTitle')}</span>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setSidebarOpen(false)}
                aria-label={t('close')}
              >
                <X size={15} /> {t('close')}
              </button>
            </div>
            <div className="sidebar-progress-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 600 }}>
                <span>{t('progressLabel')}</span>
                <span style={{ color: 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>
                  {readNodes.length}/{verifiedNodes.length} ({readPct}%)
                </span>
              </div>
              <div className="sidebar-progress-track">
                <div className="sidebar-progress-fill" style={{ width: `${readPct}%` }} />
              </div>
            </div>

            <div className="sidebar-section-title">{t('liveModules')} ({verifiedNodes.length})</div>
            {verifiedNodes.map((node) => {
              const isRead = readNodes.includes(node.id);
              return (
                <NavLink
                  key={node.id}
                  to={`/module/${node.id}`}
                  onClick={() => {
                    if (window.innerWidth <= 768) setSidebarOpen(false);
                  }}
                  className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <span>{lang === 'en' ? node.englishTitle : node.title}</span>
                  {isRead && <CheckCircle2 size={14} color="var(--ok)" />}
                </NavLink>
              );
            })}

            {plannedNodes.length > 0 && (
              <>
                <div className="sidebar-section-title">{t('plannedModules')} ({plannedNodes.length})</div>
                {plannedNodes.map((node) => (
                  <Link
                    key={node.id}
                    to={`/course/${node.courseTags.includes('C2') && !node.courseTags.includes('C1') ? 'c2' : 'c1'}`}
                    onClick={() => {
                      if (window.innerWidth <= 768) setSidebarOpen(false);
                    }}
                    className="sidebar-item"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span>{lang === 'en' ? node.englishTitle : node.title}</span>
                    <span className="badge badge-planned">{t('plannedBadge')}</span>
                  </Link>
                ))}
              </>
            )}
          </aside>
        )}
        <main className="main-content">{children}</main>
      </div>

      {scrollPct > 12 && (
        <button
          type="button"
          className="btn btn-sm back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t('backToTop')}
          title={t('backToTop')}
        >
          <ArrowUp size={15} /> {t('backToTop')}
        </button>
      )}

      <SpotlightSearch open={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
    </div>
  );
};
