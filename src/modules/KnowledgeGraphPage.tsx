import React from 'react';
import { Link } from 'react-router-dom';
import { NODE_MAP, NODE_SUMMARIES } from '../data/curriculumIndex';
import { DecisionFlowchart } from '../components/DecisionFlowchart';
export const KnowledgeGraphPage: React.FC = () => {
const modulesOrder = ['M00', 'M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11'];
return (
<div>
<div className="card">
<h1 style={{ marginTop: 0 }}>知識依賴圖與先備知識檢視</h1>
<p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>
每個微積分主題都建立在前面的代數或函數基礎上。若某個核心單元卡關，請優先回頭補強它的「前置節點」。
</p>
</div>
<DecisionFlowchart defaultKey="diff" />
{modulesOrder.map((mod) => {
const nodes = NODE_SUMMARIES.filter((n) => n.moduleId === mod);
if (nodes.length === 0) return null;
return (
<div key={mod} className="card">
<h3 style={{ marginTop: 0, color: 'var(--primary)' }}>模組 {mod}</h3>
<div className="card-grid">
{nodes.map((node) => (
<div key={node.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '0.85rem', background: '#fafcff' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
{node.contentStatus === 'verified' ? (
<Link to={`/module/${node.id}`} style={{ fontWeight: 700 }}>{node.title}</Link>
) : (
<strong>{node.title}</strong>
)}
<span className={`badge badge-${node.contentStatus}`}>
{node.contentStatus === 'verified' ? 'MVP 已上線' : '規劃中'}
</span>
</div>
<div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0.5rem' }}>
{node.id} · {node.courseTags.join(', ')}
</div>
<div style={{ fontSize: '0.84rem' }}>
<strong>先備前置：</strong>
{node.prerequisites.length === 0 ? (
<span>無（起點節點）</span>
) : (
node.prerequisites.map((pid, idx) => {
const pNode = NODE_MAP.get(pid);
return (
<span key={pid}>
{idx > 0 && '、'}
{pNode?.contentStatus === 'verified' ? (
<Link to={`/module/${pid}`}>{pNode.title}</Link>
) : (
pNode?.title ?? pid
)}
</span>
);
})
)}
</div>
{node.hsWeaknessNote && (
<div className="callout warn" style={{ marginTop: '0.6rem', marginBottom: 0, fontSize: '0.82rem', padding: '0.5rem 0.7rem' }}>
<strong>高中弱點阻礙：</strong>{node.hsWeaknessNote}
</div>
)}
</div>
))}
</div>
</div>
);
})}
</div>
);
};
