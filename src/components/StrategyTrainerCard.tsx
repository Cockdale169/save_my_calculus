import React, { useState } from 'react';
import { StrategyTrainerItem } from '../types/curriculum';
import { MathText } from './MathText';
export const StrategyTrainerCard: React.FC<{ items: StrategyTrainerItem[] }> = ({ items }) => {
const [selected, setSelected] = useState<Record<number, number>>({});
return (
<div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
<span className="badge badge-c1">解題技巧互動推演</span>
<h2 style={{ margin: 0, fontSize: '1.15rem' }}>看到題目先別急著算！練習「挑對工具」</h2>
</div>
{items.map((item, idx) => {
const picked = selected[idx];
const chosenObj = picked !== undefined ? item.choices[picked] : null;
return (
<div
key={idx}
style={{
border: '1px solid var(--border)',
borderRadius: 12,
padding: '0.9rem',
marginTop: '0.75rem',
background: 'var(--surface-alt)',
}}
>
<div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
情境 {idx + 1}：<MathText text={item.scenario} />
</div>
<div style={{ fontWeight: 600, marginBottom: '0.55rem' }}>
<MathText text={item.question} />
</div>
<div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
{item.choices.map((ch, ci) => (
<button
key={ci}
className={`btn btn-sm ${picked === ci ? 'btn-primary' : ''}`}
onClick={() => setSelected((prev) => ({ ...prev, [idx]: ci }))}
>
<MathText text={ch.label} />
</button>
))}
</div>
{chosenObj && (
<div className={`callout ${chosenObj.isCorrect ? 'ok' : 'danger'}`} style={{ marginBottom: 0 }}>
<strong>{chosenObj.isCorrect ? '選對策略了！' : '這招會卡住：'}</strong>
<MathText text={chosenObj.feedback} />
</div>
)}
</div>
);
})}
</div>
);
};
