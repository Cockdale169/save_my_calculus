import { KnowledgeNode } from '../../types/curriculum';

export const c2RvContinuous: KnowledgeNode = {
  id: 'C2-RV-CONTINUOUS',
  moduleId: 'M11',
  title: 'Continuous Random Variables (Uniform / Exponential / Normal)',
  englishTitle: 'Continuous Random Variables (Uniform / Exponential / Normal)',
  courseTags: ['C2', 'APP'],
  weeks: { C2: [12, 13, 14, 15] },
  priority: 'P0',
  difficulty: 'L3',
  prerequisites: ['C2-RV-DISCRETE', 'C2-IMPROPER-INTEGRAL'],
  related: ['C2-IMPROPER-INTEGRAL'],
  nextNodes: [],
  learningObjectives: [
    'Understand the area interpretation of a continuous probability density function (pdf) $f(x)$ (single-point probability $P(X=c)=0$) and its calculus inverse relationship with the cdf $F(x)$',
    'Compute continuous expected value $E[X]$ and variance $\\text{Var}(X)$ using improper integrals when needed',
    'Master Uniform, Exponential (waiting times and memorylessness), and Normal ($Z = \\frac{X-\\mu}{\\sigma}$ standardization) distributions',
  ],
  contentStatus: 'verified',
  needsLectureCheck: [
    'Confirm whether Week 13 "pdf of a function of a random variable" uses the CDF method or Jacobian transformation in lecture notes',
    'Confirm whether Week 15 normal distribution calculations use a Z-table or specific software/methods in lecture notes',
  ],
  sections: {
    oneLineSummary:
      'For a continuous random variable, you cannot ask for the probability of hitting an exact single value (area at a point is $0$); instead, probability is the area under the density curve over an interval via definite integration.',
    problemSolved:
      'Measurements such as height, blood pressure, and drug-response waiting times take values across continuous intervals with infinitely many decimal places, so we cannot build a point-by-point probability table and must describe probabilities by integrating a density curve $f(x)$.',
    intuition:
      'Imagine total probability $1$ as a $1$-kg bar of modeling clay: the pdf $f(x)$ is the *thickness* of the clay at position $x$ (so $f(x)$ can exceed $1$ as long as the total area equals $1$!), and the probability of falling in $[a, b]$ is the weight (integrated area) of the slice cut from $a$ to $b$.',
    mathEvolution: [
      {
        stage: 'From Discrete Bar Sums $\\sum$ to Continuous Density Integrals $\\int$',
        question:
          'Height, blood pressure, and waiting times span uncountably many decimals, making every individual point have probability $0$. How do we assign probabilities?',
        breakthrough:
          'Use a probability density function $f(x)$ to measure height/density and define the interval probability $P(a \\le X \\le b)$ as the area $\\int_a^b f(x)\\,dx$ (with total area equal to $1$)!',
      },
      {
        stage: 'From Arbitrary Normal $N(\\mu, \\sigma^2)$ to Standard Normal $Z \\sim N(0,1)$',
        question:
          'Every measurement has its own mean $\\mu$ and standard deviation $\\sigma$—do we need infinitely many normal tables?',
        breakthrough:
          'Standardize via $Z = \\frac{X-\\mu}{\\sigma}$ to shift and rescale any bell curve onto mean $0$ and standard deviation $1$, so one single standard normal table works everywhere!',
      },
    ],
    juniorGuide: {
      analogyTitle: 'Think of Total Probability $1$ as 1 kg of Clay: Density Is Thickness, Area Is Weight!',
      analogyStory:
        'A measured height like $165.23\\text{ cm}$ can vary continuously. Instead of asking for the probability of being *exactly* $165.0000\\text{ cm}$ (a single point has width $0$, hence area $0$), we ask what fraction of the clay lies between $160$ and $170\\text{ cm}$—and that sliced area is the integral!',
      visualType: 'area',
      stepByStepDecode: [
        {
          symbol: '$f(x)$ (pdf)',
          plainMeaning: 'Height of the density curve (can exceed 1, as long as the total area equals 1)',
        },
        {
          symbol: '$Z = \\frac{X - \\mu}{\\sigma}$',
          plainMeaning: 'Standard score measuring how many standard deviations $X$ lies from the mean',
        },
      ],
    },
    definition:
      'The pdf $f(x)$ of a continuous random variable $X$ must satisfy $f(x) \\ge 0$ and $\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1$. Its cumulative distribution function is $F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t)\\,dt$, and $F\'(x) = f(x)$.',
    formulas: [
      {
        name: 'Continuous Expected Value & Variance',
        latex: 'E[X] = \\int_{-\\infty}^{\\infty} x f(x)\\,dx, \\qquad \\text{Var}(X) = \\int_{-\\infty}^{\\infty} x^2 f(x)\\,dx - (E[X])^2',
        variables: ['$f(x)$: probability density function (integrate only over its nonzero support)'],
        conditions: 'The integrals must converge absolutely, and you should verify $\\int f(x)\\,dx = 1$ first.',
        commonMisuse:
          'Assuming $f(x) \\le 1$ (false! For example, $\\text{Uniform}(0, 0.5)$ has height $f(x) = 2 > 1$, which is valid since the total area is $1$), or forgetting that $P(X = c) = 0$.',
      },
      {
        name: 'Uniform(a, b) & Exponential(λ) Distributions',
        latex:
          '\\text{Unif}(a,b): f(x)=\\frac{1}{b-a},\\ E=\\frac{a+b}{2}; \\qquad \\text{Exp}(\\lambda): f(x)=\\lambda e^{-\\lambda x}\\ (x\\ge 0),\\ E=\\frac{1}{\\lambda},\\ \\text{Var}=\\frac{1}{\\lambda^2}',
        variables: ['$a < b$: Uniform interval endpoints', '$\\lambda > 0$: Exponential rate parameter'],
        conditions:
          'The Exponential pdf is $0$ for $x < 0$; cumulative probability is $P(X \\le t) = 1 - e^{-\\lambda t}$ and survival probability is $P(X > t) = e^{-\\lambda t}$.',
        commonMisuse: 'Confusing the Exponential mean $E[X] = 1/\\lambda$ with the Poisson mean $\\lambda$.',
      },
      {
        name: 'Normal Distribution Standardization Normal(μ, σ²)',
        latex: 'Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1), \\qquad \\text{68-95-99.7 empirical rule}',
        variables: ['$\\mu$: mean (center of the bell curve)', '$\\sigma > 0$: standard deviation (width of the curve)'],
        conditions:
          'Standard deviation $\\sigma > 0$; variance is $\\sigma^2$ (check carefully whether a problem gives $N(\\mu, \\sigma^2)$ or $\\sigma$ directly).',
        commonMisuse: 'Dividing by variance $\\sigma^2$ instead of standard deviation $\\sigma$.',
      },
    ],
    geometricMeaning:
      'The total area under a pdf curve is always $1$. The cdf $F(x)$ increases monotonically from $0$ to $1$ as an S-shaped (or smooth) curve whose slope at any point is $f(x)$.',
    solvingSteps: [
      'Identify the support where $f(x)$ is nonzero (e.g., $x \\ge 0$ for Exponential, $[a, b]$ for Uniform).',
      'To find an unknown constant $c$, set $\\int_{\\text{support}} f(x)\\,dx = 1$ and solve for $c$.',
      'To find an interval probability $P(a \\le X \\le b)$, compute $\\int_a^b f(x)\\,dx = F(b) - F(a)$ (strict $<$ and $\\le$ give the exact same probability for continuous distributions).',
      'For $N(\\mu, \\sigma^2)$, compute $Z = (x - \\mu)/\\sigma$ first to standardize before using a table or the empirical rule.',
    ],
    workedExamples: [
      {
        id: 'ex-cont-1',
        category: 'biomedical',
        title: 'Biomedical Context: Exponential Waiting Time & Memorylessness',
        problem:
          'An emergency triage station receives critical patients at an average rate of $2$ per hour (waiting time $T \\sim \\text{Exponential}(\\lambda = 2)$ hours). Find: (1) the probability that the next patient arrives within $0.5$ hours; (2) the mean waiting time $E[T]$.',
        given: '$T \\sim \\text{Exp}(\\lambda = 2)$ (in hours)',
        find: '$P(T \\le 0.5)$ and $E[T]$',
        modelAssumptions:
          'Simplified arrival model: assumes arrivals follow a constant-rate Poisson process with $\\lambda=2/\\text{hr}$, so inter-arrival times are exponentially distributed.',
        steps: [
          {
            expression: 'P(T \\le 0.5) = \\int_0^{0.5} 2 e^{-2t}\\,dt = \\left[-e^{-2t}\\right]_0^{0.5} = 1 - e^{-1} \\approx 0.6321',
            reason: 'Integrate the Exponential pdf from $0$ to $0.5$ (or use the cdf $1 - e^{-\\lambda t}$).',
          },
          {
            expression: 'E[T] = \\frac{1}{\\lambda} = \\frac{1}{2} = 0.5\\text{ hr (30 min)}',
            reason: 'Apply the Exponential expected value formula.',
          },
        ],
        answer: '$P(T \\le 0.5) = 1 - e^{-1} \\approx 63.2\\%$; mean waiting time is $0.5$ hours',
        verificationNote:
          'Total probability check: $\\int_0^\\infty 2e^{-2t}\\,dt = 1$, and $P(T > 0.5) = e^{-1} \\approx 0.3679$, summing to $1$.',
      },
    ],
    commonErrors: [
      {
        title: 'Dividing by Variance σ² Instead of Standard Deviation σ When Standardizing',
        wrongLatex: 'X \\sim N(100, 25) \\implies Z = \\frac{X - 100}{25}',
        rightLatex: 'X \\sim N(100, 25) \\implies \\sigma = \\sqrt{25} = 5,\\quad Z = \\frac{X - 100}{5}',
        whyWrong:
          'In the notation $N(\\mu, \\sigma^2)$, the second number is the *variance* $\\sigma^2 = 25$; standardization divides by the standard deviation $\\sigma = 5$.',
        howToAvoid: 'Whenever you see $N(100, 25)$, immediately write "$\\sigma = \\sqrt{25} = 5$" beside it.',
      },
    ],
    quickReview: {
      keyPoints: [
        'Continuous distributions: $P(X=c)=0$, $\\int f(x)\\,dx = 1$, and $F\'(x) = f(x)$.',
        'Exp$(\\lambda)$: $E=1/\\lambda$, $\\text{Var}=1/\\lambda^2$, and $P(X \\le t) = 1 - e^{-\\lambda t}$.',
        'Normal$(\\mu, \\sigma^2)$: standardize via $Z = \\frac{X-\\mu}{\\sigma}$.',
      ],
      whenToUse:
        'Interval probabilities for continuous measurements (height, concentration), equipment lifetimes, or waiting times.',
      trapAlert:
        'A pdf value can exceed $1$—only the *area* cannot exceed $1$. And remember to take the square root to get $\\sigma$ when standardizing a normal variable!',
    },
    practice: [
      {
        id: 'prac-cont-1',
        questionType: '定義域／值域或條件判斷',
        difficulty: 'L2',
        prompt:
          'A continuous random variable $X$ has probability density function $f(x) = c x$ on $x \\in [0, 2]$, and $0$ elsewhere. Find the constant $c$.',
        given: '$f(x) = cx$ ($0 \\le x \\le 2$)',
        find: 'Normalization constant $c$',
        numericAnswer: 0.5,
        tolerance: 0.001,
        answerDisplay: '$c = \\frac{1}{2} = 0.5$',
        strategy: 'Use the requirement that total probability area equals $1$: $\\int_0^2 cx\\,dx = 1$.',
        steps: [
          {
            expression: '\\int_0^2 c x\\,dx = c \\left[\\frac{x^2}{2}\\right]_0^2 = 2c = 1 \\implies c = \\frac{1}{2}',
            reason: 'The total integral over the support must equal $1$.',
          },
        ],
        commonMistake: 'Forgetting to divide by 2 and answering $c = 1$.',
        hints: [
          'What must the definite integral of any pdf over its entire support equal?',
          'Solve the equation $\\int_0^2 cx\\,dx = 1$.',
        ],
        sourceType: 'self_authored',
      },
      {
        id: 'prac-cont-2',
        questionType: '基本計算',
        difficulty: 'L2',
        prompt:
          'A serum biomarker follows $X \\sim N(70, 100)$ (where $\\mu=70$ and $\\sigma^2=100$). What is the standardized $Z$-score for a measurement of $x = 85$?',
        given: '$\\mu = 70$, $\\sigma^2 = 100$, $x = 85$',
        find: 'Standardized $Z$-score',
        numericAnswer: 1.5,
        tolerance: 0.001,
        answerDisplay: '$Z = 1.5$',
        strategy: 'Take the square root to find $\\sigma = \\sqrt{100} = 10$, then substitute into $Z = (x-\\mu)/\\sigma$.',
        steps: [
          { expression: '\\sigma = \\sqrt{100} = 10', reason: 'Distinguish variance from standard deviation.' },
          { expression: 'Z = \\frac{85 - 70}{10} = 1.5', reason: 'Apply the standardization formula.' },
        ],
        commonMistake: 'Dividing directly by $100$ to get $0.15$.',
        hints: [
          'In $N(70, 100)$, $100$ is the variance $\\sigma^2$. What is the standard deviation $\\sigma$?',
          'Compute $\\frac{85 - 70}{\\sigma}$.',
        ],
        sourceType: 'self_authored',
      },
    ],
    visualization: {
      labId: 'distribution',
      title: 'Continuous Probability Density & Cumulative Area Interactive Lab',
      learningGoal:
        'Switch to Exponential(λ) and Normal(μ, σ) to build intuition for "area = probability" and see how parameters reshape the curve.',
      parameters: [
        { name: 'λ', meaning: 'Exponential rate parameter', range: '0.5 ~ 3.0' },
        { name: 'μ, σ', meaning: 'Normal mean and standard deviation', range: 'μ ∈ [-3, 3], σ ∈ [0.5, 2.5]' },
        { name: 'b', meaning: 'Upper bound of cumulative probability (right edge of shaded area)', range: '-4 ~ 4' },
      ],
      visualMeaning:
        'The teal shaded region shows the cumulative probability $P(X \\le b)$, and the red dashed vertical line marks the mean.',
      explorationQuestions: [
        'In Normal(0, 1) mode, roughly what is the shaded area when $b$ is set to $0$, $1$, and $2$?',
        'In Normal mode with $\\mu=0$ fixed, why does the bell curve get shorter and wider as $\\sigma$ increases from $0.5$ to $2.0$?',
      ],
      boundaryNote:
        'The total area under the curve is always conserved at 1, so widening the curve necessarily lowers its peak.',
    },
  },
};
