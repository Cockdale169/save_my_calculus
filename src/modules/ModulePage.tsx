import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Zap, Sliders, PenTool, CheckCircle2, Bookmark, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { loadNodeById } from '../data/nodeLoader';
import { NODE_MAP } from '../data/curriculumIndex';
import { MathText } from '../components/MathText';
import { JuniorVisualGuide } from '../components/JuniorVisualGuide';
import { SymbolRulesCard } from '../components/SymbolRulesCard';
import { VisualStepFlow } from '../components/VisualStepFlow';
import { StrategyTrainerCard } from '../components/StrategyTrainerCard';
import { MathEvolutionCard } from '../components/MathEvolutionCard';
import { DecisionFlowchart } from '../components/DecisionFlowchart';
import { VisualLabHost } from '../visualizations/VisualLabHost';
import { UserProgressState } from '../store/progressStore';
import { KnowledgeNode, PracticeQuestion } from '../types/curriculum';
type StudyMode = 'study' | 'quick' | 'lab' | 'practice';
interface ModulePageProps {
progress: UserProgressState;
onToggleRead: (nodeId: string) => void;
onToggleReview: (nodeId: string) => void;
onRecordPractice: (nodeId: string, questionId: string, isCorrect: boolean) => void;
}
export const ModulePage: React.FC<ModulePageProps> = ({
progress,
onToggleRead,
onToggleReview,
onRecordPractice,
}) => {
const { nodeId = '' } = useParams();
const [node, setNode] = useState<KnowledgeNode | null>(null);
const [loading, setLoading] = useState(true);
const [mode, setMode] = useState<StudyMode>('study');
const [asideOpen, setAsideOpen] = useState(true);
useEffect(() => {
let active = true;
setLoading(true);
setMode('study');
loadNodeById(nodeId).then((loaded) => {
if (active) {
setNode(loaded);
setLoading(false);
}
});
return () => {
active = false;
};
}, [nodeId]);
if (loading) {
return (
<div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
載入教材模塊中...
</div>
);
}
if (!node) {
return (
<div className="card">
<h2>找不到該教材模塊（{nodeId}）</h2>
<p>此節點可能尚未進入 MVP 實作或代碼有誤。請回到總覽或課程地圖選擇已上線模塊。</p>
<Link to="/" className="btn btn-primary">回到總覽</Link>
</div>
);
}
const isRead = progress.readNodes.includes(node.id);
const isReview = progress.reviewQueue.includes(node.id);
return (
<div>
<div className="card module-hero">
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
<div>
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
{node.courseTags.map((t) => (
<span key={t} className={`badge badge-${t.toLowerCase()}`}>{t}</span>
))}
<span className={`badge badge-${node.priority.toLowerCase()}`}>{node.priority}</span>
<span className="badge badge-verified">verified</span>
{node.weeks.C1 && <span className="badge badge-ext">C1 W{node.weeks.C1.join(', W')}</span>}
{node.weeks.C2 && <span className="badge badge-ext">C2 W{node.weeks.C2.join(', W')}</span>}
</div>
<h1 style={{ margin: '0.15rem 0' }}>{node.title}</h1>
<div style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{node.englishTitle}</div>
</div>
<div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
<button className={`btn btn-sm ${isRead ? 'btn-primary' : ''}`} onClick={() => onToggleRead(node.id)}>
<CheckCircle2 size={15} /> {isRead ? '已讀' : '標記已讀'}
</button>
<button className={`btn btn-sm ${isReview ? 'btn-primary' : ''}`} onClick={() => onToggleReview(node.id)}>
<Bookmark size={15} /> {isReview ? '已加待複習' : '加入待複習'}
</button>
<button className="btn btn-sm" onClick={() => setAsideOpen((v) => !v)}>
{asideOpen ? <PanelRightClose size={15} /> : <PanelRightOpen size={15} />}
{asideOpen ? '收合公式欄' : '展開公式欄'}
</button>
</div>
</div>
<div className="callout" style={{ marginBottom: 0 }}>
<strong>一句話核心：</strong><MathText text={node.sections.oneLineSummary} />
</div>
</div>
<div className="mode-tabs" role="tablist">
<button className={`mode-tab ${mode === 'study' ? 'active' : ''}`} onClick={() => setMode('study')}>
<BookOpen size={16} /> 完整教學（從符號到詳解）
</button>
<button className={`mode-tab ${mode === 'quick' ? 'active' : ''}`} onClick={() => setMode('quick')}>
<Zap size={16} /> 30秒複習與題型
</button>
<button className={`mode-tab ${mode === 'lab' ? 'active' : ''}`} onClick={() => setMode('lab')}>
<Sliders size={16} /> 互動實驗室
</button>
<button className={`mode-tab ${mode === 'practice' ? 'active' : ''}`} onClick={() => setMode('practice')}>
<PenTool size={16} /> 練習題
</button>
</div>
<div className={`module-layout ${asideOpen ? '' : 'no-aside'}`}>
<div>
{mode === 'study' && (
<div>
<div className="anchor-strip">
{[
{ id: 'sec-symbols', label: '符號文法' },
{ id: 'sec-concept', label: '核心直覺與定義' },
{ id: 'sec-formulas', label: '公式與條件' },
{ id: 'sec-steps', label: '圖文步驟' },
{ id: 'sec-examples', label: `完整例題 (${node.sections.workedExamples.length})` },
{ id: 'sec-errors', label: '常見錯誤' },
].map((sec) => (
<button
key={sec.id}
type="button"
className="btn btn-sm"
onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
>
{sec.label}
</button>
))}
</div>
<div id="sec-symbols">
<SymbolRulesCard moduleRules={node.sections.symbolRules} />
</div>
{node.sections.juniorGuide && (
<JuniorVisualGuide guide={node.sections.juniorGuide} />
)}
{node.sections.mathEvolution && node.sections.mathEvolution.length > 0 && (
<MathEvolutionCard steps={node.sections.mathEvolution} />
)}
<div id="sec-concept" className="card">
<h2 style={{ marginTop: 0 }}>1. 這個概念解決什麼問題？</h2>
<p><MathText text={node.sections.problemSolved} /></p>
<h3>白話直覺</h3>
<p><MathText text={node.sections.intuition} /></p>
{node.sections.definition && (
<>
<h3>正式定義</h3>
<div className="callout"><MathText text={node.sections.definition} /></div>
</>
)}
<h3>圖像與幾何意義</h3>
<p style={{ marginBottom: 0 }}><MathText text={node.sections.geometricMeaning} /></p>
</div>
<div id="sec-formulas" className="card">
<h2 style={{ marginTop: 0 }}>2. 公式、變數與適用條件</h2>
{node.sections.formulas.map((f, i) => (
<div key={i} style={{ borderBottom: i < node.sections.formulas.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: '1rem', marginBottom: '1rem' }}>
<h4 style={{ margin: '0 0 0.35rem' }}><MathText text={f.name} /></h4>
<div className="formula-stage">
<MathText text={f.latex} block />
</div>
<ul style={{ fontSize: '0.9rem' }}>
{f.variables.map((v, vi) => <li key={vi}><MathText text={v} /></li>)}
</ul>
<p style={{ fontSize: '0.9rem', margin: '0.3rem 0' }}>
<strong>適用條件：</strong><MathText text={f.conditions} />
</p>
<p style={{ fontSize: '0.9rem', color: 'var(--danger)', margin: 0 }}>
<strong>常見誤用：</strong><MathText text={f.commonMisuse} />
</p>
</div>
))}
</div>
<div id="sec-steps">
{node.sections.visualSteps && node.sections.visualSteps.length > 0 && (
<VisualStepFlow steps={node.sections.visualSteps} />
)}
<div className="card">
<h2 style={{ marginTop: 0 }}>3. 標準解題流程</h2>
<ol style={{ marginBottom: 0 }}>
{node.sections.solvingSteps.map((s, i) => (
<li key={i} style={{ marginBottom: '0.35rem' }}><MathText text={s} /></li>
))}
</ol>
</div>
{node.sections.strategyTrainer && node.sections.strategyTrainer.length > 0 && (
<StrategyTrainerCard items={node.sections.strategyTrainer} />
)}
</div>
<div id="sec-examples" className="card">
<h2 style={{ marginTop: 0 }}>4. 逐步拆解例題（共 {node.sections.workedExamples.length} 題）</h2>
{node.sections.workedExamples.map((ex) => (
<div key={ex.id} className="example-card">
<span className={`badge ${ex.category === 'biomedical' ? 'badge-app' : 'badge-c1'}`}>
{ex.category === 'biomedical' ? '生醫情境題' : ex.category === 'course_style' ? '課程典型題' : '基礎例題'}
</span>
<h3 style={{ margin: '0.45rem 0' }}><MathText text={ex.title} /></h3>
<p><MathText text={ex.problem} /></p>
<p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
<strong>已知：</strong><MathText text={ex.given} /> ｜ <strong>所求：</strong><MathText text={ex.find} />
</p>
{ex.modelAssumptions && (
<div className="callout warn" style={{ fontSize: '0.86rem' }}>
<strong>模型假設：</strong>{ex.modelAssumptions}
</div>
)}
<div style={{ marginTop: '0.75rem' }}>
{ex.steps.map((st, si) => (
<div key={si} className="step-row">
<span className="step-num-pill">{si + 1}</span>
<div style={{ flex: 1, minWidth: 0 }}>
<MathText text={st.expression} block />
<div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>理由：<MathText text={st.reason} /></div>
</div>
</div>
))}
</div>
<div className="callout ok" style={{ marginBottom: 0 }}>
<strong>最終答案：</strong><MathText text={ex.answer} />
<div style={{ fontSize: '0.84rem', marginTop: '0.25rem' }}>
<strong>驗算檢查：</strong><MathText text={ex.verificationNote} />
</div>
</div>
</div>
))}
</div>
<div id="sec-errors" className="card">
<h2 style={{ marginTop: 0 }}>5. 常見錯誤與診斷</h2>
{node.sections.commonErrors.map((err, i) => (
<div key={i} className="callout danger">
<h4 style={{ marginTop: 0 }}><MathText text={err.title} /></h4>
<p style={{ margin: '0.3rem 0' }}><strong>錯誤寫法：</strong><MathText text={`$${err.wrongLatex}$`} /></p>
<p style={{ margin: '0.3rem 0' }}><strong>正確寫法：</strong><MathText text={`$${err.rightLatex}$`} /></p>
<p style={{ margin: '0.3rem 0' }}><strong>原因：</strong><MathText text={err.whyWrong} /></p>
<p style={{ margin: 0 }}><strong>避錯技巧：</strong><MathText text={err.howToAvoid} /></p>
</div>
))}
</div>
</div>
)}
{mode === 'quick' && (
<div>
<div className="card">
<h2 style={{ marginTop: 0 }}>30 秒快速複習</h2>
<ul>
{node.sections.quickReview.keyPoints.map((pt, i) => (
<li key={i} style={{ marginBottom: '0.4rem' }}><MathText text={pt} /></li>
))}
</ul>
<div className="callout">
<strong>何時使用：</strong><MathText text={node.sections.quickReview.whenToUse} />
</div>
<div className="callout danger" style={{ marginBottom: 0 }}>
<strong>考場陷阱警報：</strong><MathText text={node.sections.quickReview.trapAlert} />
</div>
</div>
{node.sections.quickReview.examPatterns && node.sections.quickReview.examPatterns.length > 0 && (
<div className="card">
<span className="badge badge-p0">必考題型速查</span>
<h2 style={{ marginTop: '0.35rem' }}>這個概念會考哪些題型？看到關鍵字直接照步驟做！</h2>
<div className="card-grid">
{node.sections.quickReview.examPatterns.map((ep, idx) => (
<div key={idx} style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '0.9rem', background: 'var(--surface-alt)' }}>
<h4 style={{ margin: '0 0 0.3rem', color: 'var(--primary)' }}><MathText text={ep.examType} /></h4>
<div style={{ fontSize: '0.84rem', color: 'var(--warn)', fontWeight: 600, marginBottom: '0.45rem' }}>
題目關鍵字：<MathText text={ep.triggerWords} />
</div>
<ol style={{ margin: 0, paddingLeft: '1.15rem', fontSize: '0.88rem' }}>
{ep.quickSteps.map((qs, qi) => (
<li key={qi} style={{ marginBottom: '0.25rem' }}><MathText text={qs} /></li>
))}
</ol>
{ep.quickSample && (
<div className="callout ok" style={{ marginTop: '0.6rem', marginBottom: 0, fontSize: '0.85rem', padding: '0.55rem 0.75rem' }}>
<div><strong>考題範例：</strong><MathText text={ep.quickSample.problem} /></div>
<div style={{ marginTop: '0.25rem' }}><strong>速解：</strong><MathText text={ep.quickSample.fastSolve} /></div>
<div style={{ marginTop: '0.2rem', color: 'var(--ok)' }}><strong>答案：</strong><MathText text={ep.quickSample.answer} /></div>
</div>
)}
</div>
))}
</div>
</div>
)}
{(!node.sections.quickReview.examPatterns || node.sections.quickReview.examPatterns.length === 0) &&
node.sections.workedExamples.length > 0 && (
<div className="card">
<span className="badge badge-c1">30 秒例題範例</span>
<h3 style={{ marginTop: '0.35rem' }}>{node.sections.workedExamples[0].title}</h3>
<p style={{ fontSize: '0.9rem' }}><MathText text={node.sections.workedExamples[0].problem} /></p>
<div className="callout ok" style={{ marginBottom: 0, fontSize: '0.88rem' }}>
<strong>快速結論：</strong><MathText text={node.sections.workedExamples[0].answer} />
</div>
</div>
)}
<DecisionFlowchart
defaultKey={
node.sections.quickReview.decisionTreeKey ??
(node.moduleId === 'M06'
? 'integral'
: node.moduleId === 'M02' || node.moduleId === 'M07'
? 'ode'
: node.moduleId === 'M09' || node.moduleId === 'M10' || node.moduleId === 'M11'
? 'prob'
: 'diff')
}
/>
</div>
)}
{mode === 'lab' && <VisualLabHost meta={node.sections.visualization} />}
{mode === 'practice' && (
<PracticeList
nodeId={node.id}
questions={node.sections.practice}
onRecord={onRecordPractice}
/>
)}
</div>
{asideOpen && (
<aside className="formula-aside">
<h3 style={{ marginTop: 0 }}>核心公式速查</h3>
{node.sections.formulas.map((f, i) => (
<div key={i} style={{ marginBottom: '0.85rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--border)' }}>
<div style={{ fontWeight: 600, fontSize: '0.86rem' }}>{f.name}</div>
<MathText text={f.latex} block />
<div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
條件：<MathText text={f.conditions} />
</div>
</div>
))}
<h4>先備知識</h4>
<ul style={{ fontSize: '0.86rem', paddingLeft: '1.1rem' }}>
{node.prerequisites.map((pid) => {
const p = NODE_MAP.get(pid);
return (
<li key={pid}>
{p?.contentStatus === 'verified' ? <Link to={`/module/${pid}`}>{p.title}</Link> : p?.title ?? pid}
</li>
);
})}
</ul>
{node.needsLectureCheck && node.needsLectureCheck.length > 0 && (
<div className="callout warn" style={{ fontSize: '0.8rem', marginBottom: 0 }}>
<strong>需依課堂講義確認：</strong>
<ul style={{ margin: '0.25rem 0 0', paddingLeft: '1rem' }}>
{node.needsLectureCheck.map((item, idx) => <li key={idx}>{item}</li>)}
</ul>
</div>
)}
</aside>
)}
</div>
</div>
);
};
const PracticeList: React.FC<{
nodeId: string;
questions: PracticeQuestion[];
onRecord: (nodeId: string, qId: string, ok: boolean) => void;
}> = ({ nodeId, questions, onRecord }) => {
return (
<div>
{questions.map((q, idx) => (
<PracticeCard key={q.id} index={idx + 1} nodeId={nodeId} q={q} onRecord={onRecord} />
))}
</div>
);
};
const PracticeCard: React.FC<{
index: number;
nodeId: string;
q: PracticeQuestion;
onRecord: (nodeId: string, qId: string, ok: boolean) => void;
}> = ({ index, nodeId, q, onRecord }) => {
const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
const [numericInput, setNumericInput] = useState<string>('');
const [hintLevel, setHintLevel] = useState<number>(0);
const [submitted, setSubmitted] = useState<boolean>(false);
const [isCorrect, setIsCorrect] = useState<boolean>(false);
const handleSubmit = () => {
let ok = false;
if (q.options && q.correctOptionIndex !== undefined) {
ok = selectedOpt === q.correctOptionIndex;
} else if (q.numericAnswer !== undefined) {
const val = Number(numericInput);
ok = !Number.isNaN(val) && Math.abs(val - q.numericAnswer) <= (q.tolerance ?? 0.01);
}
setIsCorrect(ok);
setSubmitted(true);
onRecord(nodeId, q.id, ok);
};
return (
<div className="card">
<div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
<span className="badge badge-c1">題 {index}</span>
<span className="badge badge-ext">{q.questionType}</span>
<span className="badge badge-p1">難度 {q.difficulty}</span>
<span className="badge badge-ext">
來源：{q.sourceType === 'lecture_adapted' ? '課堂講義改編' : '自編練習'}
</span>
</div>
<p style={{ fontWeight: 600 }}><MathText text={q.prompt} /></p>
<p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
<strong>已知：</strong><MathText text={q.given} /> ｜ <strong>所求：</strong><MathText text={q.find} />
</p>
{q.options ? (
<div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.8rem' }}>
{q.options.map((opt, oi) => (
<label key={oi} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
<input
type="radio"
name={q.id}
checked={selectedOpt === oi}
onChange={() => setSelectedOpt(oi)}
/>
<MathText text={opt} />
</label>
))}
</div>
) : (
<div style={{ marginBottom: '0.8rem' }}>
<input
type="text"
value={numericInput}
onChange={(e) => setNumericInput(e.target.value)}
placeholder="輸入數值答案"
style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid var(--border)', width: 180 }}
/>
</div>
)}
<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
<button className="btn btn-primary btn-sm" onClick={handleSubmit}>檢查答案</button>
{hintLevel < q.hints.length && (
<button className="btn btn-sm" onClick={() => setHintLevel((h) => h + 1)}>
顯示提示 ({hintLevel + 1}/{q.hints.length})
</button>
)}
</div>
{hintLevel > 0 && (
<div className="callout warn" style={{ marginTop: '0.75rem' }}>
{q.hints.slice(0, hintLevel).map((h, hi) => (
<div key={hi}><strong>提示 {hi + 1}：</strong><MathText text={h} /></div>
))}
</div>
)}
{submitted && (
<div className={`callout ${isCorrect ? 'ok' : 'danger'}`} style={{ marginTop: '0.75rem' }}>
<p style={{ marginTop: 0 }}>
<strong>{isCorrect ? '答對了！' : '再檢查看看：'}</strong>
標準答案：<MathText text={q.answerDisplay} />
</p>
<p><strong>解題策略：</strong><MathText text={q.strategy} /></p>
{q.steps.map((s, si) => (
<div key={si} style={{ marginBottom: '0.4rem' }}>
<MathText text={s.expression} block />
<div style={{ fontSize: '0.84rem' }}><MathText text={s.reason} /></div>
</div>
))}
<p style={{ marginBottom: 0, fontSize: '0.85rem' }}>
<strong>常見錯法：</strong><MathText text={q.commonMistake} />
</p>
</div>
)}
</div>
);
};
