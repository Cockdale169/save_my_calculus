import React, { useState } from 'react';
import { MathText } from '../components/MathText';
type CobwebModel = 'linear' | 'logistic';
export const CobwebLab: React.FC = () => {
const [model, setModel] = useState<CobwebModel>('linear');
const [a, setA] = useState<number>(0.6);
const [x0, setX0] = useState<number>(0.2);
const [steps, setSteps] = useState<number>(8);
const f = (x: number) => {
if (model === 'linear') {
return a * x + 0.3;
}
return a * x * (1 - x);
};
const trajectory: number[] = [x0];
for (let i = 0; i < steps; i++) {
const next = f(trajectory[trajectory.length - 1]);
trajectory.push(next);
}
const W = 340;
const H = 300;
const minVal = -0.2;
const maxVal = 1.2;
const toSvgX = (x: number) => ((x - minVal) / (maxVal - minVal)) * (W - 30) + 20;
const toSvgY = (y: number) => H - 20 - ((y - minVal) / (maxVal - minVal)) * (H - 35);
const curvePts: string[] = [];
for (let i = 0; i <= 100; i++) {
const vx = minVal + ((maxVal - minVal) * i) / 100;
const vy = f(vx);
if (vy >= minVal - 0.5 && vy <= maxVal + 0.5) {
curvePts.push(`${curvePts.length === 0 ? 'M' : 'L'} ${toSvgX(vx).toFixed(1)} ${toSvgY(vy).toFixed(1)}`);
}
}
const cobwebSegments: string[] = [];
if (trajectory.length > 1) {
cobwebSegments.push(`M ${toSvgX(trajectory[0]).toFixed(1)} ${toSvgY(0).toFixed(1)}`);
for (let i = 0; i < trajectory.length - 1; i++) {
const curr = trajectory[i];
const next = trajectory[i + 1];
cobwebSegments.push(`L ${toSvgX(curr).toFixed(1)} ${toSvgY(next).toFixed(1)}`);
cobwebSegments.push(`L ${toSvgX(next).toFixed(1)} ${toSvgY(next).toFixed(1)}`);
}
}
const eqText =
model === 'linear'
? Math.abs(1 - a) > 1e-6
? `$x^* = \\frac{0.3}{1 - ${a.toFixed(1)}} = ${(0.3 / (1 - a)).toFixed(3)}$（${Math.abs(a) < 1 ? '穩定吸引' : '發散不穩定'}）`
: '無有限平衡點（斜率為 1 平行 $y=x$）'
: `$x^* = 0$ 與 $x^* = 1 - \\frac{1}{r} = ${a > 1 ? (1 - 1 / a).toFixed(3) : '負值（非生物範圍）'}$`;
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
<button
className={`btn btn-sm ${model === 'linear' ? 'btn-primary' : ''}`}
onClick={() => { setModel('linear'); setA(0.6); setX0(0.1); }}
>
線性遞迴 xₙ₊₁ = a·xₙ + 0.3
</button>
<button
className={`btn btn-sm ${model === 'logistic' ? 'btn-primary' : ''}`}
onClick={() => { setModel('logistic'); setA(2.6); setX0(0.2); }}
>
離散羅吉斯 xₙ₊₁ = r·xₙ(1 - xₙ)
</button>
</div>
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="蛛網圖互動實驗室">
<line x1={toSvgX(minVal)} y1={toSvgY(minVal)} x2={toSvgX(maxVal)} y2={toSvgY(maxVal)} stroke="#0d9488" strokeWidth={1.6} strokeDasharray="5 3" />
<path d={curvePts.join(' ')} fill="none" stroke="#0f5c8a" strokeWidth={2.3} />
<path d={cobwebSegments.join(' ')} fill="none" stroke="#b91c1c" strokeWidth={1.6} />
<circle cx={toSvgX(x0)} cy={toSvgY(0)} r={4} fill="#b91c1c" />
</svg>
<div style={{ fontSize: '0.84rem', marginTop: '0.4rem' }}>
<span><strong style={{ color: '#0f5c8a' }}>━━</strong> 更新函數 f(x)</span>{' '}
<span><strong style={{ color: '#0d9488' }}>---</strong> 對角線 y = x</span>{' '}
<span><strong style={{ color: '#b91c1c' }}>━━</strong> 蛛網迭代軌跡</span>
</div>
</div>
<div className="card">
<div className="slider-row">
<label>
<span>{model === 'linear' ? '斜率參數 a' : '成長參數 r'}</span>
<span>{a.toFixed(2)}</span>
</label>
<input
type="range"
min={model === 'linear' ? -1.2 : 0.5}
max={model === 'linear' ? 1.2 : 3.6}
step={0.1}
value={a}
onChange={(e) => setA(Number(e.target.value))}
/>
</div>
<div className="slider-row">
<label><span>初始值 x₀</span><span>{x0.toFixed(2)}</span></label>
<input type="range" min={0.05} max={0.95} step={0.05} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>迭代步數</span><span>{steps} 步</span></label>
<input type="range" min={1} max={15} step={1} value={steps} onChange={(e) => setSteps(Number(e.target.value))} />
</div>
<div style={{ fontSize: '0.88rem' }}>
<p><strong>平衡點分析：</strong><MathText text={eqText} /></p>
<p><strong>數列前 5 項：</strong>{trajectory.slice(0, 5).map((v) => v.toFixed(3)).join(' → ')}</p>
</div>
</div>
</div>
);
};
