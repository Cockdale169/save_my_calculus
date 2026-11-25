import React, { useState, useRef } from 'react';
import { MathText } from '../components/MathText';
type SolidPreset = 'sqrt' | 'cone' | 'parabola';
export const Volume3DLab: React.FC = () => {
const [preset, setPreset] = useState<SolidPreset>('sqrt');
const [sweepDeg, setSweepDeg] = useState<number>(300);
const [slices, setSlices] = useState<number>(10);
const [yaw, setYaw] = useState<number>(0.55);
const [pitch, setPitch] = useState<number>(0.35);
const dragging = useRef<{ active: boolean; lastX: number; lastY: number }>({
active: false,
lastX: 0,
lastY: 0,
});
const evalR = (x: number) => {
if (preset === 'sqrt') return Math.sqrt(Math.max(0, x));
if (preset === 'cone') return 0.6 * x;
return 0.4 + 0.35 * x * x;
};
const exactVolume = () => {
if (preset === 'sqrt') return Math.PI * (2 ** 2 / 2);
if (preset === 'cone') return Math.PI * 0.36 * (2 ** 3 / 3);
return Math.PI * (0.32 + 2.24 / 3 + 3.92 / 5);
};
const W = 400;
const H = 290;
const project = (x: number, y: number, z: number) => {
const cx = x - 1.0;
const cy = Math.cos(yaw);
const sy = Math.sin(yaw);
const cp = Math.cos(pitch);
const sp = Math.sin(pitch);
const x1 = cx * cy - y * sy;
const y1 = cx * sy + y * cy;
const z2 = y1 * sp + z * cp;
const scale = 70;
return {
sx: W / 2 + x1 * scale,
sy: H / 2 - z2 * scale,
};
};
const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
dragging.current = { active: true, lastX: e.clientX, lastY: e.clientY };
e.currentTarget.setPointerCapture(e.pointerId);
};
const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
if (!dragging.current.active) return;
const dx = e.clientX - dragging.current.lastX;
const dy = e.clientY - dragging.current.lastY;
dragging.current.lastX = e.clientX;
dragging.current.lastY = e.clientY;
setYaw((prev) => prev + dx * 0.01);
setPitch((prev) => Math.max(-1.1, Math.min(1.2, prev + dy * 0.01)));
};
const handlePointerUp = () => {
dragging.current.active = false;
};
const maxAngle = (sweepDeg * Math.PI) / 180;
const rings: JSX.Element[] = [];
let diskApprox = 0;
const dx = 2.0 / slices;
for (let i = 0; i <= slices; i++) {
const x = i * dx;
const r = evalR(x);
if (i < slices) {
const rMid = evalR(x + dx / 2);
diskApprox += Math.PI * rMid * rMid * dx;
}
const pts: string[] = [];
const segs = 28;
for (let j = 0; j <= segs; j++) {
const phi = (maxAngle * j) / segs;
const py = r * Math.cos(phi);
const pz = r * Math.sin(phi);
const pr = project(x, py, pz);
pts.push(`${j === 0 ? 'M' : 'L'} ${pr.sx.toFixed(1)} ${pr.sy.toFixed(1)}`);
}
rings.push(
<path
key={`ring-${i}`}
d={pts.join(' ')}
fill={i === slices ? 'rgba(13, 148, 136, 0.25)' : 'none'}
stroke={i === slices ? '#0d9488' : 'rgba(15, 92, 138, 0.55)'}
strokeWidth={i === slices ? 2 : 1.3}
/>
);
}
const profilePts: string[] = [];
for (let i = 0; i <= 30; i++) {
const x = (2.0 * i) / 30;
const pr = project(x, evalR(x), 0);
profilePts.push(`${i === 0 ? 'M' : 'L'} ${pr.sx.toFixed(1)} ${pr.sy.toFixed(1)}`);
}
const ax0 = project(0, 0, 0);
const ax1 = project(2.3, 0, 0);
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
<button className={`btn btn-sm ${preset === 'sqrt' ? 'btn-primary' : ''}`} onClick={() => setPreset('sqrt')}>
碗狀：y = √x
</button>
<button className={`btn btn-sm ${preset === 'cone' ? 'btn-primary' : ''}`} onClick={() => setPreset('cone')}>
圓錐：y = 0.6x
</button>
<button className={`btn btn-sm ${preset === 'parabola' ? 'btn-primary' : ''}`} onClick={() => setPreset('parabola')}>
花瓶：y = 0.4 + 0.35x²
</button>
</div>
<svg
viewBox={`0 0 ${W} ${H}`}
width="100%"
style={{
cursor: 'grab',
touchAction: 'none',
}}
onPointerDown={handlePointerDown}
onPointerMove={handlePointerMove}
onPointerUp={handlePointerUp}
role="img"
aria-label="3D 旋轉體圓盤法互動圖"
>
<line x1={ax0.sx} y1={ax0.sy} x2={ax1.sx} y2={ax1.sy} stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 3" />
{rings}
<path d={profilePts.join(' ')} fill="none" stroke="#b91c1c" strokeWidth={2.8} />
</svg>
<div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem', textAlign: 'center' }}>
拖曳旋轉 3D 旋轉體；紅線為原始 2D 曲線，藍綠圓圈為切片圓盤
</div>
</div>
<div className="card">
<div className="slider-row">
<label><span>旋轉掃描角度</span><span>{sweepDeg}°</span></label>
<input type="range" min={30} max={360} step={15} value={sweepDeg} onChange={(e) => setSweepDeg(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>圓盤切片數 n</span><span>{slices} 片</span></label>
<input type="range" min={3} max={24} step={1} value={slices} onChange={(e) => setSlices(Number(e.target.value))} />
</div>
<div style={{ fontSize: '0.88rem' }}>
<p><MathText text={`每片圓盤體積 $= \\pi r^2 \\cdot \\Delta x = \\pi [f(x)]^2 \\Delta x$`} /></p>
<p><MathText text={`圓盤近似總體積（$n=${slices}$）：$${diskApprox.toFixed(3)}$`} /></p>
<p style={{ color: '#0f5c8a', fontWeight: 700 }}>
<MathText text={`精確旋轉體體積 $\\int_0^2 \\pi [f(x)]^2\\,dx = ${exactVolume().toFixed(3)}$`} />
</p>
</div>
<button className="btn btn-sm" onClick={() => { setYaw(0.55); setPitch(0.35); setSweepDeg(300); setSlices(10); }}>
重設 3D 視角
</button>
</div>
</div>
);
};
