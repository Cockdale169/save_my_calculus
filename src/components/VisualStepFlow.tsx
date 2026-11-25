import React from 'react';
import { VisualStep } from '../types/curriculum';
import { MathText } from './MathText';
import { useI18n } from '../store/i18n';
const StepDiagramSvg: React.FC<{ type: VisualStep['diagramType'] }> = ({ type }) => {
switch (type) {
case 'observe':
return (
<svg viewBox="0 0 110 64" width={110} height={64} role="img" aria-label="觀察條件示意">
<rect x={4} y={6} width={102} height={52} rx={8} fill="#e0f2fe" stroke="#0f5c8a" />
<circle cx={34} cy={32} r={14} fill="#fff" stroke="#0f5c8a" strokeWidth={2} />
<line x1={44} y1={42} x2={56} y2={52} stroke="#0f5c8a" strokeWidth={2.5} />
<text x={78} y={36} fontSize={11} textAnchor="middle" fontWeight="bold" fill="#0f5c8a">看清結構</text>
</svg>
);
case 'split':
return (
<svg viewBox="0 0 110 64" width={110} height={64} role="img" aria-label="拆解步驟示意">
<rect x={6} y={10} width={38} height={44} rx={6} fill="#fef3c7" stroke="#b45309" />
<text x={25} y={36} fontSize={10} textAnchor="middle" fontWeight="bold" fill="#92400e">外層</text>
<text x={55} y={36} fontSize={13} textAnchor="middle" fontWeight="bold" fill="#0f5c8a">+</text>
<rect x={66} y={10} width={38} height={44} rx={6} fill="#dcfce7" stroke="#15803d" />
<text x={85} y={36} fontSize={10} textAnchor="middle" fontWeight="bold" fill="#166534">內層</text>
</svg>
);
case 'transform':
return (
<svg viewBox="0 0 110 64" width={110} height={64} role="img" aria-label="轉換變形示意">
<rect x={6} y={14} width={34} height={36} rx={6} fill="#f1f5f9" stroke="#64748b" />
<text x={23} y={36} fontSize={10} textAnchor="middle" fill="#475569">原式</text>
<path d="M 44 32 L 64 32 M 58 26 L 64 32 L 58 38" fill="none" stroke="#0f5c8a" strokeWidth={2} />
<rect x={68} y={14} width={36} height={36} rx={6} fill="#e6f7f5" stroke="#0d9488" />
<text x={86} y={36} fontSize={10} textAnchor="middle" fontWeight="bold" fill="#0d9488">新形式</text>
</svg>
);
case 'calculate':
return (
<svg viewBox="0 0 110 64" width={110} height={64} role="img" aria-label="代入計算示意">
<rect x={8} y={8} width={94} height={48} rx={8} fill="#ede9fe" stroke="#7c3aed" />
<text x={55} y={30} fontSize={11} textAnchor="middle" fontWeight="bold" fill="#5b21b6">代入數字</text>
<text x={55} y={46} fontSize={10} textAnchor="middle" fill="#5b21b6">算出結果</text>
</svg>
);
case 'verify':
return (
<svg viewBox="0 0 110 64" width={110} height={64} role="img" aria-label="驗算檢查示意">
<rect x={8} y={8} width={94} height={48} rx={8} fill="#dcfce7" stroke="#15803d" />
<path d="M 32 34 L 44 45 L 72 20" fill="none" stroke="#15803d" strokeWidth={3} strokeLinecap="round" />
</svg>
);
}
};
export const VisualStepFlow: React.FC<{ steps: VisualStep[] }> = ({ steps }) => {
const { lang } = useI18n();
const isEn = lang === 'en';
return (
<div className="card">
<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
<span className="badge badge-app">{isEn ? 'Visual Step Guide' : '圖文分步導引'}</span>
<h2 style={{ margin: 0 }}>{isEn ? 'See the Diagram & Metaphor Before the Equations!' : '每一步都先看圖與生活譬喻，再看算式！'}</h2>
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
{steps.map((st, idx) => (
<div
key={idx}
style={{
display: 'flex',
gap: '1rem',
alignItems: 'center',
flexWrap: 'wrap',
border: '1px solid var(--border)',
borderRadius: 14,
padding: '0.9rem',
background: 'var(--surface-alt)',
}}
>
<div className="svg-adaptive" style={{ flexShrink: 0, padding: '0.2rem' }}>
<StepDiagramSvg type={st.diagramType} />
</div>
<div style={{ flex: 1, minWidth: 220 }}>
<div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
{isEn ? `Step ${idx + 1}: ` : `步驟 ${idx + 1}：`}<MathText text={st.stepTitle} />
</div>
<div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
<strong>{isEn ? 'Metaphor: ' : '生活譬喻：'}</strong><MathText text={st.metaphor} />
</div>
<div style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--tint-teal-text)' }}>
<strong>{isEn ? 'Mini Example: ' : '應用小例子：'}</strong><MathText text={st.appliedExample} />
</div>
<div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
<strong>{isEn ? 'Formula Hint: ' : '對應算式：'}</strong><MathText text={st.formulaHint} />
</div>
</div>
</div>
))}
</div>
</div>
);
};
