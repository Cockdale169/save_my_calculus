import { KnowledgeNode } from '../../types/curriculum';

export const c1LinearApprox: KnowledgeNode = {
  id: 'C1-LINEAR-APPROX',
  moduleId: 'M05',
  title: 'Linear Approximation & Differentials',
  englishTitle: 'Linear Approximation & Differentials',
  courseTags: ['C1'],
  weeks: { C1: [10] },
  priority: 'P0',
  difficulty: 'L2',
  prerequisites: ['C1-CURVE-ANALYSIS'],
  related: ['C1-NEWTON-METHOD'],
  nextNodes: ['C1-NEWTON-METHOD'],
  learningObjectives: [
    "Write the linear approximation equation L(x) = f(a) + f'(a)(x - a) of a function f(x) around a base point x = a",
    "Use linear approximation and differentials dy = f'(x) dx to estimate complex values or experimental error propagation",
    'Understand why a tangent line is easier to compute near a, and when its error becomes large',
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      "Within a tiny neighborhood of a known point $a$, replace a hard-to-compute curved function with its easy-to-compute tangent line $L(x) = f(a) + f'(a)(x-a)$.",
    problemSolved:
      'When estimating $\\sqrt{9.6}$, $e^{0.04}$, or how a radius measurement error $\\Delta r$ propagates into a volume error $\\Delta V$ by hand, plugging directly into a nonlinear function is hard to do mentally. Linear approximation reduces the calculation to basic addition and multiplication.',
    intuition:
      "Think of treating the Earth's surface as flat ground! Even though the Earth is round, within $100$ meters of where you stand, using a 'flat tangent plane' to estimate elevation is nearly exact; curvature error only shows up if you walk far away.",
    mathEvolution: [
      {
        stage: "From 'Brute-Force Calculator Work' to 'Local Linearization via Tangents'",
        question:
          'When estimating $\\sqrt{4.1}$ by hand or calculating measurement error $\\Delta V$, how do we handle nonlinear curves that are hard to evaluate mentally?',
        breakthrough:
          "Zoom in near $a$ until the curve looks like a straight line $L(x)=f(a)+f'(a)(x-a)$, reducing square roots and powers into simple first-degree addition and multiplication!",
        deepDive: {
          title: 'Visualizing Orders of Approximation: From First-Order Tangent to Higher-Order Taylor Polynomials',
          diagramType: 'linear-taylor',
          diagramCaption:
            'The red first-order tangent fits tightly only very close to $a$; the green second-order (and higher-order Taylor polynomials $P_n(x)$) even match the bending direction, staying accurate much farther out!',
          concepts: [
            {
              term: '1. First-Order Linear Approximation $L(x)$',
              plainExplain:
                "Matches only the height $f(a)$ and slope $f'(a)$—ideal for quick mental estimates very close to $a$.",
              formula: "L(x) = f(a) + f'(a)(x - a)",
            },
            {
              term: '2. Second-Order Approximation & $n$-th Order Taylor Polynomial $P_n(x)$',
              plainExplain:
                "Adds curvature $f''(a)/2!$ and higher derivatives so the polynomial matches the original function's height, slope, and concavity at $a$.",
              formula: 'P_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(a)}{k!}(x - a)^k',
            },
          ],
        },
      },
      {
        stage: "From 'Single-Point Estimation' to 'Error Propagation with Differentials $dy = f'(x)\\,dx$'",
        question:
          'If measuring a spherical cell radius has an error of $0.2\\,\\mu\\text{m}$, how much error does that cause in the cell volume?',
        breakthrough:
          'Multiply the tangent slope directly by the measurement error $dx$ to quickly bound the propagated error.',
      },
    ],
    juniorGuide: {
      analogyTitle: 'Use the Point-Slope Line Equation $y = y_0 + m(x - x_0)$ to Estimate Curves!',
      analogyStory:
        'As long as you know the height and slope at an easy integer point (like $\\sqrt{9}=3$), stepping sideways by a tiny amount $\\Delta x$ raises the height by roughly "slope $\\times$ that tiny step"!',
      visualType: 'slope',
      stepByStepDecode: [
        { symbol: '$L(x)$', plainMeaning: 'Linearization function (simply the equation of the tangent line at $a$)' },
        {
          symbol: "$dy = f'(a)\\,dx$",
          plainMeaning:
            'Differential approximation of change: nudging the input by $dx$ changes the output by roughly "slope $\\times dx$"',
        },
      ],
    },
    symbolRules: [
      {
        symbol: '$\\Delta y \\text{ vs } dy$',
        readAs:
          '$\\Delta y$ is the exact change along the curve; $dy$ is the linear approximation change along the tangent line',
        grammarRule: '$\\Delta y = f(a+\\Delta x) - f(a)$, whereas $dy = f\'(a)\\,dx$ (with $dx = \\Delta x$).',
        metaphor:
          '$\\Delta y$ is the actual altitude gained hiking up a mountain; $dy$ is the altitude estimated from the slope sign.',
        avoidConfusion: 'They are only close when $\\Delta x$ is small—they are not identically equal!',
      },
    ],
    definition:
      "If $f$ is differentiable at $x = a$, the linearization of $f$ at $a$ is defined as $L(x) = f(a) + f'(a)(x - a)$. When $x$ is close to $a$, $f(x) \\approx L(x)$, and the differential is $dy = f'(a)\\,dx$.",
    formulas: [
      {
        name: 'First-Order Linear Approximation Formula (Tangent Approximation)',
        latex: "f(x) \\approx \\hat{f}(x) = f(a) + f'(a)(x - a), \\qquad \\Delta y \\approx dy = f'(a)\\,dx",
        variables: ['$a$: nearby easy-to-compute integer base point', '$x - a = dx$: small step size'],
        conditions:
          "$f$ must be differentiable at $a$ and $|x - a|$ must be small; if $f''(a) > 0$ (concave up), the tangent lies below the curve and slightly underestimates.",
        commonMisuse: 'Forgetting to multiply by $(x - a)$, or using linear approximation too far from $a$.',
      },
      {
        name: 'Second-Order Approximation & n-th Order Taylor Polynomial (Calculus IX)',
        latex:
          "P_n(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\cdots + \\frac{f^{(n)}(a)}{n!}(x-a)^n",
        variables: [
          '$n!$: factorial (e.g., $2!=2,\\ 3!=6,\\ 4!=24$)',
          '$f^{(n)}(a)$: $n$-th derivative of $f$ at $a$',
        ],
        conditions:
          '$f$ must have derivatives up to order $n$ at $x=a$; $n=1$ gives the linear approximation and $n=2$ gives the quadratic approximation.',
        commonMisuse: 'Forgetting to divide by $2!, 3!, \\dots, n!$ in quadratic and Taylor polynomials!',
      },
    ],
    geometricMeaning:
      'Draw the tangent line $y = L(x)$ at $(a, f(a))$; very close to $a$, the height of the tangent line nearly overlaps the curve.',
    solvingSteps: [
      'Choose an easy-to-compute base point $a$ closest to the target $x$.',
      "Compute the base value $f(a)$ and the slope $f'(a)$.",
      "Plug into $L(x) = f(a) + f'(a)(x - a)$ to obtain the approximation.",
    ],
    workedExamples: [
      {
        id: 'ex-lin-1',
        category: 'basic',
        title: 'Basic: Estimating √4.1 via Linear Approximation & Checking Over/Underestimate',
        problem:
          'Use the linear approximation of $f(x) = \\sqrt{x}$ at $a = 4$ to estimate $\\sqrt{4.1}$, and determine whether the estimate is an overestimate or underestimate.',
        given: '$f(x)=\\sqrt{x}$, $a=4$, $x=4.1$',
        find: '$L(4.1)$ and over/underestimate classification',
        steps: [
          {
            expression: "f(4) = 2,\\quad f'(x) = \\frac{1}{2\\sqrt{x}} \\implies f'(4) = \\frac{1}{4} = 0.25",
            reason: 'Compute the value and derivative at $a=4$.',
          },
          {
            expression: 'L(4.1) = 2 + 0.25(4.1 - 4) = 2.025',
            reason: 'Substitute into the linear approximation formula.',
          },
          {
            expression:
              "f''(x) = -\\frac{1}{4}x^{-3/2} < 0\\text{ (concave down)} \\implies \\text{tangent line lies above the curve (slight overestimate)}",
            reason: 'When the second derivative is negative, the tangent line stays above the curve.',
          },
        ],
        answer: '$\\sqrt{4.1} \\approx 2.025$ (slight overestimate)',
        verificationNote: 'The exact value is $\\sqrt{4.1} \\approx 2.024846$, and indeed $2.025 > 2.024846$.',
      },
      {
        id: 'ex-lin-2',
        category: 'course_style',
        title: 'Course Favorite: Quadratic Approximation',
        problem:
          'Find the quadratic approximation $\\hat{g}(x)$ of the cubic polynomial $g(x) = 1 + 2x + x^2 + 3x^3$ near $x = 1$ (Lecture 9 handout example).',
        given: '$g(x) = 1 + 2x + x^2 + 3x^3$, base point $a = 1$',
        find: "Quadratic approximation $\\hat{g}(x) = g(1) + g'(1)(x-1) + \\frac{g''(1)}{2!}(x-1)^2$",
        steps: [
          {
            expression: 'g(1) = 1 + 2(1) + 1^2 + 3(1)^3 = 7',
            reason: 'First compute the function height at the base point $x=1$.',
          },
          {
            expression: "g'(x) = 2 + 2x + 9x^2 \\implies g'(1) = 2 + 2 + 9 = 13",
            reason: 'Compute the slope of the first derivative at $x=1$.',
          },
          {
            expression: "g''(x) = 2 + 18x \\implies g''(1) = 2 + 18 = 20",
            reason: 'Compute the curvature (second derivative) at $x=1$.',
          },
          {
            expression: "\\hat{g}(x) = 7 + 13(x - 1) + \\frac{20}{2!}(x - 1)^2 = 7 + 13(x - 1) + 10(x - 1)^2",
            reason: 'Substitute into the quadratic approximation formula, remembering to divide the quadratic term by $2! = 2$.',
          },
        ],
        answer: '$\\hat{g}(x) = 7 + 13(x-1) + 10(x-1)^2$',
        verificationNote:
          'Tip: expanding gives $10x^2 - 7x + 4$, whose value, first derivative, and second derivative at $x=1$ all match $g(x)$ exactly!',
      },
      {
        id: 'ex-lin-3',
        category: 'course_style',
        title: 'Course Favorite: 4th-Order Taylor Polynomial P₄(x) Approximating eˣ',
        problem:
          'Find the 4th-order Taylor polynomial $P_4(x)$ for $f(x) = e^x$ at $a = 0$, and use it to estimate $e^{0.1}$ (Lecture 9 handout example).',
        given: '$f(x) = e^x$, $a = 0$, degree $n = 4$',
        find: '$P_4(x)$ and $P_4(0.1)$',
        steps: [
          {
            expression: "f(0) = f'(0) = f''(0) = f'''(0) = f^{(4)}(0) = e^0 = 1",
            reason: 'Every derivative of $e^x$ is still $e^x$, so all derivatives at $a=0$ equal $1$.',
          },
          {
            expression: 'P_4(x) = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\frac{x^4}{24}',
            reason: 'Divide sequentially by $1!, 2!, 3!, 4!$ to build the 4th-degree polynomial.',
          },
          {
            expression: 'P_4(0.1) = 1 + 0.1 + \\frac{0.01}{2} + \\frac{0.001}{6} + \\frac{0.0001}{24} \\approx 1.105171',
            reason: 'Substitute $x = 0.1$; higher-order terms shrink rapidly (error is already under $10^{-6}$).',
          },
        ],
        answer: '$P_4(x) = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\frac{x^4}{24}$; $e^{0.1} \\approx 1.105171$',
        verificationNote:
          'First-order linear approximation $L(0.1)=1.1$ has an error of about $0.005$; stepping up to 4th order $P_4(0.1)$ achieves accuracy to 6 decimal places!',
      },
    ],
    commonErrors: [
      {
        title: 'Forgetting to Multiply by the Step Size (x - a)',
        wrongLatex: "f(4.1) \\approx f(4) + f'(4) = 2 + 0.25 = 2.25",
        rightLatex: "f(4.1) \\approx f(4) + f'(4)(4.1 - 4) = 2 + 0.25(0.1) = 2.025",
        whyWrong: 'Slope must be multiplied by the horizontal displacement $(x-a)$ to give the change in height.',
        howToAvoid: "Always write out $dx = x - a$ first before multiplying by $f'(a)$.",
      },
    ],
    quickReview: {
      keyPoints: [
        "$L(x) = f(a) + f'(a)(x - a)$.",
        "$f''(a) < 0$ (concave down) $\\Rightarrow$ tangent above curve (overestimate); $f''(a) > 0$ (concave up) $\\Rightarrow$ underestimate.",
      ],
      whenToUse:
        "Estimating $\\sqrt{a+dx}$, $e^{dx}$, $\\ln(1+dx)$, or propagating errors via $dy = f'(a)dx$.",
      trapAlert: 'Pick an easy-to-compute integer base point $a$ (e.g., $a=0$ for $e^x$, $a=1$ for $\\ln x$).',
      decisionTreeKey: 'diff',
      examPatterns: [
        {
          examType: 'Pattern A: Linear Approximation of Roots / Exponentials / Logs',
          triggerWords: "'Linear approximation' / estimate with tangent line",
          quickSteps: [
            "Pick the closest nice integer $a$ and compute $f(a)$ and $f'(a)$.",
            "Plug into $f(a) + f'(a)(x - a)$.",
          ],
          quickSample: {
            problem: 'Estimate $\\ln(1.05)$',
            fastSolve: "Take $a=1$: $\\ln(1)=0,\\ f'(1)=1 \\Rightarrow 0 + 1(1.05-1)$",
            answer: '$0.05$',
          },
        },
      ],
    },
    practice: [
      {
        id: 'prac-lin-1',
        questionType: '基本計算',
        difficulty: 'L2',
        prompt: 'Use the linear approximation of $f(x) = \\sqrt{x}$ at $a = 9$ to estimate $\\sqrt{9.6}$.',
        given: '$f(x)=\\sqrt{x}$, $a=9$, $x=9.6$',
        find: '$L(9.6)$',
        numericAnswer: 3.1,
        tolerance: 0.001,
        answerDisplay: '$3.1$',
        strategy: "Find $f(9)=3$ and $f'(9)=1/6$, then evaluate $3 + \\frac{1}{6}(9.6-9)$.",
        steps: [
          {
            expression: "f(9) = 3,\\quad f'(9) = \\frac{1}{2\\sqrt{9}} = \\frac{1}{6}",
            reason: 'Compute the value and tangent slope at the base point.',
          },
          { expression: 'L(9.6) = 3 + \\frac{1}{6}(0.6) = 3.1', reason: 'Substitute into the linear approximation formula.' },
        ],
        commonMistake: "Miscalculating $f'(9)$ as $1/3$.",
        hints: ['The derivative of $\\sqrt{x}$ is $\\frac{1}{2\\sqrt{x}}$.', 'The step size is $9.6 - 9 = 0.6$.'],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-lin-2',
        questionType: '模型建立與參數解釋',
        difficulty: 'L2',
        prompt:
          "In a spherical cell volume model $V(r) = \\frac{4}{3}\\pi r^3$, if the radius increases from $r=10\\,\\mu\\text{m}$ by $\\Delta r = 0.2\\,\\mu\\text{m}$, use the differential $dV = V'(r)\\,dr$ to estimate the volume increase in $\\mu\\text{m}^3$ (use $\\pi \\approx 3.14$).",
        given: "$V'(r) = 4\\pi r^2$, $r=10$, $dr=0.2$",
        find: '$dV$',
        numericAnswer: 251.2,
        tolerance: 0.5,
        answerDisplay: '$80\\pi \\approx 251.2\\,\\mu\\text{m}^3$',
        strategy: "Differentiate volume to get surface area $V'(r) = 4\\pi r^2$, then multiply by thickness $dr = 0.2$.",
        steps: [
          {
            expression: 'dV = 4\\pi (10^2) \\cdot (0.2) = 80\\pi \\approx 251.2',
            reason: 'Approximate shell volume = surface area $\\times$ thickness.',
          },
        ],
        commonMistake: 'Forgetting to differentiate $r^3$ first and plugging directly into the volume formula.',
        hints: [
          'What is the derivative of $V(r) = \\frac{4}{3}\\pi r^3$ with respect to $r$?',
          "Compute $V'(10) = 4\\pi(100)$ and multiply by $0.2$.",
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-lin-3',
        questionType: '考試型題目',
        difficulty: 'L3',
        prompt:
          'Use the **2nd-order Taylor polynomial** $P_2(x) = 1 + x + \\frac{1}{2}x^2$ of $f(x) = e^x$ at $a = 0$ to estimate $e^{0.2}$ (to two decimal places).',
        given: '$P_2(x) = 1 + x + \\frac{1}{2}x^2$, $x = 0.2$',
        find: '$P_2(0.2)$',
        numericAnswer: 1.22,
        tolerance: 0.001,
        answerDisplay: '$1.22$',
        strategy: 'Plug $x=0.2$ directly into $1 + x + \\frac{1}{2}x^2$.',
        steps: [
          {
            expression: 'P_2(0.2) = 1 + 0.2 + \\frac{1}{2}(0.2)^2 = 1.2 + 0.02 = 1.22',
            reason:
              'Evaluate at $x=0.2$ (first-order gives $1.2$; adding the second-order correction $+0.02$ brings it much closer to the exact $e^{0.2}\\approx 1.2214$).',
          },
        ],
        commonMistake: 'Forgetting to divide the quadratic term by $2!$ and getting $1.24$.',
        hints: [
          'Substitute into $P_2(x) = 1 + x + \\frac{1}{2}x^2$.',
          '$(0.2)^2 = 0.04$, and remember to divide by $2! = 2$.',
        ],
        sourceType: 'lecture_adapted',
      },
    ],
    visualization: {
      labId: 'limit-secant',
      title: 'Tangent Hugging the Curve Explorer (Shared Lab)',
      learningGoal: 'Observe how the tangent line nearly coincides with the curve when the step size h is small.',
      parameters: [{ name: 'h', meaning: 'Distance dx away from the base point', range: '-1.2 ~ 1.5' }],
      visualMeaning: 'The vertical gap between the tangent line and the curve is the linear approximation error.',
      explorationQuestions: [
        'Why does the gap between the tangent line and the curve grow larger the farther you move from the base point?',
      ],
      boundaryNote: 'Linear approximation is only accurate locally near the base point.',
    },
  },
};
