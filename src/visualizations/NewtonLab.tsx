import React, { useState } from 'react';
import { MathText } from '../components/MathText';
type NewtonPreset = 'sqrt2' | 'cbrt10' | 'cos_x';
export const NewtonLab: React.FC = () => {
const [preset, setPreset] = useState<NewtonPreset>('sqrt2');
const [x0, setX0] = useState<number>(2.5);
const [iters, setIters] = useState<number>(3);
const evalF = (x: number) => {
if (preset === 'sqrt2') return x * x - 2;
if (preset === 'cbrt10') return x * x * x - 10;
return Math.cos(x) - x;
};
const evalDf = (x: number) => {
if (preset === 'sqrt2') return 2 * x;
if (preset === 'cbrt10') return 3 * x * x;
return -Math.sin(x) - 1;
};
const history: { x: number; fx: number; dfx: number; nextX: number | null }[] = [];
let curr = x0;
for (let i = 0; i < iters; i++) {
const fx = evalF(curr);
const dfx = evalDf(curr);
if (Math.abs(dfx) < 1e-6) {
history.push({ x: curr, fx, dfx, nextX: null });
break;
}
const nextX = curr - fx / dfx;
history.push({ x: curr, fx, dfx, nextX });
curr = nextX;
}
const W = 380;
const H = 250;
const xMin = preset === 'cos_x' ? -0.5 : -0.5;
const xMax = 3.2;
const yMin = -4;
const yMax = preset === 'cbrt10' ? 16 : 7;
const toX = (x: number) => 20 + ((x - xMin) / (xMax - xMin)) * (W - 35);
const toY = (y: number) => H - 20 - ((y - yMin) / (yMax - yMin)) * (H - 35);
const curvePts: string[] = [];
for (let i = 0; i <= 100; i++) {
const vx = xMin + ((xMax - xMin) * i) / 100;
const vy = evalF(vx);
if (vy >= yMin - 2 && vy <= yMax + 2) {
curvePts.push(`${curvePts.length === 0 ? 'M' : 'L'} ${toX(vx).toFixed(1)} ${toY(vy).toFixed(1)}`);
}
}
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
<button className={`btn btn-sm ${preset === 'sqrt2' ? 'btn-primary' : ''}`} onClick={() => { setPreset('sqrt2'); setX0(2.5); }}>
f(x) = x² - 2 (求 √2)
</button>
<button className={`btn btn-sm ${preset === 'cbrt10' ? 'btn-primary' : ''}`} onClick={() => { setPreset('cbrt10'); setX0(2.8); }}>
f(x) = x³ - 10 (求 ∛10)
</button>
<button className={`btn btn-sm ${preset === 'cos_x' ? 'btn-primary' : ''}`} onClick={() => { setPreset('cos_x'); setX0(1.8); }}>
f(x) = cos(x) - x
</button>
</div>
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="牛頓法切線迭代找根圖">
<line x1={15} y1={toY(0)} x2={W - 10} y2={toY(0)} stroke="#64748b" strokeWidth={1.3} />
<line x1={toX(0)} y1={10} x2={toX(0)} y2={H - 15} stroke="#94a3b8" strokeWidth={1.1} />
<path d={curvePts.join(' ')} fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
{history.map((step, idx) => (
<g key={idx}>
<line x1={toX(step.x)} y1={toY(0)} x2={toX(step.x)} y2={toY(step.fx)} stroke="#0d9488" strokeDasharray="3 2" strokeWidth={1.4} />
<circle cx={toX(step.x)} cy={toY(step.fx)} r={4} fill="#b91c1c" />
{step.nextX !== null && (
<line x1={toX(step.x)} y1={toY(step.fx)} x2={toX(step.nextX)} y2={toY(0)} stroke="#b91c1c" strokeWidth={1.8} />
)}
</g>
))}
</svg>
</div>
<div className="card">
<div className="slider-row">
<label><span>初始猜測 x₀</span><span>x₀ = {x0.toFixed(2)}</span></label>
<input type="range" min={0.1} max={3.0} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>迭代次數</span><span>{iters} 步</span></label>
<input type="range" min={1} max={5} step={1} value={iters} onChange={(e) => setIters(Number(e.target.value))} />
</div>
<div className="table-scroll" style={{ fontSize: '0.84rem' }}>
<table>
<thead>
<tr><th>步驟</th><th>xₙ</th><th>f(xₙ)</th><th>xₙ₊₁</th></tr>
</thead>
<tbody>
{history.map((s, i) => (
<tr key={i}>
<td>n={i}</td>
<td>{s.x.toFixed(4)}</td>
<td>{s.fx.toFixed(4)}</td>
<td><strong>{s.nextX !== null ? s.nextX.toFixed(5) : '失敗 (f\'=0)'}</strong></td>
</tr>
))}
</tbody>
</table>
</div>
<p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 0 }}>
<MathText text="觀察紅線切線每次撞向 $x$ 軸，僅需 3 步就能精準收斂到根！" />
</p>
</div>
</div>
);
};
