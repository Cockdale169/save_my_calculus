import { KnowledgeNode } from '../../types/curriculum';

export const c1LimitSqueeze: KnowledgeNode = {
  id: 'C1-LIMIT-SQUEEZE',
  moduleId: 'M03',
  title: "Squeeze Theorem, Limits at Infinity & L'Hôpital's Rule",
  englishTitle: "Squeeze Theorem, Limits at Infinity & L'Hôpital's Rule",
  courseTags: ['C1'],
  weeks: { C1: [3, 9] },
  priority: 'P0',
  difficulty: 'L2',
  prerequisites: ['C1-LIMIT-DERIVATIVE-INTUITION', 'HS-TRIG-UNIT-CIRCLE'],
  related: ['C2-IMPROPER-INTEGRAL'],
  nextNodes: ['C2-IMPROPER-INTEGRAL'],
  learningObjectives: [
    'Apply the Squeeze Theorem to evaluate limits of rapidly oscillating functions (such as x² sin(1/x))',
    'Use highest-degree terms to determine horizontal asymptotes of rational functions as x → ∞',
    "Verify 0/0 or ∞/∞ indeterminate forms carefully before applying L'Hôpital's Rule",
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      "The Squeeze Theorem traps an oscillating function between two bounding curves converging to the same point; L'Hôpital's Rule resolves $0/0$ and $\\infty/\\infty$ indeterminate forms by comparing the ratio of derivatives.",
    problemSolved:
      "When you cannot plug in directly—such as infinitely fast oscillation in $\\sin(1/x)$ or when both numerator and denominator blow up as $x \\to \\infty$—ordinary factoring fails, so we need the Squeeze Theorem and L'Hôpital's Rule.",
    intuition:
      "If you are walking between two friends whose heights both shrink to $0$, no matter how wildly you jump up and down, you get squeezed to $0$ as well (Squeeze Theorem). For a $0/0$ race, whichever side approaches $0$ with a faster instantaneous rate of change (derivative) wins the ratio (L'Hôpital's Rule).",
    mathEvolution: [
      {
        stage: "From 'Direct Substitution' to 'The Squeeze Theorem and L'Hôpital's Rule'",
        question:
          'What can we do when $\\sin(1/x)$ oscillates wildly, or when taking a limit produces a stuck $0/0$ or $\\infty/\\infty$ expression?',
        breakthrough:
          "Trap the oscillating function above and below with two simpler functions sharing the same limit (Squeeze Theorem); for $0/0$, compare the ratio of instantaneous speeds at which numerator and denominator approach the target (L'Hôpital's Rule) to break the indeterminate tie!",
        deepDive: {
          title: "Visualizing the Geometric Intuition of the Squeeze Theorem and L'Hôpital's Rule",
          diagramType: 'lhopital-zoom',
          diagramCaption:
            'The upper and lower dashed curves pinch the oscillating function into a single point; for a $0/0$ limit, zooming in turns both curves into their tangent lines, so the ratio of heights equals the ratio of slopes $f\'(a)/g\'(a)$.',
          concepts: [
            {
              term: '1. Squeeze Theorem',
              plainExplain:
                'Find simpler upper and lower bounds $g(x) \\le f(x) \\le h(x)$. As long as both bounds converge to the same limit $L$ at $a$, the trapped function $f(x)$ in the middle has nowhere else to go.',
            },
            {
              term: "2. L'Hôpital's Rule",
              plainExplain:
                'Only valid for $0/0$ or $\\infty/\\infty$ forms; differentiate the numerator and denominator separately, then take the limit. For exponential indeterminate forms like $0^0$ or $1^\\infty$, take $\\ln$ first to convert to a product, then rewrite as a fraction.',
              formula: "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}",
            },
          ],
        },
      },
      {
        stage: "From 'Approaching a Point' to 'Extending to Infinity $x \\to \\infty$'",
        question:
          'After prolonged IV drug infusion or a long-running biological reaction, what steady-state level does the value eventually settle at?',
        breakthrough:
          'Letting $x \\to \\infty$ and comparing the highest-degree terms in numerator and denominator reveals the horizontal asymptote (the long-term steady-state value).',
      },
    ],
    juniorGuide: {
      analogyTitle: "The Sandwich Theorem (Squeeze) and Racing Speed Ratios (L'Hôpital)!",
      analogyStory:
        "Imagine walking between two friends who both walk into the exact same classroom (limit 0). Even if you hop left and right the whole way, you are forced into that same classroom! And when two quantities both become 0 so you can't divide ($0/0$), L'Hôpital's Rule tells you to compare 'which one is shrinking faster (the ratio of their derivatives)' instead!",
      visualType: 'slope',
      stepByStepDecode: [
        {
          symbol: '$\\frac{0}{0},\\ \\frac{\\infty}{\\infty}$',
          plainMeaning:
            "Indeterminate forms: both sides vanish to 0 or blow up together, so you must simplify or use L'Hôpital's Rule to see who wins",
        },
        {
          symbol: '$x \\to \\infty$',
          plainMeaning:
            'Observing the long-run height the function settles toward when $x$ grows arbitrarily large',
        },
      ],
    },
    formulas: [
      {
        name: 'Squeeze Theorem',
        latex:
          '\\text{If } g(x) \\le f(x) \\le h(x) \\text{ and } \\lim_{x \\to a} g(x) = \\lim_{x \\to a} h(x) = L, \\text{ then } \\lim_{x \\to a} f(x) = L',
        variables: ['$g(x), h(x)$: lower and upper bounding functions', '$L$: common limiting value'],
        conditions:
          'The inequality only needs to hold on a punctured neighborhood near $a$, and the limits of the upper and lower bounds must be equal.',
        commonMisuse:
          'Finding bounds whose limits are not equal (for example, getting $-1 \\le \\sin(1/x) \\le 1$ and thinking the limit exists).',
      },
      {
        name: "L'Hôpital's Rule & Advanced Indeterminate Forms",
        latex:
          "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}; \\qquad 0\\cdot(-\\infty) \\to \\frac{\\ln x}{1/x}, \\quad 0^0, \\infty^0, 1^\\infty \\to e^{\\lim g(x)\\ln f(x)}",
        variables: [
          "$f'(x), g'(x)$: separate derivatives of the numerator and denominator with respect to $x$",
          '$0^0, \\infty^0, 1^\\infty$: power-type indeterminate forms; rewrite via $e^{\\ln(\\cdots)}$ to turn into a product first',
        ],
        conditions:
          'You must verify the expression is a $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ indeterminate form first. Also note that some radical forms (such as $\\frac{x}{\\sqrt{x^2+1}}$) loop forever under L\'Hôpital—divide by the highest power instead!',
        commonMisuse:
          'Forgetting that when $x < 0$ in $\\lim_{x\\to -\\infty} \\frac{x}{\\sqrt{x^2+1}}$, $\\sqrt{x^2} = |x| = -x$, and dropping the negative sign.',
      },
    ],
    geometricMeaning:
      'A limit at infinity $\\lim_{x \\to \\infty} f(x) = L$ corresponds geometrically to a horizontal asymptote $y = L$ (for example, the steady-state concentration of continuous drug infusion or a saturated reaction).',
    solvingSteps: [
      'Check the form by direct substitution first: if it yields a determinate value, you are done; consider L\'Hôpital only for $0/0$ or $\\infty/\\infty$.',
      "When using L'Hôpital's Rule, differentiate the numerator alone and divide by the derivative of the denominator alone (never apply the quotient rule).",
      'When an oscillating $\\sin(\\cdot)$ or $\\cos(\\cdot)$ is multiplied by a term going to $0$, use $-1 \\le \\sin(\\cdot) \\le 1$ to apply the Squeeze Theorem.',
    ],
    workedExamples: [
      {
        id: 'ex-sq-1',
        category: 'basic',
        title: "Basic: Comparing L'Hôpital's Rule and the Squeeze Theorem",
        problem:
          '1) Evaluate $\\lim_{x \\to 0} \\frac{e^{2x} - 1}{x}$; 2) Evaluate $\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right)$.',
        given: 'Two limit problems as $x \\to 0$',
        find: 'Both limit values',
        steps: [
          {
            expression: '\\text{Substituting } x=0 \\text{ gives } \\frac{e^0 - 1}{0} = \\frac{0}{0}',
            reason: "Verify that the $0/0$ indeterminate form condition for L'Hôpital's Rule is satisfied.",
          },
          {
            expression: '\\lim_{x \\to 0} \\frac{2e^{2x}}{1} = 2',
            reason: 'Differentiate numerator and denominator separately, then substitute $x=0$.',
          },
          {
            expression: '-x^2 \\le x^2 \\sin\\left(\\frac{1}{x}\\right) \\le x^2 \\quad (x \\neq 0)',
            reason: 'Start from $|\\sin(1/x)| \\le 1$ and multiply all sides by $x^2 \\ge 0$.',
          },
          {
            expression: '\\lim_{x \\to 0} (-x^2) = 0 = \\lim_{x \\to 0} x^2 \\implies \\text{limit is } 0',
            reason: 'Both upper and lower bounds approach $0$, so the Squeeze Theorem gives $0$.',
          },
        ],
        answer: '1) $2$; 2) $0$',
        verificationNote:
          "Part 1 can also be recognized as the derivative definition for $f(x)=e^{2x}$ at $x=0$: $f'(0)=2e^0=2$, which agrees completely.",
      },
      {
        id: 'ex-sq-2',
        category: 'course_style',
        title: 'Course Favorite: 0^0 Exponential Indeterminate Form (Logarithmic Reduction)',
        problem: 'Evaluate $\\lim_{x \\to 0^+} x^x$ (Lecture 8 handout example).',
        given: '$y = x^x$, $x \\to 0^+$ (a $0^0$ indeterminate form)',
        find: '$\\lim_{x \\to 0^+} x^x$',
        steps: [
          {
            expression: '\\ln y = \\ln(x^x) = x \\ln x',
            reason:
              'Since both base and exponent contain $x$, take the natural logarithm of both sides to bring the exponent down, turning it into a $0 \\cdot (-\\infty)$ form.',
          },
          {
            expression: '\\lim_{x \\to 0^+} x \\ln x = \\lim_{x \\to 0^+} \\frac{\\ln x}{1/x}',
            reason: "Rewrite the product as a fraction of type $\\frac{-\\infty}{\\infty}$ so L'Hôpital's Rule applies.",
          },
          {
            expression: "\\stackrel{\\text{L'H}}{=} \\lim_{x \\to 0^+} \\frac{1/x}{-1/x^2} = \\lim_{x \\to 0^+} (-x) = 0",
            reason: 'Differentiate numerator and denominator separately and simplify; the limit is $0$.',
          },
          {
            expression: '\\lim_{x \\to 0^+} x^x = \\lim_{x \\to 0^+} e^{\\ln y} = e^0 = 1',
            reason: 'Do not forget to undo the earlier $\\ln$ by exponentiating with $e^{(\\cdot)}$!',
          },
        ],
        answer: '$1$',
        verificationNote:
          'Common trap: stopping after finding $\\lim \\ln y = 0$ and answering $0$. Remember that $0$ is the limit of $\\ln y$, so the original expression $y = e^{\\ln y} \\to e^0 = 1$.',
      },
      {
        id: 'ex-sq-3',
        category: 'course_style',
        title: "Trap Buster: Infinite L'Hôpital Loop & Square Roots at Negative Infinity",
        problem:
          'Evaluate $\\lim_{x \\to \\infty} \\frac{x}{\\sqrt{x^2 + 1}}$ and $\\lim_{x \\to -\\infty} \\frac{x}{\\sqrt{x^2 + 1}}$ (Lecture 8 handout example).',
        given: '$f(x) = \\frac{x}{\\sqrt{x^2 + 1}}$',
        find: 'Horizontal asymptotes on both sides as $x \\to +\\infty$ and $x \\to -\\infty$',
        steps: [
          {
            expression:
              "\\text{If using L'Hôpital: }\\frac{1}{\\frac{2x}{2\\sqrt{x^2+1}}} = \\frac{\\sqrt{x^2+1}}{x} \\xrightarrow{\\text{again}} \\frac{x}{\\sqrt{x^2+1}}",
            reason:
              "First notice why L'Hôpital fails here: one differentiation flips the fraction, and a second brings you right back to where you started—an infinite loop!",
          },
          {
            expression: '\\sqrt{x^2 + 1} = \\sqrt{x^2\\left(1 + \\frac{1}{x^2}\\right)} = |x|\\sqrt{1 + \\frac{1}{x^2}}',
            reason:
              'The proper approach is factoring $x^2$ out of the radical; the key identity is $\\sqrt{x^2} = |x|$, not always $x$!',
          },
          {
            expression: '\\lim_{x \\to +\\infty} \\frac{x}{x\\sqrt{1 + 1/x^2}} = \\lim_{x \\to +\\infty} \\frac{1}{\\sqrt{1 + 1/x^2}} = 1',
            reason: 'When $x > 0$, $|x| = x$, so canceling gives a limit of $1$.',
          },
          {
            expression: '\\lim_{x \\to -\\infty} \\frac{x}{-x\\sqrt{1 + 1/x^2}} = \\lim_{x \\to -\\infty} \\frac{-1}{\\sqrt{1 + 1/x^2}} = -1',
            reason: 'When $x < 0$, $|x| = -x$, leaving a negative sign after canceling and giving a limit of $-1$!',
          },
        ],
        answer: '$1$ as $x \\to +\\infty$; $-1$ as $x \\to -\\infty$',
        verificationNote:
          'Geometric meaning: this function has two distinct horizontal asymptotes, $y = 1$ (on the right) and $y = -1$ (on the left).',
      },
      {
        id: 'ex-sq-4',
        category: 'basic',
        title: 'Rational Limits at Infinity: Determining Sign at Negative Infinity',
        problem: 'Evaluate $\\lim_{x \\to -\\infty} \\frac{4 + 3x^2}{1 - 7x}$ (Lecture 8 handout example).',
        given: 'Numerator highest power $x^2$, denominator highest power $x$, $x \\to -\\infty$',
        find: 'Limit value (or $\\pm\\infty$)',
        steps: [
          {
            expression: '\\lim_{x \\to -\\infty} \\frac{4/x + 3x}{1/x - 7}',
            reason:
              'Divide numerator and denominator by the highest power of the denominator, $x$ (note that dividing both top and bottom by $x$ is valid even for $x < 0$).',
          },
          {
            expression: '\\text{Numerator } 3x \\to -\\infty,\\quad \\text{Denominator } \\frac{1}{x} - 7 \\to -7',
            reason: 'Examine the behavior and signs of the numerator and denominator separately as $x \\to -\\infty$.',
          },
          {
            expression: '\\frac{-\\infty}{-7} = +\\infty',
            reason: 'Negative infinity divided by the negative constant $-7$ cancels the minus signs, yielding $+\\infty$.',
          },
        ],
        answer: '$+\\infty$ (diverges to positive infinity)',
        verificationNote:
          'Quick sanity check: plugging in $x = -1000$ gives $\\frac{4 + 3\\times 10^6}{1 + 7000} > 0$ and huge, confirming $+\\infty$.',
      },
    ],
    commonErrors: [
      {
        title: "Applying L'Hôpital's Rule to a Non-Indeterminate Form",
        wrongLatex: "\\lim_{x \\to 0} \\frac{e^x}{x + 1} \\stackrel{\\text{L'H}}{=} \\lim_{x \\to 0} \\frac{e^x}{1} = 1",
        rightLatex: '\\lim_{x \\to 0} \\frac{e^x}{x + 1} = \\frac{e^0}{0 + 1} = 1\\text{ (direct substitution works; not } 0/0\\text{)}',
        whyWrong:
          "Although both happen to yield $1$ in this specific problem, applying L'Hôpital to a non-$0/0$ limit in general (such as $\\frac{x+2}{x+1}$ as $x \\to 0$) gives the completely wrong answer $1$ instead of the true value $2$.",
        howToAvoid: "Before every use of L'Hôpital's Rule, write down 'Check: $0/0$' or '$\\infty/\\infty$' on your scratch paper.",
      },
    ],
    quickReview: {
      keyPoints: [
        'Squeeze Theorem: find $g(x) \\le f(x) \\le h(x)$ with both bounds converging to the same limit.',
        "L'Hôpital condition: only for $0/0$ or $\\infty/\\infty$; differentiate top and bottom separately.",
        'As $x \\to \\infty$, compare highest-degree terms (which determine the horizontal asymptote).',
      ],
      whenToUse:
        "Use the Squeeze Theorem for oscillating limits ($\\sin/\\cos$ paired with $x^n$); use L'Hôpital's Rule for $0/0$ or $\\infty/\\infty$ forms that do not easily cancel algebraically.",
      trapAlert: "Never apply L'Hôpital's Rule unless the form is $0/0$ or $\\infty/\\infty$!",
    },
    practice: [
      {
        id: 'prac-sq-1',
        questionType: '公式選擇與套用',
        difficulty: 'L2',
        prompt: 'Evaluate $\\lim_{x \\to 0} \\frac{\\sin(5x)}{x}$.',
        given: '$\\frac{\\sin(5x)}{x}$, $x \\to 0$',
        find: 'The limit value',
        numericAnswer: 5,
        tolerance: 0.001,
        answerDisplay: '$5$',
        strategy: "Confirm that it is a $0/0$ indeterminate form, then apply L'Hôpital's Rule (don't forget the chain rule!).",
        steps: [
          { expression: '\\frac{\\sin(0)}{0} = \\frac{0}{0}', reason: "Satisfies the L'Hôpital condition." },
          {
            expression: '\\lim_{x \\to 0} \\frac{5\\cos(5x)}{1} = 5\\cos(0) = 5',
            reason: 'The numerator differentiates to $5\\cos(5x)$ and the denominator to $1$.',
          },
        ],
        commonMistake: 'Forgetting the chain rule factor of $5$ when differentiating the numerator, leading to $1$.',
        hints: ['Plug in $x=0$ to verify it is $0/0$.', 'Use the chain rule when differentiating $\\sin(5x)$!'],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-sq-2',
        questionType: '基本計算',
        difficulty: 'L2',
        prompt: 'Evaluate the limit at infinity $\\lim_{x \\to \\infty} \\frac{3x^2 + 5x}{2x^2 - 1}$.',
        given: 'A rational function, $x \\to \\infty$',
        find: 'The limit value (height of the horizontal asymptote)',
        numericAnswer: 1.5,
        tolerance: 0.001,
        answerDisplay: '$\\frac{3}{2}$ (or $1.5$)',
        strategy: 'Divide both numerator and denominator by the highest power $x^2$.',
        steps: [
          {
            expression: '\\lim_{x \\to \\infty} \\frac{3 + 5/x}{2 - 1/x^2} = \\frac{3 + 0}{2 - 0} = \\frac{3}{2}',
            reason: 'As $x \\to \\infty$, both $5/x \\to 0$ and $1/x^2 \\to 0$.',
          },
        ],
        commonMistake: 'Mistakenly taking the ratio of the remaining coefficients $5/(-1)$.',
        hints: [
          'Both the numerator and denominator have highest degree $x^2$.',
          'When $x$ grows arbitrarily large, what do $1/x$ and $1/x^2$ approach?',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-sq-3',
        questionType: '考試型題目',
        difficulty: 'L3',
        prompt: 'Evaluate the exponential indeterminate limit $\\lim_{x \\to 0^+} x^x$ ($0^0$ form, adapted from lecture notes).',
        given: '$x^x = e^{x\\ln x}$, $x \\to 0^+$',
        find: 'The limit value',
        numericAnswer: 1,
        tolerance: 0.001,
        answerDisplay: '$1$',
        strategy:
          "Rewrite as $e^{x\\ln x}$, use L'Hôpital to find $\\lim_{x\\to 0^+} x\\ln x = \\lim_{x\\to 0^+} \\frac{\\ln x}{1/x} = 0$, then substitute back into $e^0 = 1$.",
        steps: [
          {
            expression:
              '\\lim_{x\\to 0^+} x\\ln x = \\lim_{x\\to 0^+} \\frac{\\ln x}{1/x} = \\lim_{x\\to 0^+} \\frac{1/x}{-1/x^2} = \\lim_{x\\to 0^+}(-x) = 0',
            reason: "Convert $0\\cdot(-\\infty)$ into $\\frac{-\\infty}{\\infty}$ and apply L'Hôpital's Rule.",
          },
          {
            expression: '\\lim_{x\\to 0^+} x^x = e^0 = 1',
            reason: 'Because $e^u$ is continuous, the limit passes directly into the exponent.',
          },
        ],
        commonMistake: 'Assuming a $0^0$ form must equal $0$.',
        hints: [
          'For $0^0$ forms with $x$ in the exponent, rewrite as $e^{\\ln(x^x)} = e^{x\\ln x}$.',
          "Rewrite $x\\ln x$ as $\\frac{\\ln x}{1/x}$ before applying L'Hôpital's Rule.",
        ],
        sourceType: 'lecture_adapted',
      },
    ],
    visualization: {
      labId: 'limit-secant',
      title: 'Interactive Limit Approximation Explorer (Shared Lab)',
      learningGoal: 'Switch to sin(x)/x mode and observe how the 0/0 indeterminate form converges to 1 as x → 0.',
      parameters: [{ name: 'h', meaning: 'Distance x₀ + h approaching the target point', range: '-1.2 ~ 1.5' }],
      visualMeaning:
        'Although sin(x)/x has an open hole at x = 0, approaching from both the left and right points toward height 1.',
      explorationQuestions: [
        "Does the limit of sin(x)/x found by L'Hôpital's Rule match the graphical trend near x = 0?",
      ],
      boundaryNote: 'The function is undefined at x = 0 itself, yet the limit exists.',
    },
  },
};
