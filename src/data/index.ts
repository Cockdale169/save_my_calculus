import { KnowledgeNode } from '../types/curriculum';
import { hsDiagAlgebra } from './nodes/hsDiagAlgebra';
import { hsExpLog } from './nodes/hsExpLog';
import { hsFuncComposition } from './nodes/hsFuncComposition';
import { hsTrigUnitCircle } from './nodes/hsTrigUnitCircle';
import { c1CobwebEquilibria } from './nodes/c1CobwebEquilibria';
import { c1LimitDerivativeIntuition } from './nodes/c1LimitDerivativeIntuition';
import { c1LimitSqueeze } from './nodes/c1LimitSqueeze';
import { c1DerivativeChainRule } from './nodes/c1DerivativeChainRule';
import { c1ImplicitDiff } from './nodes/c1ImplicitDiff';
import { c1CurveAnalysis } from './nodes/c1CurveAnalysis';
import { c1LinearApprox } from './nodes/c1LinearApprox';
import { c1NewtonMethod } from './nodes/c1NewtonMethod';
import { c1OdeIntroEuler } from './nodes/c1OdeIntroEuler';
import { c1Antiderivative } from './nodes/c1Antiderivative';
import { c1IntegralFtc } from './nodes/c1IntegralFtc';
import { c1IntegralTechniques } from './nodes/c1IntegralTechniques';
import { c2ImproperIntegral } from './nodes/c2ImproperIntegral';
import { c2OdeLogisticEuler } from './nodes/c2OdeLogisticEuler';
import { c2PhasePlaneNullclines } from './nodes/c2PhasePlaneNullclines';
import { c2MultivarPartialDouble } from './nodes/c2MultivarPartialDouble';
import { c2ProbBayes } from './nodes/c2ProbBayes';
import { c2RvDiscrete } from './nodes/c2RvDiscrete';
import { c2RvContinuous } from './nodes/c2RvContinuous';
import { appBiomedSynthesis } from './nodes/appBiomedSynthesis';
export const VERIFIED_NODES: KnowledgeNode[] = [
hsDiagAlgebra,
hsExpLog,
hsTrigUnitCircle,
hsFuncComposition,
c1CobwebEquilibria,
c1LimitDerivativeIntuition,
c1LimitSqueeze,
c1DerivativeChainRule,
c1ImplicitDiff,
c1CurveAnalysis,
c1LinearApprox,
c1NewtonMethod,
c1OdeIntroEuler,
c1Antiderivative,
c1IntegralFtc,
c1IntegralTechniques,
c2ImproperIntegral,
c2OdeLogisticEuler,
c2PhasePlaneNullclines,
c2MultivarPartialDouble,
c2ProbBayes,
c2RvDiscrete,
c2RvContinuous,
appBiomedSynthesis,
];
export const VERIFIED_NODE_MAP: Record<string, KnowledgeNode> = Object.fromEntries(
VERIFIED_NODES.map((node) => [node.id, node])
);
