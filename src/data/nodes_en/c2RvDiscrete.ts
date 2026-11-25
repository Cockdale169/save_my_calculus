import { KnowledgeNode } from '../../types/curriculum';

export const c2RvDiscrete: KnowledgeNode = {
  id: 'C2-RV-DISCRETE',
  moduleId: 'M10',
  title: 'Discrete Random Variables (Bernoulli / Binomial / Geometric / Poisson)',
  englishTitle: 'Discrete Random Variables (Bernoulli / Binomial / Geometric / Poisson)',
  courseTags: ['C2', 'APP'],
  weeks: { C2: [10, 11, 12] },
  priority: 'P0',
  difficulty: 'L3',
  prerequisites: ['C2-PROB-BAYES'],
  related: ['C2-RV-CONTINUOUS'],
  nextNodes: ['C2-RV-CONTINUOUS'],
  learningObjectives: [
    'Understand the relationship between the probability mass function (pmf) $p(x) = P(X=x)$ and the cumulative distribution function (cdf) $F(x) = P(X \\le x)$',
    'Compute the expected value $E[X]$ and variance $\\text{Var}(X) = E[X^2] - (E[X])^2$ of a discrete random variable',
    'Identify and apply Bernoulli, Binomial, Geometric, and Poisson distributions appropriately from context',
  ],
  contentStatus: 'verified',
  sections: {
    oneLineSummary:
      'Random variables turn experimental outcomes into numbers; the four classic discrete distributions model "a single trial, successes in $n$ trials, trials until first success, and counts per unit time."',
    problemSolved:
      'In biomedical counting problems—such as responders in a clinical trial, defective tablets in a sample, or gene mutations—we do not have to draw a tree diagram from scratch every time; recognizing the standard distribution lets us apply its pmf, expectation, and variance formulas directly.',
    intuition:
      '① **Bernoulli**: flip 1 coin (success = 1, failure = 0); ② **Binomial**: flip $n$ independent coins and count total heads; ③ **Geometric**: keep flipping until the *first* head appears and count how many flips it took; ④ **Poisson**: count how many rare events (such as hourly ER arrivals or cellular mutations) occur in a fixed interval of time or space.',
    mathEvolution: [
      {
        stage: 'From Listing Every Outcome to Numeric Random Variables $X$',
        question:
          'Flipping a coin 10 times gives $2^{10}=1024$ sequences of heads and tails—drawing a full tree every time is exhausting. What can we do?',
        breakthrough:
          'Focus only on the single number $X$ representing "total successes"! Organizing repeated structure into a pmf formula lets us compute probabilities and the mean $E[X]$ immediately.',
      },
      {
        stage: 'From Finite Trials (Binomial) to Rare-Event Counting (Poisson)',
        question:
          'When counting hourly emergency-room arrivals or DNA mutations, there is no fixed total number of trials $n$. How do we model that?',
        breakthrough:
          'Let $n \\to \\infty$ and $p \\to 0$ while holding the mean $\\lambda = np$ fixed to derive the Poisson distribution $P(X=k)=\\frac{e^{-\\lambda}\\lambda^k}{k!}$!',
      },
    ],
    juniorGuide: {
      analogyTitle: 'Four Handy Counting Models: 1 Try, $n$ Tries, Waiting for a Win, and Arrivals per Hour!',
      analogyStory:
        'You have seen dice probabilities before. In Calculus II, we sort common "counting" problems into four templates: a single pass/fail try (Bernoulli), counting successes out of $n$ fixed tries (Binomial), trying until the very first success (Geometric), and counting how many times an event happens within one hour (Poisson)!',
      visualType: 'prob',
      stepByStepDecode: [
        {
          symbol: '$p(x) = P(X=x)$',
          plainMeaning: 'Probability mass function (pmf): the height of the bar at exact value $x$',
        },
        {
          symbol: '$E[X],\\ \\text{Var}(X)$',
          plainMeaning: 'Expected value (long-run average) and variance (spread of values)',
        },
      ],
    },
    definition:
      'The pmf $p(x) = P(X=x)$ of a discrete random variable $X$ must satisfy $p(x) \\ge 0$ and $\\sum_x p(x) = 1$. Its expected value is $E[X] = \\sum_x x p(x)$, and its variance is $\\text{Var}(X) = E[(X-\\mu)^2] = E[X^2] - (E[X])^2$.',
    formulas: [
      {
        name: 'Binomial Distribution Binomial(n, p)',
        latex: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad E[X]=np, \\quad \\text{Var}(X)=np(1-p)',
        variables: [
          '$n$: fixed total number of independent trials',
          '$p \\in [0,1]$: probability of success on a single trial',
          '$k \\in \\{0, 1, \\dots, n\\}$: number of successes',
        ],
        conditions:
          'Trials must be independent with constant success probability $p$ (sampling with replacement or from a very large population).',
        commonMisuse:
          'Forgetting the combination factor $\\binom{n}{k}$, or confusing a fixed number of trials (Binomial) with waiting until the first success (Geometric).',
      },
      {
        name: 'Geometric Distribution Geometric(p)',
        latex: 'P(X = k) = (1-p)^{k-1} p, \\quad E[X]=\\frac{1}{p}, \\quad \\text{Var}(X)=\\frac{1-p}{p^2}',
        variables: [
          '$k \\in \\{1, 2, 3, \\dots\\}$: trial number of the first success',
          '$p \\in (0, 1]$: probability of success on a single trial',
        ],
        conditions:
          'Support starts at $k=1$ (note that some textbooks define $X$ as the number of failures before the first success, $k \\ge 0$—always check the problem definition!).',
        commonMisuse:
          'Writing the exponent as $(1-p)^k p$ instead of $(1-p)^{k-1} p$ when $X$ counts total trials including the success.',
      },
      {
        name: 'Poisson Distribution Poisson(λ)',
        latex: 'P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}, \\quad E[X]=\\lambda, \\quad \\text{Var}(X)=\\lambda',
        variables: [
          '$\\lambda > 0$: average number of events per unit time or space',
          '$k \\in \\{0, 1, 2, \\dots\\}$: event count',
        ],
        conditions: 'Events occur independently in non-overlapping intervals at a constant average rate $\\lambda$.',
        commonMisuse:
          'Plugging an hourly rate of $3$ directly into a $2$-hour problem instead of scaling the parameter to $\\lambda = 3 \\times 2 = 6$!',
      },
    ],
    geometricMeaning:
      'A pmf is a bar chart whose bar heights sum to $1$; the cdf $F(x) = P(X \\le x)$ is a step function accumulating those heights from left to right up to $1$.',
    solvingSteps: [
      'Ask first: does the problem count successes in $n$ fixed trials (Binomial), trials until the first success (Geometric), or rare events in a time/space interval (Poisson)?',
      'Identify the support (all possible values of $X$) and parameter values (for Poisson, scale $\\lambda$ if the interval length or volume changes).',
      'Apply the corresponding pmf, $E[X]$, and $\\text{Var}(X)$ formulas; for "at least one" $P(X \\ge 1)$, use the complement $1 - P(X=0)$!',
    ],
    workedExamples: [
      {
        id: 'ex-disc-1',
        category: 'biomedical',
        title: 'Biomedical Context: Poisson Count Model (Petri Dish Colonies)',
        problem:
          'A diluted bacterial suspension contains an average of $2$ viable cells per $1\\text{ mL}$ (following a Poisson distribution). If $1.5\\text{ mL}$ is plated evenly onto a dish, find: (1) the probability of growing $0$ colonies; (2) the probability of growing at least $1$ colony.',
        given: 'Mean density $2$ cells/mL, sample volume $1.5\\text{ mL}$',
        find: '$P(X=0)$ and $P(X \\ge 1)$',
        modelAssumptions:
          'Simplified count model: assumes cells are uniformly and independently dispersed in solution and each viable cell forms one colony.',
        steps: [
          {
            expression: '\\lambda = 2 \\times 1.5 = 3',
            reason: 'Scale the mean count $\\lambda$ proportionally to the sampled volume.',
          },
          {
            expression: 'P(X = 0) = \\frac{e^{-3} 3^0}{0!} = e^{-3} \\approx 0.0498',
            reason: 'Substitute into the Poisson pmf (remember $0! = 1$).',
          },
          {
            expression: 'P(X \\ge 1) = 1 - P(X = 0) = 1 - e^{-3} \\approx 0.9502',
            reason: 'Use the complement rule for "at least 1."',
          },
        ],
        answer: '$P(X=0) = e^{-3} \\approx 4.98\\%$; $P(X \\ge 1) = 1 - e^{-3} \\approx 95.02\\%$',
        verificationNote:
          'Both expectation and variance equal $\\lambda = 3$, and the two complementary probabilities sum to $e^{-3} + (1 - e^{-3}) = 1$.',
      },
    ],
    commonErrors: [
      {
        title: 'Forgetting to Scale λ When the Poisson Interval or Area Changes',
        wrongLatex: '\\text{Mean } 2 \\text{ per hour} \\implies \\text{use } \\lambda = 2 \\text{ for } 3 \\text{ hours}',
        rightLatex: '\\lambda_{3\\text{hr}} = 2 \\times 3 = 6',
        whyWrong:
          'The Poisson parameter $\\lambda$ must represent the expected count over the exact interval you are observing.',
        howToAvoid: 'Always match the time or volume units before writing $X \\sim \\text{Poisson}(\\lambda)$.',
      },
    ],
    quickReview: {
      keyPoints: [
        'Binomial$(n, p)$: $E=np$, $\\text{Var}=np(1-p)$ (fixed number of trials $n$).',
        'Geometric$(p)$: $E=1/p$, $\\text{Var}=(1-p)/p^2$ (trials until first success).',
        'Poisson$(\\lambda)$: $E=\\lambda$, $\\text{Var}=\\lambda$ (interval counts; remember to scale $\\lambda$).',
      ],
      whenToUse:
        'Discrete counting probability problems; whenever you see "at least one," think $1 - P(X=0)$ first.',
      trapAlert: 'Remember $\\text{Var}(X) = E[X^2] - (E[X])^2$—do not forget to square the mean!',
    },
    practice: [
      {
        id: 'prac-disc-1',
        questionType: '基本計算',
        difficulty: 'L2',
        prompt:
          'A new drug has a single-patient response rate of $p = 0.8$. If administered independently to $n = 10$ patients, what are the expected value $E[X]$ and variance $\\text{Var}(X)$ of the number of responders $X \\sim \\text{Binomial}(10, 0.8)$?',
        given: '$n = 10$, $p = 0.8$',
        find: '$E[X]$ and $\\text{Var}(X)$',
        options: [
          '$E[X]=8,\\ \\text{Var}(X)=1.6$',
          '$E[X]=8,\\ \\text{Var}(X)=8$',
          '$E[X]=2,\\ \\text{Var}(X)=1.6$',
          '$E[X]=8,\\ \\text{Var}(X)=0.8$',
        ],
        correctOptionIndex: 0,
        answerDisplay: '$E[X] = 8$, $\\text{Var}(X) = 1.6$',
        strategy: 'Apply the Binomial formulas $E[X] = np$ and $\\text{Var}(X) = np(1-p)$ directly.',
        steps: [
          { expression: 'E[X] = 10 \\times 0.8 = 8', reason: 'Binomial expected value formula.' },
          {
            expression: '\\text{Var}(X) = 10 \\times 0.8 \\times (1 - 0.8) = 8 \\times 0.2 = 1.6',
            reason: 'Binomial variance formula.',
          },
        ],
        commonMistake: 'Forgetting to multiply by $(1-p) = 0.2$ in the variance.',
        hints: ['The Binomial mean is $n \\cdot p$.', 'The Binomial variance is $n \\cdot p \\cdot (1-p)$.'],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-disc-2',
        questionType: '公式選擇與套用',
        difficulty: 'L2',
        prompt:
          'A medical device passes its self-test on each independent power-on with probability $p = 0.25$. On average, how many power-ons are needed to pass the self-test for the first time? (Expected value of a Geometric distribution)',
        given: '$p = 0.25$',
        find: '$E[X]$',
        numericAnswer: 4,
        tolerance: 0.001,
        answerDisplay: '$4$ attempts',
        strategy: 'The number of trials until the first success follows $\\text{Geometric}(p)$ with mean $1/p$.',
        steps: [
          { expression: 'E[X] = \\frac{1}{p} = \\frac{1}{0.25} = 4', reason: 'Geometric expected value formula.' },
        ],
        commonMistake: 'Mistakenly using $(1-p)/p = 3$ (the expected number of failures rather than total trials).',
        hints: [
          'Waiting for the "first success" corresponds to the Geometric distribution.',
          'The expected total number of trials is $\\frac{1}{p}$.',
        ],
        sourceType: 'self_authored',
      },
    ],
    visualization: {
      labId: 'distribution',
      title: 'Discrete & Continuous Probability Distributions Interactive Lab',
      learningGoal:
        'Explore the bar-chart shape, symmetry, and total-probability-1 property of Binomial(n,p) and Poisson(λ).',
      parameters: [
        { name: 'n, p', meaning: 'Binomial trial count and success probability', range: 'n ∈ [2, 20], p ∈ [0.05, 0.95]' },
        { name: 'λ', meaning: 'Poisson mean event count', range: '0.5 ~ 10' },
      ],
      visualMeaning: 'Each bar represents $P(X=k)$, and the heights of all bars always sum to $1$.',
      explorationQuestions: [
        'In Binomial mode, how does the symmetry of the bars differ when $p = 0.5$ versus $p = 0.1$?',
        'In Poisson mode, as $\\lambda$ increases (for example from $1$ to $9$), what continuous distribution does the shape begin to resemble?',
      ],
      boundaryNote:
        'The lab verifies that the bar heights sum to nearly 1 (the infinite Poisson tail has negligible probability at large $k$).',
    },
  },
};
