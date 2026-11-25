export type CourseTag = 'C1' | 'C2' | 'HS' | 'BRIDGE' | 'APP' | 'EXT';
export type Priority = 'P0' | 'P1' | 'P2' | 'P3';
export type Difficulty = 'L0' | 'L1' | 'L2' | 'L3' | 'L4';
export type ContentStatus = 'planned' | 'draft' | 'reviewed' | 'verified';
export type QuestionType =
| '概念辨識'
| '定義域／值域或條件判斷'
| '基本計算'
| '公式選擇與套用'
| '圖形判讀'
| '模型建立與參數解釋'
| '多步驟綜合題'
| '考試型題目'
| '常見陷阱題';
export interface FormulaItem {
name: string;
latex: string;
variables: string[];
conditions: string;
commonMisuse: string;
}
export interface WorkedExample {
id: string;
category: 'basic' | 'course_style' | 'biomedical';
title: string;
problem: string;
given: string;
find: string;
modelAssumptions?: string;
steps: {
expression: string;
reason: string;
}[];
answer: string;
verificationNote: string;
}
export interface CommonError {
title: string;
wrongLatex: string;
rightLatex: string;
whyWrong: string;
howToAvoid: string;
}
export interface PracticeQuestion {
id: string;
questionType: QuestionType;
difficulty: Difficulty;
prompt: string;
given: string;
find: string;
options?: string[];
correctOptionIndex?: number;
numericAnswer?: number;
tolerance?: number;
answerDisplay: string;
strategy: string;
steps: {
expression: string;
reason: string;
}[];
commonMistake: string;
hints: [string, string, ...string[]];
sourceType: 'self_authored' | 'lecture_adapted' | 'user_provided';
}
export interface VisualizationMeta {
labId:
| 'unit-circle'
| 'limit-secant'
| 'chain-rule'
| 'logistic-euler'
| 'bayes-diagnostic'
| 'cobweb'
| 'riemann-ftc'
| 'phase-plane'
| 'distribution'
| 'multivar-3d'
| 'volume-3d'
| 'newton';
title: string;
learningGoal: string;
parameters: {
name: string;
meaning: string;
range: string;
}[];
visualMeaning: string;
explorationQuestions: string[];
boundaryNote: string;
}
export interface JuniorGuide {
analogyTitle: string;
analogyStory: string;
visualType: 'algebra' | 'trig' | 'slope' | 'chain' | 'area' | 'ode' | 'prob' | 'multivar';
stepByStepDecode: {
symbol: string;
plainMeaning: string;
}[];
}
export interface SymbolRule {
symbol: string;
readAs: string;
grammarRule: string;
metaphor: string;
avoidConfusion: string;
}
export interface VisualStep {
stepTitle: string;
metaphor: string;
appliedExample: string;
diagramType: 'observe' | 'split' | 'transform' | 'calculate' | 'verify';
formulaHint: string;
}
export type DecisionTreeKey = 'diff' | 'integral' | 'ode' | 'prob';
export interface ExamPattern {
examType: string;
triggerWords: string;
quickSteps: string[];
quickSample?: {
problem: string;
fastSolve: string;
answer: string;
};
}
export type EvolutionDiagramType =
| 'archimedes-exhaustion'
| 'riemann-integral'
| 'ftc-bridge'
| 'newton-tangent'
| 'linear-taylor'
| 'euler-steps'
| 'antiderivative-family'
| 'lhopital-zoom'
| 'extrema-mvt';
export interface MathEvolutionDeepDive {
title: string;
diagramType: EvolutionDiagramType;
diagramCaption: string;
concepts: {
term: string;
plainExplain: string;
formula?: string;
}[];
miniExample?: {
prompt: string;
walkthrough: string;
};
}
export interface MathEvolutionStep {
stage: string;
question: string;
breakthrough: string;
deepDive?: MathEvolutionDeepDive;
}
export interface StrategyTrainerItem {
scenario: string;
question: string;
choices: {
label: string;
isCorrect: boolean;
feedback: string;
}[];
}
export interface KnowledgeNode {
id: string;
moduleId: string;
title: string;
englishTitle: string;
courseTags: CourseTag[];
weeks: {
C1?: number[];
C2?: number[];
};
priority: Priority;
difficulty: Difficulty;
prerequisites: string[];
related: string[];
nextNodes: string[];
learningObjectives: string[];
contentStatus: ContentStatus;
needsLectureCheck?: string[];
sections: {
oneLineSummary: string;
problemSolved: string;
intuition: string;
juniorGuide?: JuniorGuide;
symbolRules?: SymbolRule[];
visualSteps?: VisualStep[];
mathEvolution?: MathEvolutionStep[];
strategyTrainer?: StrategyTrainerItem[];
definition?: string;
formulas: FormulaItem[];
geometricMeaning: string;
solvingSteps: string[];
workedExamples: WorkedExample[];
commonErrors: CommonError[];
quickReview: {
keyPoints: string[];
whenToUse: string;
trapAlert: string;
decisionTreeKey?: DecisionTreeKey;
examPatterns?: ExamPattern[];
};
practice: PracticeQuestion[];
visualization: VisualizationMeta;
};
}
export interface NodeSummary {
id: string;
moduleId: string;
title: string;
englishTitle: string;
courseTags: CourseTag[];
weeks: {
C1?: number[];
C2?: number[];
};
priority: Priority;
prerequisites: string[];
contentStatus: ContentStatus;
hsWeaknessNote?: string;
}
