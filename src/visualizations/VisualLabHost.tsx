import React, { Suspense, lazy } from 'react';
import { VisualizationMeta } from '../types/curriculum';
import { MathText } from '../components/MathText';
const LAB_COMPONENTS: Record<VisualizationMeta['labId'], React.LazyExoticComponent<React.FC>> = {
'unit-circle': lazy(() => import('./UnitCircleLab').then((m) => ({ default: m.UnitCircleLab }))),
'limit-secant': lazy(() => import('./LimitSecantLab').then((m) => ({ default: m.LimitSecantLab }))),
'chain-rule': lazy(() => import('./ChainRuleLab').then((m) => ({ default: m.ChainRuleLab }))),
'logistic-euler': lazy(() => import('./LogisticEulerLab').then((m) => ({ default: m.LogisticEulerLab }))),
'bayes-diagnostic': lazy(() => import('./BayesDiagnosticLab').then((m) => ({ default: m.BayesDiagnosticLab }))),
cobweb: lazy(() => import('./CobwebLab').then((m) => ({ default: m.CobwebLab }))),
'riemann-ftc': lazy(() => import('./RiemannFtcLab').then((m) => ({ default: m.RiemannFtcLab }))),
'phase-plane': lazy(() => import('./PhasePlaneLab').then((m) => ({ default: m.PhasePlaneLab }))),
distribution: lazy(() => import('./DistributionLab').then((m) => ({ default: m.DistributionLab }))),
'multivar-3d': lazy(() => import('./Multivar3DLab').then((m) => ({ default: m.Multivar3DLab }))),
'volume-3d': lazy(() => import('./Volume3DLab').then((m) => ({ default: m.Volume3DLab }))),
newton: lazy(() => import('./NewtonLab').then((m) => ({ default: m.NewtonLab }))),
};
export const VisualLabHost: React.FC<{ meta: VisualizationMeta }> = ({ meta }) => {
const LabComponent = LAB_COMPONENTS[meta.labId];
return (
<div>
<div className="card">
<h3 style={{ marginTop: 0 }}>{meta.title}</h3>
<p><strong>學習目標：</strong><MathText text={meta.learningGoal} /></p>
<p><strong>圖形變化意義：</strong><MathText text={meta.visualMeaning} /></p>
<div style={{ fontSize: '0.88rem' }}>
<strong>參數說明：</strong>
<ul>
{meta.parameters.map((p) => (
<li key={p.name}>
<strong>{p.name}</strong>（範圍：{p.range}）：<MathText text={p.meaning} />
</li>
))}
</ul>
</div>
</div>
<Suspense fallback={<div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>載入互動視覺化實驗室中...</div>}>
<LabComponent />
</Suspense>
<div className="card" style={{ marginTop: '1rem' }}>
<h4 style={{ marginTop: 0 }}>探索問題</h4>
<ul>
{meta.explorationQuestions.map((q, i) => (
<li key={i}><MathText text={q} /></li>
))}
</ul>
<div className="callout warn" style={{ marginBottom: 0 }}>
<strong>邊界與限制：</strong><MathText text={meta.boundaryNote} />
</div>
</div>
</div>
);
};
