import React, { useState } from 'react';
import { MathText } from '../components/MathText';
type TrigTab = 'circle6' | 'waves' | 'inverse' | 'trigsub';
type WaveFn = 'sin' | 'cos' | 'tan' | 'sec';
type InvFn = 'arcsin' | 'arccos' | 'arctan';
type SubCase = 'a2_minus_x2' | 'a2_plus_x2' | 'x2_minus_a2';
export const UnitCircleLab: React.FC = () => {
const [tab, setTab] = useState<TrigTab>('circle6');
const [deg, setDeg] = useState<number>(35);
const [waveFn, setWaveFn] = useState<WaveFn>('sin');
const [amp, setAmp] = useState<number>(1.0);
const [freq, setFreq] = useState<number>(1.0);
const [phase, setPhase] = useState<number>(0);
const [invFn, setInvFn] = useState<InvFn>('arcsin');
const [invInput, setInvInput] = useState<number>(0.5);
const [subCase, setSubCase] = useState<SubCase>('a2_minus_x2');
const [subA, setSubA] = useState<number>(3);
const [subDeg, setSubDeg] = useState<number>(37);
const rad = (deg * Math.PI) / 180;
const cosVal = Math.cos(rad);
const sinVal = Math.sin(rad);
const cosZero = Math.abs(cosVal) < 1e-3;
const sinZero = Math.abs(sinVal) < 1e-3;
const cx = 160;
const cy = 160;
const r = 105;
const px = cx + r * cosVal;
const py = cy - r * sinVal;
const presets = [0, 30, 45, 60, 90, 120, 150, 180, 225, 270, 315];
const renderWaveTab = () => {
const W = 380;
const H = 230;
const xMin = -Math.PI;
const xMax = 2 * Math.PI;
const yMin = -2.8;
const yMax = 2.8;
const toX = (x: number) => ((x - xMin) / (xMax - xMin)) * (W - 20) + 10;
const toY = (y: number) => H - 15 - ((y - yMin) / (yMax - yMin)) * (H - 30);
const evalWave = (x: number): number | null => {
const arg = freq * x - phase;
if (waveFn === 'sin') return amp * Math.sin(arg);
if (waveFn === 'cos') return amp * Math.cos(arg);
if (waveFn === 'tan') {
const c = Math.cos(arg);
if (Math.abs(c) < 0.08) return null;
return amp * Math.tan(arg);
}
const c = Math.cos(arg);
if (Math.abs(c) < 0.08) return null;
return amp / c;
};
const segments: string[] = [];
let currentPath = '';
for (let i = 0; i <= 220; i++) {
const x = xMin + ((xMax - xMin) * i) / 220;
const y = evalWave(x);
if (y === null || y < yMin - 0.5 || y > yMax + 0.5) {
if (currentPath) {
segments.push(currentPath);
currentPath = '';
}
continue;
}
currentPath += `${currentPath === '' ? 'M' : 'L'} ${toX(x).toFixed(1)} ${toY(y).toFixed(1)} `;
}
if (currentPath) segments.push(currentPath);
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
{(['sin', 'cos', 'tan', 'sec'] as WaveFn[]).map((fn) => (
<button key={fn} className={`btn btn-sm ${waveFn === fn ? 'btn-primary' : ''}`} onClick={() => setWaveFn(fn)}>
{fn}(x)
</button>
))}
</div>
<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="三角函數波形與參數伸縮圖">
<line x1={10} y1={toY(0)} x2={W - 10} y2={toY(0)} stroke="#94a3b8" strokeWidth={1.2} />
<line x1={toX(0)} y1={10} x2={toX(0)} y2={H - 10} stroke="#94a3b8" strokeWidth={1.2} />
{segments.map((d, i) => (
<path key={i} d={d} fill="none" stroke="#0f5c8a" strokeWidth={2.3} />
))}
</svg>
</div>
<div className="card">
<div className="slider-row">
<label><span>振幅／垂直伸縮 A</span><span>{amp.toFixed(1)}</span></label>
<input type="range" min={0.4} max={2.0} step={0.2} value={amp} onChange={(e) => setAmp(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>頻率（週期縮放）k</span><span>{freq.toFixed(1)}</span></label>
<input type="range" min={0.5} max={2.5} step={0.5} value={freq} onChange={(e) => setFreq(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>水平相位平移 φ</span><span>{phase.toFixed(2)}</span></label>
<input type="range" min={-1.5} max={1.5} step={0.25} value={phase} onChange={(e) => setPhase(Number(e.target.value))} />
</div>
<div className="callout" style={{ fontSize: '0.86rem' }}>
<MathText text={`目前函數：$y = ${amp.toFixed(1)}\\${waveFn}(${freq.toFixed(1)}x ${phase >= 0 ? '-' : '+'} ${Math.abs(phase).toFixed(2)})$`} />
<div style={{ marginTop: '0.3rem' }}>
{waveFn === 'tan' || waveFn === 'sec'
? '觀察：當分母 cos(...) = 0 時圖形斷裂並衝向無窮大（垂直漸近線）！'
: `週期為 2π / k = ${( (2 * Math.PI) / freq ).toFixed(2)}。`}
</div>
</div>
<button className="btn btn-sm" onClick={() => { setAmp(1); setFreq(1); setPhase(0); }}>重設波形</button>
</div>
</div>
);
};
const renderInverseTab = () => {
const clamped = invFn === 'arctan' ? invInput : Math.max(-1, Math.min(1, invInput));
const outRad =
invFn === 'arcsin' ? Math.asin(clamped) : invFn === 'arccos' ? Math.acos(clamped) : Math.atan(clamped);
const outDeg = (outRad * 180) / Math.PI;
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
<button className={`btn btn-sm ${invFn === 'arcsin' ? 'btn-primary' : ''}`} onClick={() => { setInvFn('arcsin'); setInvInput(0.5); }}>
arcsin(x)
</button>
<button className={`btn btn-sm ${invFn === 'arccos' ? 'btn-primary' : ''}`} onClick={() => { setInvFn('arccos'); setInvInput(0.5); }}>
arccos(x)
</button>
<button className={`btn btn-sm ${invFn === 'arctan' ? 'btn-primary' : ''}`} onClick={() => { setInvFn('arctan'); setInvInput(1.0); }}>
arctan(x)
</button>
</div>
<div className="callout" style={{ fontSize: '0.9rem' }}>
<p style={{ marginTop: 0 }}>
<strong>為什麼一定要「剪短原函數」才能有反三角函數？</strong>
</p>
<p style={{ marginBottom: 0 }}>
因為 $\sin x$ 上下無限波浪，一個高度會對應無窮多個角度；所以數學家規定只截取其中「嚴格單調」的一段，讓它變成一對一函數：
</p>
</div>
<div className="table-scroll">
<table>
<thead>
<tr><th>反函數</th><th>可輸入範圍（定義域）</th><th>輸出主值範圍（值域）</th></tr>
</thead>
<tbody>
<tr><td><MathText text="$\arcsin x$" /></td><td><MathText text="$[-1, 1]$" /></td><td><MathText text="$[-\frac{\pi}{2}, \frac{\pi}{2}]$（$-90^\circ \sim 90^\circ$）" /></td></tr>
<tr><td><MathText text="$\arccos x$" /></td><td><MathText text="$[-1, 1]$" /></td><td><MathText text="$[0, \pi]$（$0^\circ \sim 180^\circ$）" /></td></tr>
<tr><td><MathText text="$\arctan x$" /></td><td><MathText text="$(-\infty, \infty)$" /></td><td><MathText text="$(-\frac{\pi}{2}, \frac{\pi}{2})$（水平漸近線 $\pm\frac{\pi}{2}$）" /></td></tr>
</tbody>
</table>
</div>
</div>
<div className="card">
<div className="slider-row">
<label>
<span>輸入數值 x</span>
<span>x = {clamped.toFixed(2)}</span>
</label>
<input
type="range"
min={invFn === 'arctan' ? -3 : -1}
max={invFn === 'arctan' ? 3 : 1}
step={0.05}
value={clamped}
onChange={(e) => setInvInput(Number(e.target.value))}
/>
</div>
<div style={{ fontSize: '0.92rem' }}>
<p><MathText text={`$\\${invFn}(${clamped.toFixed(2)}) = ${outRad.toFixed(4)}\\text{ rad} \\approx ${outDeg.toFixed(1)}^\\circ$`} /></p>
<p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
反過來驗證：將算出的角度代回原本三角函數，剛好等於輸入值 $x$！
</p>
</div>
</div>
</div>
);
};
const renderTrigSubTab = () => {
const thetaRad = (subDeg * Math.PI) / 180;
let hypLabel = '';
let oppLabel = '';
let adjLabel = '';
let subRule = '';
let dxRule = '';
let simpRule = '';
let xNumeric = 0;
if (subCase === 'a2_minus_x2') {
hypLabel = `${subA}`;
oppLabel = 'x';
adjLabel = `√(${subA}² - x²)`;
subRule = `x = ${subA}\\sin\\theta`;
dxRule = `dx = ${subA}\\cos\\theta\\,d\\theta`;
simpRule = `\\sqrt{${subA}^2 - x^2} = ${subA}\\cos\\theta`;
xNumeric = subA * Math.sin(thetaRad);
} else if (subCase === 'a2_plus_x2') {
oppLabel = 'x';
adjLabel = `${subA}`;
hypLabel = `√(${subA}² + x²)`;
subRule = `x = ${subA}\\tan\\theta`;
dxRule = `dx = ${subA}\\sec^2\\theta\\,d\\theta`;
simpRule = `\\sqrt{${subA}^2 + x^2} = ${subA}\\sec\\theta`;
xNumeric = subA * Math.tan(thetaRad);
} else {
hypLabel = 'x';
adjLabel = `${subA}`;
oppLabel = `√(x² - ${subA}²)`;
subRule = `x = ${subA}\\sec\\theta`;
dxRule = `dx = ${subA}\\sec\\theta\\tan\\theta\\,d\\theta`;
simpRule = `\\sqrt{x^2 - ${subA}^2} = ${subA}\\tan\\theta`;
xNumeric = subA / Math.cos(thetaRad);
}
return (
<div className="lab-grid">
<div className="card">
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
<button className={`btn btn-sm ${subCase === 'a2_minus_x2' ? 'btn-primary' : ''}`} onClick={() => setSubCase('a2_minus_x2')}>
√(a² - x²) 型 → sin θ
</button>
<button className={`btn btn-sm ${subCase === 'a2_plus_x2' ? 'btn-primary' : ''}`} onClick={() => setSubCase('a2_plus_x2')}>
√(a² + x²) 型 → tan θ
</button>
<button className={`btn btn-sm ${subCase === 'x2_minus_a2' ? 'btn-primary' : ''}`} onClick={() => setSubCase('x2_minus_a2')}>
√(x² - a²) 型 → sec θ
</button>
</div>
<svg viewBox="0 0 340 220" width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="三角代換直角三角形示意圖">
<polygon points="55,175 265,175 265,55" fill="rgba(15, 92, 138, 0.08)" stroke="#0f5c8a" strokeWidth={2.5} />
<polyline points="248,175 248,158 265,158" fill="none" stroke="#64748b" strokeWidth={1.5} />
<text x={85} y={165} fontSize={13} fontWeight="bold" fill="#b91c1c">θ ({subDeg}°)</text>
<text x={160} y={196} fontSize={12} textAnchor="middle" fontWeight="bold" fill="#0d9488">鄰邊 = {adjLabel}</text>
<text x={273} y={120} fontSize={12} fontWeight="bold" fill="#b91c1c">對邊 = {oppLabel}</text>
<text x={145} y={102} fontSize={12} textAnchor="end" fontWeight="bold" fill="#0f5c8a">斜邊 = {hypLabel}</text>
</svg>
</div>
<div className="card">
<div className="slider-row">
<label><span>常數 a</span><span>a = {subA}</span></label>
<input type="range" min={1} max={5} step={1} value={subA} onChange={(e) => setSubA(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>三角形角度 θ</span><span>{subDeg}°（x ≈ {xNumeric.toFixed(2)}）</span></label>
<input type="range" min={15} max={75} step={1} value={subDeg} onChange={(e) => setSubDeg(Number(e.target.value))} />
</div>
<div className="callout ok" style={{ fontSize: '0.88rem' }}>
<div><strong>1. 設定代換：</strong><MathText text={`$${subRule}$`} /></div>
<div><strong>2. 替換微分：</strong><MathText text={`$${dxRule}$`} /></div>
<div><strong>3. 消去根號：</strong><MathText text={`$${simpRule}$`} /></div>
</div>
<p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: 0 }}>
<strong>為什麼這樣設？</strong>{' '}
<MathText text="因為國三學過畢氏定理！例如斜邊是 $a$、對邊是 $x$，第三邊自動就是 $\\sqrt{a^2-x^2}$，積完分只要看三角形三邊比例就能把 $\\sin\\theta, \\cos\\theta$ 換回 $x$！" />
</p>
</div>
</div>
);
};
return (
<div>
<div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
<button className={`btn btn-sm ${tab === 'circle6' ? 'btn-primary' : ''}`} onClick={() => setTab('circle6')}>
1. 單位圓與六大函數
</button>
<button className={`btn btn-sm ${tab === 'waves' ? 'btn-primary' : ''}`} onClick={() => setTab('waves')}>
2. 波形與伸縮平移
</button>
<button className={`btn btn-sm ${tab === 'inverse' ? 'btn-primary' : ''}`} onClick={() => setTab('inverse')}>
3. 反三角函數主值
</button>
<button className={`btn btn-sm ${tab === 'trigsub' ? 'btn-primary' : ''}`} onClick={() => setTab('trigsub')}>
4. 積分三角代換三角形
</button>
</div>
{tab === 'circle6' && (
<div className="lab-grid">
<div className="card">
<svg viewBox="0 0 320 320" width="100%" style={{ maxWidth: 360, display: 'block', margin: '0 auto' }} role="img" aria-label="單位圓六大三角函數互動圖">
<line x1={20} y1={cy} x2={300} y2={cy} stroke="#94a3b8" strokeWidth={1.2} />
<line x1={cx} y1={20} x2={cx} y2={300} stroke="#94a3b8" strokeWidth={1.2} />
<circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f5c8a" strokeWidth={2} />
<line x1={cx} y1={cy} x2={px} y2={cy} stroke="#0d9488" strokeWidth={3} />
<line x1={px} y1={cy} x2={px} y2={py} stroke="#b91c1c" strokeWidth={3} />
<line x1={cx} y1={cy} x2={px} y2={py} stroke="#1e293b" strokeWidth={2} />
<circle cx={px} cy={py} r={5.5} fill="#0f5c8a" stroke="#fff" strokeWidth={1.5} />
<text
x={px + (cosVal >= 0 ? 8 : -58)}
y={py + (sinVal >= 0 ? -8 : 16)}
fontSize={11}
fontWeight="bold"
fill="#0f5c8a"
>
({cosVal.toFixed(2)}, {sinVal.toFixed(2)})
</text>
</svg>
<div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
{presets.map((p) => (
<button key={p} className={`btn btn-sm ${deg === p ? 'btn-primary' : ''}`} onClick={() => setDeg(p)}>
{p}°
</button>
))}
</div>
</div>
<div className="card">
<div className="slider-row">
<label><span>角度 θ</span><span>{deg}° ＝ {rad.toFixed(3)} rad</span></label>
<input type="range" min={0} max={360} step={1} value={deg} onChange={(e) => setDeg(Number(e.target.value))} />
</div>
<div className="table-scroll" style={{ fontSize: '0.88rem' }}>
<table>
<thead>
<tr><th>函數</th><th>數值</th><th>倒數 / 定義關係</th></tr>
</thead>
<tbody>
<tr><td><strong style={{ color: '#b91c1c' }}>sin θ</strong></td><td>{sinVal.toFixed(3)}</td><td>y 座標</td></tr>
<tr><td><strong style={{ color: '#0d9488' }}>cos θ</strong></td><td>{cosVal.toFixed(3)}</td><td>x 座標</td></tr>
<tr><td><strong>tan θ</strong></td><td>{cosZero ? '未定義' : (sinVal / cosVal).toFixed(3)}</td><td>sin θ / cos θ</td></tr>
<tr><td><strong>csc θ</strong></td><td>{sinZero ? '未定義' : (1 / sinVal).toFixed(3)}</td><td>1 / sin θ</td></tr>
<tr><td><strong>sec θ</strong></td><td>{cosZero ? '未定義' : (1 / cosVal).toFixed(3)}</td><td>1 / cos θ</td></tr>
<tr><td><strong>cot θ</strong></td><td>{sinZero ? '未定義' : (cosVal / sinVal).toFixed(3)}</td><td>cos θ / sin θ</td></tr>
</tbody>
</table>
</div>
<p style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>
<MathText text={`恆等式驗證：$\\sin^2\\theta + \\cos^2\\theta = ${(sinVal ** 2 + cosVal ** 2).toFixed(4)}$`} />
</p>
<button className="btn btn-sm" onClick={() => setDeg(35)}>重設角度 (35°)</button>
</div>
</div>
)}
{tab === 'waves' && renderWaveTab()}
{tab === 'inverse' && renderInverseTab()}
{tab === 'trigsub' && renderTrigSubTab()}
</div>
);
};
