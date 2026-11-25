import React, { useState } from 'react';
import glossaryData from '../../curriculum/glossary.json';
import { MathText } from '../components/MathText';
const SYMBOL_TRANSLATIONS = [
{ latex: '$\\lim_{x \\to a} f(x) = L$', reading: '當 $x$ 非常靠近 $a$（但不等於 $a$）時，$f(x)$ 的趨勢逼近 $L$' },
{ latex: "$f'(x)$ 或 $\\frac{dy}{dx}$", reading: '$y$ 對 $x$ 的瞬時變化率（在該點的切線斜率）' },
{ latex: '$\\frac{d^2y}{dx^2}$', reading: '斜率的變化率（決定圖形凹向上或凹向下）' },
{ latex: '$\\int f(x)\\,dx$', reading: '反導數（找出微分後會得到 $f(x)$ 的所有函數）' },
{ latex: '$\\int_a^b f(x)\\,dx$', reading: '從 $a$ 到 $b$ 之間，曲線下的淨累積面積' },
{ latex: '$\\sum_{i=1}^{n} a_i$', reading: '把 $a_1 + a_2 + \\dots + a_n$ 全部加起來' },
{ latex: '$P(A \\mid B)$', reading: '在「已知 $B$ 已經發生」的條件下，$A$ 發生的機率' },
{ latex: '$\\implies$', reading: '可以推導出（代表「因此一定會得到」）' },
{ latex: '$x \\in (a, b)$', reading: '$x$ 落在開區間 $a < x < b$ 裡面（不包含端點 $a, b$）' },
];
export const GlossaryPage: React.FC = () => {
const [query, setQuery] = useState('');
const filtered = glossaryData.filter(
(item) =>
item.zh.toLowerCase().includes(query.toLowerCase()) ||
item.en.toLowerCase().includes(query.toLowerCase())
);
return (
<div>
<div className="card">
<h1 style={{ marginTop: 0 }}>數學符號白話翻譯 &amp; 中英文術語表</h1>
<p style={{ color: 'var(--text-muted)' }}>
看到數學符號腦袋一片空白？先看懂符號在講什麼白話，再對照中英文課程術語。
</p>
<input
type="search"
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder="搜尋中文或英文術語（例如：連鎖律、Bayes、cdf）..."
style={{
width: '100%',
maxWidth: 460,
padding: '0.5rem 0.75rem',
borderRadius: 8,
border: '1px solid var(--border)',
fontSize: '0.95rem',
}}
/>
</div>
<div className="card table-scroll">
<h2 style={{ marginTop: 0 }}>常見數學符號白話讀法</h2>
<table>
<thead>
<tr>
<th style={{ width: 220 }}>數學符號</th>
<th>人類白話翻譯</th>
</tr>
</thead>
<tbody>
{SYMBOL_TRANSLATIONS.map((row, idx) => (
<tr key={idx}>
<td><MathText text={row.latex} /></td>
<td><MathText text={row.reading} /></td>
</tr>
))}
</tbody>
</table>
</div>
<div className="card table-scroll">
<h2 style={{ marginTop: 0 }}>課程中英文術語對照</h2>
<table>
<thead>
<tr>
<th>繁體中文術語</th>
<th>英文術語</th>
</tr>
</thead>
<tbody>
{filtered.map((item) => (
<tr key={item.en}>
<td><strong>{item.zh}</strong></td>
<td>{item.en}</td>
</tr>
))}
</tbody>
</table>
{filtered.length === 0 && <p style={{ color: 'var(--text-muted)' }}>沒有符合「{query}」的術語。</p>}
</div>
</div>
);
};
