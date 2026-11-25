import React, { useState } from 'react';
import { MathText } from '../components/MathText';
import { Volume3DLab } from './Volume3DLab';
type IntegralPreset = 'square' | 'exp_auc' | 'sine';
type SumDisplay = 'both' | 'lower' | 'upper';
export const RiemannFtcLab: React.FC = () => {
const [view3D, setView3D] = useState<boolean>(false);
const [preset, setPreset] = useState<IntegralPreset>('square');
const [sumDisplay, setSumDisplay] = useState<SumDisplay>('both');
const [n, setN] = useState<number>(6);
const [b, setB] = useState<number>(2.0);
const a = 0;
if (view3D) {
return (
<div>
<div style={{ marginBottom: '0.75rem' }}>
<button className="btn btn-sm" onClick={() => setView3D(false)}>← 切回 2D 黎曼上下和與 AUC</button>
</div>
<Volume3DLab />
</div>
);
}
const evalF = (x: number) => {
if (preset === 'square') return x * x;
if (preset === 'exp_auc') return Math.exp(-0.5 * x);
return Math.sin(x);
};
const exactIntegral = () => {
if (preset === 'square') return (b ** 3 - a ** 3) / 3;
if (preset === 'exp_auc') return -2 * (Math.exp(-0.5 * b) - Math.exp(-0.5 * a));
return -Math.cos(b) + Math.cos(a);
};
const dx = (b - a) / n;
let lowerSum = 0;
let upperSum = 0;
const rects: { x: number; w: number; hMin: number; hMax: number }[] = [];
for (let i = 0; i < n; i++) {
const x0 = a + i * dx;
let hMin = Infinity;
let hMax = -Infinity;
for (let s = 0; s <= 16; s++) {
const val = evalF(x0 + (dx * s) / 16);
if (val < hMin) hMin = val;
if (val > hMax) hMax = val;
}
lowerSum += hMin * dx;
upperSum += hMax * dx;
rects.push({ x: x0, w: dx, hMin, hMax });
}
const W = 380;
const H = 250;
const xMin = 0;
const xMax = 3.2;
const yMin = -0.2;
const yMax = preset === 'square' ? 9.5 : 1.3;
const toSvgX = (vx: number) => ((vx - xMin) / (xMax - xMin)) * (W - 30) + 20;
const toSvgY = (vy: number) => H - 20 - ((vy - yMin) / (yMax - yMin)) * (H - 35);
const curvePts: string[] = [];
for (let i = 0; i <= 100; i++) {
const vx = xMin + ((xMax - xMin) * i) / 100;
const vy = evalF(vx);
curvePts.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(vx).toFixed(1)} ${toSvgY(vy).toFixed(1)}`);
}
const yZero = toSvgY(0);
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
<button className={`btn btn-sm ${preset === 'square' ? 'btn-primary' : ''}`} onClick={() => { setPreset('square'); setB(2.0); }}>
f(x) = x²
</button>
<button className={`btn btn-sm ${preset === 'exp_auc' ? 'btn-primary' : ''}`} onClick={() => { setPreset('exp_auc'); setB(3.0); }}>
藥物濃度 e^(-0.5t)（AUC）
</button>
<button className={`btn btn-sm ${preset === 'sine' ? 'btn-primary' : ''}`} onClick={() => { setPreset('sine'); setB(3.1); }}>
f(x) = sin(x)
</button>
<button className="btn btn-sm" style={{ borderColor: '#0d9488', color: '#0d9488', fontWeight: 700 }} onClick={() => setView3D(true)}>
🧊 切換 3D 旋轉體體積實驗室
</button>
</div>
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
<button className={`btn btn-sm ${sumDisplay === 'both' ? 'btn-primary' : ''}`} onClick={() => setSumDisplay('both')}>
同時顯示上和／下和
</button>
<button className={`btn btn-sm ${sumDisplay === 'lower' ? 'btn-primary' : ''}`} onClick={() => setSumDisplay('lower')}>
只看下黎曼和 Lₙ
</button>
<button className={`btn btn-sm ${sumDisplay === 'upper' ? 'btn-primary' : ''}`} onClick={() => setSumDisplay('upper')}>
只看上黎曼和 Uₙ
</button>
</div>
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="上黎曼和與下黎曼和夾擠定積分面積圖">
<line x1={20} y1={yZero} x2={W - 5} y2={yZero} stroke="#94a3b8" strokeWidth={1.2} />
<line x1={toSvgX(0)} y1={10} x2={toSvgX(0)} y2={H - 15} stroke="#94a3b8" strokeWidth={1.2} />
{(sumDisplay === 'both' || sumDisplay === 'upper') &&
rects.map((rc, idx) => {
const rx = toSvgX(rc.x);
const rw = toSvgX(rc.x + rc.w) - rx;
const ry = rc.hMax >= 0 ? toSvgY(rc.hMax) : yZero;
const rh = Math.abs(yZero - toSvgY(rc.hMax));
return (
<rect
key={`u-${idx}`}
x={rx}
y={ry}
width={Math.max(1, rw)}
height={rh}
fill="rgba(234, 88, 12, 0.16)"
stroke="#ea580c"
strokeWidth={1}
/>
);
})}
{(sumDisplay === 'both' || sumDisplay === 'lower') &&
rects.map((rc, idx) => {
const rx = toSvgX(rc.x);
const rw = toSvgX(rc.x + rc.w) - rx;
const ry = rc.hMin >= 0 ? toSvgY(rc.hMin) : yZero;
const rh = Math.abs(yZero - toSvgY(rc.hMin));
return (
<rect
key={`l-${idx}`}
x={rx}
y={ry}
width={Math.max(1, rw)}
height={rh}
fill="rgba(13, 148, 136, 0.30)"
stroke="#0d9488"
strokeWidth={1}
/>
);
})}
<path d={curvePts.join(' ')} fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
</svg>
<div style={{ fontSize: '0.82rem', marginTop: '0.4rem' }}>
<span style={{ color: '#0d9488', fontWeight: 700 }}>■ 下黎曼和 Lₙ（矮長條）</span>{' '}
<span style={{ color: '#ea580c', fontWeight: 700 }}>■ 上黎曼和 Uₙ（高長條）</span>{' '}
<span style={{ color: '#0f5c8a', fontWeight: 700 }}>━━ 曲線 f(x)</span>
</div>
</div>
<div className="card">
<div className="slider-row">
<label><span>切割長條數 n</span><span>n = {n} 條</span></label>
<input type="range" min={2} max={40} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>積分上限 b</span><span>b = {b.toFixed(2)}</span></label>
<input type="range" min={0.5} max={3.1} step={0.1} value={b} onChange={(e) => setB(Number(e.target.value))} />
</div>
<div style={{ fontSize: '0.88rem' }}>
<p><MathText text={`下黎曼和 $L_{${n}} = ${lowerSum.toFixed(4)}$（保證 $\\le$ 真實面積）`} /></p>
<p><MathText text={`上黎曼和 $U_{${n}} = ${upperSum.toFixed(4)}$（保證 $\\ge$ 真實面積）`} /></p>
<p style={{ color: '#0f5c8a', fontWeight: 700 }}>
<MathText text={`夾擠結果：$L_{${n}} \\le \\int_0^{${b.toFixed(1)}} f(x)\\,dx = ${exactIntegral().toFixed(4)} \\le U_{${n}}$`} />
</p>
<p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
<MathText text={`上下誤差寬度 $U_{${n}} - L_{${n}} = ${(upperSum - lowerSum).toFixed(4)}$（當 $n \\to \\infty$ 時縮成 $0$！）`} />
</p>
</div>
<button className="btn btn-sm" onClick={() => { setN(6); setB(2.0); setSumDisplay('both'); }}>重設參數</button>
</div>
</div>
);
};
