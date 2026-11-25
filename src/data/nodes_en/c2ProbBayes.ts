import { KnowledgeNode } from '../../types/curriculum';

export const c2ProbBayes: KnowledgeNode = {
  id: 'C2-PROB-BAYES',
  moduleId: 'M09',
  title: "Conditional Probability & Bayes' Theorem",
  englishTitle: "Conditional Probability & Bayes' Theorem",
  courseTags: ['C2', 'HS', 'APP'],
  weeks: { C2: [8, 9] },
  priority: 'P0',
  difficulty: 'L2',
  prerequisites: ['HS-DIAG-ALGEBRA'],
  related: ['C2-RV-DISCRETE'],
  nextNodes: ['C2-RV-DISCRETE'],
  learningObjectives: [
    'Distinguish clearly between P(A|B) and P(B|A) to avoid the inverse conditional fallacy',
    'Use the Law of Total Probability to decompose the overall positive test probability P(+)',
    "Apply Bayes' Theorem to compute the Positive Predictive Value (PPV) in clinical screening",
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      "Bayes' Theorem updates our initial prior probability into a posterior probability when new evidence (such as a positive screening test) arrives.",
    problemSolved:
      'Diagnostic test manufacturers report sensitivity—the probability of testing positive given disease, $P(+|D)$—whereas a patient wants to know the probability of actually having the disease given a positive test, $P(D|+)$. Those two quantities are very different!',
    intuition:
      'Suppose only $20$ out of $1000$ people actually have a disease. Even if a test is $90\\%$ accurate, the $980$ healthy people still produce roughly $98$ false positives. Looking only at everyone who tested positive, the fraction who truly have the disease is far below $90\\%$.',
    juniorGuide: {
      analogyTitle: 'Understand Why a Positive Rapid Test Does Not Equal a Certain Diagnosis with a 1,000-Person Tree!',
      analogyStory:
        'You already know percentages and ratios! Forget complicated formulas for a moment: imagine splitting 1,000 people into "truly sick" and "healthy" groups, then counting how many in each group test positive. Finally, divide "true positives $\\div$ total positives"—and you have the answer!',
      visualType: 'prob',
      stepByStepDecode: [
        {
          symbol: '$P(+ \\mid D)$',
          plainMeaning: 'Among people known to have the disease, the proportion who test positive (sensitivity)',
        },
        {
          symbol: '$P(D \\mid +)$',
          plainMeaning: 'Among people who tested positive, the proportion who truly have the disease (positive predictive value)',
        },
      ],
    },
    mathEvolution: [
      {
        stage: 'Generation 1: Classical Probability (Counting Equally Likely Outcomes)',
        question: 'How do we compute probabilities when every outcome is equally likely?',
        breakthrough: 'Simply take "favorable outcomes $\\div$ total outcomes."',
      },
      {
        stage: 'Generation 2: Conditional Probability & Bayesian Updating',
        question: 'When new evidence arrives (such as a positive rapid test), how do we update our judgment?',
        breakthrough:
          "Shrink the sample space to only those who tested positive, and use Bayes' Theorem to invert manufacturer sensitivity into the patient's true probability of disease!",
      },
    ],
    definition:
      "If $P(B) > 0$, conditional probability is defined by $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$. If $\\{D, D^c\\}$ partitions the sample space, Bayes' Theorem gives $P(D|+) = \\frac{P(+|D)P(D)}{P(+)}$.",
    formulas: [
      {
        name: "Law of Total Probability & Bayes' Theorem",
        latex: 'P(D \\mid +) = \\frac{P(+ \\mid D)P(D)}{P(+ \\mid D)P(D) + P(+ \\mid D^c)P(D^c)}',
        variables: [
          '$P(D)$: disease prevalence (prior probability before testing)',
          '$P(+ \\mid D)$: sensitivity (probability of testing positive when diseased)',
          '$P(- \\mid D^c)$: specificity (probability of testing negative when healthy; false positive rate is $P(+ \\mid D^c) = 1 - \\text{Specificity}$)',
        ],
        conditions:
          'Denominator $P(+) > 0$; conditioning events must form a mutually exclusive, exhaustive partition ($P(D) + P(D^c) = 1$).',
        commonMisuse: 'Treating sensitivity $P(+|D)$ as if it were the positive predictive value $P(D|+)$.',
      },
    ],
    geometricMeaning:
      'Visualize with a probability tree or a 1,000-person contingency table: the conditional probability $P(D|+)$ restricts the denominator to the "tested positive" column and measures the share of true positives inside it.',
    solvingSteps: [
      'Define events: $D$ = diseased, $+$ = positive test, and write down the given $P(D)$, $P(+|D)$, and $P(-|D^c)$.',
      'Use complements to find $P(D^c) = 1 - P(D)$ and the false positive rate $P(+|D^c) = 1 - P(-|D^c)$.',
      'Apply the Law of Total Probability to compute the denominator $P(+) = P(+|D)P(D) + P(+|D^c)P(D^c)$.',
      'Divide the true-positive joint probability $P(+|D)P(D)$ by $P(+)$ to obtain $P(D|+)$.',
    ],
    workedExamples: [
      {
        id: 'ex-bayes-1',
        category: 'biomedical',
        title: 'Biomedical Context: Positive Predictive Value (PPV) for Rare-Disease Screening',
        problem:
          'A disease has a prevalence of $1\\%$. A rapid screening test has $95\\%$ sensitivity and $90\\%$ specificity. If a patient tests positive, what is the probability that they actually have the disease?',
        given: '$P(D) = 0.01$, $P(+|D) = 0.95$, $P(-|D^c) = 0.90$',
        find: '$P(D|+)$',
        modelAssumptions:
          'Simplified screening model: assumes the individual is randomly sampled from a population with this prevalence and no other symptoms or comorbidities alter the prior.',
        steps: [
          {
            expression: 'P(D^c) = 0.99,\\quad P(+ \\mid D^c) = 1 - 0.90 = 0.10',
            reason: 'Find the healthy rate and false positive rate.',
          },
          {
            expression: 'P(+) = (0.95)(0.01) + (0.10)(0.99) = 0.0095 + 0.099 = 0.1085',
            reason: 'Compute total positive probability by the Law of Total Probability.',
          },
          {
            expression: 'P(D \\mid +) = \\frac{0.0095}{0.1085} \\approx 0.0876\\ (8.76\\%)',
            reason: "Apply Bayes' Theorem to find the Positive Predictive Value.",
          },
        ],
        answer: 'Approximately $8.76\\%$',
        verificationNote:
          'Check with 10,000 people: $95$ true positives and $990$ false positives give $95 / (95+990) \\approx 8.76\\%$, matching our calculation.',
      },
    ],
    symbolRules: [
      {
        symbol: '$P(A \\mid B)$',
        readAs: 'The probability of $A$ occurring given that $B$ is known to have occurred',
        grammarRule:
          'Read the vertical bar "$\\mid$" as "given." The **right** side is the known condition (the new denominator), and the **left** side is the event whose probability we want.',
        metaphor: 'Like asking: "Given that this fruit is red (right side), how likely is it to be an apple (left side)?"',
        avoidConfusion: '$P(A \\mid B)$ and $P(B \\mid A)$ reverse the conditioning direction and are almost never equal!',
      },
      {
        symbol: '$D^c$ or $\\neg D$',
        readAs: 'The complement of $D$ (meaning "not $D$ / disease-free")',
        grammarRule: 'A superscript $c$ (Complement) or leading $\\neg$ denotes the opposite event.',
        metaphor: 'Either/or: diseased is $D$, healthy is $D^c$, and their probabilities always sum to $100\\%$.',
        avoidConfusion: 'Remember that $P(D^c) = 1 - P(D)$.',
      },
    ],
    visualSteps: [
      {
        stepTitle: 'Split 1,000 People into "Diseased vs. Healthy"',
        metaphor:
          'Turn abstract percentages into 1,000 real people so you can count each branch with simple multiplication!',
        appliedExample: 'At $1\\%$ prevalence $\\Rightarrow$ 1,000 people split into $10$ sick and $990$ healthy.',
        diagramType: 'split',
        formulaHint: '$P(D)=0.01,\\ P(D^c)=0.99$',
      },
      {
        stepTitle: 'Count "True Positives" and "False Positives"',
        metaphor:
          'Send both the sick group and the healthy group through the screening test and count how many light up red (positive).',
        appliedExample:
          'Among the sick, $9.5$ test positive (true positives); among the healthy, $10\\%$—that is $99$ people—also test positive (false positives)!',
        diagramType: 'calculate',
        formulaHint: '$P(+)=P(+\\mid D)P(D)+P(+\\mid D^c)P(D^c)$',
      },
      {
        stepTitle: 'Use All Positive Tests as the New Denominator',
        metaphor:
          'Since you already tested positive, your universe shrinks to just those who lit up red; find the fraction of true positives among them!',
        appliedExample: '$9.5 \\div (9.5 + 99) \\approx 8.76\\%$ (this is the Positive Predictive Value, PPV).',
        diagramType: 'verify',
        formulaHint: '$P(D\\mid +) = \\frac{TP}{TP + FP}$',
      },
    ],
    commonErrors: [
      {
        title: 'Confusing P(A|B) with P(B|A)',
        wrongLatex: 'P(D \\mid +) = P(+ \\mid D) = 95\\%',
        rightLatex: 'P(D \\mid +) = \\frac{P(+ \\mid D)P(D)}{P(+)}',
        whyWrong:
          'Ignores that when baseline prevalence $P(D)$ is very low, the large healthy population produces many false positives.',
        howToAvoid:
          'Always put the known condition to the right of the vertical bar and sketch a $2\\times 2$ table or tree diagram.',
      },
    ],
    quickReview: {
      keyPoints: [
        "$P(A|B) \\neq P(B|A)$; convert between them using Bayes' Theorem.",
        'The denominator $P(+)$ is always the sum of two paths: True Positives + False Positives.',
        'False positive rate $= 1 - \\text{Specificity}$.',
      ],
      whenToUse:
        'When a problem gives "cause-to-effect" probabilities and asks for the reverse probability of a cause given an observed outcome.',
      trapAlert:
        'Check carefully whether a problem gives specificity $P(-|D^c)$ or false positive rate $P(+|D^c)$ so you do not substitute the complement by mistake.',
      decisionTreeKey: 'prob',
      examPatterns: [
        {
          examType: 'Pattern A: Clinical Screening Positive Predictive Value (PPV)',
          triggerWords: 'Given "prevalence, sensitivity, specificity," asked for "probability of disease given a positive test"',
          quickSteps: [
            'Compute true positive share $TP = \\text{Prevalence} \\times \\text{Sensitivity}$.',
            'Compute false positive share $FP = (1 - \\text{Prevalence}) \\times (1 - \\text{Specificity})$.',
            'Divide directly: $P(D\\mid +) = \\frac{TP}{TP + FP}$.',
          ],
          quickSample: {
            problem: 'Prevalence $5\\%$, sensitivity $80\\%$, specificity $90\\%$; find $P(D\\mid +)$',
            fastSolve: '$TP = 0.05\\times 0.8 = 0.04$, $FP = 0.95\\times 0.1 = 0.095$ $\\Rightarrow \\frac{0.04}{0.135}$',
            answer: 'Approx. $29.6\\%$',
          },
        },
      ],
    },
    practice: [
      {
        id: 'prac-bayes-1',
        questionType: '模型建立與參數解釋',
        difficulty: 'L2',
        prompt: 'A genetic test has a specificity of $96\\%$. Which of the following probabilities equals $0.96$?',
        given: 'Specificity $= 96\\%$',
        find: 'Corresponding conditional probability expression',
        options: ['$P(D \\mid -)$', '$P(- \\mid D^c)$', '$P(+ \\mid D)$', '$P(+ \\mid D^c)$'],
        correctOptionIndex: 1,
        answerDisplay: '$P(- \\mid D^c)$',
        strategy: 'Specificity is the proportion of healthy individuals who correctly test negative.',
        steps: [
          {
            expression: '\\text{Specificity} = P(\\text{Negative} \\mid \\text{Healthy}) = P(- \\mid D^c)',
            reason: 'Healthy status ($D^c$) is the given condition; negative ($-$) is the test result.',
          },
        ],
        commonMistake: 'Choosing $P(D|-)$ (related to negative predictive value) or $P(+|D)$ (sensitivity).',
        hints: [
          'Does specificity measure test performance on "healthy" people or "sick" people?',
          'What test result is correct for a healthy person?',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-bayes-2',
        questionType: '多步驟綜合題',
        difficulty: 'L3',
        prompt:
          'Suppose a disease has a regional prevalence of $10\\%$, test sensitivity is $80\\%$, and test specificity is $90\\%$. Find the Positive Predictive Value $P(D|+)$ as a percentage (round to one decimal place).',
        given: '$P(D)=0.1$, $P(+|D)=0.8$, $P(-|D^c)=0.9$',
        find: '$P(D|+)$',
        numericAnswer: 47.06,
        tolerance: 0.2,
        answerDisplay: 'Approx. $47.1\\%$',
        strategy: "Find $P(+|D^c)=0.1$ and the total positive rate $P(+)$, then apply Bayes' Theorem.",
        steps: [
          { expression: 'P(+ \\mid D^c) = 1 - 0.9 = 0.1', reason: 'Compute the false positive rate.' },
          {
            expression: 'P(+) = 0.8(0.1) + 0.1(0.9) = 0.08 + 0.09 = 0.17',
            reason: 'Apply the Law of Total Probability.',
          },
          {
            expression: 'P(D \\mid +) = \\frac{0.08}{0.17} \\approx 0.4706\\ (47.1\\%)',
            reason: 'Compute the Positive Predictive Value.',
          },
        ],
        commonMistake: 'Forgetting to multiply by $P(D^c) = 0.9$ in the denominator.',
        hints: [
          'First compute the true positive proportion $0.8 \\times 0.1$ and the false positive proportion $0.1 \\times 0.9$.',
          'Divide the true positive proportion by (true positive + false positive).',
        ],
        sourceType: 'self_authored',
      },
    ],
    visualization: {
      labId: 'bayes-diagnostic',
      title: 'Clinical Screening Bayesian Updating Interactive Lab',
      learningGoal:
        'Use a 1,000-person breakdown table to see intuitively how prevalence, sensitivity, and specificity together determine Positive Predictive Value (PPV).',
      parameters: [
        { name: 'Prevalence P(D)', meaning: 'Proportion of tested population with the disease', range: '0.5% ~ 50%' },
        { name: 'Sensitivity P(+|D)', meaning: 'Probability that a sick person tests positive', range: '50% ~ 99.5%' },
        { name: 'Specificity P(-|¬D)', meaning: 'Probability that a healthy person tests negative', range: '50% ~ 99.5%' },
      ],
      visualMeaning:
        'The green cell represents True Positives (TP), and the red cell represents False Positives (FP); PPV is the green share of all positives.',
      explorationQuestions: [
        'With sensitivity fixed at 95% and specificity at 90%, how dramatically does PPV change when prevalence increases from 2% to 20%?',
        'When prevalence is only 1%, is improving sensitivity or improving specificity more effective at raising PPV?',
      ],
      boundaryNote:
        'When both sensitivity and specificity are 100%, false positives drop to 0 and PPV = 100%; in clinical practice, pre-screening by symptoms can substantially change the effective prevalence.',
    },
  },
};
