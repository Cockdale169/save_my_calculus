import React from 'react';
import { JuniorGuide } from '../types/curriculum';
import { MathText } from './MathText';
const VisualDiagramSvg: React.FC<{ type: JuniorGuide['visualType'] }> = ({ type }) => {
if (type === 'chain') {
return (
<svg viewBox="0 0 360 110" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0.5rem auto' }} role="img" aria-label="連鎖律齒輪傳動示意圖">
<rect x={10} y={30} width={75} height={46} rx={8} fill="#e0f2fe" stroke="#0f5c8a" strokeWidth={1.5} />
<text x={47} y={50} fontSize={11} textAnchor="middle" fontWeight="bold" fill="#0f5c8a">輸入 x</text>
<text x={47} y={66} fontSize={10} textAnchor="middle" fill="#475569">動 1 格</text>
<line x1={88} y1={53} x2={128} y2={53} stroke="#0f5c8a" strokeWidth={2} />
<text x={108} y={44} fontSize={10} textAnchor="middle" fill="#b91c1c" fontWeight="bold">× g&apos;(x)</text>
<rect x={132} y={30} width={88} height={46} rx={8} fill="#fef3c7" stroke="#b45309" strokeWidth={1.5} />
<text x={176} y={50} fontSize={11} textAnchor="middle" fontWeight="bold" fill="#92400e">內層 u = g(x)</text>
<text x={176} y={66} fontSize={10} textAnchor="middle" fill="#475569">跟著放大</text>
<line x1={224} y1={53} x2={264} y2={53} stroke="#0f5c8a" strokeWidth={2} />
<text x={244} y={44} fontSize={10} textAnchor="middle" fill="#b91c1c" fontWeight="bold">× f&apos;(u)</text>
<rect x={268} y={30} width={82} height={46} rx={8} fill="#dcfce7" stroke="#15803d" strokeWidth={1.5} />
<text x={309} y={50} fontSize={11} textAnchor="middle" fontWeight="bold" fill="#166534">輸出 y = f(u)</text>
<text x={309} y={66} fontSize={10} textAnchor="middle" fill="#475569">總倍率相乘</text>
</svg>
);
}
if (type === 'slope') {
return (
<svg viewBox="0 0 360 115" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0.5rem auto' }} role="img" aria-label="坡度與切線示意圖">
<line x1={20} y1={95} x2={340} y2={95} stroke="#94a3b8" strokeWidth={1.2} />
<path d="M 35 88 Q 160 85 290 20" fill="none" stroke="#0f5c8a" strokeWidth={2.5} />
<line x1={120} y1={90} x2={275} y2={15} stroke="#b91c1c" strokeWidth={1.8} strokeDasharray="4 3" />
<circle cx={195} cy={54} r={4.5} fill="#b91c1c" />
<text x={202} y={70} fontSize={11} fill="#b91c1c" fontWeight="bold">這一瞬間的坡度 = 切線斜率</text>
</svg>
);
}
if (type === 'area') {
return (
<svg viewBox="0 0 360 115" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0.5rem auto' }} role="img" aria-label="切長條加總面積示意圖">
<line x1={20} y1={95} x2={340} y2={95} stroke="#94a3b8" strokeWidth={1.2} />
{[0, 1, 2, 3, 4, 5].map((i) => (
<rect key={i} x={55 + i * 38} y={80 - i * 9} width={35} height={15 + i * 9} fill="rgba(13, 148, 136, 0.28)" stroke="#0d9488" />
))}
<path d="M 45 85 Q 170 70 295 25" fill="none" stroke="#0f5c8a" strokeWidth={2.4} />
<text x={180} y={18} fontSize={11} textAnchor="middle" fill="#0f5c8a" fontWeight="bold">切越多條直條，總面積就越準！</text>
</svg>
);
}
if (type === 'prob') {
return (
<svg viewBox="0 0 360 110" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0.5rem auto' }} role="img" aria-label="機率分流樹狀示意圖">
<circle cx={35} cy={55} r={6} fill="#0f5c8a" />
<line x1={41} y1={55} x2={135} y2={28} stroke="#0f5c8a" strokeWidth={1.8} />
<line x1={41} y1={55} x2={135} y2={82} stroke="#94a3b8" strokeWidth={1.8} />
<rect x={135} y={12} width={95} height={30} rx={6} fill="#fee2e2" stroke="#b91c1c" />
<text x={182} y={31} fontSize={11} textAnchor="middle" fill="#991b1b" fontWeight="bold">有病 P(D)</text>
<rect x={135} y={67} width={95} height={30} rx={6} fill="#e0f2fe" stroke="#0369a1" />
<text x={182} y={86} fontSize={11} textAnchor="middle" fill="#0369a1" fontWeight="bold">沒病 P(Dᶜ)</text>
<line x1={230} y1={27} x2={275} y2={27} stroke="#b91c1c" strokeWidth={1.8} />
<text x={312} y={31} fontSize={11} textAnchor="middle" fill="#15803d" fontWeight="bold">真陽性 TP</text>
<line x1={230} y1={82} x2={275} y2={82} stroke="#94a3b8" strokeWidth={1.8} />
<text x={312} y={86} fontSize={11} textAnchor="middle" fill="#b45309" fontWeight="bold">偽陽性 FP</text>
</svg>
);
}
if (type === 'multivar') {
return (
<svg viewBox="0 0 360 115" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0.5rem auto' }} role="img" aria-label="山丘切面示意圖">
<ellipse cx={180} cy={82} rx={110} ry={22} fill="#e0f2fe" stroke="#0f5c8a" />
<path d="M 70 82 Q 180 5 290 82" fill="rgba(15, 92, 138, 0.16)" stroke="#0f5c8a" strokeWidth={2.2} />
<path d="M 110 85 Q 180 28 250 85" fill="none" stroke="#b91c1c" strokeWidth={2.4} strokeDasharray="4 2" />
<text x={180} y={18} fontSize={11} textAnchor="middle" fill="#b91c1c" fontWeight="bold">切一刀看坡度 = 偏微分（3D 實驗室可旋轉！）</text>
</svg>
);
}
if (type === 'ode') {
return (
<svg viewBox="0 0 360 115" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0.5rem auto' }} role="img" aria-label="S型成長上限與平衡示意圖">
<line x1={25} y1={24} x2={335} y2={24} stroke="#0d9488" strokeDasharray="5 3" strokeWidth={1.6} />
<text x={295} y={18} fontSize={10} fill="#0d9488" fontWeight="bold">上限 K</text>
<path d="M 30 95 C 120 95, 160 28, 325 26" fill="none" stroke="#0f5c8a" strokeWidth={2.5} />
<text x={150} y={76} fontSize={11} fill="#0f5c8a" fontWeight="bold">空間夠就衝，快滿就煞車停在 K</text>
</svg>
);
}
if (type === 'trig') {
return (
<svg viewBox="0 0 360 115" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0.5rem auto' }} role="img" aria-label="單位圓座標示意圖">
<circle cx={110} cy={58} r={42} fill="#f0f9ff" stroke="#0f5c8a" strokeWidth={2} />
<line x1={110} y1={58} x2={140} y2={28} stroke="#1e293b" strokeWidth={2} />
<line x1={110} y1={58} x2={140} y2={58} stroke="#0d9488" strokeWidth={3} />
<line x1={140} y1={58} x2={140} y2={28} stroke="#b91c1c" strokeWidth={3} />
<text x={240} y={45} fontSize={11} fill="#0d9488" fontWeight="bold">橫的距離 = cos θ</text>
<text x={240} y={70} fontSize={11} fill="#b91c1c" fontWeight="bold">直的高度 = sin θ</text>
</svg>
);
}
return (
<svg viewBox="0 0 360 100" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0.5rem auto' }} role="img" aria-label="代數拆解示意圖">
<rect x={25} y={28} width={115} height={42} rx={8} fill="#fef3c7" stroke="#b45309" />
<text x={82} y={54} fontSize={12} textAnchor="middle" fontWeight="bold" fill="#92400e">展開式 a² - b²</text>
<text x={175} y={54} fontSize={16} textAnchor="middle" fill="#0f5c8a" fontWeight="bold">⇌</text>
<rect x={210} y={28} width={125} height={42} rx={8} fill="#dcfce7" stroke="#15803d" />
<text x={272} y={54} fontSize={12} textAnchor="middle" fontWeight="bold" fill="#166534">(a - b)(a + b)</text>
</svg>
);
};
export const JuniorVisualGuide: React.FC<{ guide: JuniorGuide }> = ({ guide }) => {
return (
<div className="card" style={{ borderLeft: '4px solid var(--accent)', background: 'var(--tint-teal)' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
<span className="badge badge-app">國一～國三白話圖解導引</span>
<h3 style={{ margin: 0 }}><MathText text={guide.analogyTitle} /></h3>
</div>
<p style={{ marginTop: '0.4rem' }}><MathText text={guide.analogyStory} /></p>
<div className="svg-adaptive" style={{ padding: '0.4rem', margin: '0.5rem auto', maxWidth: 440 }}>
<VisualDiagramSvg type={guide.visualType} />
</div>
{guide.stepByStepDecode.length > 0 && (
<div style={{ marginTop: '0.75rem' }}>
<strong style={{ fontSize: '0.9rem' }}>這章的符號怎麼用白話唸？</strong>
<div className="table-scroll" style={{ marginTop: '0.35rem' }}>
<table>
<thead>
<tr>
<th style={{ width: 170 }}>看到的數學符號</th>
<th>白話翻譯（代表什麼意思）</th>
</tr>
</thead>
<tbody>
{guide.stepByStepDecode.map((item, idx) => (
<tr key={idx}>
<td><MathText text={item.symbol} /></td>
<td><MathText text={item.plainMeaning} /></td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)}
</div>
);
};
