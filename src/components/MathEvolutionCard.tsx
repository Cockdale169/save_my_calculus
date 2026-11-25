import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { EvolutionDiagramType, MathEvolutionStep } from '../types/curriculum';
import { MathText } from './MathText';
const EvolutionSvg: React.FC<{ type: EvolutionDiagramType }> = ({ type }) => {
switch (type) {
case 'archimedes-exhaustion':
return (
<svg viewBox="0 0 380 155" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto' }} role="img" aria-label="上下黎曼和夾擠真實面積示意圖">
<line x1={25} y1={130} x2={355} y2={130} stroke="#64748b" strokeWidth={1.5} />
<line x1={35} y1={18} x2={35} y2={136} stroke="#64748b" strokeWidth={1.5} />
<rect x={60} y={88} width={65} height={42} fill="rgba(239,68,68,0.14)" stroke="#dc2626" strokeDasharray="3 2" />
<rect x={125} y={64} width={65} height={66} fill="rgba(239,68,68,0.14)" stroke="#dc2626" strokeDasharray="3 2" />
<rect x={190} y={40} width={65} height={90} fill="rgba(239,68,68,0.14)" stroke="#dc2626" strokeDasharray="3 2" />
<rect x={255} y={24} width={65} height={106} fill="rgba(239,68,68,0.14)" stroke="#dc2626" strokeDasharray="3 2" />
<rect x={60} y={108} width={65} height={22} fill="rgba(13,148,136,0.3)" stroke="#0f766e" strokeWidth={1.3} />
<rect x={125} y={88} width={65} height={42} fill="rgba(13,148,136,0.3)" stroke="#0f766e" strokeWidth={1.3} />
<rect x={190} y={64} width={65} height={66} fill="rgba(13,148,136,0.3)" stroke="#0f766e" strokeWidth={1.3} />
<rect x={255} y={40} width={65} height={90} fill="rgba(13,148,136,0.3)" stroke="#0f766e" strokeWidth={1.3} />
<path d="M 55 110 Q 175 88 325 22" fill="none" stroke="#0f5c8a" strokeWidth={2.6} />
<text x={60} y={145} fontSize={10} fill="#475569">a</text>
<text x={318} y={145} fontSize={10} fill="#475569">b</text>
<text x={115} y={22} fontSize={10.5} fill="#dc2626" fontWeight="bold">外包：上黎曼和 Uₙ（高估）</text>
<text x={185} y={120} fontSize={10.5} fill="#0f766e" fontWeight="bold">內接：下黎曼和 Lₙ（低估）</text>
</svg>
);
case 'riemann-integral':
return (
<svg viewBox="0 0 380 165" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto' }} role="img" aria-label="黎曼積分細分割與有向面積示意圖">
<line x1={25} y1={95} x2={355} y2={95} stroke="#64748b" strokeWidth={1.5} />
{[0, 1, 2, 3, 4, 5, 6].map((i) => {
const heights = [20, 40, 54, 58, 50, 32, 12];
const h = heights[i];
return <rect key={i} x={55 + i * 24} y={95 - h} width={22} height={h} fill="rgba(14,165,233,0.28)" stroke="#0284c7" strokeWidth={1} />;
})}
{[0, 1, 2, 3].map((i) => {
const heights = [14, 30, 34, 20];
const h = heights[i];
return <rect key={i} x={225 + i * 24} y={95} width={22} height={h} fill="rgba(239,68,68,0.25)" stroke="#dc2626" strokeWidth={1} />;
})}
<path d="M 48 92 Q 135 5 224 95 T 326 95" fill="none" stroke="#0f5c8a" strokeWidth={2.5} />
<circle cx={143} cy={37} r={3.5} fill="#b45309" />
<line x1={143} y1={37} x2={143} y2={95} stroke="#b45309" strokeDasharray="3 2" />
<text x={146} y={32} fontSize={10} fill="#b45309" fontWeight="bold">樣點 cᵢ → 高 f(cᵢ)</text>
<text x={135} y={110} fontSize={10} fill="#0284c7" fontWeight="bold">+ 正面積（軸上）</text>
<text x={270} y={148} fontSize={10} textAnchor="middle" fill="#dc2626" fontWeight="bold">- 負面積（軸下抵銷）</text>
<text x={55} y={152} fontSize={10} fill="#475569">寬度 ||P|| → 0（切到無限細）</text>
</svg>
);
case 'ftc-bridge':
return (
<svg viewBox="0 0 380 155" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto' }} role="img" aria-label="微積分基本定理面積增加率示意圖">
<line x1={25} y1={125} x2={355} y2={125} stroke="#64748b" strokeWidth={1.5} />
<path d="M 60 125 L 60 95 Q 145 80 235 42 L 235 125 Z" fill="rgba(14,165,233,0.22)" />
<rect x={235} y={40} width={16} height={85} fill="rgba(245,158,11,0.45)" stroke="#b45309" strokeWidth={1.4} />
<path d="M 55 96 Q 160 78 320 22" fill="none" stroke="#0f5c8a" strokeWidth={2.5} />
<text x={60} y={140} fontSize={10.5} fill="#475569">a</text>
<text x={232} y={140} fontSize={10.5} fill="#0f5c8a" fontWeight="bold">x</text>
<text x={252} y={140} fontSize={10} fill="#b45309">x+dx</text>
<text x={145} y={102} fontSize={11} textAnchor="middle" fill="#0f5c8a" fontWeight="bold">累積面積 A(x)</text>
<text x={260} y={76} fontSize={10.5} fill="#b45309" fontWeight="bold">新增窄條 dA ≈ f(x)·dx</text>
<text x={260} y={92} fontSize={10.5} fill="#15803d" fontWeight="bold">⇒ A&apos;(x) = f(x)！</text>
</svg>
);
case 'linear-taylor':
return (
<svg viewBox="0 0 380 150" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto' }} role="img" aria-label="線性與泰勒逼近貼合曲線示意圖">
<line x1={25} y1={125} x2={355} y2={125} stroke="#64748b" strokeWidth={1.3} />
<path d="M 45 112 C 130 105, 220 75, 325 20" fill="none" stroke="#0f5c8a" strokeWidth={2.8} />
<line x1={65} y1={120} x2={315} y2={48} stroke="#dc2626" strokeWidth={1.8} strokeDasharray="5 3" />
<path d="M 55 114 Q 190 92 325 25" fill="none" stroke="#15803d" strokeWidth={2} />
<circle cx={180} cy={87} r={4.5} fill="#0f5c8a" />
<text x={180} y={104} fontSize={10} textAnchor="middle" fill="#0f5c8a" fontWeight="bold">基準點 a</text>
<text x={285} y={66} fontSize={10} fill="#dc2626" fontWeight="bold">一階切線 L(x)</text>
<text x={265} y={22} fontSize={10} fill="#15803d" fontWeight="bold">二階/高階 Pₙ(x) 緊貼原曲線</text>
</svg>
);
case 'newton-tangent':
return (
<svg viewBox="0 0 380 150" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto' }} role="img" aria-label="牛頓法切線撞擊x軸逼近根示意圖">
<line x1={25} y1={115} x2={355} y2={115} stroke="#64748b" strokeWidth={1.5} />
<path d="M 75 128 Q 185 95 315 20" fill="none" stroke="#0f5c8a" strokeWidth={2.5} />
<circle cx={118} cy={115} r={4} fill="#15803d" />
<text x={118} y={134} fontSize={10} textAnchor="middle" fill="#15803d" fontWeight="bold">真實根</text>
<circle cx={280} cy={43} r={4} fill="#dc2626" />
<line x1={280} y1={43} x2={280} y2={115} stroke="#94a3b8" strokeDasharray="3 2" />
<line x1={280} y1={43} x2={165} y2={115} stroke="#dc2626" strokeWidth={1.8} />
<text x={280} y={132} fontSize={10} textAnchor="middle" fill="#dc2626" fontWeight="bold">x₀</text>
<circle cx={165} cy={115} r={3.5} fill="#b45309" />
<text x={165} y={132} fontSize={10} textAnchor="middle" fill="#b45309" fontWeight="bold">x₁（切線落點）</text>
<text x={200} y={32} fontSize={10.5} fill="#dc2626" fontWeight="bold">沿切線溜下來找下一個猜測值</text>
</svg>
);
case 'euler-steps':
return (
<svg viewBox="0 0 380 150" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto' }} role="img" aria-label="尤拉法折線步進逼近解曲線示意圖">
<line x1={25} y1={125} x2={355} y2={125} stroke="#64748b" strokeWidth={1.4} />
<path d="M 55 108 Q 185 88 325 22" fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
<polyline points="55,108 145,94 235,68 325,35" fill="none" stroke="#dc2626" strokeWidth={2.2} strokeDasharray="5 2" />
<circle cx={55} cy={108} r={4} fill="#dc2626" />
<circle cx={145} cy={94} r={4} fill="#dc2626" />
<circle cx={235} cy={68} r={4} fill="#dc2626" />
<circle cx={325} cy={35} r={4} fill="#dc2626" />
<text x={100} y={118} fontSize={10} fill="#475569">Δt</text>
<text x={175} y={55} fontSize={10.5} fill="#0f5c8a" fontWeight="bold">真實曲線 y(t)</text>
<text x={245} y={96} fontSize={10.5} fill="#dc2626" fontWeight="bold">尤拉折線 yₙ₊₁ = yₙ + Δt·斜率</text>
</svg>
);
case 'antiderivative-family':
return (
<svg viewBox="0 0 380 150" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto' }} role="img" aria-label="反導數曲線家族上下平移示意圖">
<line x1={25} y1={130} x2={355} y2={130} stroke="#64748b" strokeWidth={1.4} />
<path d="M 55 118 Q 180 68 310 92" fill="none" stroke="#94a3b8" strokeWidth={2} />
<path d="M 55 92 Q 180 42 310 66" fill="none" stroke="#0f5c8a" strokeWidth={2.6} />
<path d="M 55 66 Q 180 16 310 40" fill="none" stroke="#94a3b8" strokeWidth={2} />
<circle cx={180} cy={55} r={4.5} fill="#dc2626" />
<text x={190} y={52} fontSize={10.5} fill="#dc2626" fontWeight="bold">初值 (x₀, y₀) 鎖定唯一一條 C</text>
<text x={265} y={108} fontSize={10} fill="#475569">同 x 處切線斜率全相同</text>
</svg>
);
case 'lhopital-zoom':
return (
<svg viewBox="0 0 380 150" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto' }} role="img" aria-label="夾擠定理與羅必達斜率比值示意圖">
<line x1={25} y1={125} x2={355} y2={125} stroke="#64748b" strokeWidth={1.4} />
<path d="M 50 35 Q 190 78 330 35" fill="none" stroke="#0d9488" strokeWidth={2} strokeDasharray="4 2" />
<path d="M 50 115 Q 190 78 330 115" fill="none" stroke="#0d9488" strokeWidth={2} strokeDasharray="4 2" />
<path d="M 55 55 Q 110 95 190 78 T 325 65" fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
<circle cx={190} cy={78} r={4.5} fill="#dc2626" />
<text x={190} y={24} fontSize={10.5} textAnchor="middle" fill="#0d9488" fontWeight="bold">上下夾擠，或放大交點看斜率比 f&apos;(a)/g&apos;(a)</text>
</svg>
);
case 'extrema-mvt':
default:
return (
<svg viewBox="0 0 380 150" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto' }} role="img" aria-label="均值定理割線與平行切線示意圖">
<line x1={25} y1={130} x2={355} y2={130} stroke="#64748b" strokeWidth={1.4} />
<path d="M 65 105 Q 175 18 305 68" fill="none" stroke="#0f5c8a" strokeWidth={2.5} />
<line x1={65} y1={105} x2={305} y2={68} stroke="#64748b" strokeWidth={1.8} strokeDasharray="4 3" />
<line x1={115} y1={52} x2={265} y2={29} stroke="#dc2626" strokeWidth={2} />
<circle cx={65} cy={105} r={3.5} fill="#0f5c8a" />
<circle cx={305} cy={68} r={3.5} fill="#0f5c8a" />
<circle cx={188} cy={41} r={4.5} fill="#dc2626" />
<text x={65} y={122} fontSize={10} textAnchor="middle" fill="#475569">a</text>
<text x={188} y={122} fontSize={10} textAnchor="middle" fill="#dc2626" fontWeight="bold">c（切線平行割線）</text>
<text x={305} y={122} fontSize={10} textAnchor="middle" fill="#475569">b</text>
</svg>
);
}
};
export const MathEvolutionCard: React.FC<{ steps: MathEvolutionStep[] }> = ({ steps }) => {
const [openIndices, setOpenIndices] = useState<Record<number, boolean>>(() => {
const firstWithDive = steps.findIndex((s) => Boolean(s.deepDive));
return firstWithDive >= 0 ? { [firstWithDive]: true } : {};
});
const hasAnyDeepDive = steps.some((s) => Boolean(s.deepDive));
const allOpen = hasAnyDeepDive && steps.every((s, idx) => !s.deepDive || openIndices[idx]);
const toggleIndex = (idx: number) => {
setOpenIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
};
const toggleAll = () => {
const nextState = !allOpen;
const next: Record<number, boolean> = {};
steps.forEach((s, idx) => {
if (s.deepDive) next[idx] = nextState;
});
setOpenIndices(next);
};
return (
<div className="card" style={{ borderLeft: '4px solid #b45309', background: '#fffcf5' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
<div>
<span className="badge badge-hs">數學演進脈絡</span>
<h2 style={{ margin: '0.35rem 0 0' }}>前人為什麼要發明這個概念？（沿革故事與圖文詳解）</h2>
</div>
{hasAnyDeepDive && (
<button type="button" className="btn btn-sm" onClick={toggleAll}>
<Sparkles size={14} /> {allOpen ? '全部收合' : '展開全部圖解'}
</button>
)}
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
{steps.map((ev, idx) => {
const isOpen = Boolean(openIndices[idx]);
return (
<div
key={idx}
style={{
paddingLeft: '0.85rem',
borderLeft: '3px solid #f59e0b',
background: '#ffffff',
borderRadius: '0 8px 8px 0',
paddingTop: '0.6rem',
paddingBottom: '0.6rem',
paddingRight: '0.75rem',
borderTop: '1px solid #fef3c7',
borderRight: '1px solid #fef3c7',
borderBottom: '1px solid #fef3c7',
}}
>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
<div style={{ flex: 1, minWidth: 220 }}>
<div style={{ fontWeight: 700, color: '#92400e', fontSize: '0.98rem' }}>
{idx + 1}. <MathText text={ev.stage} />
</div>
<div style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>
<strong>遇到的難題：</strong><MathText text={ev.question} />
</div>
<div style={{ fontSize: '0.88rem', color: '#0f5c8a', marginTop: '0.2rem' }}>
<strong>關鍵突破：</strong><MathText text={ev.breakthrough} />
</div>
</div>
{ev.deepDive && (
<button
type="button"
className={`btn btn-sm ${isOpen ? 'btn-primary' : ''}`}
onClick={() => toggleIndex(idx)}
aria-expanded={isOpen}
style={{ flexShrink: 0 }}
>
{isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
{isOpen ? '收合圖文詳解' : '點開圖文詳解'}
</button>
)}
</div>
{ev.deepDive && isOpen && (
<div
style={{
marginTop: '0.75rem',
paddingTop: '0.75rem',
borderTop: '1px dashed #fcd34d',
}}
>
<div style={{ fontWeight: 700, color: '#0f5c8a', marginBottom: '0.5rem', fontSize: '0.94rem' }}>
<MathText text={ev.deepDive.title} />
</div>
<div
style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
gap: '0.9rem',
alignItems: 'start',
}}
>
<div
style={{
background: '#f8fafc',
border: '1px solid var(--border)',
borderRadius: 8,
padding: '0.65rem',
}}
>
<EvolutionSvg type={ev.deepDive.diagramType} />
<div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.35rem' }}>
<MathText text={ev.deepDive.diagramCaption} />
</div>
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
{ev.deepDive.concepts.map((c, ci) => (
<div
key={ci}
style={{
background: '#f0f9ff',
borderLeft: '3px solid #0284c7',
borderRadius: 6,
padding: '0.45rem 0.65rem',
fontSize: '0.86rem',
}}
>
<div style={{ fontWeight: 700, color: '#0369a1' }}><MathText text={c.term} /></div>
<div style={{ marginTop: '0.15rem' }}><MathText text={c.plainExplain} /></div>
{c.formula && (
<div style={{ marginTop: '0.25rem' }}>
<MathText text={c.formula} block />
</div>
)}
</div>
))}
{ev.deepDive.miniExample && (
<div className="callout ok" style={{ margin: 0, fontSize: '0.85rem', padding: '0.55rem 0.7rem' }}>
<div><strong>小例子秒懂：</strong><MathText text={ev.deepDive.miniExample.prompt} /></div>
<div style={{ marginTop: '0.2rem' }}><MathText text={ev.deepDive.miniExample.walkthrough} /></div>
</div>
)}
</div>
</div>
</div>
)}
</div>
);
})}
</div>
</div>
);
};
