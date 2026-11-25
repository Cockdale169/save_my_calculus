import { KnowledgeNode } from '../../types/curriculum';

export const c2MultivarPartialDouble: KnowledgeNode = {
  id: 'C2-MULTIVAR-PARTIAL-DOUBLE',
  moduleId: 'M08',
  title: 'Multivariable Functions, Partial Derivatives & Double Integrals',
  englishTitle: 'Multivariable Functions, Partial Derivatives & Double Integrals',
  courseTags: ['C2'],
  weeks: { C2: [5, 6] },
  priority: 'P0',
  difficulty: 'L3',
  prerequisites: ['C1-DERIVATIVE-CHAIN-RULE', 'C1-INTEGRAL-FTC', 'HS-TRIG-UNIT-CIRCLE'],
  related: ['C2-PHASE-PLANE-NULLCLINES'],
  nextNodes: [],
  learningObjectives: [
    'Compute first- and second-order partial derivatives (∂f/∂x, ∂f/∂y, f_xy) and understand the biological meaning of holding other variables constant',
    'Evaluate double integrals over rectangular regions (integrating with respect to y then x, or reversing the order)',
    'Convert double integrals over circular or sector regions into polar coordinates (r, θ), remembering the area element r dr dθ',
  ],
  contentStatus: 'verified',
  needsLectureCheck: [
    'Confirm depth of Week 5 multivariable limits and scope of Week 6 introduction to partial differential equations against lecture notes',
    'Confirm complexity of integration regions for polar double integrals against lecture notes',
  ],
  sections: {
    oneLineSummary:
      'Partial differentiation means varying one variable while treating all others as constants; double integration applies single-variable integration twice, evaluating the inner integral before the outer one.',
    problemSolved:
      'Real physiological quantities often depend on two or more variables simultaneously (for instance, body surface area depends on both height and weight, and enzyme activity depends on both temperature and pH). Single-variable calculus cannot capture multi-factor sensitivity or 2D accumulation, so we need partial derivatives and double integrals.',
    intuition:
      'Standing on a hillside, the steepness as you step due east is the partial derivative $\\frac{\\partial f}{\\partial x}$ (holding your north-south coordinate $y$ fixed). Evaluating a double integral is like slicing a loaf of bread: first integrate the area of each cross-sectional slice (inner integral), then stack all slices together to get the total volume (outer integral).',
    mathEvolution: [
      {
        stage: 'From Single-Variable Curves $y=f(x)$ to 3D Surfaces $z=f(x,y)$',
        question:
          'Enzyme activity depends on both temperature $x$ and pH $y$—how do we represent two inputs when a single 2D curve is not enough?',
        breakthrough:
          'Plot $z=f(x,y)$ as a 3D surface; to isolate the effect of one factor, lock the other variable (fix $y$) to slice out a 2D cross-section and take its slope—that is the partial derivative $\\frac{\\partial f}{\\partial x}$!',
      },
      {
        stage: 'From Rectangular Slice Double Integrals to Polar Coordinates $r\\,dr\\,d\\theta$',
        question: 'How do we compute the total accumulated volume over a circular base?',
        breakthrough:
          'Slice along $y$ and stack along $x$ for rectangular regions; for circular boundaries, switch to polar coordinates $(r, \\theta)$ and include the area factor $r$, turning messy square-root limits into clean constants!',
      },
    ],
    juniorGuide: {
      analogyTitle: 'Picture a 3D Hill as a Loaf of Bread You Can Slice with a Knife',
      analogyStory:
        'Earlier you learned that a number line is 1D and the $(x,y)$ plane is a flat sheet of paper; a multivariable function $z = f(x,y)$ rises out of that paper like a 3D hill! When we lock $y$ in place, it is like slicing straight down through the loaf with a knife—the slope along that flat cut is the "partial derivative."',
      visualType: 'multivar',
      stepByStepDecode: [
        {
          symbol: '$\\frac{\\partial f}{\\partial x}$',
          plainMeaning: 'Treat $y$ as an ordinary constant number and differentiate only with respect to $x$',
        },
        {
          symbol: '$\\iint_D f(x,y)\\,dA$',
          plainMeaning: 'Add up the volumes of all tiny vertical columns standing over the base region $D$',
        },
        {
          symbol: '$dA = r\\,dr\\,d\\theta$',
          plainMeaning: 'When switching to circular polar coordinates, each small sector element carries an extra factor of radius $r$',
        },
      ],
    },
    strategyTrainer: [
      {
        scenario: 'You are asked to evaluate $\\iint_D (x^2 + y^2)\\,dA$ over the disk $x^2 + y^2 \\le 9$.',
        question: 'Which coordinate system should you choose first to avoid painful algebra?',
        choices: [
          {
            label: 'Force Cartesian coordinates $\\int_{-3}^{3}\\int_{-\\sqrt{9-x^2}}^{\\sqrt{9-x^2}}$',
            isCorrect: false,
            feedback: 'Square roots in the limits make the antiderivatives much harder to compute!',
          },
          {
            label: 'Switch to polar coordinates $(r, \\theta)$ with $r\\,dr\\,d\\theta$',
            isCorrect: true,
            feedback:
              'Correct! Over a circular disk, $x^2+y^2=r^2$ and the limits become constants: $0 \\le r \\le 3$ and $0 \\le \\theta \\le 2\\pi$.',
          },
        ],
      },
    ],
    formulas: [
      {
        name: "Partial Derivatives & Clairaut's Mixed Partial Symmetry",
        latex: '\\frac{\\partial^2 f}{\\partial x\\partial y} = \\frac{\\partial^2 f}{\\partial y\\partial x}',
        variables: [
          '$\\frac{\\partial f}{\\partial x}$: fix $y$, differentiate with respect to $x$',
          '$f_{xy} = (f_x)_y$: differentiate with respect to $x$ first, then with respect to $y$',
        ],
        conditions:
          'When both $f_{xy}$ and $f_{yx}$ are continuous near the point, the order of differentiation can be interchanged.',
        commonMisuse:
          'Forgetting to differentiate a pure $y^2$ term to $0$ when taking $\\partial / \\partial x$, and writing $2y$ instead.',
      },
      {
        name: 'Double Integral in Polar Coordinates',
        latex:
          '\\iint_D f(x, y)\\,dA = \\int_{\\theta_1}^{\\theta_2} \\int_{r_1}^{r_2} f(r\\cos\\theta, r\\sin\\theta)\\, r\\,dr\\,d\\theta',
        variables: [
          '$x = r\\cos\\theta,\\ y = r\\sin\\theta$',
          '$x^2 + y^2 = r^2$',
          '$dA = r\\,dr\\,d\\theta$: polar area element',
        ],
        conditions:
          '$r \\ge 0$, and transforming to polar coordinates always requires multiplying by the stretching factor $r$ (Jacobian determinant).',
        commonMisuse:
          'Forgetting to multiply by $r$ in front of $dr\\,d\\theta$ and mistakenly writing $\\int\\int f\\,dr\\,d\\theta$!',
      },
    ],
    geometricMeaning:
      'A function of two variables $z = f(x, y)$ defines a surface in 3D space. When $f \\ge 0$, the double integral $\\iint_D f(x,y)\\,dA$ represents the volume of the solid beneath the surface and above the base region $D$.',
    solvingSteps: [
      'To find $\\frac{\\partial f}{\\partial x}$, mentally highlight every $y$ in the expression as a constant $c$, then differentiate normally with respect to $x$.',
      'To compute a rectangular double integral $\\int_a^b \\int_c^d f(x,y)\\,dy\\,dx$, evaluate the inner integral $\\int_c^d f(x,y)\\,dy$ first (treating $x$ as constant) to obtain an expression in $x$ alone, then integrate $\\int_a^b (\\cdots)\\,dx$.',
      'For a disk $x^2 + y^2 \\le R^2$, switch immediately to polar coordinates: replace $x^2+y^2$ with $r^2$, $dA$ with $r\\,dr\\,d\\theta$, let $r$ run from $0$ to $R$, and set $\\theta$ for a full disk $[0, 2\\pi]$, half disk, or quarter disk.',
    ],
    workedExamples: [
      {
        id: 'ex-multi-1',
        category: 'basic',
        title: 'Fundamentals: Partial Derivatives and a Polar Double Integral',
        problem:
          '1) Let $f(x, y) = x^2 y + e^{3y}$. Find $\\frac{\\partial f}{\\partial x}$ and $\\frac{\\partial f}{\\partial y}$. 2) Using polar coordinates, evaluate $\\iint_D (x^2 + y^2)\\,dA$ over the disk $D: x^2 + y^2 \\le 4$ of radius $2$.',
        given: 'Two-variable function $f(x,y)$ and circular disk $D$',
        find: 'Partial derivatives and value of the polar double integral',
        steps: [
          {
            expression: '\\frac{\\partial f}{\\partial x} = 2xy + 0 = 2xy',
            reason: 'Treat $y$ and $e^{3y}$ as constants and differentiate with respect to $x$.',
          },
          {
            expression: '\\frac{\\partial f}{\\partial y} = x^2(1) + 3e^{3y} = x^2 + 3e^{3y}',
            reason: 'Treat $x^2$ as constant and apply the chain rule to $e^{3y}$.',
          },
          {
            expression:
              '\\int_0^{2\\pi} \\int_0^2 (r^2) \\cdot r\\,dr\\,d\\theta = \\int_0^{2\\pi} \\left[\\frac{r^4}{4}\\right]_0^2 d\\theta',
            reason:
              'Convert to polar coordinates: $x^2+y^2 = r^2$ and include $r\\,dr\\,d\\theta$, giving integrand $r^3$.',
          },
          {
            expression: '= \\int_0^{2\\pi} 4\\,d\\theta = 8\\pi',
            reason: 'The inner integral equals $16/4 = 4$; integrate over $\\theta$ from $0$ to $2\\pi$.',
          },
        ],
        answer: '1) $f_x = 2xy,\\ f_y = x^2 + 3e^{3y}$; 2) $8\\pi$',
        verificationNote:
          'Dimension and factor check: multiplying $(r^2)$ by the area element $r\\,dr\\,d\\theta$ is essential; omitting $r$ would wrongly give $\\frac{16}{3}\\pi$.',
      },
    ],
    commonErrors: [
      {
        title: 'Omitting the Factor r in Polar Double Integrals',
        wrongLatex: '\\iint_{x^2+y^2\\le 4} (x^2+y^2)\\,dA = \\int_0^{2\\pi}\\int_0^2 r^2\\,dr\\,d\\theta',
        rightLatex: '\\iint_{x^2+y^2\\le 4} (x^2+y^2)\\,dA = \\int_0^{2\\pi}\\int_0^2 r^2 \\cdot r\\,dr\\,d\\theta',
        whyWrong:
          'A small polar sector is not $dr\\,d\\theta$; its area is arc length $\\times$ radial thickness $= (r\\,d\\theta)\\,dr$.',
        howToAvoid: 'Write "$dA = r\\,dr\\,d\\theta$" on paper first and circle the $r$!',
      },
    ],
    quickReview: {
      keyPoints: [
        'Partial derivative $\\partial f / \\partial x$: treat $y$ as constant and differentiate with respect to $x$.',
        'Mixed partial derivatives satisfy $f_{xy} = f_{yx}$ when continuous.',
        'Polar coordinates: $x^2+y^2 = r^2$ and $dA = r\\,dr\\,d\\theta$ (never forget the $r$!).',
      ],
      whenToUse:
        'Multi-factor sensitivity analysis (partial derivatives) or total accumulation over circular/rectangular domains (double integrals).',
      trapAlert:
        'Always include $r$ in polar coordinates; when differentiating with respect to $x$, terms containing only $y$ (like $e^{3y}$) become $0$!',
    },
    practice: [
      {
        id: 'prac-multi-1',
        questionType: '基本計算',
        difficulty: 'L2',
        prompt: 'Let $f(x, y) = 3x^2 y^3 + 5y$. Evaluate $\\frac{\\partial f}{\\partial x}$ at the point $(1, 2)$.',
        given: '$f(x, y) = 3x^2 y^3 + 5y$, $(x, y) = (1, 2)$',
        find: '$f_x(1, 2)$',
        numericAnswer: 48,
        tolerance: 0.001,
        answerDisplay: '$48$',
        strategy: 'Differentiate with respect to $x$ treating $y$ as constant ($5y$ becomes $0$), then substitute $(1, 2)$.',
        steps: [
          {
            expression: '\\frac{\\partial f}{\\partial x} = 6x y^3 + 0 = 6xy^3',
            reason: 'Treat $y$ as constant and differentiate with respect to $x$.',
          },
          { expression: 'f_x(1, 2) = 6(1)(2^3) = 48', reason: 'Substitute $x=1$ and $y=2$.' },
        ],
        commonMistake: 'Mistakenly differentiating $+5y$ to $+5$.',
        hints: [
          'When taking the partial derivative with respect to $x$, $y$ behaves completely like a constant (just like the number $7$).',
          'What is the derivative of the constant $5y$ with respect to $x$?',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-multi-2',
        questionType: '基本計算',
        difficulty: 'L2',
        prompt: 'Evaluate the rectangular double integral $\\int_0^2 \\int_0^1 (x + 2y)\\,dy\\,dx$.',
        given: '$\\int_0^2 \\int_0^1 (x + 2y)\\,dy\\,dx$',
        find: 'Value of the double integral',
        numericAnswer: 4,
        tolerance: 0.001,
        answerDisplay: '$4$',
        strategy: 'Integrate the inner integral with respect to $y$ first (treating $x$ as constant), then integrate with respect to $x$.',
        steps: [
          {
            expression: '\\int_0^1 (x + 2y)\\,dy = \\left[xy + y^2\\right]_{y=0}^{y=1} = x + 1',
            reason: 'Integrate with respect to $y$ and evaluate from $y=0$ to $y=1$.',
          },
          {
            expression: '\\int_0^2 (x + 1)\\,dx = \\left[\\frac{x^2}{2} + x\\right]_0^2 = 2 + 2 = 4',
            reason: 'Integrate the result with respect to $x$.',
          },
        ],
        commonMistake:
          'Integrating $x$ as $x^2/2$ during the inner $dy$ integral (it should be $xy$ because $x$ is constant with respect to $y$).',
        hints: [
          'First evaluate $\\int_0^1 (x + 2y)\\,dy$; since $x$ is constant here, the antiderivative is $xy + y^2$.',
          'After plugging in $y=1$ and $y=0$, evaluate the outer integral $\\int_0^2 (x+1)\\,dx$.',
        ],
        sourceType: 'self_authored',
      },
    ],
    visualization: {
      labId: 'multivar-3d',
      title: '3D Multivariable Surface, Partial Slice & Double-Integral Columns Lab',
      learningGoal:
        'Rotate the 3D surface 360° with your mouse or finger to see how fixing $y$ slices out a red curve for the partial derivative and how 3D columns approximate the double-integral volume.',
      parameters: [
        { name: 'View (drag to rotate)', meaning: 'Freely rotate elevation and azimuth angles of the 3D plot', range: '360°' },
        { name: 'x₀ / y₀ slice position', meaning: 'Move the plane slicing through the surface', range: '-1.6 ~ 1.6' },
      ],
      visualMeaning:
        'The blue mesh is the 3D surface $z=f(x,y)$, and the thick red curve is the 2D cross-section produced by the slice.',
      explorationQuestions: [
        'On the paraboloid surface, switch to 3D Double-Integral Columns to see how base area times height sums up to approximate volume.',
        'Switch to the saddle surface and rotate around $(0,0)$ to see why the center looks like a valley along one direction and a peak along another.',
      ],
      boundaryNote:
        'In polar double integrals, always keep $r \\ge 0$ and never omit the area factor $r$.',
    },
  },
};
