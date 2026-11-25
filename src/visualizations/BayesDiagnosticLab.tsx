import React, { useState } from 'react';
import { MathText } from '../components/MathText';
export const BayesDiagnosticLab: React.FC = () => {
const [prevalencePct, setPrevalencePct] = useState<number>(2);
const [sensitivityPct, setSensitivityPct] = useState<number>(95);
const [specificityPct, setSpecificityPct] = useState<number>(90);
const pD = prevalencePct / 100;
const sens = sensitivityPct / 100;
const spec = specificityPct / 100;
const pPosGivenD = sens;
const pPosGivenNoD = 1 - spec;
const pPos = pD * pPosGivenD + (1 - pD) * pPosGivenNoD;
const ppv = pPos > 0 ? (pD * pPosGivenD) / pPos : 0;
const total = 1000;
const sick = total * pD;
const healthy = total * (1 - pD);
const tp = sick * sens;
const fn = sick * (1 - sens);
const fp = healthy * (1 - spec);
const tn = healthy * spec;
return (
<div className="lab-grid">
<div className="card">
<h4 style={{ marginTop: 0 }}>假設篩檢 1,000 人之分流結果</h4>
<div className="table-scroll">
<table>
<thead>
<tr>
<th>實際狀況 \ 檢驗結果</th>
<th>陽性 (+)</th>
<th>陰性 (-)</th>
<th>小計</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>有患病 (D)</strong></td>
<td style={{ background: 'var(--ok-soft)', color: 'var(--ok)', fontWeight: 700 }}>真陽性 TP = {tp.toFixed(1)}</td>
<td>偽陰性 FN = {fn.toFixed(1)}</td>
<td>{sick.toFixed(1)}</td>
</tr>
<tr>
<td><strong>無患病 (¬D)</strong></td>
<td style={{ background: 'var(--danger-soft)', color: 'var(--danger)', fontWeight: 700 }}>偽陽性 FP = {fp.toFixed(1)}</td>
<td>真陰性 TN = {tn.toFixed(1)}</td>
<td>{healthy.toFixed(1)}</td>
</tr>
<tr>
<td><strong>合計</strong></td>
<td><strong>{(tp + fp).toFixed(1)}</strong></td>
<td>{(fn + tn).toFixed(1)}</td>
<td>1000</td>
</tr>
</tbody>
</table>
</div>
<div className="callout ok" style={{ marginTop: '0.9rem' }}>
<MathText
text={`陽性預測值 $P(D \\mid +) = \\frac{TP}{TP + FP} = \\frac{${tp.toFixed(1)}}{${(tp + fp).toFixed(1)}} = ${(ppv * 100).toFixed(1)}\\%$`}
/>
</div>
</div>
<div className="card">
<div className="slider-row">
<label><span>疾病盛行率 P(D)</span><span>{prevalencePct}%</span></label>
<input type="range" min={0.5} max={50} step={0.5} value={prevalencePct} onChange={(e) => setPrevalencePct(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>敏感度 P(+ | D)</span><span>{sensitivityPct}%</span></label>
<input type="range" min={50} max={99.5} step={0.5} value={sensitivityPct} onChange={(e) => setSensitivityPct(Number(e.target.value))} />
</div>
<div className="slider-row">
<label><span>特異度 P(- | ¬D)</span><span>{specificityPct}%</span></label>
<input type="range" min={50} max={99.5} step={0.5} value={specificityPct} onChange={(e) => setSpecificityPct(Number(e.target.value))} />
</div>
<p style={{ fontSize: '0.88rem', color: '#475569' }}>
觀察：當盛行率很低（如 2%）時，即使敏感度 95%、特異度 90%，大部分陽性結果仍是偽陽性（PPV 僅 {(ppv * 100).toFixed(1)}%）。
</p>
<button className="btn btn-sm" onClick={() => { setPrevalencePct(2); setSensitivityPct(95); setSpecificityPct(90); }}>
重設預設參數
</button>
</div>
</div>
);
};
