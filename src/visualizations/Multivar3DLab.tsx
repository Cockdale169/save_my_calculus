import React, { useState, useRef } from 'react';
import { MathText } from '../components/MathText';
type SurfacePreset = 'paraboloid' | 'saddle' | 'wave';
type SliceMode = 'none' | 'fix_y' | 'fix_x' | 'riemann3d';
interface Point3D {
x: number;
y: number;
z: number;
}
export const Multivar3DLab: React.FC = () => {
const [preset, setPreset] = useState<SurfacePreset>('paraboloid');
const [sliceMode, setSliceMode] = useState<SliceMode>('fix_y');
const [sliceVal, setSliceVal] = useState<number>(0.5);
const [yaw, setYaw] = useState<number>(0.65);
const [pitch, setPitch] = useState<number>(0.52);
const dragging = useRef<{ active: boolean; lastX: number; lastY: number }>({
active: false,
lastX: 0,
lastY: 0,
});
const evalZ = (x: number, y: number): number => {
if (preset === 'paraboloid') return 1.8 - 0.28 * (x * x + y * y);
if (preset === 'saddle') return 0.25 * (x * x - y * y);
return Math.cos(x) * Math.cos(y);
};
const evalDzDx = (x: number, y: number): number => {
if (preset === 'paraboloid') return -0.56 * x;
if (preset === 'saddle') return 0.5 * x;
return -Math.sin(x) * Math.cos(y);
};
const evalDzDy = (x: number, y: number): number => {
if (preset === 'paraboloid') return -0.56 * y;
if (preset === 'saddle') return -0.5 * y;
return -Math.cos(x) * Math.sin(y);
};
const W = 400;
const H = 310;
const project = (p: Point3D): { sx: number; sy: number; depth: number } => {
const cy = Math.cos(yaw);
const sy = Math.sin(yaw);
const cp = Math.cos(pitch);
const sp = Math.sin(pitch);
const x1 = p.x * cy - p.y * sy;
const y1 = p.x * sy + p.y * cy;
const z1 = p.z;
const y2 = y1 * cp - z1 * sp;
const z2 = y1 * sp + z1 * cp;
const scale = 48;
return {
sx: W / 2 + x1 * scale,
sy: H / 2 - z2 * scale + 15,
depth: y2,
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
setPitch((prev) => Math.max(-1.2, Math.min(1.4, prev + dy * 0.01)));
};
const handlePointerUp = () => {
dragging.current.active = false;
};
const range = 2.0;
const steps = 12;
const gridLines: JSX.Element[] = [];
for (let i = 0; i <= steps; i++) {
const u = -range + (2 * range * i) / steps;
const rowPts: string[] = [];
const colPts: string[] = [];
for (let j = 0; j <= steps; j++) {
const v = -range + (2 * range * j) / steps;
const pRow = project({ x: u, y: v, z: evalZ(u, v) });
rowPts.push(`${j === 0 ? 'M' : 'L'} ${pRow.sx.toFixed(1)} ${pRow.sy.toFixed(1)}`);
const pCol = project({ x: v, y: u, z: evalZ(v, u) });
colPts.push(`${j === 0 ? 'M' : 'L'} ${pCol.sx.toFixed(1)} ${pCol.sy.toFixed(1)}`);
}
gridLines.push(
<path key={`r-${i}`} d={rowPts.join(' ')} fill="none" stroke="rgba(15, 92, 138, 0.35)" strokeWidth={1.1} />,
<path key={`c-${i}`} d={colPts.join(' ')} fill="none" stroke="rgba(13, 148, 136, 0.35)" strokeWidth={1.1} />
);
}
const slicePath: string[] = [];
if (sliceMode === 'fix_y' || sliceMode === 'fix_x') {
for (let j = 0; j <= 30; j++) {
const t = -range + (2 * range * j) / 30;
const px = sliceMode === 'fix_y' ? t : sliceVal;
const py = sliceMode === 'fix_y' ? sliceVal : t;
const pr = project({ x: px, y: py, z: evalZ(px, py) });
slicePath.push(`${j === 0 ? 'M' : 'L'} ${pr.sx.toFixed(1)} ${pr.sy.toFixed(1)}`);
}
}
const riemannCols: JSX.Element[] = [];
if (sliceMode === 'riemann3d') {
const nGrid = 5;
const d = (2 * range) / nGrid;
for (let i = 0; i < nGrid; i++) {
for (let j = 0; j < nGrid; j++) {
const cx = -range + (i + 0.5) * d;
const cy = -range + (j + 0.5) * d;
const cz = evalZ(cx, cy);
const top = project({ x: cx, y: cy, z: cz });
const bot = project({ x: cx, y: cy, z: 0 });
riemannCols.push(
<line
key={`col-${i}-${j}`}
x1={bot.sx}
y1={bot.sy}
x2={top.sx}
y2={top.sy}
stroke={cz >= 0 ? 'rgba(13, 148, 136, 0.7)' : 'rgba(185, 28, 28, 0.7)'}
strokeWidth={7}
strokeLinecap="round"
/>
);
}
}
}
const o = project({ x: 0, y: 0, z: 0 });
const axX = project({ x: 2.5, y: 0, z: 0 });
const axY = project({ x: 0, y: 2.5, z: 0 });
const axZ = project({ x: 0, y: 0, z: 2.2 });
const sampleX = sliceMode === 'fix_x' ? sliceVal : 0.8;
const sampleY = sliceMode === 'fix_y' ? sliceVal : 0.8;
const samplePt = project({ x: sampleX, y: sampleY, z: evalZ(sampleX, sampleY) });
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
<button className={`btn btn-sm ${preset === 'paraboloid' ? 'btn-primary' : ''}`} onClick={() => setPreset('paraboloid')}>
山丘拋物面
</button>
<button className={`btn btn-sm ${preset === 'saddle' ? 'btn-primary' : ''}`} onClick={() => setPreset('saddle')}>
馬鞍面
</button>
<button className={`btn btn-sm ${preset === 'wave' ? 'btn-primary' : ''}`} onClick={() => setPreset('wave')}>
波浪曲面
</button>
</div>
<svg
viewBox={`0 0 ${W} ${H}`}
width="100%"
style={{
background: '#fafcff',
border: '1px solid #cbd5e1',
borderRadius: 8,
cursor: 'grab',
touchAction: 'none',
}}
onPointerDown={handlePointerDown}
onPointerMove={handlePointerMove}
onPointerUp={handlePointerUp}
role="img"
aria-label="3D 多變數曲面與偏微分切片互動圖（可拖曳旋轉）"
>
<line x1={o.sx} y1={o.sy} x2={axX.sx} y2={axX.sy} stroke="#64748b" strokeWidth={1.5} />
<text x={axX.sx + 4} y={axX.sy} fontSize={11} fontWeight="bold" fill="#475569">X</text>
<line x1={o.sx} y1={o.sy} x2={axY.sx} y2={axY.sy} stroke="#64748b" strokeWidth={1.5} />
<text x={axY.sx + 4} y={axY.sy} fontSize={11} fontWeight="bold" fill="#475569">Y</text>
<line x1={o.sx} y1={o.sy} x2={axZ.sx} y2={axZ.sy} stroke="#64748b" strokeWidth={1.5} />
<text x={axZ.sx + 4} y={axZ.sy} fontSize={11} fontWeight="bold" fill="#475569">Z</text>
{riemannCols}
{gridLines}
{(sliceMode === 'fix_y' || sliceMode === 'fix_x') && (
<>
<path d={slicePath.join(' ')} fill="none" stroke="#b91c1c" strokeWidth={3} />
<circle cx={samplePt.sx} cy={samplePt.sy} r={5} fill="#b91c1c" stroke="#fff" strokeWidth={1.5} />
</>
)}
</svg>
<div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem', textAlign: 'center' }}>
用滑鼠或手指在 3D 圖上拖曳即可 360° 旋轉視角
</div>
</div>
<div className="card">
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
<button className={`btn btn-sm ${sliceMode === 'fix_y' ? 'btn-primary' : ''}`} onClick={() => setSliceMode('fix_y')}>
固定 y 切片 (∂z/∂x)
</button>
<button className={`btn btn-sm ${sliceMode === 'fix_x' ? 'btn-primary' : ''}`} onClick={() => setSliceMode('fix_x')}>
固定 x 切片 (∂z/∂y)
</button>
<button className={`btn btn-sm ${sliceMode === 'riemann3d' ? 'btn-primary' : ''}`} onClick={() => setSliceMode('riemann3d')}>
3D 二重積分柱體
</button>
</div>
{(sliceMode === 'fix_y' || sliceMode === 'fix_x') && (
<div className="slider-row">
<label>
<span>{sliceMode === 'fix_y' ? '固定 y₀ 位置' : '固定 x₀ 位置'}</span>
<span>{sliceVal.toFixed(2)}</span>
</label>
<input type="range" min={-1.6} max={1.6} step={0.1} value={sliceVal} onChange={(e) => setSliceVal(Number(e.target.value))} />
</div>
)}
<div style={{ fontSize: '0.88rem' }}>
{sliceMode === 'fix_y' && (
<p>
<MathText text={`想像拿菜刀沿 $y = ${sliceVal.toFixed(1)}$ 把山切開，紅線就是切面形狀！在 $(0.8, ${sliceVal.toFixed(1)})$ 的坡度 $\\frac{\\partial z}{\\partial x} = ${evalDzDx(0.8, sliceVal).toFixed(3)}$。`} />
</p>
)}
{sliceMode === 'fix_x' && (
<p>
<MathText text={`想像拿菜刀沿 $x = ${sliceVal.toFixed(1)}$ 把山切開，紅線就是切面形狀！在 $(${sliceVal.toFixed(1)}, 0.8)$ 的坡度 $\\frac{\\partial z}{\\partial y} = ${evalDzDy(sliceVal, 0.8).toFixed(3)}$。`} />
</p>
)}
{sliceMode === 'riemann3d' && (
<p>
每根彩色直柱代表一小塊底面積 $\Delta x \Delta y$ 乘以高度 $f(x,y)$ 的小長方體體積，全部加起來就是二重積分！
</p>
)}
</div>
<button className="btn btn-sm" onClick={() => { setYaw(0.65); setPitch(0.52); setSliceVal(0.5); }}>
重設 3D 視角
</button>
</div>
</div>
);
};
