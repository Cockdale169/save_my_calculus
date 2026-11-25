import { KnowledgeNode } from '../../types/curriculum';

export const c1CurveAnalysis: KnowledgeNode = {
  id: 'C1-CURVE-ANALYSIS',
  moduleId: 'M05',
  title: 'Extrema, Concavity & Curve Sketching',
  englishTitle: 'Extrema, Concavity & Curve Sketching',
  courseTags: ['C1'],
  weeks: { C1: [7, 9] },
  priority: 'P0',
  difficulty: 'L3',
  prerequisites: ['C1-DERIVATIVE-CHAIN-RULE', 'HS-DIAG-ALGEBRA'],
  related: ['C1-IMPLICIT-DIFF'],
  nextNodes: ['C1-INTEGRAL-FTC'],
  learningObjectives: [
    "Use sign charts of the first derivative f'(x) and second derivative f''(x) to sketch complete function graphs (increasing/decreasing intervals and concavity)",
    "Master the four major theorems for continuous/differentiable functions: Intermediate Value Theorem (IVT), Extreme Value Theorem (EVT), Rolle's Theorem, and Mean Value Theorem (MVT)",
    'Find absolute maxima and minima on a closed interval [a, b] by comparing critical points and endpoints',
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      "The first derivative $f'(x)$ tells you whether a graph is 'climbing up or sliding down'; the second derivative $f''(x)$ tells you whether it bends like a 'smile (concave up)' or a 'frown (concave down)'.",
    problemSolved:
      'In optimization problems—such as finding the time of peak drug efficacy, minimum cost, or an inflection point in a reaction rate—we need a systematic way to locate peaks, valleys, and turning points of curvature.',
    intuition:
      "$f'(x) > 0$ means height is increasing (climbing uphill); at the exact top of a peak or bottom of a valley, the slope is $0$ ($f'(x)=0$). If a peak is shaped like an upside-down bowl ($f'' < 0$, concave down), it is a local maximum; if a valley is shaped like a right-side-up bowl ($f'' > 0$, concave up), it is a local minimum.",
    mathEvolution: [
      {
        stage: "From 'Guessing Numbers' to 'Finding Peaks and Valleys with the First Derivative'",
        question:
          'Without plotting the whole graph, how can we tell where a curve reaches its highest point (peak drug effect) or lowest point (minimum cost)?',
        breakthrough:
          "At the exact crest of a hill or bottom of a valley, the slope must be horizontal ($f'(x)=0$)! Solving $f'(x)=0$ pinpoints every candidate extremum.",
        deepDive: {
          title: 'Visualizing the Three Existence Theorems: IVT, EVT, and MVT',
          diagramType: 'extrema-mvt',
          diagramCaption:
            'For the secant line connecting start point $a$ and end point $b$, a smooth curve is guaranteed to have at least one point $c$ in between whose tangent line is parallel to that secant!',
          concepts: [
            {
              term: '1. Intermediate Value Theorem (IVT)',
              plainExplain:
                'A continuous curve going from negative to positive must cross the $x$-axis at least once in between (used to prove equations have real roots).',
            },
            {
              term: '2. Extreme Value Theorem (EVT)',
              plainExplain:
                'As long as a function is continuous on a closed interval $[a, b]$, it is guaranteed to attain both an absolute maximum and an absolute minimum (either at an interior critical point or at an endpoint).',
            },
            {
              term: '3. Mean Value Theorem (MVT)',
              plainExplain:
                "The average slope (secant line) must equal the instantaneous tangent slope $f'(c)$ at some interior point. When $f(a)=f(b)$ (horizontal secant), this reduces to Rolle's Theorem: $f'(c)=0$.",
              formula: "f'(c) = \\frac{f(b) - f(a)}{b - a}",
            },
          ],
        },
      },
      {
        stage: "From 'Slope Direction' to 'Curvature Shape (Concavity) via the Second Derivative'",
        question: 'When the slope is $0$, is that point a peak, a valley, or just a flat plateau?',
        breakthrough:
          'Introducing $f\'\'(x)$ shows whether the curve bends like a frown ($f\'\'<0$, concave down $\\Rightarrow$ peak) or a smile ($f\'\'>0$, concave up $\\Rightarrow$ valley), and also locates inflection points where growth shifts from accelerating to slowing down!',
      },
    ],
    juniorGuide: {
      analogyTitle: "Hiking by Slope: First Derivative Shows 'Uphill/Downhill', Second Derivative Shows 'Smile or Frown'!",
      analogyStory:
        "You learned earlier whether a parabola opens upward or downward. The first derivative $f'(x)$ tells you whether you are currently hiking uphill ($+$) or downhill ($-$); the second derivative $f''(x)$ tells you whether the trail bends like a smile (concave up) or an upside-down bowl (concave down). Together, they let you sketch the whole function without plotting points!",
      visualType: 'slope',
      stepByStepDecode: [
        {
          symbol: "$f'(c) = 0$",
          plainMeaning: 'Horizontal tangent (could be a peak, a valley, or a brief flat resting ledge)',
        },
        {
          symbol: "$f''(x) > 0$",
          plainMeaning: "The graph bends like a smile—'concave up' (slope keeps getting steeper)",
        },
      ],
    },
    formulas: [
      {
        name: 'First and Second Derivative Tests',
        latex:
          "f'(c) = 0 \\text{ and } \\begin{cases} f''(c) < 0 \\implies \\text{local maximum} \\\\ f''(c) > 0 \\implies \\text{local minimum} \\end{cases}",
        variables: ["$c$: critical point (interior point where $f'(c)=0$ or $f'(c)$ does not exist)"],
        conditions:
          "If $f''(c) = 0$, the second derivative test is inconclusive, and you must go back to checking the sign change of $f'(x)$ around $c$.",
        commonMisuse:
          "Assuming $f'(c)=0$ automatically guarantees an extremum (for example, $f(x)=x^3$ at $x=0$ is neither a max nor a min), or forgetting to check endpoints $a, b$ when finding absolute extrema on a closed interval.",
      },
      {
        name: 'Four Core Theorems of Continuity & Differentiability (IVT / EVT / Rolle / MVT)',
        latex:
          "\\text{Rolle: } f(a)=f(b) \\Rightarrow \\exists c,\\ f'(c)=0; \\qquad \\text{MVT: } \\exists c,\\ f'(c) = \\frac{f(b)-f(a)}{b-a}",
        variables: ['$a < c < b$: guaranteed existence of at least one interior point $c$'],
        conditions:
          'IVT and EVT only require $f$ to be continuous on $[a,b]$; Rolle and MVT require continuity on $[a,b]$ and differentiability on $(a,b)$.',
        commonMisuse:
          'Forgetting to state that the function is continuous on the interval before applying the Intermediate Value Theorem (IVT) to locate a root.',
      },
    ],
    geometricMeaning:
      "When $f''(x) > 0$, tangent lines lie below the curve (concave up, slope increasing); when $f''(x) < 0$, tangent lines lie above the curve (concave down, slope decreasing); a point where concavity switches sign is an inflection point.",
    solvingSteps: [
      "Compute $f'(x)$ and solve $f'(x) = 0$ (also note any points where $f'(x)$ does not exist) to find critical points.",
      "Mark the critical points on a number line and test the sign of $f'(x)$ on each interval to find increasing ($+$) and decreasing ($-$) intervals.",
      "Compute $f''(x)$, solve $f''(x) = 0$, and check for sign changes to identify concavity and inflection points.",
      'For absolute extrema on a closed interval $[a, b]$: plug all interior critical points and the endpoints $a, b$ back into $f(x)$ and compare values.',
    ],
    workedExamples: [
      {
        id: 'ex-curve-1',
        category: 'basic',
        title: 'Basic: Finding Extrema, Concavity Intervals, and Inflection Points',
        problem: 'Analyze the increasing/decreasing intervals, local extrema, and inflection point of $f(x) = x^3 - 3x + 1$.',
        given: '$f(x) = x^3 - 3x + 1$',
        find: 'Local maxima/minima and inflection point',
        steps: [
          {
            expression: "f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1) = 0 \\implies x = -1, 1",
            reason: 'Compute the first derivative and factor to find critical points.',
          },
          {
            expression: "f''(x) = 6x",
            reason: 'Compute the second derivative to classify extrema and locate inflection points.',
          },
          {
            expression: "f''(-1) = -6 < 0 \\implies x=-1\\text{ is a local max, } f(-1)=3",
            reason: 'Concave down (like a hilltop).',
          },
          {
            expression: "f''(1) = 6 > 0 \\implies x=1\\text{ is a local min, } f(1)=-1",
            reason: 'Concave up (like a valley floor).',
          },
          {
            expression:
              "f''(x) = 6x = 0 \\implies x = 0\\text{ (sign changes } - \\text{ to } +),\\text{ inflection point }(0, 1)",
            reason: 'Concavity switches from concave down to concave up.',
          },
        ],
        answer: 'Local max $(-1, 3)$, local min $(1, -1)$, inflection point $(0, 1)$',
        verificationNote:
          'Interval check: increasing on $x < -1$, decreasing on $(-1, 1)$, increasing on $x > 1$, matching the extrema locations.',
      },
      {
        id: 'ex-curve-2',
        category: 'course_style',
        title: 'Course Favorite: Trigonometric Curve Sketching f(x) = x + cos x',
        problem:
          'Analyze the monotonicity, extrema, concavity, and inflection points of $f(x) = x + \\cos x$ on the closed interval $[0, 2\\pi]$ (Lecture 8 handout example).',
        given: '$f(x) = x + \\cos x$, $x \\in [0, 2\\pi]$',
        find: 'Monotonic intervals, extrema locations, and inflection point coordinates',
        steps: [
          {
            expression: "f'(x) = 1 - \\sin x \\ge 0 \\quad (\\text{since } \\sin x \\le 1)",
            reason:
              "First find the first derivative; because $\\sin x$ is at most $1$, $f'(x)$ can never be negative.",
          },
          {
            expression: "f'(x) = 0 \\iff \\sin x = 1 \\iff x = \\frac{\\pi}{2}",
            reason:
              "The only critical point in $[0, 2\\pi]$ is $x = \\pi/2$; since $f'(x)$ is positive on both sides, the function is strictly increasing overall, so this is not an extremum (just a horizontal tangent).",
          },
          {
            expression: "f''(x) = -\\cos x = 0 \\implies x = \\frac{\\pi}{2},\\ \\frac{3\\pi}{2}",
            reason: 'Find the second derivative to identify candidate inflection points.',
          },
          {
            expression:
              "(0, \\tfrac{\\pi}{2}): f'' < 0\\text{ (concave down)},\\quad (\\tfrac{\\pi}{2}, \\tfrac{3\\pi}{2}): f'' > 0\\text{ (concave up)},\\quad (\\tfrac{3\\pi}{2}, 2\\pi): f'' < 0\\text{ (concave down)}",
            reason: 'Check the sign of $-\\cos x$ on all three subintervals to confirm concavity changes at both points.',
          },
          {
            expression:
              "\\text{Inflection points: }\\left(\\frac{\\pi}{2},\\ \\frac{\\pi}{2}\\right)\\text{ and }\\left(\\frac{3\\pi}{2},\\ \\frac{3\\pi}{2}\\right)",
            reason: 'Plug $x = \\pi/2$ and $3\\pi/2$ back into $f(x) = x + \\cos x$ (where $\\cos x = 0$ at both).',
          },
        ],
        answer:
          'Strictly increasing on $[0, 2\\pi]$ (absolute min $f(0)=1$, absolute max $f(2\\pi)=2\\pi+1$); inflection points $(\\frac{\\pi}{2}, \\frac{\\pi}{2})$ and $(\\frac{3\\pi}{2}, \\frac{3\\pi}{2})$',
        verificationNote:
          "Key trap: $f'(\\pi/2)=0$ does NOT guarantee an extremum! You must check whether $f'$ changes sign across it (or look at $f''(\\pi/2)=0$).",
      },
      {
        id: 'ex-curve-3',
        category: 'course_style',
        title: 'Theorem Proof: Proving Root Existence with the Intermediate Value Theorem (IVT)',
        problem:
          'Prove that the equation $e^x = 5x + 10$ has at least one real solution for $x > 0$ (Lecture 8 handout example).',
        given: 'Equation $e^x = 5x + 10$, domain $x > 0$',
        find: 'Existence of $c > 0$ satisfying the equation',
        steps: [
          {
            expression: 'h(x) = e^x - 5x - 10\\text{ (define the difference function, continuous on } [0, \\infty)\\text{)}',
            reason:
              "Rewrite 'two functions being equal' as 'a single continuous function equaling $0$' so IVT can be applied.",
          },
          {
            expression: 'h(0) = e^0 - 0 - 10 = -9 < 0',
            reason: 'Test a starting point $x=0$ and observe the value is negative.',
          },
          {
            expression: 'h(4) = e^4 - 5(4) - 10 = e^4 - 30 > 2.7^4 - 30 \\approx 53.1 - 30 > 0',
            reason: 'Test a larger point $x=4$ (since $e > 2.7$, $e^4 > 53 > 30$), giving a positive value.',
          },
          {
            expression: 'h(0) < 0 < h(4) \\xrightarrow{\\text{IVT}} \\exists c \\in (0, 4) \\text{ s.t. } h(c) = 0',
            reason: 'A continuous function moving from negative to positive must cross the $x$-axis at least once.',
          },
        ],
        answer: 'By the Intermediate Value Theorem (IVT), there exists at least one solution $c \\in (0, 4)$ with $c > 0$ satisfying $e^c = 5c + 10$',
        verificationNote:
          'Hint: testing $x=3$ gives $e^3 \\approx 20.09 < 25$, which is still negative, so you need to test further right at $x=4$ to turn positive.',
      },
      {
        id: 'ex-curve-4',
        category: 'course_style',
        title: 'Theorem Application: Mean Value Theorem (MVT) & Midpoint Property of Parabolas',
        problem:
          'Let $f(x) = px^2 + qx + r$ ($p \\neq 0$) be a quadratic function. Prove that on any closed interval $[x_1, x_2]$, the point $c$ guaranteed by the Mean Value Theorem is always the midpoint $c = \\frac{x_1 + x_2}{2}$ (Lecture 8 handout example).',
        given: '$f(x) = px^2 + qx + r$, $p \\neq 0$, interval $[x_1, x_2]$',
        find: 'The point $c$ satisfying $f\'(c) = \\frac{f(x_2)-f(x_1)}{x_2-x_1}$',
        steps: [
          {
            expression:
              '\\frac{f(x_2) - f(x_1)}{x_2 - x_1} = \\frac{p(x_2^2 - x_1^2) + q(x_2 - x_1)}{x_2 - x_1} = p(x_1 + x_2) + q',
            reason:
              'Compute the slope of the secant line through the endpoints, factoring $x_2^2 - x_1^2 = (x_2-x_1)(x_2+x_1)$ to cancel.',
          },
          {
            expression: "f'(c) = 2pc + q",
            reason: 'Compute the tangent slope at point $c$.',
          },
          {
            expression:
              '2pc + q = p(x_1 + x_2) + q \\implies 2pc = p(x_1 + x_2) \\implies c = \\frac{x_1 + x_2}{2}',
            reason:
              'Subtract $q$ from both sides and divide by $2p$ (valid since $p \\neq 0$), showing $c$ must be the midpoint of $[x_1, x_2]$.',
          },
        ],
        answer: '$c = \\frac{x_1 + x_2}{2} \\in (x_1, x_2)$',
        verificationNote:
          'Geometric meaning: on any parabola, the tangent parallel to any secant line always touches the curve directly halfway between the two endpoints.',
      },
    ],
    commonErrors: [
      {
        title: 'Forgetting Endpoints for Absolute Extrema on a Closed Interval',
        wrongLatex: "\\text{Comparing only points where } f'(c)=0 \\text{ to claim max/min}",
        rightLatex: '\\max_{[a,b]} f(x) = \\max\\{f(a),\\ f(b),\\ f(\\text{interior critical points})\\}',
        whyWrong: 'A function can reach a higher or lower value at the boundary endpoints $a$ or $b$ than at any interior peak or valley.',
        howToAvoid:
          "Whenever a question asks for 'absolute maximum/minimum on $[a, b]$', circle $a$ and $b$ right away so they stay on your candidate list.",
      },
    ],
    quickReview: {
      keyPoints: [
        "$f' > 0$ increasing, $f' < 0$ decreasing; $f'$ changing $+$ to $-$ gives a local max, $-$ to $+$ gives a local min.",
        "$f'' > 0$ concave up, $f'' < 0$ concave down; sign changes of $f''$ give inflection points.",
        'Absolute extrema on a closed interval = compare $f(x)$ at critical points and endpoints.',
      ],
      whenToUse: 'Finding maxima/minima, solving optimization problems, determining concavity and inflection points.',
      trapAlert:
        "An inflection point requires an actual sign change in $f''$, not merely $f''(c)=0$ (for example, $x^4$ at $x=0$ is NOT an inflection point).",
    },
    practice: [
      {
        id: 'prac-curve-1',
        questionType: '基本計算',
        difficulty: 'L2',
        prompt: 'Find the absolute minimum value of $f(x) = x^2 - 4x + 5$ on the closed interval $[0, 3]$.',
        given: '$f(x) = x^2 - 4x + 5$, $x \\in [0, 3]$',
        find: 'Absolute minimum value',
        numericAnswer: 1,
        tolerance: 0.001,
        answerDisplay: '$1$ (attained at $x = 2$)',
        strategy: 'Find any critical points inside the interval and compare $f(x)$ with the endpoints $0$ and $3$.',
        steps: [
          {
            expression: "f'(x) = 2x - 4 = 0 \\implies x = 2 \\in (0, 3)",
            reason: 'The critical point lies inside the interval.',
          },
          {
            expression: 'f(0) = 5,\\quad f(2) = 1,\\quad f(3) = 2',
            reason: 'Compare the function values at the critical point and both endpoints.',
          },
        ],
        commonMistake:
          'Answering with the critical point location $x=2$ instead of the minimum value $f(2)=1$.',
        hints: [
          "First set $f'(x) = 0$ to find the critical point.",
          'Evaluate $f(0), f(2), f(3)$ and pick the smallest—the minimum value is the $y$-value, not $x$.',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-curve-2',
        questionType: '概念辨識',
        difficulty: 'L2',
        prompt: "If a function satisfies $f'(2) = 0$ and $f''(2) = -5$ at $x = 2$, what feature occurs at $x = 2$?",
        given: "$f'(2)=0$, $f''(2)=-5 < 0$",
        find: 'Geometric feature at $x=2$',
        options: ['Local minimum', 'Local maximum', 'Inflection point', 'Vertical asymptote'],
        correctOptionIndex: 1,
        answerDisplay: 'Local maximum',
        strategy: 'First derivative 0 and second derivative negative (concave down) means a peak.',
        steps: [
          {
            expression: "f'(2) = 0 \\text{ and } f''(2) < 0 \\implies \\text{horizontal tangent while concave down (local max)}",
            reason: 'Second derivative test.',
          },
        ],
        commonMistake: 'Seeing a negative number and mistakenly picking local minimum.',
        hints: [
          'Does $f\'\'(2) < 0$ mean concave up or concave down?',
          'Is the top of an upside-down bowl (concave down) a maximum or a minimum?',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-curve-3',
        questionType: '考試型題目',
        difficulty: 'L3',
        prompt:
          "Given that $f(x) = x^2$ satisfies the Mean Value Theorem (MVT) on $[1, 3]$, find the guaranteed point $c \\in (1, 3)$ such that $f'(c) = \\frac{f(3)-f(1)}{3-1}$.",
        given: '$f(x)=x^2$, $[a,b]=[1,3]$',
        find: 'The value of $c$',
        numericAnswer: 2,
        tolerance: 0.001,
        answerDisplay: '$c = 2$',
        strategy: "Compute the secant slope $\\frac{9-1}{3-1} = 4$, then solve $f'(c) = 2c = 4$ for $c$.",
        steps: [
          {
            expression: '\\frac{f(3)-f(1)}{3-1} = \\frac{9-1}{2} = 4',
            reason: 'Compute the slope of the secant line connecting the endpoints.',
          },
          {
            expression: "f'(c) = 2c = 4 \\implies c = 2 \\in (1, 3)",
            reason: 'For a quadratic function, the MVT point is the midpoint $\\frac{1+3}{2} = 2$.',
          },
        ],
        commonMistake: "Stopping after finding the slope $4$ and forgetting to solve $f'(c)=4$.",
        hints: [
          'First calculate the secant slope $\\frac{f(3)-f(1)}{3-1}$ on the right-hand side.',
          "Set $f'(c) = 2c$ equal to that slope and solve for $c$.",
        ],
        sourceType: 'lecture_adapted',
      },
    ],
    visualization: {
      labId: 'limit-secant',
      title: 'Tangent Slope & Extrema Explorer (Shared Lab)',
      learningGoal: "Observe the sign of the tangent slope and concavity of f(x) = x² at different positions.",
      parameters: [{ name: 'h', meaning: 'Secant step size', range: '-1.2 ~ 1.5' }],
      visualMeaning:
        "The parabola x² is always concave up (f''(x) = 2 > 0), and its tangent slope increases as x grows.",
      explorationQuestions: ['In f(x) = x², why does the tangent slope f\'(x) = 2x grow larger as you move further right?'],
      boundaryNote: 'When the second derivative is 0, you must check how the first derivative changes sign.',
    },
  },
};
