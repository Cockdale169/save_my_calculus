import React, { useState } from 'react';
import { MathText } from '../components/MathText';
type SystemPreset = 'predator_prey' | 'competition';
export const PhasePlaneLab: React.FC = () => {
const [preset, setPreset] = useState<SystemPreset>('predator_prey');
const [x0, setX0] = useState<number>(1.8);
const [y0, setY0] = useState<number>(1.2);
const deriv = (x: number, y: number): [number, number] => {
if (preset === 'predator_prey') {
return [x * (1.2 - 0.6 * y), y * (-0.8 + 0.4 * x)];
}
return [x * (1.0 - x - 0.5 * y), y * (1.0 - y - 0.6 * x)];
};
const maxCoord = preset === 'predator_prey' ? 4.0 : 1.5;
const W = 360;
const H = 300;
const toSvgX = (x: number) => 30 + (x / maxCoord) * (W - 45);
const toSvgY = (y: number) => H - 25 - (y / maxCoord) * (H - 40);
const arrows: JSX.Element[] = [];
const gridN = 9;
for (let i = 1; i <= gridN; i++) {
for (let j = 1; j <= gridN; j++) {
const gx = (maxCoord * i) / (gridN + 0.5);
const gy = (maxCoord * j) / (gridN + 0.5);
const [dx, dy] = deriv(gx, gy);
const mag = Math.hypot(dx, dy);
if (mag > 1e-6) {
const len = 12;
const ux = (dx / mag) * len;
const uy = (dy / mag) * len;
const sx = toSvgX(gx);
const sy = toSvgY(gy);
arrows.push(
<line
key={`${i}-${j}`}
x1={sx - ux * 0.4}
y1={sy + uy * 0.4}
x2={sx + ux * 0.6}
y2={sy - uy * 0.6}
stroke="#94a3b8"
strokeWidth={1.3}
/>
);
}
}
}
const pts: string[] = [];
let cx = x0;
let cy = y0;
const dt = 0.04;
for (let step = 0; step < 300; step++) {
if (cx < 0 || cx > maxCoord * 1.2 || cy < 0 || cy > maxCoord * 1.2) break;
pts.push(`${step === 0 ? 'M' : 'L'} ${toSvgX(cx).toFixed(1)} ${toSvgY(cy).toFixed(1)}`);
const [k1x, k1y] = deriv(cx, cy);
const mx = cx + 0.5 * dt * k1x;
const my = cy + 0.5 * dt * k1y;
const [k2x, k2y] = deriv(mx, my);
cx += dt * k2x;
cy += dt * k2y;
}
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
<button
className={`btn btn-sm ${preset === 'predator_prey' ? 'btn-primary' : ''}`}
onClick={() => { setPreset('predator_prey'); setX0(1.8); setY0(1.2); }}
>
掠食者－被捕食者 (Lotka-Volterra)
</button>
<button
className={`btn btn-sm ${preset === 'competition' ? 'btn-primary' : ''}`}
onClick={() => { setPreset('competition'); setX0(0.3); setY0(0.9); }}
>
兩物種競爭模型
</button>
</div>
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="相平面、零傾線與軌跡圖">
<line x1={30} y1={H - 25} x2={W - 10} y2={H - 25} stroke="#64748b" strokeWidth={1.2} />
<line x1={30} y1={10} x2={30} y2={H - 25} stroke="#64748b" strokeWidth={1.2} />
<text x={W - 22} y={H - 10} fontSize={11} fill="#475569">x</text>
<text x={14} y={20} fontSize={11} fill="#475569">y</text>
{arrows}
{preset === 'predator_prey' ? (
<>
<line x1={30} y1={toSvgY(2)} x2={W - 15} y2={toSvgY(2)} stroke="#0d9488" strokeWidth={1.8} strokeDasharray="5 3" />
<line x1={toSvgX(2)} y1={15} x2={toSvgX(2)} y2={H - 25} stroke="#7c3aed" strokeWidth={1.8} strokeDasharray="5 3" />
</>
) : (
<>
<line x1={toSvgX(1)} y1={toSvgY(0)} x2={toSvgX(0.25)} y2={toSvgY(1.5)} stroke="#0d9488" strokeWidth={1.8} strokeDasharray="5 3" />
<line x1={toSvgX(0)} y1={toSvgY(1)} x2={toSvgX(1.5)} y2={toSvgY(0.1)} stroke="#7c3aed" strokeWidth={1.8} strokeDasharray="5 3" />
</>
)}
<path d={pts.join(' ')} fill="none" stroke="#b91c1c" strokeWidth={2.2} />
<circle cx={toSvgX(x0)} cy={toSvgY(y0)} r={5} fill="#b91c1c" />
</svg>
<div style={{ fontSize: '0.82rem', marginTop: '0.45rem' }}>
<span><strong style={{ color: '#0d9488' }}>---</strong> x-零傾線 (dx/dt=0)</span>{' '}
<span><strong style={{ color: '#7c3aed' }}>---</strong> y-零傾線 (dy/dt=0)</span>{' '}
<span><strong style={{ color: '#b91c1c' }}>━━</strong> 系統軌跡</span>
</div>
</div>
<div className="card">
<div className="slider-row">
<label><span>初始物種 x₀</span><span>{x0.toFixed(2)}</span></label>
<input type="range" min={0.1} max={preset === 'predator_prey' ? 3.5 : 1.3} step={0.1} value={x0} onChange={(e) => setX0(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>初始物種 y₀</span><span>{y0.toFixed(2)}</span></label>
<input type="range" min={0.1} max={preset === 'predator_prey' ? 3.5 : 1.3} step={0.1} value={y0} onChange={(e) => setY0(Number(e.target.value))} />
</div>
<div className="callout" style={{ fontSize: '0.86rem' }}>
{preset === 'predator_prey' ? (
<MathText text={'$\\frac{dx}{dt}=x(1.2-0.6y),\\ \\frac{dy}{dt}=y(-0.8+0.4x)$。非零平衡點在 $(2, 2)$，軌跡繞著 $(2,2)$ 做週期循環！'} />
) : (
<MathText text={'$\\frac{dx}{dt}=x(1-x-0.5y),\\ \\frac{dy}{dt}=y(1-y-0.6x)$。兩條零傾線交點 $(5/7, 4/7) \\approx (0.71, 0.57)$ 為穩定共存平衡點。'} />
)}
</div>
</div>
</div>
);
};
