import { KnowledgeNode } from '../../types/curriculum';

export const c2PhasePlaneNullclines: KnowledgeNode = {
  id: 'C2-PHASE-PLANE-NULLCLINES',
  moduleId: 'M07',
  title: 'Autonomous Systems, Phase Plane & Nullclines',
  englishTitle: 'Autonomous Systems, Phase Plane & Nullclines',
  courseTags: ['C2', 'APP'],
  weeks: { C2: [3, 4, 5] },
  priority: 'P0',
  difficulty: 'L3',
  prerequisites: ['C2-ODE-LOGISTIC-EULER'],
  related: ['C2-MULTIVAR-PARTIAL-DOUBLE'],
  nextNodes: ['C2-MULTIVAR-PARTIAL-DOUBLE'],
  learningObjectives: [
    'Understand autonomous ODE systems of two interacting species (predator-prey and two-species competition models)',
    'Find the nullclines (dx/dt = 0 and dy/dt = 0) and shared equilibrium points of a system',
    'Sketch direction arrows on the phase plane and interpret the long-term trajectory behavior (coexistence, extinction, or cyclic oscillations)',
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      'The phase plane hides time $t$ and maps directly how species $x$ and species $y$ push and pull on each other; intersections of the two different nullclines give the shared equilibrium points.',
    problemSolved:
      'Ecological and biomedical systems rarely involve only a single species (e.g., rabbits and foxes, immune cells and viruses, or two competing bacterial strains). Coupled two-variable systems almost never have closed-form analytical solutions, so we rely on the phase plane and nullclines to predict coexistence, dominance, or cycling.',
    intuition:
      'Imagine walking on an $(x, y)$ map: a curve where $dx/dt = 0$ ($x$-nullcline) is a boundary where you can only move strictly vertically (horizontal velocity is zero), while a curve where $dy/dt = 0$ ($y$-nullcline) is a boundary where you can only move strictly horizontally. Together, these curves divide the map into regions where the direction arrows point consistently, carrying populations along like ocean currents.',
    mathEvolution: [
      {
        stage: 'From a Single Species $N(t)$ to a Two-Species System $(x(t), y(t))$',
        question:
          'When prey and predators (or two competing strains) are coupled in two differential equations with no elementary formula solution, how can we analyze them?',
        breakthrough:
          'Suppress the explicit time variable $t$, plot $x$ on the horizontal axis and $y$ on the vertical axis to form a "phase plane map," and turn species interactions into directional flow arrows!',
      },
      {
        stage: 'Partitioning the Map with Nullclines to Locate Coexistence Equilibria',
        question: 'With arrows filling the entire phase plane, where should our analysis begin?',
        breakthrough:
          'Sketch the $dx/dt = 0$ nullclines (zero horizontal velocity) and $dy/dt = 0$ nullclines (zero vertical velocity) first; every intersection between an $x$-nullcline and a $y$-nullcline is an equilibrium point where both species come to rest!',
      },
    ],
    juniorGuide: {
      analogyTitle: 'A Two-Player Tug-of-War Map Without Time: Nullclines Are Where One Player Pauses!',
      analogyStory:
        'You already know the $(x, y)$ coordinate plane! Now let the horizontal coordinate $x$ represent the number of rabbits and the vertical coordinate $y$ represent the number of foxes. Arrows on the map show whether rabbits and foxes increase or decrease in the next instant, and wherever two differently colored "nullclines" cross, rabbits and foxes reach an exact balance!',
      visualType: 'ode',
      stepByStepDecode: [
        {
          symbol: '$\\frac{dx}{dt}=0$ ($x$-nullcline)',
          plainMeaning: 'Along this line, species $x$ momentarily stops changing (arrows point purely up or down)',
        },
        {
          symbol: '$\\frac{dy}{dt}=0$ ($y$-nullcline)',
          plainMeaning: 'Along this line, species $y$ momentarily stops changing (arrows point purely left or right)',
        },
      ],
    },
    definition:
      'Consider a 2D autonomous system $\\frac{dx}{dt} = f(x, y)$, $\\frac{dy}{dt} = g(x, y)$. The curves satisfying $f(x,y) = 0$ are the $x$-nullclines, and the curves satisfying $g(x,y) = 0$ are the $y$-nullclines. Points $(x^*, y^*)$ where both equations hold simultaneously are the equilibrium points of the system.',
    formulas: [
      {
        name: 'Nullcline & Equilibrium Conditions',
        latex:
          'x\\text{-nullcline: } \\frac{dx}{dt} = 0, \\qquad y\\text{-nullcline: } \\frac{dy}{dt} = 0, \\qquad \\text{Equilibrium: intersection of both}',
        variables: ['$x(t), y(t)$: population sizes or concentrations (typically $x \\ge 0, y \\ge 0$)'],
        conditions:
          'Distinguish carefully between lying on a single nullcline (motion stops in one coordinate direction only) and lying at the intersection of an $x$-nullcline and a $y$-nullcline (motion stops in both directions).',
        commonMisuse:
          'Setting only $dx/dt = 0$ and mistaking the entire nullcline for equilibrium points, or intersecting two branches of the same nullcline with each other.',
      },
      {
        name: 'Lotka-Volterra Predator-Prey Model',
        latex: '\\frac{dx}{dt} = x(a - by), \\qquad \\frac{dy}{dt} = y(-c + dx)',
        variables: ['$x$: prey population', '$y$: predator population', '$a,b,c,d > 0$: ecological interaction constants'],
        conditions:
          'Simplified model: assumes predators die exponentially without prey, and prey grow exponentially without predators.',
        commonMisuse:
          'Reversing the signs on prey and predator interactions (more prey helps predators $+dx$, whereas more predators hurt prey $-by$).',
      },
    ],
    geometricMeaning:
      'Nullclines partition the first quadrant into distinct regions. Testing a single sample point in each region for the signs of $(dx/dt, dy/dt)$ determines whether the vector field points northeast, northwest, southeast, or southwest.',
    solvingSteps: [
      'Factor $dx/dt$ and set it equal to $0$ to find all $x$-nullclines (typically $x = 0$ together with a line).',
      'Factor $dy/dt$ and set it equal to $0$ to find all $y$-nullclines (typically $y = 0$ together with a line).',
      'Pair one $x$-nullcline with one $y$-nullcline and solve simultaneously to list all nonnegative equilibrium points $(x^*, y^*)$ in the first quadrant.',
      'Pick a test point inside each region to determine the signs of $(dx/dt, dy/dt)$ and draw flow arrows to infer trajectory behavior.',
    ],
    workedExamples: [
      {
        id: 'ex-phase-1',
        category: 'biomedical',
        title: 'Biomedical & Ecological Modeling: Finding Nullclines and Equilibria of a Predator-Prey System',
        problem:
          'Consider a simplified microbial interaction system given by $\\frac{dx}{dt} = x(1.2 - 0.6y)$ and $\\frac{dy}{dt} = y(-0.8 + 0.4x)$ for $x, y \\ge 0$. Find all nullclines and equilibrium points.',
        given: '$dx/dt = x(1.2 - 0.6y)$, $dy/dt = y(-0.8 + 0.4x)$',
        find: 'Nullclines and nonnegative equilibrium points',
        modelAssumptions:
          'Simplified closed-culture system: neglects carrying-capacity limits and time delays, capturing only cyclic predator-prey oscillations.',
        steps: [
          {
            expression: 'x(1.2 - 0.6y) = 0 \\implies x = 0 \\text{ or } y = 2',
            reason: 'Find the $x$-nullclines (horizontal velocity is zero).',
          },
          {
            expression: 'y(-0.8 + 0.4x) = 0 \\implies y = 0 \\text{ or } x = 2',
            reason: 'Find the $y$-nullclines (vertical velocity is zero).',
          },
          {
            expression: '(x, y) = (0, 0) \\text{ and } (2, 2)',
            reason:
              'Pair one $x$-nullcline with one $y$-nullcline: $(x=0, y=0)$ gives $(0,0)$, and $(y=2, x=2)$ gives the coexistence equilibrium $(2,2)$.',
          },
        ],
        answer: 'Nullclines are $x=0, y=2$ and $y=0, x=2$; equilibrium points are $(0,0)$ and $(2,2)$',
        verificationNote:
          'Substituting $(2,2)$ back into the original system yields $dx/dt = 2(0) = 0$ and $dy/dt = 2(0) = 0$, confirming the equilibrium.',
      },
    ],
    commonErrors: [
      {
        title: 'Mistaking the Intersection of Same-Type Nullclines for an Equilibrium',
        wrongLatex: 'x = 0 \\text{ and } y = 2 \\text{ meet at } (0, 2) \\implies (0,2) \\text{ is an equilibrium}',
        rightLatex:
          '\\text{At } (0, 2): \\frac{dy}{dt} = 2(-0.8) = -1.6 \\neq 0\\text{ (not an equilibrium!)}',
        whyWrong:
          'Both $x = 0$ and $y = 2$ are $x$-nullclines. At $(0,2)$, $dy/dt$ is not zero, so trajectories slide straight downward along the $y$-axis!',
        howToAvoid:
          'Draw the two sets of nullclines in two different colors: only points where Color A crosses Color B are equilibria!',
      },
    ],
    quickReview: {
      keyPoints: [
        'On an $x$-nullcline ($dx/dt = 0$), trajectories move purely vertically; on a $y$-nullcline ($dy/dt = 0$), trajectories move purely horizontally.',
        'Equilibrium point = intersection of an $x$-nullcline and a $y$-nullcline.',
        'Direction arrow rule: check the signs of $(dx/dt, dy/dt)$ in each region (right/left, up/down).',
      ],
      whenToUse:
        'Analyzing the long-term behavior of two-species competition, predator-prey, or two-compartment interaction ODE systems.',
      trapAlert:
        'Intersections of same-colored nullclines are NOT equilibria—only intersections of different equations qualify!',
    },
    practice: [
      {
        id: 'prac-phase-1',
        questionType: '基本計算',
        difficulty: 'L3',
        prompt:
          'For the two-species competition system $\\frac{dx}{dt} = x(1 - x - 0.5y)$ and $\\frac{dy}{dt} = y(1 - y - 0.6x)$, find the value of $x^*$ at the positive coexistence equilibrium $(x^*, y^*)$ where both species exceed $0$ (round to two decimal places).',
        given: '$1 - x - 0.5y = 0$ and $1 - y - 0.6x = 0$',
        find: '$x^*$ of the coexistence equilibrium (namely $5/7$)',
        numericAnswer: 0.714,
        tolerance: 0.01,
        answerDisplay: '$x^* = \\frac{5}{7} \\approx 0.71$ ($y^* = \\frac{4}{7} \\approx 0.57$)',
        strategy: 'Since $x > 0$ and $y > 0$, solve the two linear nullcline equations simultaneously.',
        steps: [
          { expression: 'y = 1 - 0.6x', reason: 'Solve for $y$ from the second nullcline.' },
          {
            expression: '1 - x - 0.5(1 - 0.6x) = 0 \\implies 0.5 - 0.7x = 0 \\implies x^* = \\frac{5}{7} \\approx 0.714',
            reason: 'Substitute into the first nullcline to solve for $x^*$.',
          },
        ],
        commonMistake: 'Making decimal arithmetic or sign errors when solving the simultaneous linear equations.',
        hints: [
          'Coexistence means $x > 0$ and $y > 0$, so cancel the outer factors of $x$ and $y$.',
          'Solve $x + 0.5y = 1$ and $0.6x + y = 1$ simultaneously.',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-phase-2',
        questionType: '圖形判讀',
        difficulty: 'L2',
        prompt:
          'In a region of the phase plane where $\\frac{dx}{dt} < 0$ and $\\frac{dy}{dt} > 0$, which direction does the trajectory arrow point?',
        given: '$dx/dt < 0$, $dy/dt > 0$',
        find: 'Arrow direction',
        options: ['Northeast (up-right)', 'Northwest (up-left)', 'Southeast (down-right)', 'Southwest (down-left)'],
        correctOptionIndex: 1,
        answerDisplay: 'Northwest (up-left)',
        strategy: '$dx/dt < 0$ means $x$ decreases (leftward), and $dy/dt > 0$ means $y$ increases (upward).',
        steps: [
          {
            expression: '\\frac{dx}{dt} < 0 \\Rightarrow \\leftarrow,\\quad \\frac{dy}{dt} > 0 \\Rightarrow \\uparrow',
            reason: 'Combining horizontal and vertical components gives up-left (northwest).',
          },
        ],
        commonMistake: 'Swapping the $x$-direction and $y$-direction.',
        hints: [
          '$dx/dt$ controls horizontal motion (left/right), and $dy/dt$ controls vertical motion (up/down).',
          'Negative means left or down; positive means right or up.',
        ],
        sourceType: 'self_authored',
      },
    ],
    visualization: {
      labId: 'phase-plane',
      title: 'Phase Plane, Nullclines & Trajectory Interactive Lab',
      learningGoal:
        'Observe how nullclines partition the phase plane and trace system trajectories starting from different initial conditions.',
      parameters: [
        { name: 'x₀', meaning: 'Initial population of species x', range: '0.1 ~ 3.5' },
        { name: 'y₀', meaning: 'Initial population of species y', range: '0.1 ~ 3.5' },
      ],
      visualMeaning:
        'Teal and purple dashed lines show the two nullclines, short gray segments show the direction field, and the red curve traces the actual trajectory.',
      explorationQuestions: [
        'In Predator-Prey mode, around which point does the red trajectory always orbit as you vary $(x_0, y_0)$?',
        'Switch to the Two-Species Competition model: from different initial points, where do the red trajectories eventually settle?',
      ],
      boundaryNote:
        'Biological population models consider only the first quadrant $x \\ge 0, y \\ge 0$; nullcline intersections with negative coordinates have no biological coexistence meaning.',
    },
  },
};
