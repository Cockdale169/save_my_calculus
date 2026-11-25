import React, { useState } from 'react';
import { SymbolRule } from '../types/curriculum';
import { MathText } from './MathText';
const UNIVERSAL_GRAMMAR: SymbolRule[] = [
{
symbol: '$f(x)$',
readAs: 'f of x（把 $x$ 丟進機器 $f$）',
grammarRule: '這裡的括號「不是乘法」！$f$ 是機器名稱，$x$ 是你丟進去的材料。',
metaphor: '就像「果汁機(蘋果)＝蘋果汁」，不能把果汁機乘以蘋果。',
avoidConfusion: '別把 $f(x+h)$ 拆成 $f\\cdot x + f\\cdot h$！',
},
{
symbol: '$x_0,\\ t_1$',
readAs: 'x 零、t 一（下標只是標籤編號）',
grammarRule: '寫在右下角的小字不參與加減乘除，它只是「第幾個」或「起點」的名字牌。',
metaphor: '就像「選手 1 號、選手 2 號」，號碼牌不能拿來乘以體重。',
avoidConfusion: '別把 $x_0$ 當成 $x \\times 0$！',
},
{
symbol: '$x^2,\\ f^{-1}(x)$',
readAs: '上標位置要注意：數字代表次方，函數右上角的 $-1$ 代表「倒帶反函數」',
grammarRule: '在數字或 $x$ 右上角的 $2$ 代表自己乘自己兩次；但在函數名字右上角的 $-1$ 代表「反過來算」。',
metaphor: '就像遙控器的「倒帶鍵」，不是「除以 1」。',
avoidConfusion: '$\\sin^{-1}(x)$ 是反三角函數，不是 $\\frac{1}{\\sin x}$！',
},
];
export const SymbolRulesCard: React.FC<{ moduleRules?: SymbolRule[] }> = ({ moduleRules }) => {
const [showUniversal, setShowUniversal] = useState<boolean>(false);
return (
<div className="card" style={{ borderLeft: '4px solid #7c3aed', background: '#faf8ff' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
<span className="badge badge-c2">零基礎符號文法</span>
<h3 style={{ margin: 0 }}>看不懂數學符號？先花 30 秒搞懂寫法規則！</h3>
</div>
<button className="btn btn-sm" onClick={() => setShowUniversal((v) => !v)}>
{showUniversal ? '收合基礎符號文法' : '展開通用基礎文法（括號/上下標）'}
</button>
</div>
{showUniversal && (
<div style={{ marginTop: '0.75rem' }}>
<div className="table-scroll">
<table>
<thead>
<tr>
<th style={{ width: 130 }}>符號長相</th>
<th>怎麼唸 &amp; 文法規則</th>
<th>生活譬喻</th>
<th>小心別搞混</th>
</tr>
</thead>
<tbody>
{UNIVERSAL_GRAMMAR.map((r, i) => (
<tr key={i}>
<td><strong><MathText text={r.symbol} /></strong></td>
<td>
<div><strong><MathText text={r.readAs} /></strong></div>
<div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}><MathText text={r.grammarRule} /></div>
</td>
<td style={{ fontSize: '0.86rem' }}><MathText text={r.metaphor} /></td>
<td style={{ fontSize: '0.86rem', color: 'var(--danger)' }}><MathText text={r.avoidConfusion} /></td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)}
{moduleRules && moduleRules.length > 0 && (
<div style={{ marginTop: '0.75rem' }}>
<strong style={{ fontSize: '0.9rem', color: '#5b21b6' }}>本單元專屬新符號規則：</strong>
<div className="card-grid" style={{ marginTop: '0.45rem' }}>
{moduleRules.map((r, i) => (
<div key={i} style={{ background: '#fff', border: '1px solid #ddd6fe', borderRadius: 8, padding: '0.75rem' }}>
<div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#5b21b6', marginBottom: '0.2rem' }}>
<MathText text={r.symbol} />
</div>
<div style={{ fontSize: '0.86rem', marginBottom: '0.25rem' }}>
<strong>怎麼唸：</strong><MathText text={r.readAs} />
</div>
<div style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
<strong>符號規則：</strong><MathText text={r.grammarRule} />
</div>
<div style={{ fontSize: '0.85rem', marginBottom: '0.25rem', color: '#0f5c8a' }}>
<strong>生活譬喻：</strong><MathText text={r.metaphor} />
</div>
<div style={{ fontSize: '0.83rem', color: 'var(--danger)' }}>
<strong>易混淆：</strong><MathText text={r.avoidConfusion} />
</div>
</div>
))}
</div>
</div>
)}
</div>
);
};
