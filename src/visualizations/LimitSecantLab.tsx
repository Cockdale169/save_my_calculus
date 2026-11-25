import React, { useState } from 'react';
import { MathText } from '../components/MathText';
type FuncPreset = 'square' | 'sinx_over_x' | 'jump';
export const LimitSecantLab: React.FC = () => {
const [preset, setPreset] = useState<FuncPreset>('square');
const [h, setH] = useState<number>(1.0);
const x0 = preset === 'square' ? 1 : 0;
const evalF = (x: number): number | null => {
if (preset === 'square') return x * x;
if (preset === 'sinx_over_x') {
if (Math.abs(x) < 1e-9) return null;
return Math.sin(x) / x;
}
return x >= 0 ? 1 + 0.4 * x : -0.5 + 0.4 * x;
};
const y0 = preset === 'sinx_over_x' ? 1 : evalF(x0)!;
const x1 = x0 + h;
const y1 = evalF(x1);
const isHZero = Math.abs(h) < 0.02;
const secantSlope = !isHZero && y1 !== null && preset !== 'sinx_over_x' ? (y1 - y0) / h : null;
const xMin = -1.5;
const xMax = 2.8;
const yMin = -1.2;
const yMax = 4.2;
const W = 380;
const H = 260;
const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
const toSvgY = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;
const buildPath = (start: number, end: number) => {
const pts: string[] = [];
const steps = 120;
for (let i = 0; i <= steps; i++) {
const x = start + ((end - start) * i) / steps;
const y = evalF(x);
if (y === null || y < yMin - 1 || y > yMax + 1) continue;
pts.push(`${pts.length === 0 ? 'M' : 'L'} ${toSvgX(x).toFixed(1)} ${toSvgY(y).toFixed(1)}`);
}
return pts.join(' ');
};
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
<button className={`btn btn-sm ${preset === 'square' ? 'btn-primary' : ''}`} onClick={() => { setPreset('square'); setH(1.0); }}>
f(x) = x²（在 x₀ = 1）
</button>
<button className={`btn btn-sm ${preset === 'sinx_over_x' ? 'btn-primary' : ''}`} onClick={() => { setPreset('sinx_over_x'); setH(1.0); }}>
sin(x)/x（在 x₀ = 0）
</button>
<button className={`btn btn-sm ${preset === 'jump' ? 'btn-primary' : ''}`} onClick={() => { setPreset('jump'); setH(0.8); }}>
跳躍不連續（在 x₀ = 0）
</button>
</div>
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="極限與割線趨近切線互動圖">
<line x1={0} y1={toSvgY(0)} x2={W} y2={toSvgY(0)} stroke="#cbd5e1" strokeWidth={1.2} />
<line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={H} stroke="#cbd5e1" strokeWidth={1.2} />
{preset === 'jump' ? (
<>
<path d={buildPath(xMin, -0.02)} fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
<path d={buildPath(0.02, xMax)} fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
<circle cx={toSvgX(0)} cy={toSvgY(-0.5)} r={4.5} fill="#fff" stroke="#0f5c8a" strokeWidth={2} />
</>
) : (
<path d={buildPath(xMin, xMax)} fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
)}
<circle
cx={toSvgX(x0)}
cy={toSvgY(y0)}
r={5}
fill={preset === 'sinx_over_x' ? '#fff' : '#0f5c8a'}
stroke="#0f5c8a"
strokeWidth={2}
/>
{!isHZero && y1 !== null && (
<>
<circle cx={toSvgX(x1)} cy={toSvgY(y1)} r={5} fill="#b91c1c" />
{secantSlope !== null && (
<line
x1={toSvgX(xMin)}
y1={toSvgY(y0 + secantSlope * (xMin - x0))}
x2={toSvgX(xMax)}
y2={toSvgY(y0 + secantSlope * (xMax - x0))}
stroke="#b91c1c"
strokeWidth={1.8}
strokeDasharray="5 3"
/>
)}
</>
)}
</svg>
</div>
<div className="card">
<div className="slider-row">
<label>
<span>步長 h（避開 h = 0）</span>
<span>h = {h.toFixed(2)}</span>
</label>
<input
type="range"
min={-1.2}
max={1.5}
step={0.05}
value={h}
onChange={(e) => setH(Number(e.target.value))}
/>
</div>
<div style={{ fontSize: '0.9rem' }}>
<p><strong>目標點</strong>：x₀ = {x0}</p>
<p><strong>鄰近點</strong>：x₀ + h = {x1.toFixed(2)}，f(x₀ + h) = {y1 !== null ? y1.toFixed(4) : '未定義'}</p>
{preset === 'square' && (
<>
<p>
<strong>割線斜率（平均變化率）</strong>：
{isHZero ? <span style={{ color: '#b91c1c' }}>h = 0 時分母為零，無法直接代入！</span> : secantSlope!.toFixed(4)}
</p>
<p>
<MathText text={`理論切線斜率 $f'(1) = 2(1) = 2$。當 $h \\to 0$，割線斜率趨近 $2$。`} />
</p>
</>
)}
{preset === 'sinx_over_x' && (
<p style={{ color: '#0f5c8a' }}>
在 x₀ = 0 處函數本身無定義（空心點），但從左側 (h &lt; 0) 與右側 (h &gt; 0) 逼近時，函數值都趨近 <strong>1</strong>。
</p>
)}
{preset === 'jump' && (
<p style={{ color: '#b91c1c' }}>
當 h &gt; 0（右逼近）極限為 1；當 h &lt; 0（左逼近）極限為 -0.5。左右極限不相等，故極限不存在且不可微！
</p>
)}
</div>
<button className="btn btn-sm" onClick={() => setH(1.0)}>重設 h = 1.0</button>
</div>
</div>
);
};
