import React, { useState } from 'react';
import { MathText } from '../components/MathText';
type ChainPreset = 'exp_decay' | 'trig_freq' | 'poly_power';
export const ChainRuleLab: React.FC = () => {
const [preset, setPreset] = useState<ChainPreset>('exp_decay');
const [x, setX] = useState<number>(1.0);
const [k, setK] = useState<number>(0.6);
let u = 0;
let duDx = 0;
let y = 0;
let dyDu = 0;
let formulaDesc = '';
if (preset === 'exp_decay') {
u = -k * x;
duDx = -k;
y = Math.exp(u);
dyDu = Math.exp(u);
formulaDesc = `y = e^{-kx},\\ u = -kx`;
} else if (preset === 'trig_freq') {
u = k * x;
duDx = k;
y = Math.sin(u);
dyDu = Math.cos(u);
formulaDesc = `y = \\sin(kx),\\ u = kx`;
} else {
u = x * x + k;
duDx = 2 * x;
y = u * u;
dyDu = 2 * u;
formulaDesc = `y = (x^2 + k)^2,\\ u = x^2 + k`;
}
const dyDx = dyDu * duDx;
const W = 360;
const H = 220;
const xMin = 0;
const xMax = 4;
const yMin = preset === 'trig_freq' ? -1.4 : -0.2;
const yMax = preset === 'poly_power' ? 35 : 1.4;
const toSvgX = (vx: number) => ((vx - xMin) / (xMax - xMin)) * W;
const toSvgY = (vy: number) => H - ((vy - yMin) / (yMax - yMin)) * H;
const evalY = (vx: number) => {
if (preset === 'exp_decay') return Math.exp(-k * vx);
if (preset === 'trig_freq') return Math.sin(k * vx);
return (vx * vx + k) ** 2;
};
const pathPts: string[] = [];
for (let i = 0; i <= 100; i++) {
const vx = xMin + ((xMax - xMin) * i) / 100;
const vy = evalY(vx);
if (vy >= yMin - 2 && vy <= yMax + 2) {
pathPts.push(`${pathPts.length === 0 ? 'M' : 'L'} ${toSvgX(vx).toFixed(1)} ${toSvgY(vy).toFixed(1)}`);
}
}
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
<button className={`btn btn-sm ${preset === 'exp_decay' ? 'btn-primary' : ''}`} onClick={() => setPreset('exp_decay')}>
藥物衰減 e^(-kx)
</button>
<button className={`btn btn-sm ${preset === 'trig_freq' ? 'btn-primary' : ''}`} onClick={() => setPreset('trig_freq')}>
週期振盪 sin(kx)
</button>
<button className={`btn btn-sm ${preset === 'poly_power' ? 'btn-primary' : ''}`} onClick={() => setPreset('poly_power')}>
多項複合 (x² + k)²
</button>
</div>
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="連鎖律複合函數與切線斜率圖">
<line x1={0} y1={toSvgY(0)} x2={W} y2={toSvgY(0)} stroke="#cbd5e1" strokeWidth={1.2} />
<path d={pathPts.join(' ')} fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
<line
x1={toSvgX(x - 0.6)}
y1={toSvgY(y + dyDx * -0.6)}
x2={toSvgX(x + 0.6)}
y2={toSvgY(y + dyDx * 0.6)}
stroke="#b91c1c"
strokeWidth={2}
/>
<circle cx={toSvgX(x)} cy={toSvgY(y)} r={5} fill="#b91c1c" />
</svg>
<div className="callout" style={{ marginTop: '0.75rem' }}>
<MathText text={`$$${formulaDesc}$$`} />
</div>
</div>
<div className="card">
<div className="slider-row">
<label>
<span>輸入位置 x</span>
<span>x = {x.toFixed(2)}</span>
</label>
<input type="range" min={0.2} max={3.5} step={0.1} value={x} onChange={(e) => setX(Number(e.target.value))} />
</div>
<div className="slider-row">
<label>
<span>內層參數 k</span>
<span>k = {k.toFixed(2)}</span>
</label>
<input type="range" min={0.2} max={2.0} step={0.1} value={k} onChange={(e) => setK(Number(e.target.value))} />
</div>
<div style={{ fontSize: '0.9rem' }}>
<p><strong>1. 內層計算</strong>：u = g({x.toFixed(2)}) = {u.toFixed(4)}</p>
<p><strong>2. 內層變化率</strong>：du/dx = g&apos;(x) = {duDx.toFixed(4)}</p>
<p><strong>3. 外層變化率</strong>：dy/du = f&apos;(u) = {dyDu.toFixed(4)}</p>
<p style={{ color: '#b91c1c', fontWeight: 700 }}>
4. 連鎖律總斜率：dy/dx = (dy/du)·(du/dx) = {dyDx.toFixed(4)}
</p>
</div>
<button className="btn btn-sm" onClick={() => { setX(1.0); setK(0.6); }}>重設參數</button>
</div>
</div>
);
};
