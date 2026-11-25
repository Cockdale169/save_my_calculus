import { KnowledgeNode } from '../../types/curriculum';

export const appBiomedSynthesis: KnowledgeNode = {
  id: 'APP-BIOMED-SYNTHESIS',
  moduleId: 'M12',
  title: 'Biomedical Synthesis: Pharmacokinetics, Population & Clinical Probability',
  englishTitle: 'Biomedical Synthesis: Pharmacokinetics, Population & Clinical Probability',
  courseTags: ['APP', 'C1', 'C2'],
  weeks: { C1: [10, 15], C2: [3, 9, 12, 14] },
  priority: 'P2',
  difficulty: 'L4',
  prerequisites: ['C1-INTEGRAL-FTC', 'C2-IMPROPER-INTEGRAL', 'C2-ODE-LOGISTIC-EULER', 'C2-PROB-BAYES'],
  related: ['C2-RV-DISCRETE', 'C2-RV-CONTINUOUS'],
  nextNodes: [],
  learningObjectives: [
    'Integrate Calculus I chain rule and definite integrals with Calculus II improper integrals to understand one-compartment pharmacokinetics (half-life and AUC)',
    'Combine ODE equilibrium analysis and phase planes to study cellular/microbial carrying capacities and competition',
    "Synthesize Bayes' Theorem, Poisson processes, and Exponential waiting times in clinical screening and emergency-arrival scenarios",
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      'The tools of Calculus I and II form one connected pipeline in biomedicine: rates of change (derivatives), cumulative exposure (integrals), long-term steady states (ODEs), and decision-making under uncertainty (probability).',
    problemSolved:
      'Single-chapter exercises test one formula at a time, whereas real pharmaceutical and life-science questions (such as setting a dosing interval that stays effective without toxic accumulation) require combining logarithms, calculus, and probability together.',
    intuition:
      'Think of any biomedical system through four core questions: ① **How fast is it changing right now?** (derivative $dC/dt$) ② **What is the total cumulative exposure?** (integral $\\text{AUC}$) ③ **Where does it settle long term?** (equilibrium $M^*$ or $K$) ④ **How reliable is the test or timing?** (Bayes and probability distributions).',
    mathEvolution: [
      {
        stage: 'From Isolated Chapter Exercises to Biomedical Systems Synthesis',
        question:
          'Exponentials, calculus, and probability appear together in real clinical and pharmaceutical problems—how do the chapters connect?',
        breakthrough:
          'Use rates of change (derivatives) for absorption and clearance, improper integrals for total drug exposure $\\text{AUC}$, ODEs for steady-state equilibria, and Bayesian/stochastic models for diagnostic uncertainty!',
      },
      {
        stage: 'From Idealized Assumptions to Recognizing Model Boundaries',
        question: 'Can a number calculated from a classroom math model be used directly as a hospital prescription?',
        breakthrough:
          'Every classroom model is a simplified approximation (such as linear one-compartment clearance); listing model assumptions and checking units are essential mathematical habits for life-science students!',
      },
    ],
    juniorGuide: {
      analogyTitle: 'Put All Four Year-Long Calculus Tools to Work Caring for Patients and Analyzing Drugs!',
      analogyStory:
        'Imagine you are a pharmacist: you want to know how fast a drug is clearing right now (slope/derivative), how much total drug exposure occurred over time (area under the curve, AUC), what steady level daily dosing reaches (ODE equilibrium), and how likely a positive rapid test is a true case (Bayes’ Theorem)—those four questions tie all of Calculus I and II together!',
      visualType: 'prob',
      stepByStepDecode: [
        {
          symbol: '$t_{1/2} = \\frac{\\ln 2}{k}$',
          plainMeaning: 'Half-life: time required for the drug amount to drop by half (derived from exponentials and logs)',
        },
        {
          symbol: '$\\text{AUC}_{0\\to\\infty}$',
          plainMeaning: 'Total exposure area from dosing through complete elimination (improper integral)',
        },
      ],
    },
    formulas: [
      {
        name: 'First-Order Clearance Relationships (Simplified One-Compartment Model)',
        latex:
          'C(t) = C_0 e^{-kt}, \\qquad t_{1/2} = \\frac{\\ln 2}{k}, \\qquad \\text{AUC}_{0\\to\\infty} = \\int_0^{\\infty} C_0 e^{-kt}\\,dt = \\frac{C_0}{k}',
        variables: [
          '$C_0$: initial plasma concentration (mg/L)',
          '$k > 0$: elimination rate constant ($\\text{hr}^{-1}$)',
          '$t_{1/2}$: half-life (hr)',
        ],
        conditions:
          'Simplified one-compartment IV bolus model: assumes instantaneous uniform distribution and unsaturated linear first-order clearance. Not for clinical dosing prescriptions.',
        commonMisuse:
          'Mistaking the half-life $t_{1/2}$ for the time until the drug is completely gone (after $1$ half-life, $50\\%$ remains; after $5$ half-lives, about $3.1\\%$ remains).',
      },
    ],
    geometricMeaning:
      'The concentration curve $C(t)$ decays exponentially over time, and the total area enclosed between the curve and the time axis represents total drug exposure $\\text{AUC}_{0\\to\\infty}$.',
    solvingSteps: [
      'Identify whether each sub-question asks for an instantaneous rate/extremum (derivative), cumulative quantity (integral), dynamic equilibrium (ODE), or uncertain inference (probability).',
      'List all known parameters with units and check unit consistency (e.g., hours vs. minutes).',
      'State the simplified model assumptions explicitly before computing, then verify dimensions and numerical reasonableness.',
    ],
    workedExamples: [
      {
        id: 'ex-bio-1',
        category: 'biomedical',
        title: 'Cross-Chapter Synthesis: Estimating AUC_{0→∞} from Drug Half-Life',
        problem:
          'After an intravenous bolus injection, a drug has initial concentration $C_0 = 24\\text{ mg/L}$ and half-life $t_{1/2} = 3.4657\\text{ hr}$ (so $k \\approx 0.2\\text{ hr}^{-1}$). Estimate its total lifetime exposure $\\text{AUC}_{0\\to\\infty}$.',
        given: '$C_0 = 24\\text{ mg/L}$, $k = 0.2\\text{ hr}^{-1}$',
        find: '$\\text{AUC}_{0\\to\\infty}$',
        modelAssumptions:
          'Simplified one-compartment linear elimination model for conceptual integration only; real clinical dosing requires accounting for renal function, protein binding, and multi-compartment distribution.',
        steps: [
          {
            expression: 'k = \\frac{\\ln 2}{t_{1/2}} \\approx \\frac{0.69315}{3.4657} \\approx 0.2\\text{ hr}^{-1}',
            reason: 'Solve for the elimination rate constant $k$ from the half-life.',
          },
          {
            expression:
              '\\text{AUC}_{0\\to\\infty} = \\int_0^{\\infty} 24 e^{-0.2t}\\,dt = \\frac{24}{0.2} = 120\\text{ mg}\\cdot\\text{hr/L}',
            reason: 'Evaluate the improper integral to find total exposure area.',
          },
        ],
        answer: '$120\\text{ mg}\\cdot\\text{hr/L}$',
        verificationNote: 'Unit check: $[\\text{mg/L}] / [\\text{hr}^{-1}] = \\text{mg}\\cdot\\text{hr/L}$, which is consistent.',
      },
    ],
    commonErrors: [
      {
        title: 'Treating a Simplified Math Model as an Exact Clinical Prediction',
        wrongLatex:
          '\\text{Computing } C(t) \\text{ from a 1-compartment model} \\implies \\text{assuming all patients have identical concentrations}',
        rightLatex:
          '\\text{The 1-compartment model holds only under instantaneous mixing and constant rate } k',
        whyWrong:
          'Real physiology involves absorption phases, tissue redistribution, and inter-patient metabolic variability.',
        howToAvoid: 'Make it a habit to state the underlying model assumptions whenever solving or building a model.',
      },
    ],
    quickReview: {
      keyPoints: [
        'Half-life $t_{1/2} = \\frac{\\ln 2}{k}$; total exposure $\\text{AUC}_{0\\to\\infty} = \\frac{C_0}{k}$.',
        'Every biomedical math problem requires checking units and stating model boundaries.',
      ],
      whenToUse: 'Reviewing how Calculus I and II tools connect across pharmacology and life-science applications.',
      trapAlert:
        'If time units (minutes vs. hours) are mixed, the rate constant $k$ and AUC will be off by a factor of 60!',
    },
    practice: [
      {
        id: 'prac-bio-1',
        questionType: '模型建立與參數解釋',
        difficulty: 'L4',
        prompt:
          'In the one-compartment first-order elimination model $C(t) = C_0 e^{-kt}$, if impaired renal function cuts a patient’s elimination rate constant $k$ in half ($0.5k$), by what factor does total exposure $\\text{AUC}_{0\\to\\infty}$ change for the same initial concentration $C_0$?',
        given: '$\\text{AUC}_{0\\to\\infty} = C_0 / k$, $k_{\\text{new}} = 0.5 k$',
        find: 'Multiplier for AUC',
        numericAnswer: 2,
        tolerance: 0.001,
        answerDisplay: '$2\\times$ (doubles)',
        strategy: 'Analyze the inverse proportionality of $\\text{AUC} = C_0 / k$ with respect to $k$.',
        steps: [
          {
            expression: '\\text{AUC}_{\\text{new}} = \\frac{C_0}{0.5 k} = 2 \\cdot \\frac{C_0}{k} = 2\\,\\text{AUC}_{\\text{old}}',
            reason: 'Halving the clearance rate doubles total cumulative exposure.',
          },
        ],
        commonMistake: 'Mistakenly thinking AUC is also halved when $k$ is halved.',
        hints: [
          'First write $\\text{AUC}_{0\\to\\infty} = \\int_0^\\infty C_0 e^{-kt}\\,dt = \\frac{C_0}{k}$.',
          'When the denominator $k$ is cut in half, does the fraction get larger or smaller?',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-bio-2',
        questionType: '多步驟綜合題',
        difficulty: 'L4',
        prompt:
          'Adverse-event reports for a drug arrive independently as a Poisson process with mean rate $\\lambda = 2$ per hour. What distribution does the waiting time $T$ (in hours) between consecutive reports follow, and what is the mean waiting time $E[T]$?',
        given: 'Poisson process rate $\\lambda = 2$ events/hour',
        find: 'Inter-arrival time distribution and mean waiting time',
        options: [
          'Exponential($\\lambda=2$), $E[T] = 0.5$ hours',
          'Exponential($\\lambda=2$), $E[T] = 2$ hours',
          'Normal($2, 1$), $E[T] = 2$ hours',
          'Binomial($2, 0.5$), $E[T] = 1$ hour',
        ],
        correctOptionIndex: 0,
        answerDisplay: 'Exponential($\\lambda=2$), $E[T] = 0.5$ hours',
        strategy: 'Inter-arrival times of a Poisson($\\lambda$) process follow Exponential($\\lambda$) with mean $1/\\lambda$.',
        steps: [
          {
            expression: 'T \\sim \\text{Exp}(\\lambda = 2) \\implies E[T] = \\frac{1}{2} = 0.5\\text{ hr}',
            reason: 'An average of 2 events per hour means 1 event every 0.5 hours on average.',
          },
        ],
        commonMistake: 'Writing $E[T] = \\lambda = 2$ instead of $1/\\lambda$.',
        hints: [
          'Which continuous distribution governs waiting times between Poisson events?',
          'If 2 events happen per hour on average, how many hours pass on average per event?',
        ],
        sourceType: 'self_authored',
      },
    ],
    visualization: {
      labId: 'logistic-euler',
      title: 'Biomedical Dynamical Systems & Dosing Trend Simulation (Shared Lab)',
      learningGoal:
        'Adjust parameters to build intuition for growth rates, carrying limits, and discrete time steps in biomedical models.',
      parameters: [
        { name: 'r', meaning: 'Growth / reaction rate', range: '0.1 ~ 1.5' },
        { name: 'K', meaning: 'System upper limit', range: '50 ~ 200' },
        { name: 'N₀', meaning: 'Initial state', range: '5 ~ 160' },
        { name: 'Δt', meaning: 'Time step size', range: '0.2 ~ 2.5' },
      ],
      visualMeaning: 'Compare the continuous analytical solution against discrete numerical step approximations.',
      explorationQuestions: [
        'In biomedical modeling, why are parameter units and model assumptions even more critical than blindly plugging into formulas?',
      ],
      boundaryNote:
        'All biomedical examples in this system are simplified educational models and must not be used for actual clinical decision-making.',
    },
  },
};
