import { KnowledgeNode } from '../../types/curriculum';

export const c1NewtonMethod: KnowledgeNode = {
  id: 'C1-NEWTON-METHOD',
  moduleId: 'M05',
  title: "Newton's Method",
  englishTitle: "Newton's Method",
  courseTags: ['C1'],
  weeks: { C1: [10] },
  priority: 'P0',
  difficulty: 'L2',
  prerequisites: ['C1-LINEAR-APPROX'],
  related: ['C1-ODE-INTRO-EULER'],
  nextNodes: ['C1-ODE-INTRO-EULER'],
  learningObjectives: [
    "Derive Newton's iteration formula x_{n+1} = x_n - f(x_n) / f'(x_n) by setting the linear approximation L(x) = 0",
    "Fluently perform 1–3 steps of Newton's Method by hand to approximate roots of equations",
    "Identify the geometric failure case where the starting point or iterate lands on a horizontal tangent f'(x_n) = 0",
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      "Newton's Method repeatedly draws a tangent line and finds where it hits the $x$-axis: $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$.",
    problemSolved:
      "Polynomial equations of degree 3 or higher and transcendental equations (such as $e^x - 3x = 0$ or solving for target-reaching time in pharmacokinetics) have no closed-form root formula; Newton's Method converges rapidly to the exact root.",
    intuition:
      'Stand at height $f(x_0)$ above your guess $x_0$ and slide straight down the tangent line like a playground slide toward the $x$-axis ($y=0$). The landing spot $x_1$ is usually already much closer to the true root; slide once more and you nearly hit it dead on!',
    mathEvolution: [
      {
        stage: "From 'The Quadratic Formula' to 'Higher-Degree & Transcendental Equations with No Formula'",
        question:
          'We learned $-b\\pm\\sqrt{b^2-4ac}$ for quadratics, but what do we do for $x^3-10=0$ or $e^x-3x=0$ when no algebraic formula exists?',
        breakthrough:
          "Newton set the linear approximation tangent line equal to $0$ to derive $x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)}$; repeating just 2–3 steps shrinks the error to well under one-thousandth!",
        deepDive: {
          title: "Visualizing Newton's Method: Geometric Derivation via Tangent 'Slides' to the Root",
          diagramType: 'newton-tangent',
          diagramCaption:
            'Go straight up from your guess $x_0$ to $(x_0, f(x_0))$ on the curve, draw the tangent line, and see where it crosses the $x$-axis—that intersection is the sharper estimate $x_1$!',
          concepts: [
            {
              term: '1. Where Does the Formula Come From?',
              plainExplain:
                "The tangent line is $y - f(x_n) = f'(x_n)(x - x_n)$. We want where it 'lands' on the $x$-axis, so set $y = 0$ and solve for $x$ to get $x_{n+1}$!",
              formula: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
            },
            {
              term: '2. Why the Initial Guess $x_0$ Matters',
              plainExplain:
                "When an equation has multiple roots, different starting points slide toward different roots; if you unfortunately pick a peak or valley ($f'(x_0)=0$), the horizontal tangent never reaches the $x$-axis.",
            },
          ],
        },
      },
      {
        stage: "From 'Blind Guessing' to 'Recognizing When Iteration Fails'",
        question: "Does Newton's Method always find a root on every try?",
        breakthrough:
          "If an iterate hits a horizontal tangent ($f'(x_n)=0$), the tangent runs parallel to the $x$-axis and never lands—so starting guesses must avoid extrema!",
      },
    ],
    juniorGuide: {
      analogyTitle: "Slide Down the Tangent Line to Find Ground Level ('Height = 0')!",
      analogyStory:
        "Solving a linear equation $ax+b=0$ is easy. When a curved function can't be solved directly, draw a straight slide (the tangent line) at your current spot and calculate where it hits the ground ($y=0$). That landing point becomes your sharper guess for the next round!",
      visualType: 'slope',
      stepByStepDecode: [
        { symbol: '$x_n$', plainMeaning: 'Your guess on round $n$' },
        {
          symbol: '$x_{n+1}$',
          plainMeaning: 'Your sharper next guess after sliding down the tangent line to the $x$-axis',
        },
      ],
    },
    definition:
      "To find a root of $f(x) = 0$ starting from an initial guess $x_0$, whenever $f'(x_n) \\neq 0$, Newton's Method defines the iterative sequence $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$.",
    formulas: [
      {
        name: "Newton's Method Iteration Formula",
        latex: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
        variables: [
          '$x_n$: current guess',
          '$f(x_n)$: current function value',
          "$f'(x_n)$: current tangent slope",
        ],
        conditions: "Denominator $f'(x_n) \\neq 0$ (tangent cannot be horizontal); choose $x_0$ near the target root.",
        commonMisuse:
          "Flipping the fraction upside down to $f'(x_n)/f(x_n)$, or forgetting to rearrange the equation so one side equals $0$ before defining $f(x)$.",
      },
    ],
    geometricMeaning:
      'Each step uses the $x$-intercept of the tangent line at $x_n$ as the next approximation $x_{n+1}$; near a simple root, the number of accurate digits roughly doubles each step (quadratic convergence).',
    solvingSteps: [
      'Rearrange the given equation into the form $f(x) = 0$.',
      "Compute the derivative $f'(x)$.",
      "Evaluate $f(x_n)$ and $f'(x_n)$ in order and substitute into $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$.",
    ],
    workedExamples: [
      {
        id: 'ex-newt-1',
        category: 'basic',
        title: "Basic: Approximating √2 with Newton's Method (Two Iterations)",
        problem: 'Find the positive root of $x^2 - 2 = 0$ starting from $x_0 = 1$, computing $x_1$ and $x_2$.',
        given: '$f(x) = x^2 - 2$, $x_0 = 1$',
        find: '$x_1$ and $x_2$',
        steps: [
          { expression: "f'(x) = 2x", reason: 'First compute the derivative formula.' },
          {
            expression: 'x_1 = 1 - \\frac{1^2 - 2}{2(1)} = 1 - \\frac{-1}{2} = 1.5',
            reason: 'First iteration yields $1.5$.',
          },
          {
            expression: 'x_2 = 1.5 - \\frac{1.5^2 - 2}{2(1.5)} = 1.5 - \\frac{0.25}{3} = \\frac{17}{12} \\approx 1.4167',
            reason: 'Second iteration already closely approaches $\\sqrt{2} \\approx 1.4142$.',
          },
        ],
        answer: '$x_1 = 1.5$, $x_2 = \\frac{17}{12} \\approx 1.4167$',
        verificationNote: '$(17/12)^2 = 289/144 \\approx 2.0069$—in just two steps, the error is under $0.003$!',
      },
      {
        id: 'ex-newt-2',
        category: 'course_style',
        title: 'Course Favorite: Iterating the Transcendental Equation eˣ - x - 2 = 0',
        problem:
          "Use Newton's Method to approximate the positive root of $e^x - x - 2 = 0$ starting at $x_0 = 1$, computing $x_1$ and $x_2$ to four decimal places (Lecture 9 handout example).",
        given: '$f(x) = e^x - x - 2$, $x_0 = 1$ (using $e \\approx 2.7183$)',
        find: '$x_1$ and $x_2$',
        steps: [
          {
            expression: "f'(x) = e^x - 1",
            reason: 'Differentiate $f(x)$; note that the constant $-2$ vanishes.',
          },
          {
            expression: "f(1) = e - 3 \\approx -0.2817,\\quad f'(1) = e - 1 \\approx 1.7183",
            reason: 'Plug in $x_0 = 1$ to get the function value and tangent slope.',
          },
          {
            expression: 'x_1 = 1 - \\frac{-0.2817}{1.7183} \\approx 1.1640',
            reason: 'First iteration shifts the estimate rightward from $1$ to $1.1640$.',
          },
          {
            expression:
              'x_2 = 1.1640 - \\frac{e^{1.1640} - 1.1640 - 2}{e^{1.1640} - 1} \\approx 1.1640 - \\frac{0.0387}{2.2027} \\approx 1.1464',
            reason: 'The second iteration is already right next to the true root $1.14619$!',
          },
        ],
        answer: '$x_1 \\approx 1.1640$, $x_2 \\approx 1.1464$',
        verificationNote:
          "In just two steps, the error shrinks from $0.146$ to $0.0002$—demonstrating the power of Newton's quadratic convergence.",
      },
      {
        id: 'ex-newt-3',
        category: 'course_style',
        title: 'Concept Contrast: Different Initial Guesses x₀ Converge to Different Roots',
        problem:
          "When solving $x^2 - 3 = 0$, start from $x_0 = 3$ and from $x_0 = -1$ separately, performing two steps of Newton's Method to compare where each converges (Lecture 9 handout example).",
        given: '$f(x) = x^2 - 3$, $f\'(x) = 2x$',
        find: '$x_1, x_2$ for both starting values',
        steps: [
          {
            expression: 'x_0 = 3 \\implies x_1 = 3 - \\frac{9-3}{6} = 2 \\implies x_2 = 2 - \\frac{4-3}{4} = 1.75',
            reason: 'Starting at positive $3$ converges rapidly toward the positive root $\\sqrt{3} \\approx 1.7321$.',
          },
          {
            expression: 'x_0 = -1 \\implies x_1 = -1 - \\frac{1-3}{-2} = -2 \\implies x_2 = -2 - \\frac{4-3}{-4} = -1.75',
            reason: 'Starting at negative $-1$, the tangent line sends you toward the negative root $-\\sqrt{3} \\approx -1.7321$!',
          },
        ],
        answer: '$x_0=3$ converges to $+\\sqrt{3}$ ($x_2=1.75$); $x_0=-1$ converges to $-\\sqrt{3}$ ($x_2=-1.75$)',
        verificationNote:
          "Practical takeaway: when an equation has multiple roots, choose $x_0$ near the target root (to avoid jumping to another root or getting stuck where $f'(x_0)=0$).",
      },
    ],
    commonErrors: [
      {
        title: "Starting at a Horizontal Tangent Point f'(x₀) = 0",
        wrongLatex: 'f(x)=x^2-4,\\ x_0=0 \\implies x_1 = 0 - \\frac{-4}{0}',
        rightLatex: "\\text{Avoid } f'(x_0)=0\\text{; choose } x_0 = 1 \\text{ or } 3 \\text{ instead}",
        whyWrong:
          'At $x_0=0$, the tangent line is horizontal and parallel to the $x$-axis—it never hits the $x$-axis and puts zero in the denominator.',
        howToAvoid: "Check that $f'(x_0) \\neq 0$ before substituting $x_0$.",
      },
    ],
    quickReview: {
      keyPoints: [
        "Formula: $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$.",
        "Failure condition: $f'(x_n) = 0$ (horizontal tangent).",
      ],
      whenToUse: 'Approximating roots of high-degree or transcendental equations (like $x^3=10$ or $e^{-x}=x$).',
      trapAlert: 'Remember to rearrange into $f(x)=0$ first! For $e^{-x}=x$, set $f(x)=e^{-x}-x$.',
      decisionTreeKey: 'diff',
      examPatterns: [
        {
          examType: "Pattern A: Computing x₁, x₂ by Hand with Newton's Method",
          triggerWords: "'Newton's method' / approximate a root",
          quickSteps: [
            "Rewrite as $f(x)=0$ and compute $f'(x)$.",
            "Plug into $x_{n+1} = x_n - f(x_n)/f'(x_n)$.",
          ],
          quickSample: {
            problem: '$f(x)=x^2-9, x_0=2$, find $x_1$',
            fastSolve: "$f(2)=-5, f'(2)=4 \\Rightarrow 2 - (-5)/4 = 3.25$",
            answer: '$3.25$',
          },
        },
      ],
    },
    practice: [
      {
        id: 'prac-newt-1',
        questionType: '基本計算',
        difficulty: 'L2',
        prompt:
          "Use Newton's Method to approximate a root of $f(x) = x^3 - 10 = 0$ starting with $x_0 = 2$. Find the first iterate $x_1$ (to two decimal places).",
        given: '$f(x) = x^3 - 10$, $x_0 = 2$',
        find: '$x_1$',
        numericAnswer: 2.1667,
        tolerance: 0.01,
        answerDisplay: '$\\frac{13}{6} \\approx 2.17$',
        strategy: "Compute $f(2) = -2$ and $f'(2) = 12$, then plug into Newton's formula.",
        steps: [
          {
            expression: "f(2) = 8 - 10 = -2,\\quad f'(x) = 3x^2 \\implies f'(2) = 12",
            reason: 'Compute the function value and tangent slope.',
          },
          { expression: 'x_1 = 2 - \\frac{-2}{12} = \\frac{13}{6} \\approx 2.17', reason: 'Substitute into the formula.' },
        ],
        commonMistake: 'Mishandling the double negative and computing $2 - 1/6$.',
        hints: [
          "First compute $f(2) = 2^3 - 10$ and $f'(x) = 3x^2$ at $x=2$.",
          'Subtracting a negative number means adding a positive number.',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-newt-2',
        questionType: '概念辨識',
        difficulty: 'L2',
        prompt:
          "During Newton's Method iteration, if a step happens to land on $f'(x_n) = 0$, what goes wrong geometrically?",
        given: "$f'(x_n) = 0$",
        find: 'Geometric reason for failure',
        options: [
          'The tangent line becomes horizontal and cannot intersect the $x$-axis to produce the next point',
          'It means $x_n$ is already an exact root',
          'The tangent line becomes vertical',
          'The function is discontinuous at that point',
        ],
        correctOptionIndex: 0,
        answerDisplay: 'The tangent line becomes horizontal and cannot intersect the $x$-axis to produce the next point',
        strategy: "$f'(x_n)=0$ means the tangent slope is 0 (horizontal), putting 0 in the denominator of the formula.",
        steps: [
          {
            expression: "f'(x_n) = 0 \\implies \\text{tangent line is parallel to the } x\\text{-axis (no intersection)}",
            reason: 'Division by zero halts the iteration.',
          },
        ],
        commonMistake: "Confusing $f'(x_n)=0$ with having found a root ($f(x_n)=0$ is a root!).",
        hints: [
          "What geometric quantity of the tangent line does $f'(x_n)$ represent?",
          'What does a line with slope 0 look like—will it ever cross the $x$-axis?',
        ],
        sourceType: 'self_authored',
      },
    ],
    visualization: {
      labId: 'newton',
      title: "Newton's Method Tangent Root-Finding Interactive Lab",
      learningGoal:
        'See firsthand how each red tangent line shoots from the curve to the x-axis, locking onto the root within 3 steps.',
      parameters: [
        { name: 'x₀', meaning: 'Initial guess', range: '0.1 ~ 3.0' },
        { name: 'Iterations', meaning: 'Number of tangent jumps performed', range: '1 ~ 5 steps' },
      ],
      visualMeaning:
        'The cyan dashed vertical line meets the curve height, and the solid red tangent line extends straight to its x-intercept.',
      explorationQuestions: [
        'On f(x)=x²-2, drag x₀ to 0.1 (near the horizontal tangent at x=0) and see where the first tangent jump lands!',
        'How many steps does it usually take for the error to drop below 0.001?',
      ],
      boundaryNote:
        "When the initial guess is close to where f'(x)=0, the nearly flat tangent bounces x₁ far away.",
    },
  },
};
