import React, { useState } from 'react';
import { MathText } from '../components/MathText';
type DistType = 'binomial' | 'poisson' | 'exponential' | 'normal';
function fact(k: number): number {
let res = 1;
for (let i = 2; i <= k; i++) res *= i;
return res;
}
function nCk(n: number, k: number): number {
if (k < 0 || k > n) return 0;
return fact(n) / (fact(k) * fact(n - k));
}
export const DistributionLab: React.FC = () => {
const [dist, setDist] = useState<DistType>('binomial');
const [n, setN] = useState<number>(10);
const [p, setP] = useState<number>(0.4);
const [lambda, setLambda] = useState<number>(3.0);
const [mu, setMu] = useState<number>(0);
const [sigma, setSigma] = useState<number>(1.0);
const [upperB, setUpperB] = useState<number>(1.0);
const W = 380;
const H = 240;
let mean = 0;
let variance = 0;
let probText = '';
const bars: { k: number; val: number }[] = [];
if (dist === 'binomial') {
mean = n * p;
variance = n * p * (1 - p);
for (let k = 0; k <= n; k++) {
bars.push({ k, val: nCk(n, k) * p ** k * (1 - p) ** (n - k) });
}
probText = `總機率檢查：$\\sum_{k=0}^{${n}} P(X=k) = ${bars.reduce((s, b) => s + b.val, 0).toFixed(4)}$`;
} else if (dist === 'poisson') {
mean = lambda;
variance = lambda;
const maxK = Math.max(12, Math.ceil(lambda + 4 * Math.sqrt(lambda)));
for (let k = 0; k <= maxK; k++) {
bars.push({ k, val: (Math.exp(-lambda) * lambda ** k) / fact(k) });
}
probText = `前 ${maxK + 1} 項累積機率：$${bars.reduce((s, b) => s + b.val, 0).toFixed(4)}$`;
} else if (dist === 'exponential') {
mean = 1 / lambda;
variance = 1 / (lambda * lambda);
const cdf = upperB >= 0 ? 1 - Math.exp(-lambda * upperB) : 0;
probText = `累積機率 $P(0 \\le X \\le ${upperB.toFixed(1)}) = 1 - e^{-${lambda.toFixed(1)}\\cdot ${upperB.toFixed(1)}} = ${cdf.toFixed(4)}$`;
} else {
mean = mu;
variance = sigma * sigma;
const start = mu - 5 * sigma;
const end = Math.max(start, upperB);
const steps = 200;
const dx = (end - start) / steps;
let area = 0;
for (let i = 0; i < steps; i++) {
const x = start + (i + 0.5) * dx;
const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
area += pdf * dx;
}
probText = `累積面積 $P(X \\le ${upperB.toFixed(1)}) \\approx ${Math.min(1, area).toFixed(4)}$`;
}
const renderContinuous = () => {
const xMin = dist === 'exponential' ? 0 : mu - 4 * sigma;
const xMax = dist === 'exponential' ? Math.max(4, 4 / lambda) : mu + 4 * sigma;
const evalPdf = (x: number) => {
if (dist === 'exponential') return x >= 0 ? lambda * Math.exp(-lambda * x) : 0;
return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
};
const yMax = dist === 'exponential' ? lambda * 1.15 : (1 / (sigma * Math.sqrt(2 * Math.PI))) * 1.2;
const toSvgX = (x: number) => 25 + ((x - xMin) / (xMax - xMin)) * (W - 40);
const toSvgY = (y: number) => H - 25 - (y / yMax) * (H - 40);
const curvePts: string[] = [];
const areaPts: string[] = [`M ${toSvgX(xMin).toFixed(1)} ${toSvgY(0).toFixed(1)}`];
for (let i = 0; i <= 120; i++) {
const x = xMin + ((xMax - xMin) * i) / 120;
const y = evalPdf(x);
curvePts.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(x).toFixed(1)} ${toSvgY(y).toFixed(1)}`);
if (x <= upperB) {
areaPts.push(`L ${toSvgX(x).toFixed(1)} ${toSvgY(y).toFixed(1)}`);
}
}
const clampedB = Math.max(xMin, Math.min(xMax, upperB));
areaPts.push(`L ${toSvgX(clampedB).toFixed(1)} ${toSvgY(0).toFixed(1)} Z`);
return (
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="連續機率密度函數互動圖">
<line x1={20} y1={toSvgY(0)} x2={W - 10} y2={toSvgY(0)} stroke="#94a3b8" strokeWidth={1.2} />
<path d={areaPts.join(' ')} fill="rgba(13, 148, 136, 0.28)" />
<path d={curvePts.join(' ')} fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
<line x1={toSvgX(mean)} y1={15} x2={toSvgX(mean)} y2={toSvgY(0)} stroke="#b91c1c" strokeDasharray="4 3" strokeWidth={1.4} />
</svg>
);
};
const renderDiscrete = () => {
const maxY = Math.max(...bars.map((b) => b.val), 0.1) * 1.15;
const bw = (W - 50) / bars.length;
return (
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="離散機率質量函數長條圖">
<line x1={25} y1={H - 25} x2={W - 10} y2={H - 25} stroke="#94a3b8" strokeWidth={1.2} />
{bars.map((b, idx) => {
const bh = (b.val / maxY) * (H - 45);
const bx = 30 + idx * bw;
const by = H - 25 - bh;
return (
<g key={b.k}>
<rect x={bx + 1} y={by} width={Math.max(4, bw - 3)} height={bh} fill="#0f5c8a" rx={2} />
{bars.length <= 16 && (
<text x={bx + bw / 2} y={H - 10} fontSize={10} textAnchor="middle" fill="#475569">
{b.k}
</text>
)}
</g>
);
})}
</svg>
);
};
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
<button className={`btn btn-sm ${dist === 'binomial' ? 'btn-primary' : ''}`} onClick={() => setDist('binomial')}>
二項 Binomial(n, p)
</button>
<button className={`btn btn-sm ${dist === 'poisson' ? 'btn-primary' : ''}`} onClick={() => { setDist('poisson'); setLambda(3); }}>
布瓦松 Poisson(λ)
</button>
<button className={`btn btn-sm ${dist === 'exponential' ? 'btn-primary' : ''}`} onClick={() => { setDist('exponential'); setLambda(1.0); setUpperB(1.5); }}>
指數 Exponential(λ)
</button>
<button className={`btn btn-sm ${dist === 'normal' ? 'btn-primary' : ''}`} onClick={() => { setDist('normal'); setMu(0); setSigma(1); setUpperB(1); }}>
常態 Normal(μ, σ)
</button>
</div>
{dist === 'binomial' || dist === 'poisson' ? renderDiscrete() : renderContinuous()}
</div>
<div className="card">
{dist === 'binomial' && (
<>
<div className="slider-row">
<label><span>試驗次數 n</span><span>n = {n}</span></label>
<input type="range" min={2} max={20} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>成功機率 p</span><span>p = {p.toFixed(2)}</span></label>
<input type="range" min={0.05} max={0.95} step={0.05} value={p} onChange={(e) => setP(Number(e.target.value))} />
</div>
</>
)}
{(dist === 'poisson' || dist === 'exponential') && (
<div className="slider-row">
<label><span>速率／平均參數 λ</span><span>λ = {lambda.toFixed(1)}</span></label>
<input type="range" min={0.5} max={dist === 'poisson' ? 10 : 3} step={0.5} value={lambda} onChange={(e) => setLambda(Number(e.target.value))} />
</div>
)}
{dist === 'normal' && (
<>
<div className="slider-row">
<label><span>平均數 μ</span><span>μ = {mu.toFixed(1)}</span></label>
<input type="range" min={-3} max={3} step={0.5} value={mu} onChange={(e) => setMu(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>標準差 σ</span><span>σ = {sigma.toFixed(1)}</span></label>
<input type="range" min={0.5} max={2.5} step={0.1} value={sigma} onChange={(e) => setSigma(Number(e.target.value))} />
</div>
</>
)}
{(dist === 'exponential' || dist === 'normal') && (
<div className="slider-row">
<label><span>累積機率上限 b</span><span>b = {upperB.toFixed(1)}</span></label>
<input type="range" min={dist === 'exponential' ? 0 : -4} max={4} step={0.2} value={upperB} onChange={(e) => setUpperB(Number(e.target.value))} />
</div>
)}
<div style={{ fontSize: '0.9rem' }}>
<p><MathText text={`期望值 $E[X] = ${mean.toFixed(3)}$`} /></p>
<p><MathText text={`變異數 $\\text{Var}(X) = ${variance.toFixed(3)}$`} /></p>
<p style={{ color: '#0f5c8a', fontWeight: 600 }}><MathText text={probText} /></p>
</div>
</div>
</div>
);
};
