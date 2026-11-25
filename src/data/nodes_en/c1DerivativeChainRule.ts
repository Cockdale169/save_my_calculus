import { KnowledgeNode } from '../../types/curriculum';

export const c1DerivativeChainRule: KnowledgeNode = {
  id: 'C1-DERIVATIVE-CHAIN-RULE',
  moduleId: 'M04',
  title: 'Chain Rule',
  englishTitle: 'Chain Rule',
  courseTags: ['C1'],
  weeks: { C1: [5] },
  priority: 'P0',
  difficulty: 'L2',
  prerequisites: ['HS-FUNC-COMPOSITION', 'C1-LIMIT-DERIVATIVE-INTUITION'],
  related: ['C1-IMPLICIT-DIFF', 'C1-INTEGRAL-TECHNIQUES'],
  nextNodes: ['C1-IMPLICIT-DIFF', 'C1-INTEGRAL-TECHNIQUES'],
  learningObjectives: [
    'Correctly identify the outer function f(u) and inner function u = g(x) in a composite function',
    'Fluently apply the chain rule to differentiate exponential, trigonometric, and polynomial compositions',
    "Avoid the most common mistake of forgetting to multiply by the inner derivative g'(x)",
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      "Derivative of a composite function = 'outer derivative (keeping the inner expression unchanged)' times 'inner derivative'.",
    problemSolved:
      'Most real-world functions are not plain $e^x$ or $\\sin x$, but nested functions like drug decay $e^{-0.3t}$ or oscillation $\\sin(2\\pi t)$. The chain rule is the essential tool for differentiating them.',
    intuition:
      'Think of linked gears: if moving $x$ by $1$ unit moves $u$ by $2$ times as much, and moving $u$ by $1$ unit moves $y$ by $3$ times as much, then moving $x$ by $1$ unit moves $y$ by $3 \\times 2 = 6$ times as much.',
    mathEvolution: [
      {
        stage: "From 'Single-Layer Slopes' to 'Linked Gear Trains of Composite Functions'",
        question:
          'We already know the slopes of $e^x$ and $\\sin x$, but biology and pharmacology use $e^{-0.25t}$ or $\\sin(2\\pi t)$—what do we do when another function is tucked inside?',
        breakthrough:
          'The overall rate of change equals the outer rate with respect to the inner variable times the inner rate with respect to $x$, multiplying the two scaling factors together like geared wheels—making it the most frequently used rule in calculus!',
      },
    ],
    juniorGuide: {
      analogyTitle: 'Bicycle Gears: Big Gear Drives Small Gear—Multiply the Ratios',
      analogyStory:
        'Suppose 1 turn of your pedals spins the middle gear 2 times, and 1 turn of the middle gear spins the rear wheel 3 times. How many times does the rear wheel turn per pedal stroke? $2 \\times 3 = 6$ turns! The chain rule simply multiplies the rates of change across layers.',
      visualType: 'chain',
      stepByStepDecode: [
        {
          symbol: '$f(g(x))$',
          plainMeaning: "'A big box holding a small box': evaluate the inner $g(x)$ first, then apply the outer $f$",
        },
        {
          symbol: "$f'(g(x))$",
          plainMeaning: 'Differentiate the outer box first while copying the inner box $g(x)$ untouched',
        },
        {
          symbol: "$\\cdot\\ g'(x)$",
          plainMeaning: 'Finally, multiply by the rate of change of the inner box itself',
        },
      ],
    },
    symbolRules: [
      {
        symbol: '$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$',
        readAs: 'Rate of change of y with respect to x = (rate of y with respect to u) × (rate of u with respect to x)',
        grammarRule:
          'Here $dy/du$ and $du/dx$ each represent one layer of slope, and the middle dot "$\\cdot$" means multiplication.',
        metaphor:
          'Just like currency exchange: "(30 TWD per 1 USD)" $\\times$ "(1.1 USD per 1 EUR)" = TWD per 1 EUR (the intermediate USD cancels out just like $du$!).',
        avoidConfusion: "Don't stop after computing $\\frac{dy}{du}$—always remember to multiply by $\\frac{du}{dx}$!",
      },
    ],
    visualSteps: [
      {
        stepTitle: 'Peel the Onion: Spot the Outer Shell and Inner Filling',
        metaphor:
          'Like unwrapping a gift box: the outer wrapping paper is the outer function $f(u)$, and the gift tucked inside is the inner function $u = g(x)$.',
        appliedExample:
          'Drug concentration $C(t) = 20e^{-0.25t}$: outer layer is the exponential $20e^u$, inner layer is $u = -0.25t$.',
        diagramType: 'split',
        formulaHint: 'Set $u = g(x)$ so the expression becomes $y = f(u)$',
      },
      {
        stepTitle: 'Unwrap the Outer Layer First (Leave the Inside Untouched!)',
        metaphor:
          "When cutting open the outer shipping box, leave the inner gift box completely intact—don't unwrap both at once.",
        appliedExample:
          'The derivative of $20e^u$ is still $20e^u$; copying $u=-0.25t$ untouched gives $20e^{-0.25t}$.',
        diagramType: 'transform',
        formulaHint: "$f'(g(x))$",
      },
      {
        stepTitle: 'Multiply by the Rate of the Inner Filling',
        metaphor: 'Now check how fast the inner gear is turning, and multiply by that inner slope at the end.',
        appliedExample: 'The inner $-0.25t$ differentiates to $-0.25$, giving $-5e^{-0.25t}$.',
        diagramType: 'calculate',
        formulaHint: "$f'(g(x)) \\cdot g'(x)$",
      },
    ],
    strategyTrainer: [
      {
        scenario: 'You are asked to differentiate $y = e^{-5x}$.',
        question: 'Which is the correct first step for splitting the layers?',
        choices: [
          {
            label: 'Apply the formula directly to get $e^{-5x}$ (done)',
            isCorrect: false,
            feedback:
              'Watch out! The exponent is $-5x$, not plain $x$—forgetting to multiply by the inner derivative $-5$ is the most common exam error.',
          },
          {
            label: 'Outer $e^u$, inner $u=-5x$: differentiate $e^u$ then multiply by $(-5)$',
            isCorrect: true,
            feedback:
              'Spot on! Differentiate the outer layer leaving the inner part intact as $e^{-5x}$, then multiply by $-5$ to get $-5e^{-5x}$.',
          },
        ],
      },
    ],
    definition:
      "If $g$ is differentiable at $x$ and $f$ is differentiable at $u = g(x)$, then the composite function $F(x) = f(g(x))$ is differentiable at $x$, and $F'(x) = f'(g(x)) \\cdot g'(x)$.",
    formulas: [
      {
        name: 'Chain Rule (Leibniz & Function Notation)',
        latex: "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}, \\qquad \\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)",
        variables: [
          '$u = g(x)$: inner function (first operation applied to $x$)',
          '$y = f(u)$: outer function (outermost operation wrapping $u$)',
        ],
        conditions: '$g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$.',
        commonMisuse:
          "Differentiating the inner function inside the outer derivative to write $f'(g'(x))$, or forgetting to multiply by $g'(x)$ altogether.",
      },
    ],
    geometricMeaning:
      'The overall instantaneous slope is the product of the outer curve’s slope with respect to the intermediate variable and the inner function’s slope with respect to the input.',
    solvingSteps: [
      'Identify the layers: circle the outermost operation $f(u)$ and set the entire inner expression to $u = g(x)$.',
      "Differentiate the outer layer to get $f'(u)$, copying the inner expression $u$ untouched.",
      "Multiply at the end by the derivative of the inner layer $g'(x)$ (keep chaining if there are more inner layers).",
      'Substitute $g(x)$ back for $u$ and simplify.',
    ],
    workedExamples: [
      {
        id: 'ex-chain-1',
        category: 'basic',
        title: 'Basic: Power of a Polynomial Composite Function',
        problem: 'Find the derivative $\\frac{dy}{dx}$ of $y = (3x^2 + 1)^4$.',
        given: '$y = (3x^2 + 1)^4$',
        find: '$\\frac{dy}{dx}$',
        steps: [
          {
            expression: 'u = 3x^2 + 1,\\quad y = u^4',
            reason: 'Set the inner function $u = 3x^2+1$ and the outer function $u^4$.',
          },
          {
            expression: '\\frac{dy}{du} = 4u^3,\\quad \\frac{du}{dx} = 6x',
            reason: 'Apply the power rule to the outer and inner layers separately.',
          },
          {
            expression: '\\frac{dy}{dx} = 4(3x^2 + 1)^3 \\cdot 6x = 24x(3x^2 + 1)^3',
            reason: 'Multiply the two derivatives together and substitute back for $u$.',
          },
        ],
        answer: '$24x(3x^2 + 1)^3$',
        verificationNote: 'At $x=1$, the derivative equals $24(4)^3 = 1536$, matching a numerical finite difference.',
      },
      {
        id: 'ex-chain-2',
        category: 'biomedical',
        title: 'Biomedical Context: Rate of Blood Drug Concentration Decay',
        problem:
          "After an intravenous injection of an antibiotic, a simplified plasma concentration model is $C(t) = 20 e^{-0.25t}$ (mg/L, $t \\ge 0$ hours). Find the rate of change of concentration $C'(4)$ at $t = 4$ hours.",
        given: '$C(t) = 20e^{-0.25t}$, $t = 4$',
        find: "$C'(4)$",
        modelAssumptions:
          'Simplified one-compartment first-order elimination model: assumes instantaneous complete distribution and a constant elimination rate constant $k = 0.25\\text{ hr}^{-1}$.',
        steps: [
          {
            expression: 'u = -0.25t \\implies \\frac{du}{dt} = -0.25',
            reason: 'Identify $-0.25t$ in the exponent as the inner function.',
          },
          {
            expression: "C'(t) = 20 e^{-0.25t} \\cdot (-0.25) = -5 e^{-0.25t}",
            reason: 'Outer $e^u$ differentiates to $e^u$, multiplied by the inner derivative $-0.25$.',
          },
          {
            expression: "C'(4) = -5 e^{-1} \\approx -1.839\\text{ mg/(L}\\cdot\\text{hr)}",
            reason: 'Substitute $t=4$; the negative sign indicates the concentration is decreasing.',
          },
        ],
        answer: '$-5e^{-1} \\approx -1.839\\text{ mg/(L}\\cdot\\text{hr)}$',
        verificationNote:
          'Dimensional check: $[\\text{mg/L}] \\cdot [\\text{hr}^{-1}] = \\text{mg/(L}\\cdot\\text{hr)}$, and the negative sign agrees with drug elimination.',
      },
    ],
    commonErrors: [
      {
        title: 'Omitting the Inner Derivative',
        wrongLatex: '\\frac{d}{dx} e^{-3x} = e^{-3x}',
        rightLatex: '\\frac{d}{dx} e^{-3x} = -3e^{-3x}',
        whyWrong:
          'Forgot that the exponent $-3x$ is itself a function of $x$ and requires multiplying by $\\frac{d}{dx}(-3x) = -3$.',
        howToAvoid:
          "Whenever the argument is anything other than plain $x$ (such as $-3x$, $2x+1$, or $x^2$), mentally circle it as a reminder to 'multiply by its derivative at the end'.",
      },
    ],
    quickReview: {
      keyPoints: [
        'Identify $f(g(x))$: which function wraps the outside, and which sits inside.',
        "Formula: $[f(g(x))]' = f'(g(x)) \\cdot g'(x)$.",
        'Keep the inner expression unchanged while differentiating the outer layer!',
      ],
      whenToUse:
        'Whenever the expression inside parentheses, an exponent, a radical, or a trig function is anything other than plain $x$.',
      trapAlert: "Never write $f'(g'(x))$, and never forget to multiply by $g'(x)$.",
      decisionTreeKey: 'diff',
      examPatterns: [
        {
          examType: 'Pattern A: Power or Exponential Composite Differentiation',
          triggerWords: 'Expressions like $(ax^2+b)^n$, $e^{-kt}$, or $\\sin(kx)$',
          quickSteps: [
            'Circle the inner expression $u$ (inside the parentheses or in the exponent).',
            'Differentiate the outer layer first, keeping $u$ unchanged inside.',
            "Multiply at the end by the inner derivative $u'$.",
          ],
          quickSample: {
            problem: 'Find $\\frac{d}{dx}(2x+1)^5$',
            fastSolve: 'Outer power rule $5(2x+1)^4$ $\\times$ inner derivative $2$',
            answer: '$10(2x+1)^4$',
          },
        },
        {
          examType: 'Pattern B: Biomedical Decay / Rate-of-Change Calculation',
          triggerWords: "Given drug concentration $C(t)=C_0e^{-kt}$, asked for 'rate of change at $t=4$ hours'",
          quickSteps: [
            "Use the chain rule to compute $C'(t) = -k C_0 e^{-kt}$.",
            'Plug in the specified time $t$ and verify the negative sign means decreasing concentration.',
          ],
          quickSample: {
            problem: "$C(t) = 10e^{-0.3t}$, find $C'(0)$",
            fastSolve: "$C'(t) = -3e^{-0.3t}$, plug in $t=0$ to get $-3(1)$",
            answer: '$-3$',
          },
        },
      ],
    },
    practice: [
      {
        id: 'prac-chain-1',
        questionType: '基本計算',
        difficulty: 'L2',
        prompt: "Find the derivative $f'(0)$ of $f(x) = \\sin(3x)$ at $x = 0$.",
        given: '$f(x) = \\sin(3x)$, $x = 0$',
        find: "$f'(0)$",
        numericAnswer: 3,
        tolerance: 0.001,
        answerDisplay: '$3$',
        strategy: 'Outer layer is $\\sin(u)$ and inner layer is $u=3x$; apply the chain rule and evaluate at $x=0$.',
        steps: [
          {
            expression: "f'(x) = \\cos(3x) \\cdot 3 = 3\\cos(3x)",
            reason: 'Chain rule: outer derivative $\\cos(3x)$ times inner derivative $3$.',
          },
          { expression: "f'(0) = 3\\cos(0) = 3", reason: 'Substitute $x=0$, using $\\cos(0)=1$.' },
        ],
        commonMistake: 'Forgetting to multiply by $3$ and answering $1$.',
        hints: ['Outer layer is $\\sin(u)$—what is its derivative with respect to $u$?', "Don't forget to multiply by the derivative of $3x$!"],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-chain-2',
        questionType: '常見陷阱題',
        difficulty: 'L3',
        prompt: 'Which of the following is the correct result for $\\frac{d}{dx} \\ln(x^2 + 1)$?',
        given: '$y = \\ln(x^2 + 1)$',
        find: '$\\frac{dy}{dx}$',
        options: [
          '$\\frac{1}{x^2 + 1}$',
          '$\\frac{2x}{x^2 + 1}$',
          '$\\frac{1}{2x}$',
          '$2x\\ln(x^2+1)$',
        ],
        correctOptionIndex: 1,
        answerDisplay: '$\\frac{2x}{x^2 + 1}$',
        strategy:
          'The derivative of the outer $\\ln(u)$ is $1/u$, then multiply by the derivative $2x$ of the inner $x^2+1$.',
        steps: [
          {
            expression: '\\frac{d}{du}\\ln(u) = \\frac{1}{u},\\quad \\frac{d}{dx}(x^2+1) = 2x',
            reason: 'Differentiate layer by layer (note $x^2+1 > 0$ always satisfies the logarithm domain).',
          },
          { expression: '\\frac{1}{x^2+1} \\cdot 2x = \\frac{2x}{x^2+1}', reason: 'Multiply and combine.' },
        ],
        commonMistake: 'Mistakenly choosing $\\frac{1}{2x}$ (putting the inner derivative into the denominator) or omitting $2x$.',
        hints: [
          'First differentiate the outer $\\ln(u)$ to get $\\frac{1}{u}$ with $u = x^2+1$ unchanged.',
          'Then multiply by the derivative of $u = x^2+1$.',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-chain-3',
        questionType: '考試型題目',
        difficulty: 'L3',
        prompt: 'Find the derivative $\\frac{dy}{dx}$ of $y = \\sqrt{4x + 5}$ at $x = 1$.',
        given: '$y = (4x + 5)^{1/2}$, $x = 1$',
        find: "$y'(1)$",
        numericAnswer: 0.6667,
        tolerance: 0.01,
        answerDisplay: '$\\frac{2}{3} \\approx 0.67$',
        strategy: 'Rewrite the square root as a $1/2$ power, apply the chain rule, and evaluate at $x=1$.',
        steps: [
          {
            expression: '\\frac{dy}{dx} = \\frac{1}{2}(4x + 5)^{-1/2} \\cdot 4 = \\frac{2}{\\sqrt{4x + 5}}',
            reason: 'Outer power-rule derivative multiplied by the inner derivative $4$ of $4x+5$.',
          },
          {
            expression: '\\left.\\frac{dy}{dx}\\right|_{x=1} = \\frac{2}{\\sqrt{9}} = \\frac{2}{3}',
            reason: 'Substitute $x=1$.',
          },
        ],
        commonMistake: 'Forgetting to multiply by the inner derivative $4$ and answering $\\frac{1}{6}$.',
        hints: [
          'Rewrite $\\sqrt{4x+5}$ as $(4x+5)^{1/2}$ first.',
          "The derivative of $u^{1/2}$ is $\\frac{1}{2}u^{-1/2}$; remember to multiply by $(4x+5)' = 4$!",
        ],
        sourceType: 'self_authored',
      },
    ],
    visualization: {
      labId: 'chain-rule',
      title: 'Chain Rule Layered Gear Interactive Lab',
      learningGoal:
        'Observe how parameter k simultaneously alters the inner rate du/dx and the total tangent slope dy/dx.',
      parameters: [
        { name: 'x', meaning: 'Independent variable position', range: '0.2 ~ 3.5' },
        { name: 'k', meaning: 'Inner scaling factor (e.g., decay constant or frequency)', range: '0.2 ~ 2.0' },
      ],
      visualMeaning:
        'The blue curve shows the composite function y(x), the red dot marks the current point, and the red tangent slope equals the product of dy/du and du/dx.',
      explorationQuestions: [
        'In exponential drug decay e^(-kx), how does doubling k change the tangent slope at the same x?',
        'In periodic oscillation sin(kx), why do slopes away from the peaks get steeper as frequency k increases?',
      ],
      boundaryNote:
        'All functions in this lab are continuous and differentiable over all real numbers; in practice with ln(g(x)), ensure g(x) > 0.',
    },
  },
};
