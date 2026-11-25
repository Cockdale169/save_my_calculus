import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadAllNodes } from '../data/nodeLoader';
import { useI18n } from '../store/i18n';
import { CourseTag, Difficulty, KnowledgeNode, PracticeQuestion } from '../types/curriculum';
import { UserProgressState } from '../store/progressStore';
import { MathText } from '../components/MathText';
interface PracticeCenterPageProps {
progress: UserProgressState;
onRecordPractice: (nodeId: string, questionId: string, isCorrect: boolean) => void;
}
interface IndexedQuestion {
nodeId: string;
nodeTitle: string;
courseTags: CourseTag[];
q: PracticeQuestion;
}
export const PracticeCenterPage: React.FC<PracticeCenterPageProps> = ({
progress,
onRecordPractice,
}) => {
const { lang } = useI18n();
const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [onlyWrong, setOnlyWrong] = useState<boolean>(false);
const [tagFilter, setTagFilter] = useState<CourseTag | 'ALL'>('ALL');
const [diffFilter, setDiffFilter] = useState<Difficulty | 'ALL'>('ALL');
useEffect(() => {
let active = true;
loadAllNodes(lang).then((loaded) => {
if (active) {
setNodes(loaded);
setLoading(false);
}
});
return () => {
active = false;
};
}, [lang]);
if (loading) {
return (
<div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
載入全站練習題庫中...
</div>
);
}
const allQuestions: IndexedQuestion[] = nodes.flatMap((node) =>
node.sections.practice.map((q) => ({
nodeId: node.id,
nodeTitle: node.title,
courseTags: node.courseTags,
q,
}))
);
const wrongSet = new Set<string>(
Object.values(progress.practiceByNode).flatMap((r) => r.wrongIds)
);
const filtered = allQuestions.filter((item) => {
if (onlyWrong && !wrongSet.has(item.q.id)) return false;
if (tagFilter !== 'ALL' && !item.courseTags.includes(tagFilter)) return false;
if (diffFilter !== 'ALL' && item.q.difficulty !== diffFilter) return false;
return true;
});
return (
<div>
<div className="card">
<h1 style={{ marginTop: 0 }}>題庫與錯題複習中心</h1>
<p style={{ color: 'var(--text-muted)' }}>
彙整全站 <strong>{allQuestions.length}</strong> 題自編練習題，目前待修正錯題數：<strong>{wrongSet.size}</strong> 題。答對錯題後會自動從錯題本移除。
</p>
<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
<button
className={`btn btn-sm ${onlyWrong ? 'btn-primary' : ''}`}
onClick={() => setOnlyWrong((v) => !v)}
>
{onlyWrong ? '✓ 只看錯題' : '只看錯題'} ({wrongSet.size})
</button>
<select
value={tagFilter}
onChange={(e) => setTagFilter(e.target.value as CourseTag | 'ALL')}
style={{ padding: '0.32rem 0.6rem', borderRadius: 6, border: '1px solid var(--border)' }}
aria-label="依課程標籤篩選"
>
<option value="ALL">全部課程標籤</option>
<option value="HS">HS 高中先備</option>
<option value="BRIDGE">BRIDGE 銜接</option>
<option value="C1">C1 微積分（一）</option>
<option value="C2">C2 微積分（二）</option>
<option value="APP">APP 生醫應用</option>
</select>
<select
value={diffFilter}
onChange={(e) => setDiffFilter(e.target.value as Difficulty | 'ALL')}
style={{ padding: '0.32rem 0.6rem', borderRadius: 6, border: '1px solid var(--border)' }}
aria-label="依難度篩選"
>
<option value="ALL">全部難度</option>
<option value="L0">L0 先備補強</option>
<option value="L1">L1 基本辨識</option>
<option value="L2">L2 標準計算</option>
<option value="L3">L3 課程考試整合</option>
<option value="L4">L4 跨章節／生醫建模</option>
</select>
</div>
</div>
{filtered.length === 0 ? (
<div className="card">
<p style={{ margin: 0, color: 'var(--text-muted)' }}>
{onlyWrong ? '目前沒有待修正的錯題，繼續保持！' : '沒有符合篩選條件的題目。'}
</p>
</div>
) : (
filtered.map((item, idx) => (
<QuestionItemCard
key={item.q.id}
index={idx + 1}
item={item}
isWrong={wrongSet.has(item.q.id)}
onRecord={onRecordPractice}
/>
))
)}
</div>
);
};
const QuestionItemCard: React.FC<{
index: number;
item: IndexedQuestion;
isWrong: boolean;
onRecord: (nodeId: string, qId: string, ok: boolean) => void;
}> = ({ index, item, isWrong, onRecord }) => {
const { q, nodeId, nodeTitle } = item;
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
<div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.45rem' }}>
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
<span className="badge badge-c1">#{index}</span>
<span className="badge badge-ext">{q.questionType}</span>
<span className="badge badge-p1">{q.difficulty}</span>
{isWrong && <span className="badge badge-p0">錯題待複習</span>}
</div>
<Link to={`/module/${nodeId}`} style={{ fontSize: '0.84rem' }}>
來源單元：{nodeTitle} →
</Link>
</div>
<p style={{ fontWeight: 600 }}><MathText text={q.prompt} /></p>
<p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
<strong>已知：</strong><MathText text={q.given} /> ｜ <strong>所求：</strong><MathText text={q.find} />
</p>
{q.options ? (
<div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.75rem' }}>
{q.options.map((opt, oi) => (
<label key={oi} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
<input
type="radio"
name={`center-${q.id}`}
checked={selectedOpt === oi}
onChange={() => setSelectedOpt(oi)}
/>
<MathText text={opt} />
</label>
))}
</div>
) : (
<div style={{ marginBottom: '0.75rem' }}>
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
提示 ({hintLevel + 1}/{q.hints.length})
</button>
)}
</div>
{hintLevel > 0 && (
<div className="callout warn" style={{ marginTop: '0.7rem' }}>
{q.hints.slice(0, hintLevel).map((h, hi) => (
<div key={hi}><strong>提示 {hi + 1}：</strong><MathText text={h} /></div>
))}
</div>
)}
{submitted && (
<div className={`callout ${isCorrect ? 'ok' : 'danger'}`} style={{ marginTop: '0.7rem' }}>
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
