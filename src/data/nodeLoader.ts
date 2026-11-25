import { KnowledgeNode } from '../types/curriculum';
import { Lang } from '../store/i18n';

const ZH_LOADERS: Record<string, () => Promise<KnowledgeNode>> = {
  'HS-DIAG-ALGEBRA': () => import('./nodes/hsDiagAlgebra').then((m) => m.hsDiagAlgebra),
  'HS-EXP-LOG': () => import('./nodes/hsExpLog').then((m) => m.hsExpLog),
  'HS-TRIG-UNIT-CIRCLE': () => import('./nodes/hsTrigUnitCircle').then((m) => m.hsTrigUnitCircle),
  'HS-FUNC-COMPOSITION': () => import('./nodes/hsFuncComposition').then((m) => m.hsFuncComposition),
  'C1-COBWEB-EQUILIBRIA': () => import('./nodes/c1CobwebEquilibria').then((m) => m.c1CobwebEquilibria),
  'C1-LIMIT-DERIVATIVE-INTUITION': () => import('./nodes/c1LimitDerivativeIntuition').then((m) => m.c1LimitDerivativeIntuition),
  'C1-LIMIT-SQUEEZE': () => import('./nodes/c1LimitSqueeze').then((m) => m.c1LimitSqueeze),
  'C1-DERIVATIVE-CHAIN-RULE': () => import('./nodes/c1DerivativeChainRule').then((m) => m.c1DerivativeChainRule),
  'C1-IMPLICIT-DIFF': () => import('./nodes/c1ImplicitDiff').then((m) => m.c1ImplicitDiff),
  'C1-CURVE-ANALYSIS': () => import('./nodes/c1CurveAnalysis').then((m) => m.c1CurveAnalysis),
  'C1-LINEAR-APPROX': () => import('./nodes/c1LinearApprox').then((m) => m.c1LinearApprox),
  'C1-NEWTON-METHOD': () => import('./nodes/c1NewtonMethod').then((m) => m.c1NewtonMethod),
  'C1-ODE-INTRO-EULER': () => import('./nodes/c1OdeIntroEuler').then((m) => m.c1OdeIntroEuler),
  'C1-ANTIDERIVATIVE': () => import('./nodes/c1Antiderivative').then((m) => m.c1Antiderivative),
  'C1-INTEGRAL-FTC': () => import('./nodes/c1IntegralFtc').then((m) => m.c1IntegralFtc),
  'C1-INTEGRAL-TECHNIQUES': () => import('./nodes/c1IntegralTechniques').then((m) => m.c1IntegralTechniques),
  'C2-IMPROPER-INTEGRAL': () => import('./nodes/c2ImproperIntegral').then((m) => m.c2ImproperIntegral),
  'C2-ODE-LOGISTIC-EULER': () => import('./nodes/c2OdeLogisticEuler').then((m) => m.c2OdeLogisticEuler),
  'C2-PHASE-PLANE-NULLCLINES': () => import('./nodes/c2PhasePlaneNullclines').then((m) => m.c2PhasePlaneNullclines),
  'C2-MULTIVAR-PARTIAL-DOUBLE': () => import('./nodes/c2MultivarPartialDouble').then((m) => m.c2MultivarPartialDouble),
  'C2-PROB-BAYES': () => import('./nodes/c2ProbBayes').then((m) => m.c2ProbBayes),
  'C2-RV-DISCRETE': () => import('./nodes/c2RvDiscrete').then((m) => m.c2RvDiscrete),
  'C2-RV-CONTINUOUS': () => import('./nodes/c2RvContinuous').then((m) => m.c2RvContinuous),
  'APP-BIOMED-SYNTHESIS': () => import('./nodes/appBiomedSynthesis').then((m) => m.appBiomedSynthesis),
};

