import { KnowledgeNode } from '../../types/curriculum';

export const c1ImplicitDiff: KnowledgeNode = {
  id: 'C1-IMPLICIT-DIFF',
  moduleId: 'M04',
  title: 'Implicit & Inverse Function Differentiation',
  englishTitle: 'Implicit & Inverse Function Differentiation',
  courseTags: ['C1'],
  weeks: { C1: [6] },
  priority: 'P0',
  difficulty: 'L3',
  prerequisites: ['C1-DERIVATIVE-CHAIN-RULE', 'HS-EXP-LOG'],
  related: ['C1-CURVE-ANALYSIS'],
  nextNodes: ['C1-CURVE-ANALYSIS'],
  learningObjectives: [
    'Handle equations that cannot be explicitly isolated as $y = f(x)$ by differentiating both sides with respect to $x$',
    'Understand why differentiating a $y$-term requires multiplying by $\\frac{dy}{dx}$ (an application of the chain rule)',
    'Derive and memorize the derivative formulas for inverse trigonometric functions $\\arcsin x$ and $\\arctan x$',
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      'When $y$ and $x$ are tangled together in an equation, differentiate both sides directly with respect to $x$, and whenever you differentiate a $y$-term, multiply by $\\frac{dy}{dx}$ via the chain rule.',
    problemSolved:
      'Equations like the circle $x^2 + y^2 = 25$ or biological allometric scaling laws cannot easily be written as a single explicit function $y = f(x)$. Implicit differentiation lets us find the tangent slope $\\frac{dy}{dx}$ directly without solving for $y$.',
    intuition:
      'Imagine $y$ as a hidden little box $y(x)$ containing $x$. When differentiating $y^2$, the outer power rule gives $2y$, and by the chain rule you must multiply at the end by the derivative of the inner box, $\\frac{dy}{dx}$.',
    mathEvolution: [
      {
        stage: "From 'Explicit Functions $y=f(x)$' to 'Tangled Implicit Relations'",
        question:
          'An equation like the circle $x^2 + y^2 = 25$ cannot even be written as a single function $y=f(x)$—how do we find the slope of its tangent line at a point?',
        breakthrough:
          "There is no need to solve for $y$! Differentiate both sides with respect to $x$: simply treat $y$ as a function of $x$, multiply by $\\frac{dy}{dx}$ whenever differentiating $y$ (the chain rule), and solve for the slope directly!",
      },
      {
        stage: "Deriving the Derivatives of 'Logarithms and Inverse Trig Functions' Along the Way",
        question: 'What if we do not yet know the slope formulas for $\\ln x$ or $\\arctan x$?',
        breakthrough:
          'Rewrite them using their inverse definitions—$e^y = x$ or $\\tan y = x$—and one step of implicit differentiation automatically produces $\\frac{1}{x}$ and $\\frac{1}{1+x^2}$!',
      },
    ],
    juniorGuide: {
      analogyTitle: "Treat $y$ as a 'Mystery Box Containing $x$', and Multiply by the Box's Slope $\\frac{dy}{dx}$!",
      analogyStory:
        'In algebra, equations often keep $x$ and $y$ on the same side (like $x^2+y^2=25$). Implicit differentiation skips isolating $y$: just differentiate both sides directly. Differentiate $x$ as usual; when you hit $y$, differentiate it normally and tack on $\\frac{dy}{dx}$, then solve for $\\frac{dy}{dx}$ just like solving a linear equation!',
      visualType: 'chain',
      stepByStepDecode: [
        {
          symbol: '$\\frac{d}{dx}(y^2) = 2y\\frac{dy}{dx}$',
          plainMeaning:
            'Differentiate $y^2$ to get $2y$, then multiply by the derivative $\\frac{dy}{dx}$ of the hidden inner box',
        },
        {
          symbol: '$\\arctan x$',
          plainMeaning: 'Inverse tangent function, whose slope formula is $\\frac{1}{1+x^2}$',
        },
      ],
    },
    formulas: [
      {
        name: 'Core Technique of Implicit Differentiation',
        latex: "\\frac{d}{dx}[g(y)] = g'(y)\\frac{dy}{dx}",
        variables: ['$y = y(x)$: treated locally as a function of $x$', '$\\frac{dy}{dx}$: the slope to solve for'],
        conditions:
          'Assumes $y$ can be regarded locally as a differentiable function of $x$ near the point, and the resulting denominator is nonzero.',
        commonMisuse:
          'Writing only $2y$ when differentiating $y^2$ without multiplying by $\\frac{dy}{dx}$, or forgetting that a constant like $25$ on the right-hand side differentiates to $0$.',
      },
      {
        name: 'Logarithmic and Inverse Trigonometric Derivatives',
        latex:
          '\\frac{d}{dx}(\\ln x) = \\frac{1}{x} \\ (x>0), \\quad \\frac{d}{dx}(\\arctan x) = \\frac{1}{1+x^2}, \\quad \\frac{d}{dx}(\\arcsin x) = \\frac{1}{\\sqrt{1-x^2}} \\ (|x|<1)',
        variables: ['$x$: independent variable'],
        conditions:
          '$\\ln x$ requires $x > 0$; the derivative of $\\arcsin x$ requires $|x| < 1$ (at endpoints $\\pm 1$, the tangent is vertical and non-differentiable).',
        commonMisuse: 'Writing $1 - x^2$ or adding a square root in the denominator of $(\\arctan x)\'$.',
      },
    ],
    geometricMeaning:
      'At any point $(x, y)$ ($y \\neq 0$) on the circle $x^2 + y^2 = 25$, the tangent slope $\\frac{dy}{dx} = -\\frac{x}{y}$ is perpendicular to the radius slope $\\frac{y}{x}$ (their product is $-1$).',
    solvingSteps: [
      'Differentiate both sides of the equation with respect to $x$ (constants differentiate to $0$).',
      'For any product involving both $x$ and $y$ (such as $xy$), be sure to apply the product rule: $1\\cdot y + x\\frac{dy}{dx}$.',
      'Move all terms containing $\\frac{dy}{dx}$ to one side and factor out $\\frac{dy}{dx}$.',
      'Divide to isolate $\\frac{dy}{dx}$ (if given a specific point $(x_0, y_0)$, substituting the numbers right after differentiating reduces arithmetic mistakes).',
    ],
    workedExamples: [
      {
        id: 'ex-imp-1',
        category: 'basic',
        title: 'Basic: Finding the Tangent Slope at a Point on a Circle',
        problem: 'Find the tangent slope $\\frac{dy}{dx}$ of the equation $x^2 + y^2 = 25$ at the point $(3, 4)$.',
        given: '$x^2 + y^2 = 25$, point $(3, 4)$',
        find: 'Value of $\\frac{dy}{dx}$ at $(3, 4)$',
        steps: [
          {
            expression: '\\frac{d}{dx}(x^2) + \\frac{d}{dx}(y^2) = \\frac{d}{dx}(25)',
            reason: 'Differentiate both sides with respect to $x$.',
          },
          {
            expression: '2x + 2y\\frac{dy}{dx} = 0',
            reason: 'Apply the chain rule to $y^2$ to include $\\frac{dy}{dx}$; the constant $25$ differentiates to $0$.',
          },
          {
            expression: '\\frac{dy}{dx} = -\\frac{x}{y} \\implies \\left.\\frac{dy}{dx}\\right|_{(3,4)} = -\\frac{3}{4}',
            reason: 'Solve for $\\frac{dy}{dx}$ and substitute $(3, 4)$.',
          },
        ],
        answer: '$-\\frac{3}{4}$',
        verificationNote:
          'Differentiating the upper semicircle $y = \\sqrt{25-x^2}$ explicitly gives $\\frac{-x}{\\sqrt{25-x^2}}$, which at $x=3$ equals $-3/4$—an exact match.',
      },
    ],
    commonErrors: [
      {
        title: 'Forgetting the Product Rule on xy',
        wrongLatex: '\\frac{d}{dx}(xy) = \\frac{dy}{dx}',
        rightLatex: '\\frac{d}{dx}(xy) = 1 \\cdot y + x \\cdot \\frac{dy}{dx}',
        whyWrong: 'Both $x$ and $y$ are functions of $x$, so their product requires the product rule.',
        howToAvoid: "Whenever you see $xy$, immediately split it in your mind into 'derivative of first × second + first × derivative of second'.",
      },
    ],
    quickReview: {
      keyPoints: [
        'Differentiating a $y$-term requires multiplying by $\\frac{dy}{dx}$.',
        'A product term $xy$ uses the product rule: $y + x\\frac{dy}{dx}$.',
        "$(\\arctan x)' = \\frac{1}{1+x^2}$ and $(\\arcsin x)' = \\frac{1}{\\sqrt{1-x^2}}$.",
      ],
      whenToUse:
        'When $x$ and $y$ are mixed in an equation making it hard to isolate $y$, or when deriving derivatives of inverse and inverse trig functions.',
      trapAlert: 'The constant on the right-hand side differentiates to $0$—do not forget to differentiate the right side!',
    },
    practice: [
      {
        id: 'prac-imp-1',
        questionType: '基本計算',
        difficulty: 'L3',
        prompt: 'Given $x^2 + xy + y^2 = 7$, find $\\frac{dy}{dx}$ at the point $(1, 2)$.',
        given: '$x^2 + xy + y^2 = 7$, $(x, y) = (1, 2)$',
        find: '$\\frac{dy}{dx}$',
        numericAnswer: -0.8,
        tolerance: 0.001,
        answerDisplay: '$-\\frac{4}{5}$ (or $-0.8$)',
        strategy: 'Differentiate both sides with respect to $x$ (using the product rule on $xy$), then plug in $(1, 2)$ directly to solve for $\\frac{dy}{dx}$.',
        steps: [
          {
            expression: '2x + \\left(y + x\\frac{dy}{dx}\\right) + 2y\\frac{dy}{dx} = 0',
            reason: 'Differentiate both sides with respect to $x$.',
          },
          {
            expression: '2(1) + 2 + 1\\cdot\\frac{dy}{dx} + 4\\frac{dy}{dx} = 0 \\implies 4 + 5\\frac{dy}{dx} = 0',
            reason: 'Substitute $x=1, y=2$.',
          },
          { expression: '\\frac{dy}{dx} = -\\frac{4}{5} = -0.8', reason: 'Solve for the tangent slope.' },
        ],
        commonMistake: 'Dropping the $y$ term when differentiating $xy$.',
        hints: [
          'Differentiate $x^2 + xy + y^2 = 7$ term by term, remembering the product rule for $xy$.',
          'Plugging in $x=1, y=2$ right after differentiating makes solving for $\\frac{dy}{dx}$ much faster!',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-imp-2',
        questionType: '公式選擇與套用',
        difficulty: 'L2',
        prompt: 'Evaluate $\\frac{d}{dx} \\arctan(2x)$.',
        given: '$y = \\arctan(2x)$',
        find: '$\\frac{dy}{dx}$',
        options: [
          '$\\frac{1}{1 + 4x^2}$',
          '$\\frac{2}{1 + 4x^2}$',
          '$\\frac{2}{1 + 2x^2}$',
          '$\\frac{2}{\\sqrt{1 - 4x^2}}$',
        ],
        correctOptionIndex: 1,
        answerDisplay: '$\\frac{2}{1 + 4x^2}$',
        strategy: "Apply $(\\arctan u)' = \\frac{1}{1+u^2} \\cdot u'$ with $u = 2x$.",
        steps: [
          {
            expression: '\\frac{1}{1 + (2x)^2} \\cdot 2 = \\frac{2}{1 + 4x^2}',
            reason: 'Note that $(2x)^2 = 4x^2$, and multiply by the inner derivative $2$.',
          },
        ],
        commonMistake: 'Forgetting to square all of $2x$ (writing $1+2x^2$) or omitting the factor of $2$ in the numerator.',
        hints: [
          "The derivative of $\\arctan(u)$ is $\\frac{1}{1+u^2}$ multiplied by $u'$.",
          'Here $u = 2x$, so $u^2 = (2x)^2 = 4x^2$.',
        ],
        sourceType: 'self_authored',
      },
    ],
    visualization: {
      labId: 'chain-rule',
      title: 'Chain Rule & Implicit Differentiation Connection Explorer (Shared Lab)',
      learningGoal:
        "Reinforce why 'multiplying by dy/dx when differentiating y' in implicit differentiation is a direct application of the chain rule.",
      parameters: [
        { name: 'x', meaning: 'Input position', range: '0.2 ~ 3.5' },
        { name: 'k', meaning: 'Inner coefficient', range: '0.2 ~ 2.0' },
      ],
      visualMeaning: 'The structure of multiplying the outer rate by the inner rate is identical.',
      explorationQuestions: [
        "If we treat y(x) as the inner function, why does differentiating y² produce 2y · y'(x)?",
      ],
      boundaryNote:
        'If the denominator of dy/dx obtained from implicit differentiation is 0, the tangent line at that point is vertical.',
    },
  },
};
