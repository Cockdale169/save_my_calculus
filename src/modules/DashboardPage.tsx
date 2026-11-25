import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Download,
  Upload,
  AlertTriangle,
  Sparkles,
  Flame,
  Target,
} from 'lucide-react';
import { NODE_SUMMARIES } from '../data/curriculumIndex';
import { CourseTag } from '../types/curriculum';
import { UserProgressState } from '../store/progressStore';
import { useI18n } from '../store/i18n';

interface DashboardPageProps {
  progress: UserProgressState;
  onExport: () => string;
  onImport: (json: string) => boolean;
  onReset: () => void;
}

const handleSpotlightMove = (e: React.PointerEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

export const DashboardPage: React.FC<DashboardPageProps> = ({
  progress,
  onExport,
  onImport,
  onReset,
}) => {
  const { lang, t } = useI18n();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | CourseTag>('ALL');

  const filterTabs: { key: 'ALL' | CourseTag; label: string }[] = [
    { key: 'ALL', label: t('filterAll') },
    { key: 'HS', label: t('filterHS') },
    { key: 'C1', label: t('filterC1') },
    { key: 'C2', label: t('filterC2') },
    { key: 'APP', label: t('filterApp') },
  ];

  const verifiedSummaries = NODE_SUMMARIES.filter((n) => n.contentStatus === 'verified');
  const filteredModules =
    activeFilter === 'ALL'
      ? verifiedSummaries
      : verifiedSummaries.filter((n) => n.courseTags.includes(activeFilter));

  const readCount = progress.readNodes.length;
  const totalCount = verifiedSummaries.length;
  const readPct = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  const totalAttempts = Object.values(progress.practiceByNode).reduce((s, r) => s + r.attempts, 0);
  const totalCorrect = Object.values(progress.practiceByNode).reduce((s, r) => s + r.correct, 0);
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : null;

  const ringRadius = 38;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - readPct / 100);

  const handleDownload = () => {
    const blob = new Blob([onExport()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculus-survival-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const ok = onImport(String(reader.result ?? ''));
      setImportMsg(ok ? t('importOk') : t('importFail'));
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <section className="apple-hero spotlight-card" onPointerMove={handleSpotlightMove}>
        <div>
          <div className="apple-hero-eyebrow">
            <Sparkles size={13} /> {t('heroEyebrow')}
          </div>
          <h1 className="apple-hero-title">{t('heroTitle')}</h1>
          <p className="apple-hero-sub">{t('heroSub')}</p>
          <div className="apple-hero-actions">
            <Link to="/course/c1" className="btn btn-primary" style={{ padding: '0.62rem 1.35rem', fontSize: '0.92rem' }}>
              {t('ctaC1')} <ArrowRight size={15} />
            </Link>
            <Link to="/practice" className="btn-glass-dark">
              <Target size={15} /> {t('ctaPractice')}
            </Link>
            <Link to="/module/C1-INTEGRAL-FTC" className="btn-glass-dark">
              <Flame size={15} /> {t('ctaLec10')}
            </Link>
          </div>
        </div>

        <div className="hero-visual-stage" aria-hidden="true">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.55rem' }}>
            <span className="hero-floating-chip">∫ f(x) dx = F(b) − F(a)</span>
            <span className="hero-floating-chip" style={{ animationDelay: '1.5s', color: '#86efac', borderColor: 'rgba(134,239,172,0.3)' }}>
              ‖P‖ → 0
            </span>
          </div>
          <svg viewBox="0 0 320 155" width="100%" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="heroCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
              <linearGradient id="heroAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(56,189,248,0.42)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.02)" />
              </linearGradient>
            </defs>
            {[35, 70, 105, 135].map((y) => (
              <line key={y} x1={16} y1={y} x2={304} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 4" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const hs = [22, 36, 56, 76, 88, 84, 68, 52];
              const h = hs[i];
              return (
                <rect
                  key={i}
                  x={42 + i * 30}
                  y={135 - h}
                  width={26}
                  height={h}
                  rx={4}
                  fill="url(#heroAreaGrad)"
                  stroke="rgba(125,211,252,0.42)"
                  strokeWidth={1}
                />
              );
            })}
            <path d="M 28 124 C 95 112, 130 34, 195 44 C 242 52, 265 92, 298 68" fill="none" stroke="url(#heroCurveGrad)" strokeWidth={3.2} strokeLinecap="round" />
            <line x1={110} y1={88} x2={245} y2={26} stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="5 3" opacity={0.9} />
            <circle cx={172} cy={59} r={5.5} fill="#fbbf24" />
            <circle cx={172} cy={59} r={11} fill="rgba(251,191,36,0.22)" />
          </svg>
        </div>
      </section>

      <section className="bento-grid">
        <div className="bento-tile spotlight-card bento-span-4" onPointerMove={handleSpotlightMove}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t('completionLabel')}
              </div>
              <div className="bento-metric" style={{ marginTop: '0.35rem' }}>
                {readPct}%
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                {t('masteredOf')} <strong>{readCount}</strong> / {totalCount} {t('coreModules')}
              </div>
            </div>
            <svg width={94} height={94} viewBox="0 0 94 94" aria-label={`${readPct}%`}>
              <defs>
                <linearGradient id="appleRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0071e3" />
                  <stop offset="55%" stopColor="#30b0c7" />
                  <stop offset="100%" stopColor="#34c759" />
                </linearGradient>
              </defs>
              <circle cx={47} cy={47} r={ringRadius} fill="none" stroke="rgba(128,128,134,0.16)" strokeWidth={9} />
              <circle
                cx={47}
                cy={47}
                r={ringRadius}
                fill="none"
                stroke="url(#appleRingGrad)"
                strokeWidth={9}
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                transform="rotate(-90 47 47)"
                style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
            </svg>
          </div>
        </div>

        <div className="bento-tile bento-tile-dark spotlight-card bento-span-4" onPointerMove={handleSpotlightMove}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7dd3fc', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {t('finalSprint')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.75rem' }}>
              <Link to="/module/C1-CURVE-ANALYSIS" className="btn-glass-dark" style={{ justifyContent: 'space-between', padding: '0.42rem 0.85rem', fontSize: '0.82rem' }}>
                <span>{t('lec8')}</span>
                <ArrowRight size={13} />
              </Link>
              <Link to="/module/C1-LINEAR-APPROX" className="btn-glass-dark" style={{ justifyContent: 'space-between', padding: '0.42rem 0.85rem', fontSize: '0.82rem' }}>
                <span>{t('lec9')}</span>
                <ArrowRight size={13} />
              </Link>
              <Link to="/module/C1-INTEGRAL-FTC" className="btn-glass-dark" style={{ justifyContent: 'space-between', padding: '0.42rem 0.85rem', fontSize: '0.82rem' }}>
                <span>{t('lec10')}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        <div className="bento-tile spotlight-card bento-span-4" onPointerMove={handleSpotlightMove}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('practiceAccuracy')}
            </div>
            <div className="bento-metric" style={{ marginTop: '0.35rem', color: accuracy !== null ? 'var(--primary)' : 'var(--text)' }}>
              {accuracy !== null ? `${accuracy}%` : t('ready')}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {accuracy !== null ? `${totalCorrect} / ${totalAttempts}` : t('startFirst')}
              {' · '}{t('toReview')} <strong>{progress.reviewQueue.length}</strong>
            </div>
          </div>
          <div style={{ marginTop: '0.85rem' }}>
            <Link to="/practice" className="btn btn-sm" style={{ width: '100%' }}>
              {t('openPractice')} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>{t('modulesHeading')} ({filteredModules.length})</h2>
          <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {t('modulesSub')}
          </div>
        </div>
        <div className="mode-tabs" style={{ marginBottom: 0 }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`mode-tab ${activeFilter === tab.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.key)}
              style={{ padding: '0.38rem 0.85rem', fontSize: '0.82rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card-grid" style={{ marginBottom: '1.6rem' }}>
        {filteredModules.map((node) => {
          const isRead = progress.readNodes.includes(node.id);
          const isReview = progress.reviewQueue.includes(node.id);
          return (
            <div
              key={node.id}
              className="card spotlight-card"
              onPointerMove={handleSpotlightMove}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                  {node.courseTags.map((tag) => (
                    <span key={tag} className={`badge badge-${tag.toLowerCase()}`}>{tag}</span>
                  ))}
                  <span className={`badge badge-${node.priority.toLowerCase()}`}>{node.priority}</span>
                  <span className="badge badge-verified">verified</span>
                </div>
                <h3 style={{ margin: '0.2rem 0 0.25rem' }}>{lang === 'en' ? node.englishTitle : node.title}</h3>
                <div style={{ fontSize: '0.81rem', color: 'var(--text-muted)', marginBottom: '0.55rem' }}>
                  {lang === 'en' ? node.title : node.englishTitle}
                </div>
                {node.hsWeaknessNote && (
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0 0 0.65rem' }}>
                    {node.hsWeaknessNote}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border)' }}>
                <Link to={`/module/${node.id}`} className="btn btn-primary btn-sm">
                  {t('enterModule')} <ArrowRight size={13} />
                </Link>
                <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', fontSize: '0.78rem', fontWeight: 600 }}>
                  {isRead && <span style={{ color: 'var(--ok)', display: 'inline-flex', alignItems: 'center', gap: 3 }}><CheckCircle2 size={14} /> {t('read')}</span>}
                  {isReview && <span style={{ color: 'var(--warn)', display: 'inline-flex', alignItems: 'center', gap: 3 }}><Bookmark size={14} /> {t('review')}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="bento-grid" style={{ marginBottom: 0 }}>
        <div className="bento-tile bento-span-7">
          <div>
            <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <AlertTriangle size={18} color="var(--warn)" /> {t('hsAlertTitle')}
            </h3>
            <ul style={{ margin: '0.5rem 0 1rem', paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {NODE_SUMMARIES.filter((n) => n.hsWeaknessNote).map((n) => (
                <li key={n.id} style={{ marginBottom: '0.35rem' }}>
                  <strong style={{ color: 'var(--text)' }}>{lang === 'en' ? n.englishTitle : n.title}</strong>：{n.hsWeaknessNote}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link to="/map" className="btn btn-sm">{t('viewFullMap')} <ArrowRight size={13} /></Link>
          </div>
        </div>

        <div className="bento-tile bento-span-5">
          <div>
            <h3 style={{ marginTop: 0 }}>{t('backupTitle')}</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              {t('backupDesc')} (<code>localStorage</code>)
            </p>
          </div>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={handleDownload}><Download size={14} /> {t('exportJson')}</button>
              <button className="btn btn-sm" onClick={() => fileRef.current?.click()}><Upload size={14} /> {t('importJson')}</button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  if (window.confirm(t('resetConfirm'))) onReset();
                }}
              >
                {t('resetProgress')}
              </button>
              <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleUpload} />
            </div>
            {importMsg && <p style={{ fontSize: '0.84rem', color: 'var(--primary)', marginTop: '0.6rem', marginBottom: 0 }}>{importMsg}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};