const EN_LOADERS: Record<string, () => Promise<KnowledgeNode>> = {
  'HS-DIAG-ALGEBRA': () => import('./nodes_en/hsDiagAlgebra').then((m) => m.hsDiagAlgebra),
  'HS-EXP-LOG': () => import('./nodes_en/hsExpLog').then((m) => m.hsExpLog),
  'HS-TRIG-UNIT-CIRCLE': () => import('./nodes_en/hsTrigUnitCircle').then((m) => m.hsTrigUnitCircle),
  'HS-FUNC-COMPOSITION': () => import('./nodes_en/hsFuncComposition').then((m) => m.hsFuncComposition),
  'C1-COBWEB-EQUILIBRIA': () => import('./nodes_en/c1CobwebEquilibria').then((m) => m.c1CobwebEquilibria),
  'C1-LIMIT-DERIVATIVE-INTUITION': () => import('./nodes_en/c1LimitDerivativeIntuition').then((m) => m.c1LimitDerivativeIntuition),
  'C1-LIMIT-SQUEEZE': () => import('./nodes_en/c1LimitSqueeze').then((m) => m.c1LimitSqueeze),
  'C1-DERIVATIVE-CHAIN-RULE': () => import('./nodes_en/c1DerivativeChainRule').then((m) => m.c1DerivativeChainRule),
  'C1-IMPLICIT-DIFF': () => import('./nodes_en/c1ImplicitDiff').then((m) => m.c1ImplicitDiff),
  'C1-CURVE-ANALYSIS': () => import('./nodes_en/c1CurveAnalysis').then((m) => m.c1CurveAnalysis),
  'C1-LINEAR-APPROX': () => import('./nodes_en/c1LinearApprox').then((m) => m.c1LinearApprox),
  'C1-NEWTON-METHOD': () => import('./nodes_en/c1NewtonMethod').then((m) => m.c1NewtonMethod),
  'C1-ODE-INTRO-EULER': () => import('./nodes_en/c1OdeIntroEuler').then((m) => m.c1OdeIntroEuler),
  'C1-ANTIDERIVATIVE': () => import('./nodes_en/c1Antiderivative').then((m) => m.c1Antiderivative),
  'C1-INTEGRAL-FTC': () => import('./nodes_en/c1IntegralFtc').then((m) => m.c1IntegralFtc),
  'C1-INTEGRAL-TECHNIQUES': () => import('./nodes_en/c1IntegralTechniques').then((m) => m.c1IntegralTechniques),
  'C2-IMPROPER-INTEGRAL': () => import('./nodes_en/c2ImproperIntegral').then((m) => m.c2ImproperIntegral),
  'C2-ODE-LOGISTIC-EULER': () => import('./nodes_en/c2OdeLogisticEuler').then((m) => m.c2OdeLogisticEuler),
  'C2-PHASE-PLANE-NULLCLINES': () => import('./nodes_en/c2PhasePlaneNullclines').then((m) => m.c2PhasePlaneNullclines),
  'C2-MULTIVAR-PARTIAL-DOUBLE': () => import('./nodes_en/c2MultivarPartialDouble').then((m) => m.c2MultivarPartialDouble),
  'C2-PROB-BAYES': () => import('./nodes_en/c2ProbBayes').then((m) => m.c2ProbBayes),
  'C2-RV-DISCRETE': () => import('./nodes_en/c2RvDiscrete').then((m) => m.c2RvDiscrete),
  'C2-RV-CONTINUOUS': () => import('./nodes_en/c2RvContinuous').then((m) => m.c2RvContinuous),
  'APP-BIOMED-SYNTHESIS': () => import('./nodes_en/appBiomedSynthesis').then((m) => m.appBiomedSynthesis),
};

const NODE_CACHE = new Map<string, Promise<KnowledgeNode>>();

export async function loadNodeById(nodeId: string, lang: Lang = 'en'): Promise<KnowledgeNode | null> {
  const key = `${lang}:${nodeId}`;
  const cached = NODE_CACHE.get(key);
  if (cached) return cached;
  const loader = lang === 'en' ? (EN_LOADERS[nodeId] ?? ZH_LOADERS[nodeId]) : ZH_LOADERS[nodeId];
  if (!loader) return null;
  const promise = loader();
  NODE_CACHE.set(key, promise);
  return promise;
}

export async function loadAllNodes(lang: Lang = 'en'): Promise<KnowledgeNode[]> {
  const map = lang === 'en' ? EN_LOADERS : ZH_LOADERS;
  return Promise.all(Object.keys(map).map((id) => loadNodeById(id, lang) as Promise<KnowledgeNode>));
}
