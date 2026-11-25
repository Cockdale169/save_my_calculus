import React, { useState } from 'react';
import { MathText } from '../components/MathText';
export const LogisticEulerLab: React.FC = () => {
const [r, setR] = useState<number>(0.8);
const [K, setK] = useState<number>(100);
const [N0, setN0] = useState<number>(10);
const [dt, setDt] = useState<number>(0.5);
const tMax = 12;
const W = 380;
const H = 250;
const yMax = Math.max(K * 1.25, N0 * 1.2);
const toSvgX = (t: number) => (t / tMax) * (W - 30) + 20;
const toSvgY = (n: number) => H - 20 - (Math.max(0, Math.min(yMax, n)) / yMax) * (H - 35);
const exactPoints: string[] = [];
for (let i = 0; i <= 120; i++) {
const t = (tMax * i) / 120;
const exactN = (K * N0) / (N0 + (K - N0) * Math.exp(-r * t));
exactPoints.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(t).toFixed(1)} ${toSvgY(exactN).toFixed(1)}`);
}
const eulerPts: { t: number; n: number }[] = [{ t: 0, n: N0 }];
let currT = 0;
let currN = N0;
while (currT < tMax - 1e-9 && eulerPts.length < 200) {
const step = Math.min(dt, tMax - currT);
const slope = r * currN * (1 - currN / K);
currN = currN + step * slope;
currT = currT + step;
eulerPts.push({ t: currT, n: currN });
}
const eulerPath = eulerPts
.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(pt.t).toFixed(1)} ${toSvgY(pt.n).toFixed(1)}`)
.join(' ');
const lastExact = (K * N0) / (N0 + (K - N0) * Math.exp(-r * tMax));
const lastEuler = eulerPts[eulerPts.length - 1].n;
const isUnstable = r * dt >= 2;
return (
<div className="lab-grid">
<div className="card">
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="羅吉斯成長與歐拉法數值逼近圖">
<line x1={20} y1={H - 20} x2={W - 5} y2={H - 20} stroke="#94a3b8" strokeWidth={1.2} />
<line x1={20} y1={10} x2={20} y2={H - 20} stroke="#94a3b8" strokeWidth={1.2} />
<line x1={20} y1={toSvgY(K)} x2={W - 10} y2={toSvgY(K)} stroke="#0d9488" strokeDasharray="5 4" strokeWidth={1.5} />
<text x={26} y={toSvgY(K) - 5} fontSize={11} fill="#0d9488" fontWeight="bold">K = {K}</text>
<path d={exactPoints.join(' ')} fill="none" stroke="#0f5c8a" strokeWidth={2.5} />
<path d={eulerPath} fill="none" stroke="#b91c1c" strokeWidth={2} strokeDasharray="4 2" />
{eulerPts.map((pt, i) => (
<circle key={i} cx={toSvgX(pt.t)} cy={toSvgY(pt.n)} r={3} fill="#b91c1c" />
))}
</svg>
<div style={{ display: 'flex', gap: '1rem', fontSize: '0.84rem', marginTop: '0.5rem' }}>
<span><strong style={{ color: '#0f5c8a' }}>━━</strong> 解析解 N(t)</span>
<span><strong style={{ color: '#b91c1c' }}>●--●</strong> Euler 近似值</span>
<span><strong style={{ color: '#0d9488' }}>---</strong> 平衡點 K</span>
</div>
</div>
<div className="card">
<div className="slider-row">
<label><span>內在成長率 r</span><span>{r.toFixed(2)}</span></label>
<input type="range" min={0.1} max={1.5} step={0.1} value={r} onChange={(e) => setR(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>環境承載量 K</span><span>{K}</span></label>
<input type="range" min={50} max={200} step={10} value={K} onChange={(e) => setK(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>初始族群 N₀</span><span>{N0}</span></label>
<input type="range" min={5} max={160} step={5} value={N0} onChange={(e) => setN0(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>Euler 步長 Δt</span><span>{dt.toFixed(2)}</span></label>
<input type="range" min={0.2} max={2.5} step={0.1} value={dt} onChange={(e) => setDt(Number(e.target.value))} />
</div>
<div style={{ fontSize: '0.88rem' }}>
<p><MathText text={`$t = ${tMax}$ 時解析解：$${lastExact.toFixed(2)}$；Euler 近似：$${lastEuler.toFixed(2)}$`} /></p>
{isUnstable && (
<div className="callout danger">
警告：目前 r·Δt = {(r * dt).toFixed(2)} ≥ 2，Euler 步長過大導致數值震盪或失真！請縮小 Δt。
</div>
)}
</div>
<button className="btn btn-sm" onClick={() => { setR(0.8); setK(100); setN0(10); setDt(0.5); }}>重設預設參數</button>
</div>
</div>
);
};
