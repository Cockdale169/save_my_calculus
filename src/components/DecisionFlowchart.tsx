import React, { useState } from 'react';
import { DecisionTreeKey } from '../types/curriculum';
const TREE_TITLES: Record<DecisionTreeKey, string> = {
diff: '極限與微分：看到題目怎麼選招？',
integral: '積分與廣義積分：5 秒選對積分法！',
ode: '離散系統 vs 連續 ODE vs 相平面決策樹',
prob: '機率、貝氏與 7 大分布一眼辨識圖',
};
export const DecisionFlowchart: React.FC<{ defaultKey?: DecisionTreeKey }> = ({
defaultKey = 'diff',
}) => {
const [activeKey, setActiveKey] = useState<DecisionTreeKey>(defaultKey);
return (
<div className="card" style={{ borderLeft: '4px solid #0f5c8a' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
<div>
<span className="badge badge-c1">跨章節傻瓜決策流程圖</span>
<h3 style={{ margin: '0.25rem 0 0' }}>{TREE_TITLES[activeKey]}</h3>
</div>
<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
{(Object.keys(TREE_TITLES) as DecisionTreeKey[]).map((k) => (
<button
key={k}
className={`btn btn-sm ${activeKey === k ? 'btn-primary' : ''}`}
onClick={() => setActiveKey(k)}
>
{k === 'diff' ? '極限與微分' : k === 'integral' ? '積分技巧' : k === 'ode' ? '動態系統 ODE' : '機率與分布'}
</button>
))}
</div>
</div>
{activeKey === 'diff' && (
<svg viewBox="0 0 680 250" width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="極限與微分決策流程圖">
<rect x={230} y={10} width={220} height={36} rx={8} fill="#0f5c8a" />
<text x={340} y={32} fontSize={12} fill="#fff" textAnchor="middle" fontWeight="bold">題目問「極限」還是「微分」？</text>
<line x1={280} y1={46} x2={150} y2={76} stroke="#64748b" strokeWidth={1.8} />
<line x1={400} y1={46} x2={520} y2={76} stroke="#64748b" strokeWidth={1.8} />
<rect x={45} y={76} width={210} height={36} rx={8} fill="#e0f2fe" stroke="#0369a1" />
<text x={150} y={98} fontSize={11} fill="#0369a1" textAnchor="middle" fontWeight="bold">極限：先直接代入數字！</text>
<line x1={105} y1={112} x2={75} y2={146} stroke="#64748b" strokeWidth={1.5} />
<line x1={195} y1={112} x2={225} y2={146} stroke="#64748b" strokeWidth={1.5} />
<rect x={12} y={146} width={125} height={46} rx={6} fill="#dcfce7" stroke="#15803d" />
<text x={74} y={166} fontSize={10} fill="#166534" textAnchor="middle" fontWeight="bold">算出確定數字</text>
<text x={74} y={182} fontSize={10} fill="#166534" textAnchor="middle">直接寫答案！</text>
<rect x={150} y={146} width={155} height={46} rx={6} fill="#fef3c7" stroke="#b45309" />
<text x={227} y={166} fontSize={10} fill="#92400e" textAnchor="middle" fontWeight="bold">遇到 0/0 或 ∞/∞</text>
<text x={227} y={182} fontSize={10} fill="#92400e" textAnchor="middle">因式分解約分 或 羅必達</text>
<rect x={410} y={76} width={220} height={36} rx={8} fill="#ede9fe" stroke="#5b21b6" />
<text x={520} y={98} fontSize={11} fill="#5b21b6" textAnchor="middle" fontWeight="bold">微分：看函數有沒有「包起來」？</text>
<line x1={465} y1={112} x2={425} y2={146} stroke="#64748b" strokeWidth={1.5} />
<line x1={575} y1={112} x2={605} y2={146} stroke="#64748b" strokeWidth={1.5} />
<rect x={340} y={146} width={155} height={46} rx={6} fill="#fee2e2" stroke="#b91c1c" />
<text x={417} y={166} fontSize={10} fill="#991b1b" textAnchor="middle" fontWeight="bold">括號/指數內不是純 x</text>
<text x={417} y={182} fontSize={10} fill="#991b1b" textAnchor="middle">連鎖律：外微 × 內微</text>
<rect x={510} y={146} width={155} height={46} rx={6} fill="#e6f7f5" stroke="#0d9488" />
<text x={587} y={166} fontSize={10} fill="#0d9488" textAnchor="middle" fontWeight="bold">x 與 y 混在一起解不開</text>
<text x={587} y={182} fontSize={10} fill="#0d9488" textAnchor="middle">隱微分：對 y 乘 dy/dx</text>
<text x={340} y={226} fontSize={11} fill="#475569" textAnchor="middle">
求極值與凹性：f&apos;(x)=0 找山頂谷底 → f&apos;&apos;(x) 看凹向上(&gt;0)或凹向下(&lt;0)
</text>
</svg>
)}
{activeKey === 'integral' && (
<svg viewBox="0 0 680 250" width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="積分技巧決策流程圖">
<rect x={210} y={10} width={260} height={36} rx={8} fill="#0f5c8a" />
<text x={340} y={32} fontSize={12} fill="#fff" textAnchor="middle" fontWeight="bold">看到積分 ∫ 符號：先檢查上下限！</text>
<line x1={260} y1={46} x2={125} y2={80} stroke="#64748b" strokeWidth={1.6} />
<line x1={340} y1={46} x2={340} y2={80} stroke="#64748b" strokeWidth={1.6} />
<line x1={420} y1={46} x2={555} y2={80} stroke="#64748b" strokeWidth={1.6} />
<rect x={20} y={80} width={200} height={54} rx={8} fill="#fef3c7" stroke="#b45309" />
<text x={120} y={100} fontSize={11} fill="#92400e" textAnchor="middle" fontWeight="bold">上下限有 ∞ 或分母=0</text>
<text x={120} y={118} fontSize={10} fill="#92400e" textAnchor="middle">先換成參數 b 再取 lim</text>
<text x={120} y={130} fontSize={10} fill="#92400e" textAnchor="middle">（廣義積分）</text>
<rect x={240} y={80} width={200} height={54} rx={8} fill="#dcfce7" stroke="#15803d" />
<text x={340} y={100} fontSize={11} fill="#166534" textAnchor="middle" fontWeight="bold">內層旁邊剛好有它的導數</text>
<text x={340} y={118} fontSize={10} fill="#166534" textAnchor="middle">令 u = 內層（u-sub）</text>
<text x={340} y={130} fontSize={10} fill="#166534" textAnchor="middle">定積分記得換上下限！</text>
<rect x={460} y={80} width={200} height={54} rx={8} fill="#e0f2fe" stroke="#0369a1" />
<text x={560} y={100} fontSize={11} fill="#0369a1" textAnchor="middle" fontWeight="bold">兩不同函數相乘 (如 xeˣ)</text>
<text x={560} y={118} fontSize={10} fill="#0369a1" textAnchor="middle">分部積分 ∫u dv = uv - ∫v du</text>
<text x={560} y={130} fontSize={10} fill="#0369a1" textAnchor="middle">（u 優先選 ln x 或 xⁿ）</text>
<rect x={140} y={160} width={400} height={50} rx={8} fill="#ede9fe" stroke="#5b21b6" />
<text x={340} y={182} fontSize={11} fill="#5b21b6" textAnchor="middle" fontWeight="bold">分母可因式分解（如 1/[x(x+1)]）→ 部分分式拆成 A/x + B/(x+1)</text>
<text x={340} y={200} fontSize={10} fill="#5b21b6" textAnchor="middle">算完不定積分後：反向微分檢查是不是等於原式！</text>
</svg>
)}
{activeKey === 'ode' && (
<svg viewBox="0 0 680 250" width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="動態系統與ODE決策流程圖">
<rect x={210} y={10} width={260} height={36} rx={8} fill="#0f5c8a" />
<text x={340} y={32} fontSize={12} fill="#fff" textAnchor="middle" fontWeight="bold">動態系統：時間是一步步跳還是連續流？</text>
<line x1={260} y1={46} x2={155} y2={82} stroke="#64748b" strokeWidth={1.8} />
<line x1={420} y1={46} x2={505} y2={82} stroke="#64748b" strokeWidth={1.8} />
<rect x={30} y={82} width={250} height={115} rx={8} fill="#fef3c7" stroke="#b45309" />
<text x={155} y={105} fontSize={12} fill="#92400e" textAnchor="middle" fontWeight="bold">離散系統：xₙ₊₁ = f(xₙ)</text>
<text x={155} y={128} fontSize={10} fill="#92400e" textAnchor="middle">1. 平衡點解 x* = f(x*)（跟 y=x 交點）</text>
<text x={155} y={148} fontSize={10} fill="#92400e" textAnchor="middle">2. 用蛛網圖：垂直找曲線、水平找 y=x</text>
<text x={155} y={168} fontSize={10} fill="#b91c1c" textAnchor="middle" fontWeight="bold">切勿令 f(x*) = 0！</text>
<rect x={320} y={82} width={335} height={115} rx={8} fill="#e6f7f5" stroke="#0d9488" />
<text x={487} y={105} fontSize={12} fill="#0d9488" textAnchor="middle" fontWeight="bold">連續 ODE：dN/dt = f(N)</text>
<text x={487} y={128} fontSize={10} fill="#0f5c8a" textAnchor="middle">1. 平衡點令 dN/dt = 0（如羅吉斯 N*=0, K）</text>
<text x={487} y={148} fontSize={10} fill="#0f5c8a" textAnchor="middle">2. 算近似值用歐拉法：Nₙ₊₁ = Nₙ + Δt · f(Nₙ)</text>
<text x={487} y={168} fontSize={10} fill="#5b21b6" textAnchor="middle" fontWeight="bold">3. 兩個物種 (x,y) → 畫零傾線看相平面交點與箭頭</text>
</svg>
)}
{activeKey === 'prob' && (
<svg viewBox="0 0 680 250" width="100%" style={{ background: '#fafcff', border: '1px solid #e2e8f0', borderRadius: 8 }} role="img" aria-label="機率與分布辨識流程圖">
<rect x={210} y={10} width={260} height={36} rx={8} fill="#0f5c8a" />
<text x={340} y={32} fontSize={12} fill="#fff" textAnchor="middle" fontWeight="bold">機率題：先看問「推論」還是「分布」？</text>
<line x1={260} y1={46} x2={120} y2={82} stroke="#64748b" strokeWidth={1.6} />
<line x1={340} y1={46} x2={340} y2={82} stroke="#64748b" strokeWidth={1.6} />
<line x1={420} y1={46} x2={560} y2={82} stroke="#64748b" strokeWidth={1.6} />
<rect x={18} y={82} width={200} height={115} rx={8} fill="#fee2e2" stroke="#b91c1c" />
<text x={118} y={104} fontSize={11} fill="#991b1b" textAnchor="middle" fontWeight="bold">條件機率 &amp; 貝氏定理</text>
<text x={118} y={126} fontSize={10} fill="#991b1b" textAnchor="middle">看到「已知陽性，問真有病」</text>
<text x={118} y={146} fontSize={10} fill="#991b1b" textAnchor="middle">畫 1,000 人樹狀圖：</text>
<text x={118} y={166} fontSize={10} fill="#991b1b" textAnchor="middle" fontWeight="bold">TP ÷ (TP + FP)</text>
<rect x={235} y={82} width={210} height={115} rx={8} fill="#e0f2fe" stroke="#0369a1" />
<text x={340} y={104} fontSize={11} fill="#0369a1" textAnchor="middle" fontWeight="bold">離散計數（0, 1, 2, ...）</text>
<text x={340} y={126} fontSize={10} fill="#0369a1" textAnchor="middle">• 固定 n 次成敗 → Binomial</text>
<text x={340} y={146} fontSize={10} fill="#0369a1" textAnchor="middle">• 等到第 1 次成功 → Geometric</text>
<text x={340} y={166} fontSize={10} fill="#0369a1" textAnchor="middle">• 單位時間幾次 → Poisson(λ)</text>
<rect x={462} y={82} width={200} height={115} rx={8} fill="#dcfce7" stroke="#15803d" />
<text x={562} y={104} fontSize={11} fill="#166534" textAnchor="middle" fontWeight="bold">連續測量（區間面積）</text>
<text x={562} y={126} fontSize={10} fill="#166534" textAnchor="middle">• 等待時間 → Exponential(λ)</text>
<text x={562} y={146} fontSize={10} fill="#166534" textAnchor="middle">• 鐘形測量 → Normal(μ, σ²)</text>
<text x={562} y={166} fontSize={10} fill="#166534" textAnchor="middle" fontWeight="bold">標準化 Z = (X-μ)/σ</text>
</svg>
)}
</div>
);
};
