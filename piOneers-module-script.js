// Game State
let gameState = {
    playerName: '',
    currentLevel: 1,
    unlockedLevels: [1], // Start with only Module 1 unlocked
    scores: {},
    totalQuizzes: 0,
    achievements: [],
    allUsers: {},
    currentUserId: null,
    preQuizCompleted: false,
    preQuizScore: 0,
    postQuizCompleted: false,
    postQuizScore: 0
};

// High Scores Database
let highScores = [];

// Current Quiz State
let currentQuiz = {
    level: '',
    score: 0,
    answers: [],
    startTime: 0,
    timeLeft: 30,
    selectedAnswer: null,
    warned10: false,
    warned5: false,
    timer: null
};

// Quiz Data - Module-based
let completedModules = {
    'module-1': false,
    'module-2': false,
    'module-3': false,
    'module-4': false,
    'module-5': false
};

const quizData = {
    'module-1': [
        {
            question: "Can take up a finite number of distinct values",
            options: [
                "A. Discrete Random Variable",
                "B. Random Variable",
                "C. Continuous Random Variable",
                "D. None of the above"
            ],
            correct: 0
        },
        {
            question: "Classify if the variable is discrete or continuous: Amount of paint utilized in a building project",
            options: [
                "A. Discrete",
                "B. Continuous"
            ],
            correct: 1
        },
        {
            question: "The following are examples of Continuous Random Variable except:",
            options: [
                "A. Time of person can hold his/her breath",
                "B. The height or weight of a person",
                "C. Each person in a bus",
                "D. Body temperature"
            ],
            correct: 2
        },
        {
            question: "Classify if the variable is discrete or continuous: The number of deaths per year attributed to lung cancer.",
            options: [
                "A. Discrete",
                "B. Continuous"
            ],
            correct: 0
        },
        {
            question: "Classify if the variable is discrete or continuous: Number of gifts received by 20 students during Christmas season.",
            options: [
                "A. Discrete",
                "B. Continuous"
            ],
            correct: 0
        }
    ],
    'module-2': [
        {
            question: "The following are key concepts of Hypothesis Testing, except:",
            options: [
                "A. It is a decision-making process for evaluating claims about a population.",
                "B. It is done by making conclusions without analyzing data.",
                "C. It involves testing an assumption we make about a population.",
                "D. A hypothesis is an assumption about a population parameter that may or may not be true."
            ],
            correct: 1
        },
        {
            question: "What is an Alternative Hypothesis?",
            options: [
                "A. A statement claiming that there is no effect or no difference.",
                "B. A statement suggesting that there is an effect, change, or significant difference.",
                "C. A statement that must always be accepted without testing.",
                "D. A statement that is never compared to the null hypothesis."
            ],
            correct: 1
        },
        {
            question: "The following describe the Null Hypothesis, except:",
            options: [
                "A. It states that the independent variable has no effect on the dependent variable.",
                "B. It predicts no significant difference, no change, or no relationship.",
                "C. It is the initial claim being tested.",
                "D. It is always the claim that there is a significant effect or difference."
            ],
            correct: 3
        },
        {
            question: "The average age of bus drivers in Metro Manila is 38.8 years. Which of the following is the correct pair of null and alternative hypotheses?",
            options: [
                "A. H₀: μ = 38.8 years, H₁: μ ≠ 38.8 years",
                "B. H₀: μ ≠ 38.8 years, H₁: μ ≠ 38.8 years",
                "C. H₀: μ = 38.8 years, H₁: μ = 38.8 years",
                "D. H₀: μ ≠ 38.8 years, H₁: μ = 38.8 years"
            ],
            correct: 0
        },
        {
            question: "The average number of calories in a low-calorie meal is at most 300. Which is the correct pair of hypotheses?",
            options: [
                "A. H₀: μ = 300 calories, H₁: μ ≠ 300 calories",
                "B. H₀: μ = 300 calories, H₁: μ > 300 calories",
                "C. H₀: μ ≤ 300 calories, H₁: μ > 300 calories",
                "D. H₀: μ = 300 calories, H₁: μ = 300 calories"
            ],
            correct: 2
        }
    ],
    'module-3': [
        {
            question: "Parametric tests are…",
            options: [
                "A. Statistical tests that do not assume anything about the population.",
                "B. Statistical tests that assume the data follows a normal distribution and uses numerical (interval or ratio) data.",
                "C. Tests used only for categorical data.",
                "D. Tests that work only when the sample size is very small."
            ],
            correct: 1
        },
        {
            question: "Non-Parametric tests are…",
            options: [
                "A. Tests that require data to be normally distributed.",
                "B. Tests used when data do not follow a normal distribution or when using ordinal or categorical data.",
                "C. Tests that only work with ratio data.",
                "D. Tests that are always more accurate than parametric tests."
            ],
            correct: 1
        },
        {
            question: "The following are characteristics of Parametric Tests, except:",
            options: [
                "A. Uses interval or ratio data",
                "B. Assumes normal distribution",
                "C. Works best when there are extreme outliers",
                "D. Typically used with larger samples (n > 30)"
            ],
            correct: 2
        },
        {
            question: "The following are characteristics of Non-Parametric Tests, except:",
            options: [
                "A. Can be used with ordinal, interval, or ratio data",
                "B. Does not require normal distribution",
                "C. Does not require equal variances",
                "D. Requires a very large sample (n > 30)"
            ],
            correct: 3
        },
        {
            question: "The following are examples of Non-Parametric Tests, except:",
            options: [
                "A. Mann-Whitney U Test",
                "B. Friedman's ANOVA",
                "C. Wilcoxon Signed-Rank Test",
                "D. Independent Samples t-Test"
            ],
            correct: 3
        }
    ],
    'module-4': [
        {
            question: "What is the main purpose of Simple Linear Regression?",
            options: [
                "A. To compare three or more groups",
                "B. To predict the value of one variable using another variable",
                "C. To count how many items belong to each category",
                "D. To measure how often an event happens"
            ],
            correct: 1
        },
        {
            question: "In Simple Linear Regression, what do we call the variable that we want to predict?",
            options: [
                "A. Independent variable",
                "B. Dependent variable",
                "C. Constant",
                "D. Residual"
            ],
            correct: 1
        },
        {
            question: "What makes the \"line of best fit\" the best line in regression?",
            options: [
                "A. It goes through every single data point",
                "B. It has the smallest total distance from all data points",
                "C. It connects only the highest and lowest points",
                "D. It always starts at zero"
            ],
            correct: 1
        },
        {
            question: "Which of the following is the correct form of the simple linear regression equation?",
            options: [
                "A. y = m + b",
                "B. y' = a + bx",
                "C. x = abx",
                "D. x = amb"
            ],
            correct: 1
        },
        {
            question: "\"Regression analysis is a reliable statistical method for estimating how a response variable depends on one or more predictor variables.\" This statement is…",
            options: [
                "A. Incorrect",
                "B. Correct",
                "C. Partially correct",
                "D. Can be correct"
            ],
            correct: 1
        }
    ],
    'module-5': [
        {
            question: "A Z-test is usually used when…",
            options: [
                "A. The sample size is very small (less than 30)",
                "B. The population standard deviation is known",
                "C. The data is made of categories",
                "D. You want to compare more than two groups"
            ],
            correct: 1
        },
        {
            question: "A T-test is usually used when…",
            options: [
                "A. The population standard deviation is unknown",
                "B. The sample size is extremely large",
                "C. Data has no variation",
                "D. You already know everything about the population"
            ],
            correct: 0
        },
        {
            question: "Which of the following is a similarity between a Z-test and a T-test?",
            options: [
                "A. Both are used to compare three or more groups",
                "B. Both test whether a sample mean is significantly different",
                "C. Both require a population standard deviation",
                "D. Both can only be used for samples above 100"
            ],
            correct: 1
        },
        {
            question: "When deciding between a Z-test and a T-test, the most important factor is…",
            options: [
                "A. The color of the graph",
                "B. Whether the data is arranged alphabetically",
                "C. Whether the population standard deviation is known",
                "D. The name of the researcher"
            ],
            correct: 2
        },
        {
            question: "A T-distribution is different from a Z-distribution because…",
            options: [
                "A. It is flatter and has heavier tails",
                "B. It is shaped like a triangle",
                "C. It never changes shape",
                "D. It cannot be used for statistics"
            ],
            correct: 0
        }
    ],
    'module-6': [
        {
            question: "It is an equation containing at least one fraction whose numerator and denominator are polynomials.",
            options: [
                "A. rational function",
                "B. rational equation",
                "C. rational inequality",
                "D. irrational equation"
            ],
            correct: 1
        },
        {
            question: "The usual technique to eliminate denominator in solving a rational equation is to multiply both sides of the equation by its _______________.",
            options: [
                "A. inverse factor",
                "B. greatest common factor",
                "C. least common denominator",
                "D. greatest common denominator"
            ],
            correct: 2
        },
        {
            question: "An inequality which involves one or more rational expressions is called _______________.",
            options: [
                "A. rational function",
                "B. rational equation",
                "C. rational inequality",
                "D. irrational equation"
            ],
            correct: 2
        },
        {
            question: "You can only use cross multiplication in solving rational equation if and only if you have one fraction equal to one fraction, that is, if the fractions are _____________________.",
            options: [
                "A. negative",
                "B. positive",
                "C. inequal",
                "D. proportional"
            ],
            correct: 3
        },
        {
            question: "If the test value makes the inequality ______________________, then the entire interval is not a solution to the inequality.",
            options: [
                "A. true",
                "B. false",
                "C. proportional",
                "D. reciprocal"
            ],
            correct: 1
        },
        {
            question: "For items 6–7: Refer to the rational equation below. 5 / (2x – 4) + 2 / (x + 3) = 3 / (x – 2). To solve the equation, we multiply both sides by",
            options: [
                "A. x – 2",
                "B. x + 3",
                "C. (x + 2)(x – 3)",
                "D. (x – 2)(x + 3)"
            ],
            correct: 3
        },
        {
            question: "Which of the following will be the solution to the given rational equation?",
            options: [
                "A. 11/3",
                "B. 3/11",
                "C. –11/3",
                "D. –3/11"
            ],
            correct: 0
        },
        {
            question: "For items 8–10: Refer to the rational inequality below. (x + 12) / (x + 2) ≤ 2. What are the critical values in the given rational inequality?",
            options: [
                "A. x = –2 and 8",
                "B. x = –2 and –8",
                "C. x = –2 and 12",
                "D. x = –2 and –12"
            ],
            correct: 0
        },
        {
            question: "Which of the critical value or values is/are included as endpoints of the intervals?",
            options: [
                "A. –2",
                "B. 2",
                "C. –8",
                "D. 8"
            ],
            correct: 3
        },
        {
            question: "Which of the following is the solution in the given inequality?",
            options: [
                "A. (–∞, –2) U (8, ∞)",
                "B. (–∞, –2] U [8, ∞)",
                "C. (–∞, –2) U [8, ∞)",
                "D. (–∞, –2) U [–8, ∞)"
            ],
            correct: 2
        }
    ],
    'module-7': [
        {
            question: "It is in the form of f(x) = p(x)/q(x) where p(x) and q(x) are polynomial functions and q(x) is not equal to zero.",
            options: [
                "A. Rational Equality",
                "B. Rational Inequality",
                "C. Rational Function",
                "D. None of these"
            ],
            correct: 3
        },
        {
            question: "For questions 2 and 3, refer to this situation. Martha has won 19 out of 28 tennis matches this season. Which equation models suggest how many more games she needs to win to average 75% wins over losses?",
            options: [
                "A. 19 / 28+x = 0.75",
                "B. 19+x / 28+x = 0.75",
                "C. 19 / 28+x = 75",
                "D. 19+x / 18+x = 75"
            ],
            correct: 0
        },
        {
            question: "In order to get a college tennis scholarship, Martha needs to bring her winning average to 80%. What is the number of matches she needs to win given that she already won 19 out of 28?",
            options: [
                "A. 3",
                "B. 4",
                "C. 17",
                "D. 22"
            ],
            correct: 2
        },
        {
            question: "For questions 4–6, refer to this situation. Joel is working on his chemistry project and he has 300mL of 12% acid solution. If he needed to decrease the acidity of the solution, which of the following is correct function that would show the new acidity of the solution given x mL of water added?",
            options: [
                "A. f(x) = 36 / 300+x",
                "B. f(x) = 30.6 / 300+x",
                "C. f(x) = 30.2 / 300+x",
                "D. f(x) = 0.12 / 300+x"
            ],
            correct: 1
        },
        {
            question: "When is the graph of the function undefined in a certain value of x?",
            options: [
                "A. When the value of the numerator is zero.",
                "B. When the value of the denominator is zero.",
                "C. When the value of the function is zero.",
                "D. None of the above."
            ],
            correct: 1
        },
        {
            question: "In a Bread and Pastry class, a certain recipe calls for 3 kgs of sugar for every 6 kgs of flour. If 60 kgs of this sweet must be prepared, how much sugar is required? Which equation satisfies the problem?",
            options: [
                "A. x = (60+3) / (6(3))",
                "B. x = (6(3)) / (60+3)",
                "C. x = (60(3)) / (6+3)",
                "D. x = (6+3) / (60(3))"
            ],
            correct: 2
        },
        {
            question: "How many kilograms of sugar is needed for 90 kilograms of sweets?",
            options: [
                "A. 20",
                "B. 25",
                "C. 30",
                "D. 35"
            ],
            correct: 2
        },
        {
            question: "For questions number 8 and 9, refer to the problem below. In a business math class, Teacher Alex assigned his students a business project. For the business to be established, a certain establishment needs to pay for a semestral fee (5 months) of ₱50.00 pesos and a weekly tax of ₱10.00 which the proceeds will go to their Christmas Party expenses. What is the average amount collected per group in his class? Formulate an equation for this.",
            options: [
                "A. f(x) = (50 - 10x) / x",
                "B. f(x) = 50 / (50 + 10x)",
                "C. f(x) = (50 + 10x) / x",
                "D. f(x) = x / (50 - 10x)"
            ],
            correct: 3
        },
        {
            question: "How much will be collected in each group for a period of 13 weeks?",
            options: [
                "A. ₱170.00",
                "B. ₱180.00",
                "C. ₱190.00",
                "D. ₱200.00"
            ],
            correct: 1
        },
        {
            question: "Evaluate the limit of the function f(x) = (x² - 9) / (x - 3) as x approaches 3.",
            options: [
                "A. 5",
                "B. 5/6",
                "C. 6",
                "D. 6/5"
            ],
            correct: 2
        }
    ],
    'module-8': [
        {
            question: "The abscissa of the point (–3, 5) is _______.",
            options: [
                "A. 0",
                "B. –3",
                "C. 5",
                "D. 1"
            ],
            correct: 1
        },
        {
            question: "Point A is in Quadrant III. The ordinate in this point is _______.",
            options: [
                "A. both – and +",
                "B. negative (–)",
                "C. positive (+)",
                "D. zero"
            ],
            correct: 1
        },
        {
            question: "The set of all possible input values (x) which produce a valid output (y) from function is called _______.",
            options: [
                "A. algebra",
                "B. binomial",
                "C. domain",
                "D. range"
            ],
            correct: 2
        },
        {
            question: "The Range in a rational function is also the ______ variable?",
            options: [
                "A. constant",
                "B. dependent",
                "C. fixed",
                "D. independent"
            ],
            correct: 1
        },
        {
            question: "In writing the domain/range of a rational function, the format (–∞, 1) U (1, ∞) is called a/an _______.",
            options: [
                "A. enumeration",
                "B. roster form",
                "C. set-builder notation",
                "D. interval notation"
            ],
            correct: 3
        },
        {
            question: "In a set of ordered pairs (–5, –4), (–5, 1), (–2, 3), (2, 1), (2, –4), the domain D = _______.",
            options: [
                "A. {–5, –2, 2}",
                "B. {–4, 1, 3, 1, –4}",
                "C. {–5, –5, –2, 2, 2}",
                "D. {1, 2, 3, 4, 5}"
            ],
            correct: 0
        },
        {
            question: "In a set of ordered pairs (-5,-4), (-5,1), (-2,3), (2,1), (2,-4), the range R = _______",
            options: [
                "A. {-4,1,3}",
                "B. {-5,-5,-2,2,2}",
                "C. {-4,1,3,1,-4}",
                "D. {1,2,3,4,5}"
            ],
            correct: 2
        },
        {
            question: "Some values for the Domain of the rational function f(x) = 6x² - 5 are -2, -1, 0, 1, and 2. Find the Range corresponding for each value. _______",
            options: [
                "A. {91,19,-5,19,91}",
                "B. {-2,-1,0,1,2}",
                "C. {19,1,-5,1,19}",
                "D. {0,1,2,3,4}"
            ],
            correct: 0
        },
        {
            question: "Some values for the Range of the rational function f(x) = (3x² - 5)/x are undefined, -2, and 10.75. Find the Domain corresponding to each value. _______",
            options: [
                "A. {0,-1,-4}",
                "B. {1,2,3}",
                "C. {-2,-1,0}",
                "D. {0, 1, 4}"
            ],
            correct: 3
        },
        {
            question: "Find the domain and range of the function f(x) = 6x - 4. D _______ R _______",
            options: [
                "A. D {x ∈ R | x ≠ -4} R {y ∈ R | y ≠ 6}",
                "B. D {x|x ∈ R} R {y|y ∈ R}",
                "C. D {x ∈ R | x ≠ 0} R {y ∈ R | y ≠ 0}",
                "D. D {x|x ∈ N} R {y|y ∈ N}"
            ],
            correct: 1
        }
    ],
    'module-9': [
        {
            question: "Which of the following is the set of all values that f(x) take?",
            options: [
                "A. Range",
                "B. Intercept",
                "C. Domain",
                "D. Zeroes"
            ],
            correct: 0
        },
        {
            question: "What is the y-intercept of f(x) = (x - 3) / (x + 3)?",
            options: [
                "A. 0",
                "B. -1",
                "C. -3",
                "D. -5"
            ],
            correct: 1
        },
        {
            question: "What is the x-intercept of f(x) = (x - 1) / x ?",
            options: [
                "A. x = -1",
                "B. x = 0",
                "C. x = 1",
                "D. All real numbers"
            ],
            correct: 2
        },
        {
            question: "Complete the sentence: The x-intercept of a rational function is also ________ of the graph of the function.",
            options: [
                "A. asymptote",
                "B. range",
                "C. zero",
                "D. domain"
            ],
            correct: 2
        },
        {
            question: "Which of the following are the points of intersection of the graph and the axes?",
            options: [
                "A. Range",
                "B. Intercept",
                "C. Domain",
                "D. Zeroes"
            ],
            correct: 1
        },
        {
            question: "What is the domain of f(x) = 3 / x ?",
            options: [
                "A. D = {x | x = 1}",
                "B. D = {x | x = 0}",
                "C. D = {x | x ≠ 1}",
                "D. D = {x | x ≠ 0}"
            ],
            correct: 3
        },
        {
            question: "Which of the following is not a true statement?",
            options: [
                "A. A rational function is a quotient of functions.",
                "B. Asymptotes are a common characteristic of rational functions.",
                "C. An asymptote is a line that a graph approaches but does not touch.",
                "D. Domain and Range of rational functions are always equal"
            ],
            correct: 3
        },
        {
            question: "If the degree of the leading coefficient of the numerator is less than the degree of the leading coefficient of the denominator of a rational function, which of the following statements has to be true?",
            options: [
                "A. The graph has no asymptote",
                "B. The graph of the function has slant asymptote",
                "C. The graph of the function has a horizontal asymptote",
                "D. None of the above"
            ],
            correct: 2
        },
        {
            question: "What is the zero of f(x) = (x + 5) / (3x^2) ?",
            options: [
                "A. x = 5",
                "B. x = 0",
                "C. x = -3",
                "D. x = -5"
            ],
            correct: 3
        },
        {
            question: "What is the horizontal asymptote of f(x) = (3x + 1) / (x - 5) ?",
            options: [
                "A. y = 5",
                "B. y = 3",
                "C. y = 1",
                "D. y = 0"
            ],
            correct: 1
        }
    ],
    'module-10': [
        {
            question: "Gov. Suarez bought 1000 units of television to be given to disabled persons in Quezon province. If the province has chosen x disabled persons, write the function which represents the relationship of the allotted unit of television per disabled person (y-variable) versus the total number of disabled persons.",
            options: [
                "A. y = 1000 / x",
                "B. y = x / 1000",
                "C. y = 1000x",
                "D. y = x / (1000 + x)"
            ],
            correct: 0
        },
        {
            question: "Aling Nena cuts a rectangular cloth with a perimeter of 150 meters. Write the function which represents the width (y) of the cloth as a function of the length (x).",
            options: [
                "A. y = 150 / x",
                "B. y = x / 150",
                "C. y = 150 / (x + 1)",
                "D. y = 75 – x"
            ],
            correct: 3
        },
        {
            question: "Maryjoy can bake a cake in 2 hours. Clarissa can do it in 4 hours. How long will it take them to bake a cake if they joined together?",
            options: [
                "A. 2 hours",
                "B. 1 1/3 hours",
                "C. 1 1/6 hours",
                "D. 5/3 hours"
            ],
            correct: 1
        },
        {
            question: "James and Tony play billiard every weekend. So far, James has won 8 out of 14 matches. How many matches will James have to win in a row to improve his winning percentage to 80%?",
            options: [
                "A. 16",
                "B. 15",
                "C. 14",
                "D. 12"
            ],
            correct: 0
        },
        {
            question: "In a jar, there are 10 blue marbles and 15 red marbles. A buyer wants to buy a jar of blue marbles and red marbles with the ratio greater than or equal to 4:5 respectively. How many blue marbles must be added in the jar in order to sell the marbles?",
            options: [
                "A. 8",
                "B. 6",
                "C. at least 1",
                "D. at least 2"
            ],
            correct: 3
        },
        {
            question: "Nerissa was given 2 hours to walk for her morning exercise. She plans to walk 5 kilometers at an average speed of 3 kilometers per hour. How many kilometers more does she need to walk to spend at most 2 hours?",
            options: [
                "A. less than or equal 2 kilometers",
                "B. greater than or equal 2 kilometers",
                "C. exactly 3 kilometers",
                "D. less than or equal to 1 kilometer"
            ],
            correct: 3
        },
        {
            question: "Nimby works as a vendor. He earns a daily wage of 100 pesos and an additional 5 pesos for every 2 pieces of mangoes sold. If x represents the number of mangoes sold, write the function for his daily earning (y) as a function of the number of mangoes sold (x).",
            options: [
                "A. y = 100 / x",
                "B. y = 100 + 5(x/2)",
                "C. y = 100 + 5(2/x)",
                "D. y = 1500 / 2x"
            ],
            correct: 2
        },
        {
            question: "Using the problem in number 7, if Nimby sold 20 mangoes in a day, how much money did he earn for that day?",
            options: [
                "A. 120 pesos",
                "B. 150 pesos",
                "C. 200 pesos",
                "D. 130 pesos"
            ],
            correct: 1
        },
        {
            question: "A boy traveled by train which moved at the speed of 30 mph. He then boarded a bus that moved at the speed of 40 mph and reached his destination. The entire distance covered was 100 miles and the entire duration of the journey was 3 hours. Find the distance he traveled by bus.",
            options: [
                "A. 50 miles",
                "B. 40 miles",
                "C. 60 miles",
                "D. 20 miles"
            ],
            correct: 1
        },
        {
            question: "Sterling Silver is 92.5% pure silver. How many grams of Sterling Silver must be mixed to a 90% Silver alloy to obtain a 500g of a 91% Silver alloy?",
            options: [
                "A. 200 grams",
                "B. 400 grams",
                "C. 300 grams",
                "D. 100 grams"
            ],
            correct: 0
        }
    ],
    'module-11': [
        {
            question: "It is a rule that produces a correspondence between the elements of two sets: D (domain) and R (range), such that to each element in D there corresponds one and only one element in R.",
            options: [
                "A. Function",
                "B. Relation",
                "C. Set",
                "D. Subset"
            ],
            correct: 0
        },
        {
            question: "It is a graph of function that can also be used to determine whether a function is one-to-one using the _____________.",
            options: [
                "A. vertical line test",
                "B. horizontal line test",
                "C. t-test",
                "D. z-test"
            ],
            correct: 1
        },
        {
            question: "It is a method of testing if the graph represents a function by determining whether a vertical line intersects the graph no more than once.",
            options: [
                "A. vertical line test",
                "B. horizontal line test",
                "C. t-test",
                "D. z-test"
            ],
            correct: 0
        },
        {
            question: "Which of the following does not represent one-to-one function?",
            options: [
                "A. Thumbmark of a person.",
                "B. GSIS number to a person.",
                "C. Grocery item bar code.",
                "D. Cellphone number"
            ],
            correct: 2
        },
        {
            question: "Which type of relation wherein every element in the domain is paired with exactly one element in the range?",
            options: [
                "A. Function",
                "B. Asymptote",
                "C. Inverse",
                "D. Composite"
            ],
            correct: 0
        },
        {
            question: "Which of the following relationships DOES NOT indicate a one-to-one function?",
            options: [
                "A. A tricycle and its plate number",
                "B. Chemical symbol to its chemical element",
                "C. Parents and their children",
                "D. Husband and wife"
            ],
            correct: 2
        },
        {
            question: "Which of the following represents a one-to-one function?",
            options: [
                "A. Teacher to students",
                "B. Student to their LRN",
                "C. Mother to her children",
                "D. Students to teacher"
            ],
            correct: 1
        },
        {
            question: "The input values make up the ________, and the output values make up the _______.",
            options: [
                "A. Domain, horizontal line test",
                "B. Range, horizontal line test",
                "C. domain, range",
                "D. range, domain"
            ],
            correct: 2
        },
        {
            question: "Is the area of a circle a function of its radius? Which of the following statements proves that the area of a circle a function of its radius.",
            options: [
                "A. A circle of radius r has a unique area measure given by A = πr², so for any input r, there is only one output, A.",
                "B. If the function is one-to-one, the output value, the area, must correspond to a unique input value, the radius.",
                "C. Any area measure A is given by the formula A = πr². Because areas and radii are positive numbers, there is exactly one solution: √(A/π).",
                "D. All of the choices."
            ],
            correct: 3
        },
        {
            question: "Which of the following statements represents one-to-one-function?",
            options: [
                "A. One person has one passport.",
                "B. A car model is made by one company.",
                "C. A house building prototype belongs to one company.",
                "D. A shampoo to your hair"
            ],
            correct: 3
        }
    ],
    'module-12': [
        {
            question: "Which relates to \"inverse\"?",
            options: [
                "A. redo",
                "B. opposite",
                "C. delete",
                "D. interchange"
            ],
            correct: 3
        },
        {
            question: "What is the inverse of f(x) = x + 36?",
            options: [
                "A. f⁻¹(x) = x/36",
                "B. f⁻¹(x) = 36x",
                "C. f⁻¹(x) = x - 36",
                "D. f⁻¹(x) = -x - 36"
            ],
            correct: 2
        },
        {
            question: "What is the inverse of f(x) = x/25?",
            options: [
                "A. f⁻¹(x) = x + 25",
                "B. f⁻¹(x) = 25x",
                "C. f⁻¹(x) = x - 25",
                "D. f⁻¹(x) = -25x"
            ],
            correct: 1
        },
        {
            question: "What is the inverse of f(x) = -3x?",
            options: [
                "A. f⁻¹(x) = x + 3",
                "B. f⁻¹(x) = -x/3",
                "C. f⁻¹(x) = x - 3",
                "D. f⁻¹(x) = x/3"
            ],
            correct: 1
        },
        {
            question: "What is the inverse of f(x) = x - 10?",
            options: [
                "A. f⁻¹(x) = 10 + x",
                "B. f⁻¹(x) = -x/10",
                "C. f⁻¹(x) = -10x",
                "D. f⁻¹(x) = -(x - 10)"
            ],
            correct: 0
        },
        {
            question: "Which characterizes an inverse function?",
            options: [
                "A. Given that it is f⁻¹(x), its domain and range are the same as the domain and range of f(x).",
                "B. It is denoted by y = f⁻¹(x).",
                "C. Its inverse is one-to-one or many-to-one.",
                "D. It is one-to-one or many-to-one."
            ],
            correct: 1
        },
        {
            question: "What is the mathematical symbol for inverse of f(x)?",
            options: [
                "A. 1/f(x)",
                "B. f(x)⁻¹",
                "C. f′(x)",
                "D. f⁻¹(x)"
            ],
            correct: 3
        },
        {
            question: "What is the inverse of f(x) = -2x - 8?",
            options: [
                "A. f(x) = 8x + 2",
                "B. f(x) = 2x + 8",
                "C. f(x) = (x + 2)/8",
                "D. f(x) = (x + 8)/-2"
            ],
            correct: 3
        },
        {
            question: "What is the inverse of f(x) = b⁵ + 2?",
            options: [
                "A. f(x) = 2b - 5",
                "B. f(x) = 5b + 2",
                "C. f(x) = ⁵√(b - 2)",
                "D. f(x) = ⁵√b - 2"
            ],
            correct: 2
        },
        {
            question: "Which is a property of an inverse function?",
            options: [
                "A. The inverse of f⁻¹(x) is f(x).",
                "B. f⁻¹(f(x)) = x for all negative x in the domain of f.",
                "C. f⁻¹(f⁻¹(x)) = x for all x in the domain of f⁻¹.",
                "D. f(f⁻¹(x)) = x for all positive x in the domain of f⁻¹."
            ],
            correct: 0
        }
    ]
};

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
    
    // Check if any users exist
    if (Object.keys(gameState.allUsers).length === 0) {
        showNameModal();
    } else {
        // Load the most recently played user
        const userIds = Object.keys(gameState.allUsers);
        const mostRecentUser = userIds.reduce((latest, current) => {
            const latestTime = gameState.allUsers[latest].lastPlayed || gameState.allUsers[latest].createdAt;
            const currentTime = gameState.allUsers[current].lastPlayed || gameState.allUsers[current].createdAt;
            return currentTime > latestTime ? current : latest;
        });
        
        loadUserData(mostRecentUser);
        // Ensure preQuizCompleted is properly set
        if (gameState.preQuizCompleted === undefined) {
            gameState.preQuizCompleted = false;
            console.log('preQuizCompleted was undefined, set to false');
        }
        console.log('Initial state - preQuizCompleted:', gameState.preQuizCompleted);
    }
    
    // Add test data for debugging (remove this in production)
    // This runs after user data loading to ensure test data isn't overridden
    if (Object.keys(gameState.scores).length === 0) {
        console.log('Adding test data for debugging...');
        gameState.scores = {
            'module-1': 85,
            'module-2': 72,
            'module-3': 90
        };
        console.log('Test data set:', gameState.scores);
        calculateAccurateStats();
    }
    
    // Add a global function for testing
    window.testStats = function() {
        console.log('Current gameState.scores:', gameState.scores);
        const stats = calculateAccurateStats();
        console.log('Calculated stats:', stats);
        updateResultsPage();
        return stats;
    };
    
    // Add a function to force update all statistics
    window.forceUpdateStats = function() {
        calculateAccurateStats();
        updateUI();
        updateResultsPage();
        updatePerformancePage();
        console.log('All statistics updated');
    };
    
    // Add a function to simulate quiz completion for testing
    window.simulateQuizCompletion = function(moduleId, score) {
        console.log(`Simulating quiz completion: ${moduleId} with score ${score}%`);
        gameState.scores[moduleId] = score;
        calculateAccurateStats();
        updateUI();
        updateResultsPage();
        updatePerformancePage();
        console.log('Quiz simulation complete. Current stats:', calculateAccurateStats());
    };
    
    // Add a function to clear all data and start fresh
    window.clearAllData = function() {
        console.log('Clearing all data...');
        gameState.scores = {};
        gameState.totalQuizzes = 0;
        gameState.unlockedLevels = [1];
        gameState.preQuizCompleted = false;
        calculateAccurateStats();
        updateUI();
        updateResultsPage();
        updatePerformancePage();
        saveGameState();
        console.log('All data cleared. Current stats:', calculateAccurateStats());
    };
    
    // Add a test function to manually show the pre-quiz modal
    window.testPreQuizModal = function() {
        console.log('Testing pre-quiz modal...');
        console.log('gameState.preQuizCompleted:', gameState.preQuizCompleted);
        console.log('Modal element exists:', !!document.getElementById('pre-quiz-modal'));
        showPreQuizModal();
    };
    
    // Add a function to reset pre-quiz status
    window.resetPreQuiz = function() {
        console.log('Resetting pre-quiz status...');
        gameState.preQuizCompleted = false;
        if (gameState.currentUserId && gameState.allUsers[gameState.currentUserId]) {
            gameState.allUsers[gameState.currentUserId].preQuizCompleted = false;
        }
        saveGameState();
        console.log('Pre-quiz status reset. preQuizCompleted:', gameState.preQuizCompleted);
    };
    
    // Add a function to run a complete test
    window.runTest = function() {
        console.log('Running complete test...');
        clearAllData();
        simulateQuizCompletion('module-1', 85);
        simulateQuizCompletion('module-2', 72);
        simulateQuizCompletion('module-3', 90);
        console.log('Test complete! Check the Results page.');
    };
    
    // Add popup testing functions
    window.testPopups = function() {
        console.log('Testing popup system...');
        showPopup('This is an info popup! ℹ️', 'info', 2000);
        setTimeout(() => showPopup('This is a success popup! ✅', 'success', 2000), 500);
        setTimeout(() => showPopup('This is a warning popup! ⚠️', 'warning', 2000), 1000);
        setTimeout(() => showPopup('This is an error popup! ❌', 'error', 2000), 1500);
    };
    
    window.testPopupQueue = function() {
        console.log('Testing popup queue...');
        showPopup('First popup', 'info', 1000);
        showPopup('Second popup', 'success', 1000);
        showPopup('Third popup', 'warning', 1000);
        showPopup('Fourth popup', 'error', 1000);
    };
    
    updateUI();
    updateLeaderboard();
    
    // Ensure home page is displayed by default
    showPage('home');
    
    // Set up navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            
            // Add navigation feedback
            if (pageId === 'quizzes') {
                console.log('Quizzes clicked, preQuizCompleted:', gameState.preQuizCompleted);
                if (gameState.preQuizCompleted) {
                    showPopup('Select a module to start your quiz! 📚', 'info');
                } else {
                    console.log('Showing pre-quiz modal...');
                    showPreQuizModal();
                    return; // Don't show the page yet, wait for pre-quiz completion
                }
            } else if (pageId === 'performance') {
                showPopup('Check your progress and achievements! 📊', 'info');
            } else if (pageId === 'leaderboard') {
                showPopup('See how you rank against other players! 🏆', 'info');
            } else if (pageId === 'lessons') {
                showPopup('Access video lessons and PDF modules! 🎥', 'info');
            }
            
            showPage(pageId);
        });
    });
    
    // Set up module buttons
    for (let i = 1; i <= 5; i++) {
        const moduleButton = document.getElementById(`module-${i}-card`)?.querySelector('.module-button');
        if (moduleButton) {
            moduleButton.addEventListener('click', function() {
                const moduleNumber = i;
                const isUnlocked = gameState.unlockedLevels.includes(moduleNumber);
                
                if (!isUnlocked) {
                    showPopup(`Module ${moduleNumber} is locked! Complete previous modules first! 🔒`, 'error');
                    return;
                }
                
                // Show module-specific guidance
                const moduleTitles = [
                    'Statistical Variables', 'Statistical Hypothesis', 'Parametric Test of Differential', 
                    'Simple Linear Regression', 'Test of Relationship'
                ];
                
                showPopup(`Starting Module ${moduleNumber}: ${moduleTitles[moduleNumber - 1]}! 🚀`, 'info');
                startQuiz(`module-${i}`);
            });
        }
    }
    
    // Set up home page card interactions
    const tutorialCard = document.querySelector('.tutorial-card');
    const quizzesCard = document.querySelector('.quizzes-card');
    const performanceCard = document.querySelector('.performance-card');
    
    if (tutorialCard) {
        tutorialCard.addEventListener('click', function() {
            showPopup('Access video lessons and PDF modules! 🎥', 'info');
            showPage('lessons');
        });
    }
    
    if (quizzesCard) {
        quizzesCard.addEventListener('click', function() {
            console.log('Quizzes card clicked, preQuizCompleted:', gameState.preQuizCompleted);
            // Check if user is currently taking a quiz
            if (isUserCurrentlyTakingQuiz()) {
                // Resume the current quiz
                const currentModule = currentQuiz.level;
                if (currentModule) {
                    showPage(`${currentModule}-quiz`);
                    showPopup(`Resuming ${currentModule.replace('module-', 'Module ')} quiz! 🎯`, 'info');
                }
            } else if (gameState.preQuizCompleted) {
                showPage('quizzes');
                showPopup('Select a module to start your quiz! 📚', 'info');
            } else {
                console.log('Showing pre-quiz modal from home card...');
                showPreQuizModal();
            }
        });
    }
    
    if (performanceCard) {
        performanceCard.addEventListener('click', function() {
            showPopup('Check your progress and achievements! 📊', 'info');
            showPage('performance');
        });
    }
    
    // Event listeners for user management
    const nameSubmit = document.getElementById('name-submit');
    if (nameSubmit) {
        nameSubmit.addEventListener('click', handleNameSubmit);
    }
    
    // Handle form submission (when Enter is pressed)
    const nameForm = document.getElementById('name-form');
    if (nameForm) {
        nameForm.addEventListener('submit', handleNameSubmit);
    }
    
    const changeNameBtn = document.getElementById('change-name-btn');
    if (changeNameBtn) {
        changeNameBtn.addEventListener('click', showNameModal);
    }
    
    const switchUserBtn = document.getElementById('switch-user-btn');
    if (switchUserBtn) {
        switchUserBtn.addEventListener('click', switchUser);
    }
    
    const newPlayerBtn = document.getElementById('new-player-btn');
    if (newPlayerBtn) {
        newPlayerBtn.addEventListener('click', addNewUser);
    }
    
    const deleteUserBtn = document.getElementById('delete-user-btn');
    if (deleteUserBtn) {
        deleteUserBtn.addEventListener('click', deleteUser);
    }
    
    // User display area click functionality
    const userDisplayArea = document.getElementById('user-display-area');
    if (userDisplayArea) {
        userDisplayArea.addEventListener('click', showUserInfo);
    }
    
    // Users page buttons
    const refreshUsersBtn = document.getElementById('refresh-users-btn');
    if (refreshUsersBtn) {
        refreshUsersBtn.addEventListener('click', () => {
            updateUsersPage();
            showPopup('User data refreshed! 🔄', 'success');
        });
    }
    
    const exportUsersBtn = document.getElementById('export-users-btn');
    if (exportUsersBtn) {
        exportUsersBtn.addEventListener('click', exportUsersData);
    }
    
    const createNewUserBtn = document.getElementById('create-new-user-btn');
    if (createNewUserBtn) {
        createNewUserBtn.addEventListener('click', showNameModal);
    }
    
    const cancelUserSelectionBtn = document.getElementById('cancel-user-selection-btn');
    if (cancelUserSelectionBtn) {
        cancelUserSelectionBtn.addEventListener('click', hideUserSelectionModal);
    }
    
    // Modal Event Listeners
    const confirmDeleteBtn = document.getElementById('confirm-delete-user-btn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDeleteUser);
    }
    
    const cancelDeleteBtn = document.getElementById('cancel-delete-user-btn');
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => closeModal('delete-user-modal'));
    }
    
    const confirmSwitchBtn = document.getElementById('confirm-switch-user-btn');
    if (confirmSwitchBtn) {
        confirmSwitchBtn.addEventListener('click', confirmSwitchUser);
    }
    
    const cancelSwitchBtn = document.getElementById('cancel-switch-user-btn');
    if (cancelSwitchBtn) {
        cancelSwitchBtn.addEventListener('click', () => closeModal('switch-user-modal'));
    }
    
    // Close modals when clicking outside
    document.querySelectorAll('.user-selection-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Name modal back button
    const nameCancelBtn = document.getElementById('name-cancel');
    if (nameCancelBtn) {
        nameCancelBtn.addEventListener('click', handleNameCancel);
    }
    
    // Pre-quiz modal event listeners
    const startPreQuizBtn = document.getElementById('start-pre-quiz-btn');
    if (startPreQuizBtn) {
        startPreQuizBtn.addEventListener('click', startPreQuiz);
    }
    
    const cancelPreQuizBtn = document.getElementById('cancel-pre-quiz-btn');
    if (cancelPreQuizBtn) {
        cancelPreQuizBtn.addEventListener('click', hidePreQuizModal);
    }
    
    // Post-quiz modal event listeners
    const startPostQuizBtn = document.getElementById('start-post-quiz-btn');
    if (startPostQuizBtn) {
        startPostQuizBtn.addEventListener('click', startPostQuiz);
    }
    
    const cancelPostQuizBtn = document.getElementById('cancel-post-quiz-btn');
    if (cancelPostQuizBtn) {
        cancelPostQuizBtn.addEventListener('click', hidePostQuizModal);
    }
    
    // Add popup for first-time users
    if (!gameState.playerName) {
        setTimeout(() => {
            showPopup('Welcome to πOneers! Please enter your name to begin! 👋', 'info');
        }, 1000);
    }
});

// Show name input modal
function showNameModal() {
    document.getElementById('name-modal').style.display = 'flex';
    document.getElementById('player-name').focus();
}

// Hide name input modal
function hideNameModal() {
    document.getElementById('name-modal').style.display = 'none';
    document.getElementById('player-name').value = '';
}


// Create new user
function createNewUser(playerName) {
    const userId = 'user_' + Date.now();
    const now = new Date().toISOString();
    
    gameState.allUsers[userId] = {
        playerName: playerName,
        currentLevel: 1,
        unlockedLevels: [1],
        scores: {},
        totalQuizzes: 0,
        achievements: [],
        preQuizCompleted: false,
        preQuizScore: 0,
        postQuizCompleted: false,
        postQuizScore: 0,
        createdAt: now,
        lastPlayed: now
    };
    
    gameState.currentUserId = userId;
    gameState.playerName = playerName;
    gameState.currentLevel = 1;
    gameState.unlockedLevels = [1];
    gameState.scores = {};
    gameState.totalQuizzes = 0;
    gameState.achievements = [];
    gameState.preQuizCompleted = false;
    gameState.preQuizScore = 0;
    gameState.postQuizCompleted = false;
    gameState.postQuizScore = 0;
    
    
    saveGameState();
    updateUI();
    showPopup(`Welcome to πOneers, ${playerName}! 🎉`, 'success');
    setTimeout(() => {
        showPopup('Start with Module 1 to begin your math journey! 🚀', 'info');
    }, 2000);
}

// Show user selection modal
function showUserSelectionModal() {
    updateUserList();
    document.getElementById('user-selection-modal').style.display = 'flex';
}

// Hide user selection modal
function hideUserSelectionModal() {
    document.getElementById('user-selection-modal').style.display = 'none';
}

// Show pre-quiz modal
function showPreQuizModal() {
    console.log('showPreQuizModal called');
    const modal = document.getElementById('pre-quiz-modal');
    console.log('Modal element:', modal);
    if (modal) {
        // Remove inline style that might be hiding it
        modal.removeAttribute('style');
        // Set display and z-index
        modal.style.display = 'flex';
        modal.style.zIndex = '10000';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0, 0, 0, 0.8)';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        console.log('Pre-quiz modal shown, display:', modal.style.display);
        console.log('Modal computed style:', window.getComputedStyle(modal).display);
        // Force visibility again after a short delay
        setTimeout(() => {
            if (window.getComputedStyle(modal).display !== 'flex') {
                modal.style.display = 'flex';
                console.log('Forced modal display to flex after timeout');
            }
        }, 50);
    } else {
        console.error('Pre-quiz modal element not found! Check if HTML has id="pre-quiz-modal"');
        alert('Pre-quiz modal not found. Please check the console for details.');
    }
}

// Hide pre-quiz modal
function hidePreQuizModal() {
    document.getElementById('pre-quiz-modal').style.display = 'none';
}

// Pre-quiz data
const preQuizData = [
    {
        question: "Which of the following is a discrete random variable?",
        options: [
            "A. Height of a student",
            "B. Amount of rainfall",
            "C. Number of cars passing a point",
            "D. Temperature of a room"
        ],
        correct: 2 // C
    },
    {
        question: "A teacher records the number of absences each student has in a month. What type of variable is the number of absences?",
        options: [
            "A. Quantitative Continuous",
            "B. Quantitative Discrete",
            "C. Qualitative (Categorical)",
            "D. Ordinal"
        ],
        correct: 1 // B
    },
    {
        question: "A researcher wants to test whether the average test score of students this year is different from the national average of 75. Which of the following represents the correct null hypothesis (H₀)?",
        options: [
            "A. The average test score is greater than 75.",
            "B. The average test score is less than 75.",
            "C. The average test score is equal to 75.",
            "D. The average test score is not equal to 75."
        ],
        correct: 2 // C
    },
    {
        question: "A company states that the defect rate of their product is 5%. A researcher wants to test if the defect rate is actually higher than claimed. What is the correct alternative hypothesis (H₁)?",
        options: [
            "A. p = 0.05",
            "B. p < 0.05",
            "C. p > 0.05",
            "D. p ≠ 0.05"
        ],
        correct: 2 // C
    },
    {
        question: "A researcher wants to compare the average test scores of two independent groups of students: one group used a traditional learning method, and the other used an online learning method. The data is normally distributed, and both groups have equal variances. Which parametric test should the researcher use?",
        options: [
            "A. Paired t-test",
            "B. Independent samples t-test",
            "C. One-way ANOVA",
            "D. Chi-square test"
        ],
        correct: 1 // B
    },
    {
        question: "A student scored 85 on a math exam. The class mean is 75 and the standard deviation is 5. What is the z-score of the student's score?",
        options: [
            "A. 1.5",
            "B. 2.0",
            "C. 2.5",
            "D. 3.0"
        ],
        correct: 1 // B
    },
    {
        question: "Two students took different exams. Student A scored 90 on an exam with a mean of 80 and SD of 4. Student B scored 78 on an exam with a mean of 70 and SD of 6. Who performed better relative to their class?",
        options: [
            "A. Student A",
            "B. Student B",
            "C. Both performed equally",
            "D. Cannot be determined"
        ],
        correct: 0 // A
    },
    {
        question: "A dataset has a mean of 100 and standard deviation of 10. Which of the following scores is considered an outlier using the ±3 SD rule?",
        options: [
            "A. 125",
            "B. 128",
            "C. 130",
            "D. 135"
        ],
        correct: 3 // D
    },
    {
        question: "A researcher wants to examine whether the number of hours studied (independent variable) can predict a student's exam score (dependent variable). Which of the following statistical methods should the researcher use?",
        options: [
            "A. Chi-square test",
            "B. Simple linear regression",
            "C. Paired t-test",
            "D. One-way ANOVA"
        ],
        correct: 1 // B
    },
    {
        question: "A researcher collects a sample of 25 students to test whether their average exam score differs from the national average of 70. The sample mean is 74, and the sample standard deviation is 8. Which statistic should the researcher calculate to determine if the sample mean is significantly different from the population mean?",
        options: [
            "A. Z-score",
            "B. T-score",
            "C. Chi-square",
            "D. F-ratio"
        ],
        correct: 1 // B
    }
];

// Post-quiz data (appears after completing all 5 modules)
const postQuizData = [
    {
        question: "Which of the following is a discrete random variable?",
        options: [
            "A. Height of a student",
            "B. Amount of rainfall",
            "C. Number of cars passing a point",
            "D. Temperature of a room"
        ],
        correct: 2
    },
    {
        question: "A teacher records the number of absences each student has in a month. What type of variable is the number of absences?",
        options: [
            "A. Quantitative Continuous",
            "B. Quantitative Discrete",
            "C. Qualitative (Categorical)",
            "D. Ordinal"
        ],
        correct: 1
    },
    {
        question: "A researcher wants to test whether the average test score of students this year is different from the national average of 75. Which of the following represents the correct null hypothesis (H₀)?",
        options: [
            "A. The average test score is greater than 75.",
            "B. The average test score is less than 75.",
            "C. The average test score is equal to 75.",
            "D. The average test score is not equal to 75."
        ],
        correct: 2
    },
    {
        question: "A company states that the defect rate of their product is 5%. A researcher wants to test if the defect rate is actually higher than claimed. What is the correct alternative hypothesis (H₁)?",
        options: [
            "A. p = 0.05",
            "B. p < 0.05",
            "C. p > 0.05",
            "D. p ≠ 0.05"
        ],
        correct: 2
    },
    {
        question: "A researcher wants to compare the average test scores of two independent groups of students: one group used a traditional learning method, and the other used an online learning method. The data is normally distributed, and both groups have equal variances. Which parametric test should the researcher use?",
        options: [
            "A. Paired t-test",
            "B. Independent samples t-test",
            "C. One-way ANOVA",
            "D. Chi-square test"
        ],
        correct: 1
    },
    {
        question: "A student scored 85 on a math exam. The class mean is 75 and the standard deviation is 5. What is the z-score of the student's score?",
        options: [
            "A. 1.5",
            "B. 2.0",
            "C. 2.5",
            "D. 3.0"
        ],
        correct: 1
    },
    {
        question: "Two students took different exams. Student A scored 90 on an exam with a mean of 80 and SD of 4. Student B scored 78 on an exam with a mean of 70 and SD of 6. Who performed better relative to their class?",
        options: [
            "A. Student A",
            "B. Student B",
            "C. Both performed equally",
            "D. Cannot be determined"
        ],
        correct: 0
    },
    {
        question: "A dataset has a mean of 100 and standard deviation of 10. Which of the following scores is considered an outlier using the ±3 SD rule?",
        options: [
            "A. 125",
            "B. 128",
            "C. 130",
            "D. 135"
        ],
        correct: 3
    },
    {
        question: "A researcher wants to examine whether the number of hours studied (independent variable) can predict a student's exam score (dependent variable). Which of the following statistical methods should the researcher use?",
        options: [
            "A. Chi-square test",
            "B. Simple linear regression",
            "C. Paired t-test",
            "D. One-way ANOVA"
        ],
        correct: 1
    },
    {
        question: "A researcher collects a sample of 25 students to test whether their average exam score differs from the national average of 70. The sample mean is 74, and the sample standard deviation is 8. Which statistic should the researcher calculate to determine if the sample mean is significantly different from the population mean?",
        options: [
            "A. Z-score",
            "B. T-score",
            "C. Chi-square",
            "D. F-ratio"
        ],
        correct: 1
    }
];

// Pre-quiz state
let preQuizState = {
    currentQuestion: 0,
    score: 0,
    answers: [],
    startTime: 0,
    timeLeft: 30,
    timer: null,
    warned10: false,
    warned5: false
};

// Post-quiz state
let postQuizState = {
    currentQuestion: 0,
    score: 0,
    answers: [],
    startTime: 0,
    timeLeft: 30,
    timer: null,
    warned10: false,
    warned5: false
};

// Start pre-quiz
function startPreQuiz() {
    hidePreQuizModal();
    initializePreQuiz();
    showPreQuizPage();
}

// Initialize pre-quiz
function initializePreQuiz() {
    preQuizState = {
        currentQuestion: 0,
        score: 0,
        answers: [],
        startTime: Date.now(),
        timeLeft: 30,
        timer: null,
        warned10: false,
        warned5: false
    };
    
    // Clear any existing visual feedback
    clearPreQuizVisualFeedback();
}

// Show pre-quiz page
function showPreQuizPage() {
    showPage('pre-quiz-page');
    displayPreQuizQuestion();
    startPreQuizTimer();
}

// Display current pre-quiz question
function displayPreQuizQuestion() {
    const question = preQuizData[preQuizState.currentQuestion];
    const questionText = document.getElementById('pre-quiz-question-text');
    const optionsContainer = document.getElementById('pre-quiz-options');
    const questionNumber = document.getElementById('pre-quiz-question-number');
    const progressFill = document.getElementById('pre-quiz-progress');
    const nextBtn = document.getElementById('pre-quiz-next-btn');
    const submitBtn = document.getElementById('pre-quiz-submit-btn');
    
    // Update question number and progress
    questionNumber.textContent = preQuizState.currentQuestion + 1;
    progressFill.style.width = `${((preQuizState.currentQuestion + 1) / preQuizData.length) * 100}%`;
    
    // Display question
    questionText.textContent = question.question;
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.innerHTML = `
            <input type="radio" name="pre-quiz-answer" value="${index}" id="pre-quiz-option-${index}">
            <label for="pre-quiz-option-${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
    
    // Add event listeners to options
    const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            nextBtn.disabled = false;
            preQuizState.answers[preQuizState.currentQuestion] = parseInt(this.value);
            
            // Keep timer running - don't clear it when answer is selected
        });
    });
    
    // Show/hide buttons
    if (preQuizState.currentQuestion === preQuizData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
    
    // Reset button state
    nextBtn.disabled = true;
    
    // Reset timer display
    document.getElementById('pre-quiz-timer').textContent = preQuizState.timeLeft;
}

// Start pre-quiz timer
function startPreQuizTimer() {
    // Clear any existing timer
    if (preQuizState.timer) {
        clearInterval(preQuizState.timer);
    }
    
    const startTime = Date.now();
    const duration = 30000; // 30 seconds per question in milliseconds
    
    // Store start time for accurate calculations
    preQuizState.startTime = startTime;
    preQuizState.timeLeft = 30;
    
    // Update timer immediately
    updatePreQuizTimer();
    
    // Use high-frequency updates for smooth display
    preQuizState.timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        
        // Calculate time left in seconds (more accurate)
        preQuizState.timeLeft = Math.ceil(remaining / 1000);
        
        updatePreQuizTimer();
        
        // Check if time is up
        if (remaining <= 0) {
            clearInterval(preQuizState.timer);
            preQuizState.timer = null;
            nextPreQuizQuestion(); // This will show answer feedback
        }
    }, 50); // Update every 50ms for smooth display
}

// Update pre-quiz timer display
function updatePreQuizTimer() {
    const timerElement = document.getElementById('pre-quiz-timer');
    if (!timerElement) return;
    
    // Ensure timeLeft is never negative
    const timeLeft = Math.max(0, preQuizState.timeLeft);
    
    // Format display - show actual countdown timer
    timerElement.textContent = timeLeft;
    
    // Add visual warning when time is low
    if (timeLeft <= 10) {
        addPreQuizTimerWarning();
        
        // Show urgent time warnings (only once per warning)
        if (timeLeft === 10 && !preQuizState.warned10) {
            preQuizState.warned10 = true;
            showPopup('Hurry up! Only 10 seconds left! ⚡', 'warning');
        } else if (timeLeft === 5 && !preQuizState.warned5) {
            preQuizState.warned5 = true;
            showPopup('Last 5 seconds! Quick! 🚨', 'error');
        }
    } else {
        removePreQuizTimerWarning();
        // Reset warning flags when time is above 10
        if (timeLeft > 10) {
            preQuizState.warned10 = false;
            preQuizState.warned5 = false;
        }
    }
    
    // Add critical warning for last 3 seconds
    if (timeLeft <= 3) {
        timerElement.style.color = '#dc3545';
        timerElement.style.fontWeight = 'bold';
        timerElement.style.animation = 'pulse 0.5s infinite';
    } else {
        timerElement.style.color = '';
        timerElement.style.fontWeight = '';
        timerElement.style.animation = '';
    }
}

// Add pre-quiz timer warning
function addPreQuizTimerWarning() {
    const timerElement = document.getElementById('pre-quiz-timer');
    if (timerElement) {
        timerElement.style.color = '#ffc107';
        timerElement.style.fontWeight = 'bold';
    }
}

// Remove pre-quiz timer warning
function removePreQuizTimerWarning() {
    const timerElement = document.getElementById('pre-quiz-timer');
    if (timerElement) {
        timerElement.style.color = '';
        timerElement.style.fontWeight = '';
    }
}

// Clear visual feedback from pre-quiz options
function clearPreQuizVisualFeedback() {
    const optionsContainer = document.getElementById('pre-quiz-options');
    const optionElements = optionsContainer.querySelectorAll('.quiz-option');
    
    optionElements.forEach(option => {
        const label = option.querySelector('label');
        // Reset styles
        option.style.backgroundColor = '';
        option.style.border = '';
        option.style.opacity = '';
        // Reset label content (remove checkmarks and X marks)
        if (label) {
            label.innerHTML = label.innerHTML.replace(/[✓✗]\s*$/, '');
        }
    });
    
    // Remove any explanation divs
    const explanationDivs = optionsContainer.querySelectorAll('.answer-explanation');
    explanationDivs.forEach(div => div.remove());
}

// Show answer feedback for current question
function showPreQuizAnswerFeedback() {
    const question = preQuizData[preQuizState.currentQuestion];
    const selectedAnswer = preQuizState.answers[preQuizState.currentQuestion];
    const isCorrect = selectedAnswer !== undefined && selectedAnswer === question.correct;
    
    // Update score
    if (isCorrect) {
        preQuizState.score++;
    }
    
    // Show answer feedback
    const optionsContainer = document.getElementById('pre-quiz-options');
    const nextBtn = document.getElementById('pre-quiz-next-btn');
    const submitBtn = document.getElementById('pre-quiz-submit-btn');
    
    // Disable all radio buttons
    const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.disabled = true;
    });
    
    // Highlight correct and incorrect answers
    const optionElements = optionsContainer.querySelectorAll('.quiz-option');
    optionElements.forEach((option, index) => {
        const radio = option.querySelector('input[type="radio"]');
        const label = option.querySelector('label');
        
        if (index === question.correct) {
            // Correct answer - highlight in green
            option.style.backgroundColor = '#d4edda';
            option.style.border = '2px solid #28a745';
            label.innerHTML = `${question.options[index]} ✓`;
        } else if (selectedAnswer !== undefined && index === selectedAnswer && !isCorrect) {
            // Selected wrong answer - highlight in red
            option.style.backgroundColor = '#f8d7da';
            option.style.border = '2px solid #dc3545';
            label.innerHTML = `${question.options[index]} ✗`;
        } else {
            // Other options - gray out
            option.style.backgroundColor = '#f8f9fa';
            option.style.border = '1px solid #dee2e6';
            option.style.opacity = '0.6';
        }
    });
    
    // Show explanation if available
    if (question.explanation) {
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'answer-explanation';
        explanationDiv.style.cssText = `
            margin-top: 15px;
            padding: 10px;
            background-color: #e7f3ff;
            border-left: 4px solid #007bff;
            border-radius: 4px;
            font-style: italic;
        `;
        explanationDiv.innerHTML = `<strong>Explanation:</strong> ${question.explanation}`;
        optionsContainer.appendChild(explanationDiv);
    }
    
    // Don't automatically enable buttons - let the calling function handle this
}

// Next pre-quiz question (called when timer expires)
function nextPreQuizQuestion() {
    // Clear timer
    if (preQuizState.timer) {
        clearInterval(preQuizState.timer);
        preQuizState.timer = null;
    }
    
    // Show answer feedback and enable continue button
    showAnswerAndProceed();
}

// Show answer feedback when user clicks Next Question
function showAnswerAndProceed() {
    // Clear timer when user clicks Next Question
    if (preQuizState.timer) {
        clearInterval(preQuizState.timer);
        preQuizState.timer = null;
    }
    
    // Show answer feedback first
    showPreQuizAnswerFeedback();
    
    // Change button to "Continue" after showing feedback
    const nextBtn = document.getElementById('pre-quiz-next-btn');
    const submitBtn = document.getElementById('pre-quiz-submit-btn');
    
    if (preQuizState.currentQuestion === preQuizData.length - 1) {
        submitBtn.textContent = 'Finish Quiz';
        submitBtn.onclick = proceedToNextPreQuizQuestion;
        submitBtn.disabled = false;
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.textContent = 'Continue';
        nextBtn.onclick = proceedToNextPreQuizQuestion;
        nextBtn.disabled = false;
    }
}

// Move to next question after feedback
function proceedToNextPreQuizQuestion() {
    // Move to next question
    preQuizState.currentQuestion++;
    
    if (preQuizState.currentQuestion < preQuizData.length) {
        // Clear any visual feedback from previous question
        clearPreQuizVisualFeedback();
        
        // Reset button states
        const nextBtn = document.getElementById('pre-quiz-next-btn');
        const submitBtn = document.getElementById('pre-quiz-submit-btn');
        nextBtn.textContent = 'Next Question';
        nextBtn.onclick = showAnswerAndProceed;
        nextBtn.disabled = true;
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
        
        // Reset timer for next question
        preQuizState.timeLeft = 30;
        preQuizState.warned10 = false;
        preQuizState.warned5 = false;
        document.getElementById('pre-quiz-timer').textContent = preQuizState.timeLeft;
        displayPreQuizQuestion();
        startPreQuizTimer();
    } else {
        // Quiz completed
        submitPreQuiz();
    }
}

// Submit pre-quiz
function submitPreQuiz() {
    // Clear timer
    if (preQuizState.timer) {
        clearInterval(preQuizState.timer);
        preQuizState.timer = null;
    }
    
    // Calculate final score
    const percentage = Math.round((preQuizState.score / preQuizData.length) * 100);
    
    // Store pre-quiz completion
    gameState.preQuizCompleted = true;
    gameState.preQuizScore = percentage;
    
    // Unlock Quiz 1 (Module 1) after pre-quiz completion
    if (!gameState.unlockedLevels.includes(1)) {
        gameState.unlockedLevels.push(1);
    }
    
    // Update user data
    if (gameState.currentUserId && gameState.allUsers[gameState.currentUserId]) {
        gameState.allUsers[gameState.currentUserId].preQuizCompleted = true;
        gameState.allUsers[gameState.currentUserId].preQuizScore = percentage;
        gameState.allUsers[gameState.currentUserId].unlockedLevels = gameState.unlockedLevels;
    }
    
    saveGameState();
    
    // Show pre-quiz results page
    showPreQuizResults(preQuizState.score, percentage);
    
    // Update the UI to show unlocked modules
    updateModuleCards();
}

// Show pre-quiz results page
function showPreQuizResults(score, percentage) {
    // Update results page with score
    document.getElementById('pre-quiz-final-score').textContent = percentage + '%';
    document.getElementById('pre-quiz-correct-answers').textContent = score + '/' + preQuizData.length;
    document.getElementById('pre-quiz-percentage').textContent = percentage + '%';
    
    // Set score message based on performance
    const scoreMessage = document.getElementById('pre-quiz-score-message');
    const scoreDescription = document.getElementById('pre-quiz-score-description');
    
    if (percentage >= 90) {
        scoreMessage.textContent = 'Excellent! 🌟';
        scoreDescription.textContent = 'Outstanding performance! You\'re ready for the quizzes!';
    } else if (percentage >= 70) {
        scoreMessage.textContent = 'Good Job! 👍';
        scoreDescription.textContent = 'Well done! You\'re ready to start the module quizzes!';
    } else if (percentage >= 50) {
        scoreMessage.textContent = 'Not Bad! 💪';
        scoreDescription.textContent = 'You can improve, but you\'re ready to continue!';
    } else {
        scoreMessage.textContent = 'Keep Learning! 📚';
        scoreDescription.textContent = 'Review the lessons and try again when ready!';
    }
    
    // Show the results page
    showPage('pre-quiz-results');
}

// POST-QUIZ FUNCTIONS

// Initialize post-quiz
function initializePostQuiz() {
    postQuizState = {
        currentQuestion: 0,
        score: 0,
        answers: [],
        startTime: Date.now(),
        timeLeft: 30,
        timer: null,
        warned10: false,
        warned5: false
    };
    
    // Clear any existing visual feedback
    clearPostQuizVisualFeedback();
}

// Show post-quiz page
function showPostQuizPage() {
    showPage('post-quiz-page');
    displayPostQuizQuestion();
    startPostQuizTimer();
}

// Display current post-quiz question
function displayPostQuizQuestion() {
    const question = postQuizData[postQuizState.currentQuestion];
    const questionText = document.getElementById('post-quiz-question-text');
    const optionsContainer = document.getElementById('post-quiz-options');
    const questionNumber = document.getElementById('post-quiz-question-number');
    const progressFill = document.getElementById('post-quiz-progress');
    const nextBtn = document.getElementById('post-quiz-next-btn');
    const submitBtn = document.getElementById('post-quiz-submit-btn');
    
    // Update question number and progress
    questionNumber.textContent = postQuizState.currentQuestion + 1;
    progressFill.style.width = `${((postQuizState.currentQuestion + 1) / postQuizData.length) * 100}%`;
    
    // Display question
    questionText.textContent = question.question;
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.innerHTML = `
            <input type="radio" name="post-quiz-answer" value="${index}" id="post-quiz-option-${index}">
            <label for="post-quiz-option-${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
    
    // Add event listeners to options
    const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            nextBtn.disabled = false;
            postQuizState.answers[postQuizState.currentQuestion] = parseInt(this.value);
            
            // Keep timer running - don't clear it when answer is selected
        });
    });
    
    // Show/hide buttons
    if (postQuizState.currentQuestion === postQuizData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
    
    // Reset button state
    nextBtn.disabled = true;
    
    // Reset timer display
    document.getElementById('post-quiz-timer').textContent = postQuizState.timeLeft;
}

// Start post-quiz timer
function startPostQuizTimer() {
    // Clear any existing timer
    if (postQuizState.timer) {
        clearInterval(postQuizState.timer);
    }
    
    const startTime = Date.now();
    const duration = 30000; // 30 seconds per question in milliseconds
    
    // Store start time for accurate calculations
    postQuizState.startTime = startTime;
    postQuizState.timeLeft = 30;
    
    // Update timer immediately
    updatePostQuizTimer();
    
    // Use high-frequency updates for smooth display
    postQuizState.timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        
        // Calculate time left in seconds (more accurate)
        postQuizState.timeLeft = Math.ceil(remaining / 1000);
        
        updatePostQuizTimer();
        
        // Check if time is up
        if (remaining <= 0) {
            clearInterval(postQuizState.timer);
            postQuizState.timer = null;
            nextPostQuizQuestion(); // This will show answer feedback
        }
    }, 50); // Update every 50ms for smooth display
}

// Update post-quiz timer display
function updatePostQuizTimer() {
    const timerElement = document.getElementById('post-quiz-timer');
    if (!timerElement) return;
    
    // Ensure timeLeft is never negative
    const timeLeft = Math.max(0, postQuizState.timeLeft);
    
    // Format display - show actual countdown timer
    timerElement.textContent = timeLeft;
    
    // Add visual warning when time is low
    if (timeLeft <= 10) {
        addPostQuizTimerWarning();
        
        // Show urgent time warnings (only once per warning)
        if (timeLeft === 10 && !postQuizState.warned10) {
            postQuizState.warned10 = true;
            showPopup('Hurry up! Only 10 seconds left! ⚡', 'warning');
        } else if (timeLeft === 5 && !postQuizState.warned5) {
            postQuizState.warned5 = true;
            showPopup('Last 5 seconds! Quick! 🚨', 'error');
        }
    } else {
        removePostQuizTimerWarning();
        // Reset warning flags when time is above 10
        if (timeLeft > 10) {
            postQuizState.warned10 = false;
            postQuizState.warned5 = false;
        }
    }
    
    // Add critical warning for last 3 seconds
    if (timeLeft <= 3) {
        timerElement.style.color = '#dc3545';
        timerElement.style.fontWeight = 'bold';
        timerElement.style.animation = 'pulse 0.5s infinite';
    } else {
        timerElement.style.color = '';
        timerElement.style.fontWeight = '';
        timerElement.style.animation = '';
    }
}

// Add post-quiz timer warning
function addPostQuizTimerWarning() {
    const timerElement = document.getElementById('post-quiz-timer');
    if (timerElement) {
        timerElement.style.color = '#ffc107';
        timerElement.style.fontWeight = 'bold';
    }
}

// Remove post-quiz timer warning
function removePostQuizTimerWarning() {
    const timerElement = document.getElementById('post-quiz-timer');
    if (timerElement) {
        timerElement.style.color = '';
        timerElement.style.fontWeight = '';
    }
}

// Clear visual feedback from post-quiz options
function clearPostQuizVisualFeedback() {
    const optionsContainer = document.getElementById('post-quiz-options');
    const optionElements = optionsContainer.querySelectorAll('.quiz-option');
    
    optionElements.forEach(option => {
        const label = option.querySelector('label');
        // Reset styles
        option.style.backgroundColor = '';
        option.style.border = '';
        option.style.opacity = '';
        // Reset label content (remove checkmarks and X marks)
        if (label) {
            label.innerHTML = label.innerHTML.replace(/[✓✗]\s*$/, '');
        }
    });
    
    // Remove any explanation divs
    const explanationDivs = optionsContainer.querySelectorAll('.answer-explanation');
    explanationDivs.forEach(div => div.remove());
}

// Show answer feedback for current post-quiz question
function showPostQuizAnswerFeedback() {
    const question = postQuizData[postQuizState.currentQuestion];
    const selectedAnswer = postQuizState.answers[postQuizState.currentQuestion];
    const isCorrect = selectedAnswer !== undefined && selectedAnswer === question.correct;
    
    // Update score
    if (isCorrect) {
        postQuizState.score++;
    }
    
    // Show answer feedback
    const optionsContainer = document.getElementById('post-quiz-options');
    const nextBtn = document.getElementById('post-quiz-next-btn');
    const submitBtn = document.getElementById('post-quiz-submit-btn');
    
    // Disable all radio buttons
    const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.disabled = true;
    });
    
    // Highlight correct and incorrect answers
    const optionElements = optionsContainer.querySelectorAll('.quiz-option');
    optionElements.forEach((option, index) => {
        const radio = option.querySelector('input[type="radio"]');
        const label = option.querySelector('label');
        
        if (index === question.correct) {
            // Correct answer - highlight in green
            option.style.backgroundColor = '#d4edda';
            option.style.border = '2px solid #28a745';
            label.innerHTML = `${question.options[index]} ✓`;
        } else if (selectedAnswer !== undefined && index === selectedAnswer && !isCorrect) {
            // Selected wrong answer - highlight in red
            option.style.backgroundColor = '#f8d7da';
            option.style.border = '2px solid #dc3545';
            label.innerHTML = `${question.options[index]} ✗`;
        } else {
            // Other options - gray out
            option.style.backgroundColor = '#f8f9fa';
            option.style.border = '1px solid #dee2e6';
            option.style.opacity = '0.6';
        }
    });
    
    // Don't automatically enable buttons - let the calling function handle this
}

// Next post-quiz question (called when timer expires)
function nextPostQuizQuestion() {
    // Clear timer
    if (postQuizState.timer) {
        clearInterval(postQuizState.timer);
        postQuizState.timer = null;
    }
    
    // Show answer feedback and enable continue button
    showPostQuizAnswerAndProceed();
}

// Show answer feedback when user clicks Next Question
function showPostQuizAnswerAndProceed() {
    // Clear timer when user clicks Next Question
    if (postQuizState.timer) {
        clearInterval(postQuizState.timer);
        postQuizState.timer = null;
    }
    
    // Show answer feedback first
    showPostQuizAnswerFeedback();
    
    // Change button to "Continue" after showing feedback
    const nextBtn = document.getElementById('post-quiz-next-btn');
    const submitBtn = document.getElementById('post-quiz-submit-btn');
    
    if (postQuizState.currentQuestion === postQuizData.length - 1) {
        submitBtn.textContent = 'Finish Quiz';
        submitBtn.onclick = proceedToNextPostQuizQuestion;
        submitBtn.disabled = false;
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.textContent = 'Continue';
        nextBtn.onclick = proceedToNextPostQuizQuestion;
        nextBtn.disabled = false;
    }
}

// Move to next question after feedback
function proceedToNextPostQuizQuestion() {
    // Move to next question
    postQuizState.currentQuestion++;
    
    if (postQuizState.currentQuestion < postQuizData.length) {
        // Clear any visual feedback from previous question
        clearPostQuizVisualFeedback();
        
        // Reset button states
        const nextBtn = document.getElementById('post-quiz-next-btn');
        const submitBtn = document.getElementById('post-quiz-submit-btn');
        nextBtn.textContent = 'Next Question';
        nextBtn.onclick = showPostQuizAnswerAndProceed;
        nextBtn.disabled = true;
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
        
        // Reset timer for next question
        postQuizState.timeLeft = 30;
        postQuizState.warned10 = false;
        postQuizState.warned5 = false;
        document.getElementById('post-quiz-timer').textContent = postQuizState.timeLeft;
        displayPostQuizQuestion();
        startPostQuizTimer();
    } else {
        // Quiz completed
        submitPostQuiz();
    }
}

// Submit post-quiz
function submitPostQuiz() {
    // Clear timer
    if (postQuizState.timer) {
        clearInterval(postQuizState.timer);
        postQuizState.timer = null;
    }
    
    // Calculate final score
    const percentage = Math.round((postQuizState.score / postQuizData.length) * 100);
    
    // Store post-quiz completion
    gameState.postQuizCompleted = true;
    gameState.postQuizScore = percentage;
    saveGameState();
    
    // Show the post-quiz results page
    showPostQuizResults();
    
    // Update the UI
    updateUI();
}

// Show post-quiz results
function showPostQuizResults() {
    showPage('post-quiz-results');
    const percentage = Math.round((postQuizState.score / postQuizData.length) * 100);
    document.getElementById('post-quiz-final-score').textContent = `${percentage}%`;
    document.getElementById('post-quiz-correct-answers').textContent = `${postQuizState.score}/${postQuizData.length}`;
    document.getElementById('post-quiz-percentage').textContent = `${percentage}%`;

    let message = "Keep Learning! 📚";
    let description = "You completed the post-quiz. Great effort!";
    if (percentage >= 90) {
        message = "Excellent! 🌟";
        description = "You aced the post-quiz! Outstanding performance!";
    } else if (percentage >= 70) {
        message = "Good Job! 👍";
        description = "You passed the post-quiz. Well done!";
    } else if (percentage >= 50) {
        message = "Not Bad! 💪";
        description = "You completed the post-quiz. Keep practicing!";
    }
    document.getElementById('post-quiz-score-message').textContent = message;
    document.getElementById('post-quiz-score-description').textContent = description;
    document.getElementById('post-quiz-status').textContent = "Completed";
}

// Show post-quiz modal
function showPostQuizModal() {
    const modal = document.getElementById('post-quiz-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        modal.style.zIndex = '9999'; // Ensure it's on top
        console.log('Post-quiz modal shown');
    } else {
        console.error('Post-quiz modal element not found!');
    }
}

// Hide post-quiz modal
function hidePostQuizModal() {
    const modal = document.getElementById('post-quiz-modal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Post-quiz modal hidden');
    }
}

// Start post-quiz from modal
function startPostQuiz() {
    hidePostQuizModal();
    initializePostQuiz();
    showPostQuizPage();
}

// Check if all modules are completed and show post-quiz
function checkForPostQuiz() {
    // Check if all 5 modules are unlocked (completed at least once)
    const allModulesUnlocked = gameState.unlockedLevels.length >= 5 && 
                                gameState.unlockedLevels.includes(1) &&
                                gameState.unlockedLevels.includes(2) &&
                                gameState.unlockedLevels.includes(3) &&
                                gameState.unlockedLevels.includes(4) &&
                                gameState.unlockedLevels.includes(5);
    
    if (allModulesUnlocked && !gameState.postQuizCompleted) {
        // Show the post-quiz modal notification
        showPostQuizModal();
    }
}

// Update user list
function updateUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    
    // Sort users alphabetically by name
    const sortedUserIds = Object.keys(gameState.allUsers).sort((a, b) => {
        const nameA = gameState.allUsers[a].playerName.toLowerCase();
        const nameB = gameState.allUsers[b].playerName.toLowerCase();
        return nameA.localeCompare(nameB);
    });
    
    sortedUserIds.forEach(userId => {
        const user = gameState.allUsers[userId];
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
            <div class="user-name">${user.playerName}</div>
            <div class="user-stats">
                Level ${user.currentLevel} • ${user.totalQuizzes} quizzes
            </div>
        `;
        userItem.addEventListener('click', () => selectUser(userId));
        userList.appendChild(userItem);
    });
}

// Select user
function selectUser(userId) {
    loadUserData(userId);
    hideUserSelectionModal();
    updateUI();
    showPopup(`Welcome back, ${gameState.playerName}! 👋`, 'success');
    setTimeout(() => {
        showPopup('Continue where you left off! 🎯', 'info');
    }, 2000);
}

// Load user data
function loadUserData(userId) {
    const user = gameState.allUsers[userId];
    if (!user) return;
    
    gameState.currentUserId = userId;
    gameState.playerName = user.playerName;
    gameState.currentLevel = user.currentLevel;
    gameState.unlockedLevels = user.unlockedLevels;
    gameState.scores = user.scores;
    gameState.totalQuizzes = user.totalQuizzes;
    gameState.achievements = user.achievements;
    
    // Load completed modules
    if (user.completedModules) {
        completedModules = user.completedModules;
    }
    
    // Recalculate statistics to ensure accuracy
    calculateAccurateStats();
    
    // Update last played time
    gameState.allUsers[userId].lastPlayed = new Date().toISOString();
    saveGameState();
    updateUI(); // Ensure display is updated
}

// Save current user data
function saveCurrentUserData() {
    if (!gameState.currentUserId) return;
    
    gameState.allUsers[gameState.currentUserId] = {
        playerName: gameState.playerName,
        currentLevel: gameState.currentLevel,
        unlockedLevels: gameState.unlockedLevels,
        scores: gameState.scores,
        totalQuizzes: gameState.totalQuizzes,
        achievements: gameState.achievements,
        completedModules: completedModules,
        preQuizCompleted: gameState.preQuizCompleted,
        preQuizScore: gameState.preQuizScore,
        postQuizCompleted: gameState.postQuizCompleted,
        postQuizScore: gameState.postQuizScore,
        createdAt: gameState.allUsers[gameState.currentUserId].createdAt,
        lastPlayed: new Date().toISOString()
    };
    
    saveGameState();
}

// Handle new player
function handleNewPlayer() {
    showNameModal();
}

// Show popup message (removed duplicate - using the one at the end of file)

// Close popup
function closePopup(closeBtn) {
    const popup = closeBtn.closest('.popup-message');
    if (popup) {
        popup.remove();
    }
}

// Update UI
function updateUI() {
    updatePlayerDisplay();
    updateModuleCards();
    updatePerformance();
    updateResultsPage();
    updateUsersPage();
}

// Update player display
function updatePlayerDisplay() {
    const playerNameDisplay = document.getElementById('player-name-display');


    
    if (playerNameDisplay) {
        const displayName = gameState.playerName || 'Guest';
        playerNameDisplay.textContent = displayName;

    } else {
        console.error('player-name-display element not found!');
    }
}

// Update module cards
function updateModuleCards() {
    for (let i = 1; i <= 5; i++) {
        const moduleCard = document.getElementById(`module-${i}-card`);
        const moduleStatus = document.getElementById(`module-${i}-status`);
        const moduleBtn = document.getElementById(`module-${i}-btn`);
        
        if (moduleCard && moduleStatus && moduleBtn) {
            const moduleScore = gameState.scores[`module-${i}`];
            const isCompleted = (moduleScore && moduleScore >= 70) || completedModules[`module-${i}`];
            const isUnlocked = gameState.unlockedLevels.includes(i);
            
            if (isUnlocked) {
                moduleCard.classList.remove('locked');
                
                if (isCompleted) {
                    moduleCard.classList.add('completed');
                    moduleStatus.textContent = 'Completed ✅';
                    moduleBtn.disabled = false;
                    moduleBtn.textContent = 'Retake Quiz';
                    moduleBtn.onclick = () => startQuiz(`module-${i}`);
                } else {
                    moduleCard.classList.remove('completed');
                    moduleStatus.textContent = 'Available';
                    moduleBtn.disabled = false;
                    moduleBtn.textContent = 'Start Quiz';
                    moduleBtn.onclick = () => startQuiz(`module-${i}`);
                }
            } else {
                moduleCard.classList.add('locked');
                moduleCard.classList.remove('completed');
                moduleStatus.textContent = 'Locked';
                moduleBtn.disabled = true;
                moduleBtn.textContent = 'Locked';
                moduleBtn.onclick = null;
            }
        }
    }
}

// Update performance
function updatePerformance() {
    // Calculate accurate statistics
    const stats = calculateAccurateStats();
    
    // Update overall progress
    const overallProgress = document.getElementById('overall-progress');
    if (overallProgress) {
        overallProgress.textContent = `${stats.averageScore}%`;
    }
    
    // Update quizzes completed
    const quizzesCompleted = document.getElementById('quizzes-completed');
    if (quizzesCompleted) {
        quizzesCompleted.textContent = stats.totalQuizzes;
    }
    
    // Update levels unlocked
    const levelsUnlocked = document.getElementById('levels-unlocked');
    if (levelsUnlocked) {
        levelsUnlocked.textContent = `${stats.levelsCompleted}/12`;
    }
}


// Show page-specific guidance
function showPageGuidance(pageId) {
    switch(pageId) {
        case 'home':
            if (gameState.playerName) {
                setTimeout(() => {
                    showPopup(`Welcome to your dashboard, ${gameState.playerName}! 🏠`, 'info');
                }, 500);
            }
            break;
        case 'quizzes':
            setTimeout(() => {
                showPopup('Choose a module to start your quiz! 📚', 'info');
            }, 500);
            break;
        case 'performance':
            setTimeout(() => {
                showPopup('Check your progress and achievements! 📊', 'info');
            }, 500);
            break;
        case 'results':
            setTimeout(() => {
                showPopup('View your detailed quiz results! 📈', 'info');
            }, 500);
            break;
        case 'leaderboard':
            setTimeout(() => {
                showPopup('See how you rank against other players! 🏆', 'info');
            }, 500);
            break;
        case 'lessons':
            setTimeout(() => {
                showPopup('Access video lessons and PDF modules! 🎥', 'info');
                setTimeout(() => {
                    showPopup('Watch videos and read PDFs to prepare for quizzes! 📚', 'info');
                }, 2000);
            }, 500);
            break;
    }
}






// Finish quiz (duplicate removed - using the one below)

// Show quiz completion popup
function showQuizCompletionPopup(passed, percentage, level) {
    const moduleNumber = parseInt(level.replace('module-', ''));
    const nextModuleNumber = moduleNumber + 1;
    
    const popup = document.createElement('div');
    popup.className = 'quiz-completion-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>${passed ? '🎉 Congratulations!' : '😔 Try Again'}</h2>
            <p>${passed ? 'You passed the quiz!' : 'You need 70% or higher to pass.'}</p>
            <div class="score-display">Score: ${percentage}%</div>
            <div class="popup-actions">
                ${nextModuleNumber <= 12 ? 
                    `<button class="next-level-btn" onclick="goToNextLevel('${level}')">Next: Module ${nextModuleNumber}</button>` : 
                    ''
                }
                <button class="back-to-quizzes-btn" onclick="showPage('quizzes')">Back to Quizzes</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 10000);
}

// Go to next level
function goToNextLevel(currentLevel) {
    const moduleNumber = parseInt(currentLevel.replace('module-', ''));
    const nextModuleNumber = moduleNumber + 1;
    
    if (nextModuleNumber <= 5) {
        showPage(`module-${nextModuleNumber}-quiz`);
        initializeQuiz(`module-${nextModuleNumber}`);
    }
}

// Start timer
function startTimer(level) {
    // Clear any existing timer
    if (currentQuiz.timer) {
        clearInterval(currentQuiz.timer);
    }
    
    const startTime = Date.now();
    const duration = 30000; // 30 seconds per question in milliseconds
    
    // Store start time for accurate calculations
    currentQuiz.startTime = startTime;
    currentQuiz.timeLeft = 30;
    
    // Update timer immediately
    updateTimer(level);
    
    // Use high-frequency updates for smooth display
    currentQuiz.timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        
        // Calculate time left in seconds (more accurate)
        currentQuiz.timeLeft = Math.ceil(remaining / 1000);
        
        updateTimer(level);
        
        // Check if time is up
        if (remaining <= 0) {
            clearInterval(currentQuiz.timer);
            currentQuiz.timer = null;
            autoProceedToNextQuestion(level);
        }
    }, 50); // Update every 50ms for smooth display
}

// Update timer display
function updateTimer(level) {
    const timerElement = document.getElementById(`${level}-timer`) || document.getElementById('quiz-timer');
    if (!timerElement) return;
    
    // Ensure timeLeft is never negative
    const timeLeft = Math.max(0, currentQuiz.timeLeft);
    
    // Format display - show actual countdown timer
    timerElement.textContent = `⏱️ ${timeLeft}s`;
    
    // Add visual warning when time is low
    if (timeLeft <= 10) {
        addTimerWarning(level);
        
        // Show urgent time warnings (only once per warning)
        if (timeLeft === 10 && !currentQuiz.warned10) {
            currentQuiz.warned10 = true;
            showPopup('Hurry up! Only 10 seconds left! ⚡', 'warning');
        } else if (timeLeft === 5 && !currentQuiz.warned5) {
            currentQuiz.warned5 = true;
            showPopup('Last 5 seconds! Quick! 🚨', 'error');
        }
    } else {
        removeTimerWarning(level);
        // Reset warning flags when time is above 10
        if (timeLeft > 10) {
            currentQuiz.warned10 = false;
            currentQuiz.warned5 = false;
        }
    }
    
    // Add critical warning for last 3 seconds
    if (timeLeft <= 3) {
        timerElement.style.color = '#dc3545';
        timerElement.style.fontWeight = 'bold';
        timerElement.style.animation = 'pulse 0.5s infinite';
    } else {
        timerElement.style.color = '';
        timerElement.style.fontWeight = '';
        timerElement.style.animation = '';
    }
}

// Add timer warning
function addTimerWarning(level) {
    const timerElement = document.getElementById(`${level}-timer`) || document.getElementById('quiz-timer');
    if (timerElement) {
        timerElement.classList.add('timer-warning');
    }
}

// Remove timer warning
function removeTimerWarning(level) {
    const timerElement = document.getElementById(`${level}-timer`) || document.getElementById('quiz-timer');
    if (timerElement) {
        timerElement.classList.remove('timer-warning', 'timer-critical');
        // Reset inline styles
        timerElement.style.color = '';
        timerElement.style.fontWeight = '';
        timerElement.style.animation = '';
    }
}

// Auto proceed to next question when timer expires
function autoProceedToNextQuestion(level) {
    // Clear any existing timer
    if (currentQuiz.timer) {
        clearInterval(currentQuiz.timer);
        currentQuiz.timer = null;
    }
    
    // Show timeout message
    showPopup('Time\'s up! Moving to next question ⏰', 'warning');
    
    // Record 0 points for this question (no answer selected)
    currentQuiz.answers.push(-1); // -1 indicates no answer given
    
    // Show correct answer visually
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const optionInputs = document.querySelectorAll(`#${level}-options-container input[name="${level}-answer"]`);
    optionInputs.forEach((input, index) => {
        const option = input.parentElement;
        const label = option.querySelector('label');
        
        // Remove any existing feedback classes
        option.classList.remove('correct', 'incorrect', 'selected-wrong');
        
        if (index === question.correct) {
            // Correct answer - always green
            option.classList.add('correct');
            if (label && question.options && question.options[index]) {
                setOptionLabelContent(label, question.options[index], '✅');
            }
        } else {
            // Other options - keep neutral (no special styling)
            // Don't add any classes or modify the label
        }
    });
    
    // Disable all options
    optionInputs.forEach(input => {
        input.disabled = true;
    });
    
    // Show next question button after showing feedback
    setTimeout(() => {
        const nextButton = document.getElementById(`${level}-next-question`) || document.getElementById('next-question');
        if (nextButton) {
            nextButton.classList.remove('hidden');
        }
    }, 2000); // Wait 2 seconds to show the correct answer
}

// Update progress bar
function updateProgressBar(level) {
    const progressFill = document.getElementById(`${level}-progress-fill`) || document.getElementById('quiz-progress-bar');
    if (progressFill) {
        const progress = ((currentQuiz.currentQuestion + 1) / currentQuiz.questions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

// Update high scores
function updateHighScores() {
    const score = {
        name: gameState.playerName,
        score: Math.max(...Object.values(gameState.scores)),
        level: gameState.currentLevel,
        date: new Date().toLocaleDateString()
    };
    
    // Remove existing score for this player
    highScores = highScores.filter(s => s.name !== gameState.playerName);
    
    // Add new score
    highScores.push(score);
    
    // Sort by score (descending)
    highScores.sort((a, b) => b.score - a.score);
    
    // Keep only top 10
    highScores = highScores.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('piOneersHighScores', JSON.stringify(highScores));
}

// Update leaderboard
function updateLeaderboard() {
    const leaderboardEntries = document.getElementById('leaderboard-entries');
    if (!leaderboardEntries) return;
    
    leaderboardEntries.innerHTML = '';
    
    highScores.forEach((score, index) => {
        const entry = document.createElement('div');
        entry.className = 'leaderboard-entry';
        entry.innerHTML = `
            <div class="rank-col">${index + 1}</div>
            <div class="name-col">${score.name}</div>
            <div class="score-col">${score.score}%</div>
            <div class="level-col">Level ${score.level}</div>
            <div class="date-col">${score.date}</div>
        `;
        leaderboardEntries.appendChild(entry);
    });
    
    // Update stats
    const totalPlayers = document.getElementById('total-players');
    const yourRank = document.getElementById('your-rank');
    const yourBestScore = document.getElementById('your-best-score');
    
    if (totalPlayers) {
        totalPlayers.textContent = highScores.length;
    }
    
    if (yourRank) {
        const playerIndex = highScores.findIndex(s => s.name === gameState.playerName);
        yourRank.textContent = playerIndex !== -1 ? playerIndex + 1 : '-';
    }
    
    if (yourBestScore) {
        const bestScore = Math.max(...Object.values(gameState.scores), 0);
        yourBestScore.textContent = `${bestScore}%`;
    }
    
    // Update module breakdown grid
    updateLeaderboardModuleGrid();
    
    // Add leaderboard page guidance
    setTimeout(() => {
        const playerIndex = highScores.findIndex(s => s.name === gameState.playerName);
        if (playerIndex === -1) {
            showPopup('Take quizzes to appear on the leaderboard! 🏆', 'info');
        } else if (playerIndex === 0) {
            showPopup('You\'re in 1st place! Amazing! 🥇', 'success');
        } else if (playerIndex < 3) {
            showPopup(`You\'re in ${playerIndex + 1}rd place! Great job! 🥉`, 'success');
        } else if (playerIndex < 5) {
            showPopup(`You\'re in ${playerIndex + 1}th place! Keep improving! 💪`, 'info');
        } else {
            showPopup(`You\'re in ${playerIndex + 1}th place! Keep practicing! 📈`, 'info');
        }
    }, 1000);
}

// Update leaderboard module breakdown grid
function updateLeaderboardModuleGrid() {
    const moduleGrid = document.getElementById('leaderboard-module-grid');
    if (!moduleGrid) return;
    
    const moduleTitles = [
        'Statistical Variables', 'Statistical Hypothesis', 'Parametric Test of Differential', 
        'Simple Linear Regression', 'Test of Relationship'
    ];
    
    const moduleIcons = [
        '📊', '📈', '🔬', '📉', '🔗'
    ];
    
    let html = '';
    for (let i = 1; i <= 5; i++) {
        const moduleScore = gameState.scores[`module-${i}`];
        const isCompleted = moduleScore && moduleScore >= 70;
        const isLocked = i > Math.max(...gameState.unlockedLevels);
        
        let statusText = 'Available';
        let statusClass = 'available';
        let cardClass = '';
        
        if (isCompleted) {
            statusText = 'Completed';
            statusClass = 'completed';
            cardClass = 'completed';
        } else if (isLocked) {
            statusText = 'Locked';
            statusClass = 'locked';
            cardClass = 'locked';
        }
        
        const scoreText = moduleScore ? `${moduleScore}%` : (isLocked ? 'Locked' : 'Completed');
        
        html += `
            <div class="leaderboard-module-card ${cardClass}">
                <div class="leaderboard-module-header">
                    <div class="leaderboard-module-title">
                        <span class="leaderboard-module-icon">${moduleIcons[i-1]}</span>
                        Module ${i}
                    </div>
                    <div class="leaderboard-module-status ${statusClass}">${statusText}</div>
                </div>
                <div class="leaderboard-module-score">
                    <div class="leaderboard-score-label">Best Score:</div>
                    <div class="leaderboard-score-value">${scoreText}</div>
                </div>
            </div>
        `;
    }
    
    moduleGrid.innerHTML = html;
}

// Load game state
function loadGameState() {
    const saved = localStorage.getItem('piOneersGameState');
    if (saved) {
        const data = JSON.parse(saved);
        gameState.allUsers = data.allUsers || {};
        gameState.currentUserId = data.currentUserId;
        
        if (gameState.currentUserId && gameState.allUsers[gameState.currentUserId]) {
            const user = gameState.allUsers[gameState.currentUserId];
            gameState.playerName = user.playerName;
            gameState.currentLevel = user.currentLevel;
            gameState.unlockedLevels = user.unlockedLevels;
            gameState.scores = user.scores;
            gameState.totalQuizzes = user.totalQuizzes;
            gameState.achievements = user.achievements;
            gameState.preQuizCompleted = user.preQuizCompleted === true; // Explicitly check for true, default to false
            gameState.preQuizScore = user.preQuizScore || 0;
            gameState.postQuizCompleted = user.postQuizCompleted || false;
            gameState.postQuizScore = user.postQuizScore || 0;
            
            // Load completed modules
            if (user.completedModules) {
                completedModules = user.completedModules;
            }
            
            // Recalculate statistics to ensure accuracy
            calculateAccurateStats();
        }
    }
    
    // Load high scores
    const savedScores = localStorage.getItem('piOneersHighScores');
    if (savedScores) {
        highScores = JSON.parse(savedScores);
    }
}

// Save game state
function saveGameState() {
    const dataToSave = {
        allUsers: gameState.allUsers,
        currentUserId: gameState.currentUserId
    };
    localStorage.setItem('piOneersGameState', JSON.stringify(dataToSave));
}

// Button handler functions
function handleNameSubmit(event) {

    event.preventDefault();
    const nameInput = document.getElementById('player-name');
    const playerName = nameInput.value.trim();

    
    if (playerName) {
        // Check if user already exists
        const existingUserId = Object.keys(gameState.allUsers).find(id => 
            gameState.allUsers[id].playerName.toLowerCase() === playerName.toLowerCase()
        );
        
        if (existingUserId) {
            // Switch to existing user

            loadUserData(existingUserId);
            showPopup(`Welcome back, ${playerName}! 🎉`, 'success');
        } else {
            // Create new user

            createNewUser(playerName);
        }
        
        document.getElementById('name-modal').style.display = 'none';
        showPage('home');
        
        // Ensure display is updated with a small delay
        setTimeout(() => {
            updateUI();
        }, 100);
        
    } else {

        showPopup('Please enter your name to continue! 📝', 'warning');
    }
}

function handleNameCancel(event) {

    event.preventDefault();

    document.getElementById('name-modal').style.display = 'none';
    showPage('home');
}

// Navigation functions
function showPage(pageId) {
    // Check for pre-quiz requirement before showing quizzes page
    if (pageId === 'quizzes') {
        console.log('showPage called for quizzes, preQuizCompleted:', gameState.preQuizCompleted);
        if (!gameState.preQuizCompleted) {
            console.log('Pre-quiz not completed, showing modal instead');
            showPreQuizModal();
            return; // Don't show the quizzes page
        }
    }
    
    // Hide all pages and remove active class
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show selected page and add active class
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
    }
    
    // Add active class to corresponding nav link
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update specific page content
    if (pageId === 'performance') {
        updatePerformancePage();
    } else if (pageId === 'results') {
        console.log('Showing results page, updating statistics...');
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
            updateResultsPage();
        }, 100);
    } else if (pageId === 'users') {
        console.log('Showing users page, updating user data...');
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
            updateUsersPage();
        }, 100);
    } else if (pageId === 'leaderboard') {
        updateLeaderboard();
    } else if (pageId === 'quizzes') {
        updateModuleCards();
    }
}

// Update module cards based on unlocked levels

// Start quiz for specific module
function startQuiz(moduleId) {
    const moduleNumber = parseInt(moduleId.replace('module-', ''));
    
    if (!gameState.unlockedLevels.includes(moduleNumber)) {
        showPopup('This module is locked! Complete the previous module first! 🔒', 'error');
        return;
    }
    
    // Clear any existing timer
    if (currentQuiz.timer) {
        clearInterval(currentQuiz.timer);
        currentQuiz.timer = null;
    }
    
    currentQuiz.level = moduleId;
    
    if (!quizData[moduleId]) {
        console.error('Quiz data not found for module:', moduleId);
        showPopup(`Quiz data not found for ${moduleId}!`, 'error');
        return;
    }
    
    
    
    
    currentQuiz.questions = [...quizData[moduleId]];
    currentQuiz.currentQuestion = 0;
    currentQuiz.score = 0;
    currentQuiz.answers = [];
    currentQuiz.startTime = Date.now();
    currentQuiz.timeLeft = 30;
    currentQuiz.selectedAnswer = null;
    currentQuiz.warned10 = false;
    currentQuiz.warned5 = false;
    
    console.log(`Starting quiz for ${moduleId}`);
    console.log(`Number of questions: ${currentQuiz.questions.length}`);
    console.log(`First question:`, currentQuiz.questions[0]);
    
    showPage(`${moduleId}-quiz`);
    
    // Wait for DOM to be ready and then display question
    const waitForDOM = () => {
        const questionContainer = document.getElementById(`${moduleId}-question-container`);
        const optionsContainer = document.getElementById(`${moduleId}-options-container`);
        
        console.log(`Looking for containers: ${moduleId}-question-container and ${moduleId}-options-container`);
        console.log(`Question container found:`, !!questionContainer);
        console.log(`Options container found:`, !!optionsContainer);
        
        if (questionContainer && optionsContainer) {
            console.log('Containers found, displaying question...');
            displayQuestion(moduleId);
        } else {
            console.log('Containers not found, retrying...');
            setTimeout(waitForDOM, 50);
        }
    };
    
    waitForDOM();
}

// Helper to detect HTML content inside option strings
function optionContainsHTML(content) {
    return typeof content === 'string' && /<[^>]+>/.test(content);
}

// Helper to render option labels with or without HTML safely
function setOptionLabelContent(label, content, prefix = '') {
    if (!label) return;
    const finalContent = prefix ? `${prefix} ${content}` : content;
    if (optionContainsHTML(content)) {
        label.innerHTML = finalContent;
    } else {
        label.textContent = finalContent;
    }
}

// Display current question
function displayQuestion(level) {
    // Use module-specific IDs only
    const questionContainer = document.getElementById(`${level}-question-container`);
    const optionsContainer = document.getElementById(`${level}-options-container`);
    const progressBar = document.getElementById(`${level}-progress-fill`);
    const currentQuestionSpan = document.getElementById(`${level}-current-question`);
    const totalQuestionsSpan = document.getElementById(`${level}-total-questions`);
    
    if (!questionContainer || !optionsContainer) {
        return;
    }
    
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const progress = ((currentQuiz.currentQuestion + 1) / currentQuiz.questions.length) * 100;
    
    // Check if question exists
    if (!question) {
        console.error('Question is undefined!', {
            level,
            currentQuestion: currentQuiz.currentQuestion,
            questionsLength: currentQuiz.questions.length
        });
        return;
    }
    
    // Debug: Log the question object
    console.log('Current question object:', question);
    console.log('Question options:', question.options);
    
    
    // Update question text
    const questionText = document.getElementById(`${level}-question-text`);
    if (questionText) {
        questionText.textContent = question.question;
    } else {
        questionContainer.innerHTML = `<p id="${level}-question-text">${question.question}</p>`;
    }
    
    // Update progress counters
    if (currentQuestionSpan) {
        currentQuestionSpan.textContent = currentQuiz.currentQuestion + 1;
    }
    if (totalQuestionsSpan) {
        totalQuestionsSpan.textContent = currentQuiz.questions.length;
    }
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    
    
    if (!question.options || !Array.isArray(question.options)) {
        console.error('Options is not an array!', question.options);
        return;
    }
    
    question.options.forEach((option, index) => {
        console.log(`Option ${index}:`, option);
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        // Create input element
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `${level}-answer`;
        input.value = index;
        input.id = `${level}-option-${index}`;
        
        // Create label element
        const label = document.createElement('label');
        label.htmlFor = `${level}-option-${index}`;
        setOptionLabelContent(label, option);
        
        // Append elements
        optionElement.appendChild(input);
        optionElement.appendChild(label);
        optionsContainer.appendChild(optionElement);
        
        // Debug: Check if the label was created correctly
        setTimeout(() => {
            console.log(`Label ${index} content after creation:`, label.textContent);
            // Check if the label still has the correct content after 1 second
            setTimeout(() => {
                console.log(`Label ${index} content after 1 second:`, label.textContent);
            }, 1000);
        }, 100);
    });
    
    // Clear any existing visual feedback classes from the container
    optionsContainer.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'incorrect', 'selected-wrong', 'selected');
    });
    
    // Add click handlers for immediate visual feedback
    optionsContainer.querySelectorAll('.option').forEach((option, index) => {
        option.addEventListener('click', function() {
            // Remove selection from other options
            optionsContainer.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
                const radio = opt.querySelector('input[type="radio"]');
                if (radio) radio.checked = false;
            });
            // Add selection to clicked option
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
    
    // Update progress bar
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    // Update question counter
    const currentQuestionElement = document.getElementById(`${level}-current-question`);
    if (currentQuestionElement) {
        currentQuestionElement.textContent = currentQuiz.currentQuestion + 1;
    }
    
    // Reset selected answer for new question
    currentQuiz.selectedAnswer = null;
    
    // Reset timer warning flags for new question
    currentQuiz.warned10 = false;
    currentQuiz.warned5 = false;
    
    // Start timer for this question
    startTimer(level);
}

// Submit answer
function submitAnswer(moduleId) {
    const optionsContainer = document.getElementById(`${moduleId}-options-container`);
    if (!optionsContainer) return;

    const selectedAnswer = optionsContainer.querySelector(`input[name="${moduleId}-answer"]:checked`);
    
    if (!selectedAnswer) {
        showPopup('Please select an answer before submitting! ⚠️', 'warning');
        return;
    }
    
    // Clear timer when answer is submitted
    if (currentQuiz.timer) {
        clearInterval(currentQuiz.timer);
        currentQuiz.timer = null;
    }
    
    const answer = parseInt(selectedAnswer.value);
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    
    // Store the answer
    currentQuiz.answers.push(answer);
    
    // Check if correct and update score
    const isCorrect = answer === question.correct;
    if (isCorrect) {
        currentQuiz.score++;
        showPopup(`Correct! Great job! ✅ The correct answer is: ${question.options[question.correct]}`, 'success');
    } else {
        showPopup(`Incorrect! The correct answer is: ${question.options[question.correct]} 📚`, 'warning');
    }
    
    // Show correct answer visually with enhanced feedback
    const optionInputs = optionsContainer.querySelectorAll(`input[name="${moduleId}-answer"]`);
    optionInputs.forEach((input, index) => {
        const option = input.parentElement;
        const label = option.querySelector('label');
        
        // Remove any existing feedback classes
        option.classList.remove('correct', 'incorrect', 'selected-wrong');
        
        if (index === question.correct) {
            // Correct answer - always green
            option.classList.add('correct');
            if (label && question.options && question.options[index]) {
                setOptionLabelContent(label, question.options[index], '✅');
            }
        } else if (index === answer && !isCorrect) {
            // User's wrong answer - red
            option.classList.add('incorrect');
            if (label && question.options && question.options[index]) {
                setOptionLabelContent(label, question.options[index], '❌');
            }
        }
        // Note: If user selected correct answer, it's already handled by the first condition
        // Other options remain neutral
    });
    
    // Disable all options
    optionInputs.forEach(input => {
        input.disabled = true;
    });
    
    // Show next question button or finish quiz
    const nextButton = document.getElementById(`${moduleId}-next-question`);
    if (nextButton) {
        nextButton.classList.remove('hidden');
    }
    
    const submitButton = document.getElementById(`${moduleId}-submit-answer`);
    if (submitButton) {
        submitButton.classList.add('hidden');
    }
    
    // Don't auto-advance - let user click Next Question button
}

// Next question function (called from HTML buttons)
function nextQuestion(moduleId) {
    // Clear timer when moving to next question
    if (currentQuiz.timer) {
        clearInterval(currentQuiz.timer);
        currentQuiz.timer = null;
    }
    
    currentQuiz.currentQuestion++;
    
    if (currentQuiz.currentQuestion < currentQuiz.questions.length) {
        // Display the new question (this will clear and recreate all options)
        displayQuestion(moduleId);
        // Re-enable options for new question
        const optionInputs = document.querySelectorAll(`#${moduleId}-options-container input[name="${moduleId}-answer"]`);
        optionInputs.forEach(input => {
            input.disabled = false;
        });
        // Hide next button and show submit button
        const nextButton = document.getElementById(`${moduleId}-next-question`);
        const submitButton = document.getElementById(`${moduleId}-submit-answer`);
        if (nextButton) nextButton.classList.add('hidden');
        if (submitButton) submitButton.classList.remove('hidden');
    } else {
        // Quiz completed
        finishQuiz(moduleId);
    }
}

// Finish quiz and show results
function finishQuiz(moduleId) {
    clearInterval(currentQuiz.timer);
    
    // Calculate accurate percentage
    const totalQuestions = currentQuiz.questions.length;
    const correctAnswers = currentQuiz.score;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const moduleNumber = parseInt(moduleId.replace('module-', ''));
    const passed = percentage >= 70;
    
    // Update game state with accurate scores
    gameState.scores[moduleId] = percentage;
    
    // Update statistics immediately
    calculateAccurateStats();
    
    // Update completed modules status
    if (passed) {
        completedModules[moduleId] = true;
    } else {
        completedModules[moduleId] = false;
    }
    
    // Ensure current module is in unlockedLevels
    if (!gameState.unlockedLevels.includes(moduleNumber)) {
        gameState.unlockedLevels.push(moduleNumber);
    }
    
    // Unlock next level if quiz is completed (regardless of score)
    if (moduleNumber < 12) {
        if (!gameState.unlockedLevels.includes(moduleNumber + 1)) {
            gameState.unlockedLevels.push(moduleNumber + 1);
            showPopup(`Module ${moduleNumber + 1} unlocked! 🎉`, 'success');
        }
    }
    
    // Check if all modules are completed and show post-quiz
    checkForPostQuiz();
    
    // Update high scores with accurate data
    updateHighScores(gameState.playerName, percentage, moduleNumber);
    
    // Save current user data
    saveCurrentUserData();
    
    // Update UI to show completion status
    updateUI();
    
    // Show professional results with accurate data
    showQuizResults(moduleId, percentage, correctAnswers, totalQuestions);
    
    // Show feedback based on actual performance
    setTimeout(() => {
        if (percentage >= 90) {
            showPopup('Outstanding performance! You\'re a math genius! 🌟', 'success');
        } else if (percentage >= 80) {
            showPopup('Excellent work! Keep up the great effort! 🎉', 'success');
        } else if (percentage >= 70) {
            showPopup('Good job! You passed the module! ✅', 'success');
        } else {
            showPopup('Don\'t give up! Review the lesson and try again! 📚', 'warning');
        }
    }, 1000);
}

// Continue to next unlocked quiz
function continueToNextQuiz() {
    console.log('continueToNextQuiz called!');
    console.log('Current quiz level:', currentQuiz ? currentQuiz.level : 'No current quiz');
    console.log('Unlocked levels:', gameState.unlockedLevels);
    console.log('Scores:', gameState.scores);
    
    // Find the next module that needs to be completed
    let nextModuleNumber = null;
    
    // First, try to find the next module after the current one
    if (currentQuiz && currentQuiz.level) {
        const currentModuleNumber = parseInt(currentQuiz.level.replace('module-', ''));
        
        // Look for the next module after the current one
        for (let i = currentModuleNumber + 1; i <= 5; i++) {
            if (gameState.unlockedLevels.includes(i)) {
                const moduleId = `module-${i}`;
                const score = gameState.scores[moduleId] || 0;
                
                // If this module is unlocked but not passed (score < 70), start it
                if (score < 70) {
                    nextModuleNumber = i;
                    break;
                }
            }
        }
    }
    
    // If no next module found after current one, look for any incomplete module
    if (!nextModuleNumber) {
        for (let i = 1; i <= 5; i++) {
            if (gameState.unlockedLevels.includes(i)) {
                const moduleId = `module-${i}`;
                const score = gameState.scores[moduleId] || 0;
                
                // If this module is unlocked but not passed (score < 70), start it
                if (score < 70) {
                    nextModuleNumber = i;
                    break;
                }
            }
        }
    }
    
    // Check if we found a valid next module
    console.log('Next module number found:', nextModuleNumber);
    
    if (nextModuleNumber && nextModuleNumber <= 5 && gameState.unlockedLevels.includes(nextModuleNumber)) {
        console.log('Starting next quiz:', `module-${nextModuleNumber}`);
        showPopup(`Starting Module ${nextModuleNumber}! 🚀`, 'info');
        // Start the next quiz automatically
        startQuiz(`module-${nextModuleNumber}`);
    } else {
        console.log('No next quiz available, going to quizzes page');
        // If no next quiz available, go to quizzes page
        showPage('quizzes');
        showPopup('All modules completed! Great job! 🎉', 'success');
    }
}

// Show professional quiz results
function showQuizResults(moduleId, score, correctAnswers, totalQuestions) {
    const moduleNumber = parseInt(moduleId.split('-')[1]);
    const moduleTitles = [
        'Statistical Variables', 'Statistical Hypothesis', 'Parametric Test of Differential', 
        'Simple Linear Regression', 'Test of Relationship'
    ];
    
    // Calculate time taken accurately
    const timeTaken = Math.max(0, 30 - Math.floor((Date.now() - currentQuiz.startTime) / 1000));
    
    // Update results display with accurate data
    const finalScoreElement = document.getElementById('final-score');
    const correctAnswersElement = document.getElementById('correct-answers');
    const timeTakenElement = document.getElementById('time-taken');
    const moduleNameElement = document.getElementById('module-name');
    
    if (finalScoreElement) finalScoreElement.textContent = `${score}%`;
    if (correctAnswersElement) correctAnswersElement.textContent = `${correctAnswers}/${totalQuestions}`;
    if (timeTakenElement) timeTakenElement.textContent = `${timeTaken}s`;
    if (moduleNameElement) moduleNameElement.textContent = `Module ${moduleNumber}: ${moduleTitles[moduleNumber - 1]}`;
    

    
    // Update module status
    const moduleStatus = document.getElementById('module-status');
    if (score >= 70) {
        moduleStatus.textContent = 'Completed ✅';
    } else {
        moduleStatus.textContent = 'In Progress 📚';
    }
    
    // Update score message based on performance
    const scoreMessage = document.getElementById('score-message');
    const scoreDescription = document.getElementById('score-description');
    
    if (score >= 90) {
        scoreMessage.textContent = 'Outstanding! 🌟';
        scoreDescription.textContent = 'You have mastered this module completely!';
    } else if (score >= 80) {
        scoreMessage.textContent = 'Excellent! 🎉';
        scoreDescription.textContent = 'Great job! You have a strong understanding of this topic.';
    } else if (score >= 70) {
        scoreMessage.textContent = 'Well Done! ✅';
        scoreDescription.textContent = 'Good work! You have passed this module successfully.';
    } else {
        scoreMessage.textContent = 'Keep Learning! 📚';
        scoreDescription.textContent = 'Don\'t give up! Review the lesson and try again.';
    }
    
    // Update module breakdown grid
    updateModuleBreakdownGrid(moduleNumber);
    
    // Show results page
    showPage('quiz-results');
    
    // Add results page guidance
    setTimeout(() => {
        if (score >= 70) {
            showPopup('Congratulations! You passed the module! 🎉', 'success');
            
            // Auto-start next quiz if not the last module
            if (moduleNumber < 12) {
                setTimeout(() => {
                    const nextModule = `module-${moduleNumber + 1}`;
                    showPopup(`Starting ${nextModule.replace('module-', 'Module ')} automatically! 🚀`, 'info');
                    startQuiz(nextModule);
                }, 3000); // Wait 3 seconds after success message
            } else {
                // All modules completed
                setTimeout(() => {
                    showPopup('🎉 Congratulations! You\'ve completed all modules! 🏆', 'success');
                }, 3000);
            }
        } else {
            showPopup('Keep learning! Review the lesson and try again! 📚', 'warning');
        }
    }, 1000);
}

// Update module breakdown grid
function updateModuleBreakdownGrid(currentModule) {
    const breakdownGrid = document.getElementById('module-breakdown-grid');
    if (!breakdownGrid) return;
    
    let html = '';
    for (let i = 1; i <= 5; i++) {
        const moduleScore = gameState.scores[`module-${i}`];
        const isCompleted = moduleScore && moduleScore >= 70;
        const isCurrent = i === currentModule;
        const isLocked = i > Math.max(...gameState.unlockedLevels);
        
        let statusText = 'Available';
        let itemClass = '';
        
        if (isCompleted) {
            statusText = 'Completed';
            itemClass = 'completed';
        } else if (isCurrent) {
            statusText = 'Current';
            itemClass = 'current';
        } else if (isLocked) {
            statusText = 'Locked';
            itemClass = 'locked';
        }
        
        const scoreText = moduleScore ? `${moduleScore}%` : '-';
        
        html += `
            <div class="module-progress-item ${itemClass}">
                <div class="module-number">${i}</div>
                <div class="module-status">${statusText}</div>
                <div class="module-score">${scoreText}</div>
            </div>
        `;
    }
    
    breakdownGrid.innerHTML = html;
}


// Popup system (removed duplicate - using the one below)


// Update high scores
function updateHighScores(name, score, level) {
    // Use current game state if parameters not provided
    const playerName = name || gameState.playerName;
    const playerScore = score || Math.max(...Object.values(gameState.scores), 0);
    const playerLevel = level || Math.max(...gameState.unlockedLevels, 1);
    

    
    const existingIndex = highScores.findIndex(s => s.name === playerName);
    const newScore = {
        name: playerName,
        score: playerScore,
        level: playerLevel,
        date: new Date().toLocaleDateString()
    };
    
    if (existingIndex !== -1) {
        // Update if new score is higher
        if (playerScore > highScores[existingIndex].score) {
            highScores[existingIndex] = newScore;

        }
    } else {
        // Add new score
        highScores.push(newScore);

    }
    
    // Sort by score (descending) and keep top 10
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('piOneersHighScores', JSON.stringify(highScores));
    
    // Update leaderboard display
    updateLeaderboard();
}

// Calculate accurate statistics
function calculateAccurateStats() {
    const scores = Object.values(gameState.scores).filter(score => score !== null && score >= 0);
    const totalQuizzes = scores.length;
    const averageScore = scores.length > 0 ? 
        Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
    const levelsCompleted = scores.filter(score => score >= 70).length;
    
    // Keep gameState.totalQuizzes in sync
    gameState.totalQuizzes = totalQuizzes;
    
    // Debug logging
    console.log('Statistics calculated:', {
        scores: gameState.scores,
        totalQuizzes,
        averageScore,
        levelsCompleted
    });
    
    return {
        totalQuizzes,
        averageScore,
        levelsCompleted
    };
}

// Update results page
function updateResultsPage() {
    // Update overall stats
    const totalQuizzes = document.getElementById('total-quizzes');
    const averageScore = document.getElementById('average-score');
    const levelsCompleted = document.getElementById('levels-completed');
    
    // Calculate accurate statistics
    const stats = calculateAccurateStats();
    
    console.log('Updating results page with stats:', stats);
    console.log('Elements found:', {
        totalQuizzes: !!totalQuizzes,
        averageScore: !!averageScore,
        levelsCompleted: !!levelsCompleted
    });
    console.log('Element IDs:', {
        totalQuizzes: totalQuizzes?.id,
        averageScore: averageScore?.id,
        levelsCompleted: levelsCompleted?.id
    });
    
    if (totalQuizzes) {
        totalQuizzes.textContent = stats.totalQuizzes;
        console.log('Updated totalQuizzes to:', stats.totalQuizzes);
    }
    
    if (averageScore) {
        averageScore.textContent = `${stats.averageScore}%`;
        console.log('Updated averageScore to:', `${stats.averageScore}%`);
    }
    
    if (levelsCompleted) {
        // Use totalQuizzes (same as performance page) instead of levelsCompleted
        levelsCompleted.textContent = `${stats.totalQuizzes}/12`;
        console.log('Updated levelsCompleted to:', `${stats.totalQuizzes}/12`);
    }
    
    // Update module breakdown
    updateLeaderboardModuleGrid();
}

// Update users page
function updateUsersPage() {
    updateUsersOverview();
    updateUsersTable();
    updateActivityChart();
}

// Update users overview statistics
function updateUsersOverview() {
    const totalUsers = Object.keys(gameState.allUsers).length;
    const activeToday = getActiveUsersToday();
    const lastLoginTime = getLastLoginTime();
    
    const totalUsersElement = document.getElementById('total-users-count');
    const activeTodayElement = document.getElementById('active-today-count');
    const lastLoginElement = document.getElementById('last-login-time');
    
    if (totalUsersElement) {
        totalUsersElement.textContent = totalUsers;
    }
    
    if (activeTodayElement) {
        activeTodayElement.textContent = activeToday;
    }
    
    if (lastLoginElement) {
        lastLoginElement.textContent = lastLoginTime;
    }
}

// Get users active today
function getActiveUsersToday() {
    const today = new Date().toDateString();
    let activeCount = 0;
    
    Object.values(gameState.allUsers).forEach(user => {
        if (user.lastPlayed) {
            const lastPlayedDate = new Date(user.lastPlayed).toDateString();
            if (lastPlayedDate === today) {
                activeCount++;
            }
        }
    });
    
    return activeCount;
}

// Get last login time
function getLastLoginTime() {
    let mostRecent = null;
    
    Object.values(gameState.allUsers).forEach(user => {
        if (user.lastPlayed) {
            if (!mostRecent || new Date(user.lastPlayed) > new Date(mostRecent)) {
                mostRecent = user.lastPlayed;
            }
        }
    });
    
    if (mostRecent) {
        const date = new Date(mostRecent);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }
    
    return '--:--';
}

// Update users table
function updateUsersTable() {
    const tableBody = document.getElementById('users-table-body');
    if (!tableBody) return;
    
    const users = Object.values(gameState.allUsers);
    
    // Sort users by last played time (most recent first)
    users.sort((a, b) => {
        const timeA = a.lastPlayed ? new Date(a.lastPlayed) : new Date(0);
        const timeB = b.lastPlayed ? new Date(b.lastPlayed) : new Date(0);
        return timeB - timeA;
    });
    
    let html = '';
    
    if (users.length === 0) {
        html = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: #666;">
                    No users found. Create a new user to get started!
                </td>
            </tr>
        `;
    } else {
        users.forEach(user => {
            const stats = calculateUserStats(user);
            const isOnline = isUserOnline(user);
            const lastLogin = formatLastLogin(user.lastPlayed);
            const statusClass = isOnline ? 'status-online' : 'status-offline';
            const statusText = isOnline ? 'Online' : 'Offline';
            
            html += `
                <tr>
                    <td>
                        <div class="user-name">${user.playerName}</div>
                    </td>
                    <td>
                        <span class="user-status ${statusClass}">${statusText}</span>
                    </td>
                    <td>
                        <div class="login-time">${lastLogin}</div>
                    </td>
                    <td>${stats.modulesCompleted}/12</td>
                    <td>${stats.averageScore}%</td>
                    <td>${stats.currentLevel}</td>
                    <td>
                        <div class="user-actions">
                            <button class="action-btn" onclick="switchToUser('${user.id}')" title="Switch to User">
                                🔄
                            </button>
                            <button class="action-btn" onclick="viewUserDetails('${user.id}')" title="View Details">
                                👁️
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
    }
    
    tableBody.innerHTML = html;
}

// Calculate user statistics
function calculateUserStats(user) {
    const scores = Object.values(user.scores || {}).filter(score => score !== null && score >= 0);
    const modulesCompleted = scores.length;
    const averageScore = scores.length > 0 ? 
        Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
    const currentLevel = Math.max(...(user.unlockedLevels || [1]));
    
    return {
        modulesCompleted,
        averageScore,
        currentLevel
    };
}

// Check if user is online (active within last 5 minutes)
function isUserOnline(user) {
    if (!user.lastPlayed) return false;
    
    const lastPlayed = new Date(user.lastPlayed);
    const now = new Date();
    const diffMinutes = (now - lastPlayed) / (1000 * 60);
    
    return diffMinutes <= 5;
}

// Format last login time
function formatLastLogin(lastPlayed) {
    if (!lastPlayed) return 'Never';
    
    const date = new Date(lastPlayed);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today ' + date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    } else if (diffDays === 1) {
        return 'Yesterday ' + date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    } else if (diffDays < 7) {
        return diffDays + ' days ago';
    } else {
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }
}

// Update activity chart
function updateActivityChart() {
    const chartContainer = document.getElementById('activity-chart');
    if (!chartContainer) return;
    
    const activityData = getActivityData();
    
    let html = '';
    activityData.forEach((data, index) => {
        const height = Math.max((data.count / Math.max(...activityData.map(d => d.count))) * 100, 5);
        html += `
            <div class="chart-bar" style="height: ${height}%" data-value="${data.count}">
                <div class="chart-label">${data.day}</div>
            </div>
        `;
    });
    
    chartContainer.innerHTML = html;
}

// Get activity data for last 7 days
function getActivityData() {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toDateString();
        
        let count = 0;
        Object.values(gameState.allUsers).forEach(user => {
            if (user.lastPlayed) {
                const lastPlayedDate = new Date(user.lastPlayed).toDateString();
                if (lastPlayedDate === dateString) {
                    count++;
                }
            }
        });
        
        days.push({
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            count: count
        });
    }
    
    return days;
}

// Switch to specific user
function switchToUser(userId) {
    if (gameState.allUsers[userId]) {
        loadUserData(userId);
        showPopup(`Switched to user: ${gameState.allUsers[userId].playerName}`, 'success');
        updateUsersPage();
    }
}

// View user details
function viewUserDetails(userId) {
    const user = gameState.allUsers[userId];
    if (!user) return;
    
    const stats = calculateUserStats(user);
    const isOnline = isUserOnline(user);
    const lastLogin = formatLastLogin(user.lastPlayed);
    
    let details = `👤 User: ${user.playerName}\n\n`;
    details += `📊 Statistics:\n`;
    details += `• Modules Completed: ${stats.modulesCompleted}/12\n`;
    details += `• Average Score: ${stats.averageScore}%\n`;
    details += `• Current Level: ${stats.currentLevel}\n`;
    details += `• Status: ${isOnline ? 'Online' : 'Offline'}\n`;
    details += `• Last Login: ${lastLogin}\n\n`;
    
    if (user.createdAt) {
        const createdDate = new Date(user.createdAt).toLocaleDateString();
        details += `📅 Created: ${createdDate}\n`;
    }
    
    showPopup(details, 'info');
}

// Export users data
function exportUsersData() {
    const users = Object.values(gameState.allUsers);
    
    if (users.length === 0) {
        showPopup('No users to export! 📊', 'warning');
        return;
    }
    
    // Create CSV data
    let csvContent = 'User Name,Status,Last Login,Modules Completed,Average Score,Current Level,Created Date\n';
    
    users.forEach(user => {
        const stats = calculateUserStats(user);
        const isOnline = isUserOnline(user);
        const lastLogin = formatLastLogin(user.lastPlayed);
        const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown';
        
        csvContent += `"${user.playerName}","${isOnline ? 'Online' : 'Offline'}","${lastLogin}","${stats.modulesCompleted}/12","${stats.averageScore}%","${stats.currentLevel}","${createdDate}"\n`;
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `piOneers_users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showPopup('Users data exported successfully! 📊', 'success');
}

// Update performance page
function updatePerformancePage() {
    const overallProgress = document.getElementById('overall-progress');
    const modulesCompleted = document.getElementById('modules-completed');
    const currentLevel = document.getElementById('current-level');
    const performanceStats = document.getElementById('performance-stats');
    
    // Calculate accurate statistics
    const stats = calculateAccurateStats();
    const completedModules = stats.totalQuizzes;
    const averageScore = stats.averageScore;
    const highestLevel = Math.max(...gameState.unlockedLevels) || 1;
    

    
    if (overallProgress) {
        overallProgress.textContent = `${averageScore}%`;
    }
    
    if (modulesCompleted) {
        modulesCompleted.textContent = completedModules;
    }
    
    if (currentLevel) {
        currentLevel.textContent = highestLevel;
    }
    
    if (performanceStats) {
        updateModulePerformanceGrid();
    }
    
    // Add performance page guidance based on actual progress
    setTimeout(() => {
        if (completedModules === 0) {
            showPopup('Start taking quizzes to see your progress! 🚀', 'info');
        } else if (completedModules < 5) {
            showPopup('Great start! Keep going to unlock more modules! 💪', 'info');
        } else if (completedModules < 10) {
            showPopup('You\'re making excellent progress! Keep it up! 🌟', 'info');
        } else {
            showPopup('Amazing! You\'re almost done with all modules! 🎉', 'success');
        }
    }, 1000);
}

// Update module performance grid
function updateModulePerformanceGrid() {
    const performanceStats = document.getElementById('performance-stats');
    if (!performanceStats) return;
    
    const moduleTitles = [
        'Statistical Variables', 'Statistical Hypothesis', 'Parametric Test of Differential', 
        'Simple Linear Regression', 'Test of Relationship'
    ];
    
    const moduleDescriptions = [
        'Understanding discrete and continuous random variables',
        'Understanding null and alternative hypotheses',
        'Understanding parametric and non-parametric tests',
        'Predicting variables using linear relationships',
        'Understanding Z-tests and T-tests'
    ];
    
    let html = '';
    for (let i = 1; i <= 5; i++) {
        const moduleId = `module-${i}`;
        const moduleScore = gameState.scores[moduleId];
        const isCompleted = moduleScore && moduleScore >= 70;
        const isLocked = i > Math.max(...gameState.unlockedLevels);
        const hasAttempted = moduleScore !== undefined && moduleScore !== null;
        const scorePercentage = moduleScore || 0;
        
        // Determine card class and status
        let cardClass = '';
        let statusLabel = '';
        let statusIcon = '';
        
        if (isLocked) {
            cardClass = 'locked';
            statusLabel = 'Locked';
            statusIcon = '🔒';
        } else if (isCompleted) {
            cardClass = 'completed';
            statusLabel = 'Completed';
            statusIcon = '✅';
        } else if (hasAttempted) {
            cardClass = 'attempted';
            statusLabel = 'In Progress';
            statusIcon = '🔄';
        } else {
            cardClass = 'available';
            statusLabel = 'Available';
            statusIcon = '📚';
        }
        
        // Determine score display
        let scoreDisplay = '';
        if (hasAttempted) {
            scoreDisplay = `${scorePercentage}%`;
        } else {
            scoreDisplay = '--';
        }
        
        html += `
            <div class="module-performance-card ${cardClass}">
                <div class="module-number">${i}</div>
                <div class="module-info">
                    <h4>Module ${i}: ${moduleTitles[i-1]}</h4>
                    <p>${moduleDescriptions[i-1]}</p>
                </div>
                <div class="score-display">
                    <div class="score-percentage">${scoreDisplay}</div>
                    <div class="score-label">
                        <span class="status-icon">${statusIcon}</span>
                        ${statusLabel}
                    </div>
                </div>
            </div>
        `;
    }
    
    performanceStats.innerHTML = html;
}

// Popup functions
// Enhanced popup system with better performance
let popupQueue = [];
let isPopupShowing = false;

function showPopup(message, type = 'info', duration = 3000) {
    // Add to queue
    popupQueue.push({ message, type, duration });
    
    // Process queue if not already showing
    if (!isPopupShowing) {
        processPopupQueue();
    }
}

function processPopupQueue() {
    if (popupQueue.length === 0) {
        isPopupShowing = false;
        return;
    }
    
    isPopupShowing = true;
    const { message, type, duration } = popupQueue.shift();
    
    const popupContainer = document.getElementById('popup-container');
    const popupMessage = document.getElementById('popup-message');
    const popupIcon = document.getElementById('popup-icon');
    const popupText = document.getElementById('popup-text');
    
    if (!popupContainer || !popupMessage || !popupIcon || !popupText) {
        console.error('Popup elements not found');
        isPopupShowing = false;
        processPopupQueue(); // Try next in queue
        return;
    }
    
    // Clear any existing timeouts
    if (popupContainer.timeoutId) {
        clearTimeout(popupContainer.timeoutId);
    }
    
    // Set message with proper line breaks
    popupText.innerHTML = message.replace(/\n/g, '<br>');
    
    // Reset classes
    popupMessage.className = 'popup-message';
    popupMessage.classList.add(type);
    
    // Set icon based on type
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    popupIcon.textContent = icons[type] || 'ℹ️';
    
    // Show popup with smooth animation
    popupContainer.style.display = 'flex';
    popupContainer.style.opacity = '0';
    popupContainer.style.transform = 'translateY(-30px) scale(0.9)';
    
    // Force reflow
    popupContainer.offsetHeight;
    
    // Animate in
    requestAnimationFrame(() => {
        popupContainer.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        popupContainer.style.opacity = '1';
        popupContainer.style.transform = 'translateY(0) scale(1)';
    });
    
    // Auto hide after specified duration
    popupContainer.timeoutId = setTimeout(() => {
        hidePopup();
    }, duration);
}

function hidePopup() {
    const popupContainer = document.getElementById('popup-container');
    if (!popupContainer) return;
    
    // Clear timeout
    if (popupContainer.timeoutId) {
        clearTimeout(popupContainer.timeoutId);
        popupContainer.timeoutId = null;
    }
    
    // Animate out
    popupContainer.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    popupContainer.style.opacity = '0';
    popupContainer.style.transform = 'translateY(-30px) scale(0.9)';
    
    // Hide after animation
    setTimeout(() => {
        popupContainer.style.display = 'none';
        isPopupShowing = false;
        // Process next in queue
        processPopupQueue();
    }, 300);
}


// User Management Functions
let selectedPlayerName = null;

function addNewUser() {
    // Use the existing name input modal
    showNameModal();
}


function deleteUser() {
    console.log('Delete user button clicked'); // Debug log
    // Check if highScores exists and has data
    if (!highScores || highScores.length === 0) {
        showPopup('No players to delete.', 'warning');
        return;
    }
    
    // Get all unique player names from highScores, filtering out undefined/null names
    const playerNames = [...new Set(highScores
        .map(score => score.name)
        .filter(name => name && name !== 'undefined' && name !== 'null' && name.trim() !== '')
    )].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    if (playerNames.length === 0) {
        showPopup('No valid players to delete.', 'warning');
        return;
    }
    
    const modal = document.getElementById('delete-user-modal');
    const userList = document.getElementById('delete-user-list');
    userList.innerHTML = '';
    selectedPlayerName = null;
    
    playerNames.forEach((playerName) => {
        const playerScores = highScores.filter(score => score.name === playerName);
        const bestScore = Math.max(...playerScores.map(score => score.score));
        const totalQuizzes = playerScores.length;
        
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
            <div class="user-info">
                <div class="user-name">${playerName}</div>
                <div class="user-stats">Best Score: ${bestScore}% • ${totalQuizzes} quizzes</div>
            </div>
        `;
        userItem.addEventListener('click', () => {
            // Remove previous selection
            userList.querySelectorAll('.user-item').forEach(item => item.classList.remove('selected'));
            // Add selection to clicked item
            userItem.classList.add('selected');
            selectedPlayerName = playerName;
            document.getElementById('confirm-delete-user-btn').style.display = 'inline-block';
        });
        userList.appendChild(userItem);
    });
    
    modal.style.display = 'block';
}

function switchUser() {
    // Check if highScores exists and has data
    if (!highScores || highScores.length === 0) {
        showPopup('No players available to switch to. Create a new player first.', 'warning');
        return;
    }
    
    // Get all unique player names from highScores, filtering out undefined/null names
    const playerNames = [...new Set(highScores
        .map(score => score.name)
        .filter(name => name && name !== 'undefined' && name !== 'null' && name.trim() !== '')
    )].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    if (playerNames.length === 0) {
        showPopup('No valid players available to switch to. Create a new player first.', 'warning');
        return;
    }
    
    const modal = document.getElementById('switch-user-modal');
    const userList = document.getElementById('switch-user-list');
    userList.innerHTML = '';
    selectedPlayerName = null;
    
    playerNames.forEach((playerName) => {
        const playerScores = highScores.filter(score => score.name === playerName);
        const bestScore = Math.max(...playerScores.map(score => score.score));
        const totalQuizzes = playerScores.length;
        const isCurrent = playerName === gameState.playerName;
        
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        if (isCurrent) userItem.classList.add('selected');
        userItem.innerHTML = `
            <div class="user-info">
                <div class="user-name">${playerName}${isCurrent ? ' (Current)' : ''}</div>
                <div class="user-stats">Best Score: ${bestScore}% • ${totalQuizzes} quizzes</div>
            </div>
        `;
        userItem.addEventListener('click', () => {
            // Remove previous selection
            userList.querySelectorAll('.user-item').forEach(item => item.classList.remove('selected'));
            // Add selection to clicked item
            userItem.classList.add('selected');
            selectedPlayerName = playerName;
            document.getElementById('confirm-switch-user-btn').style.display = 'inline-block';
        });
        userList.appendChild(userItem);
    });
    
    modal.style.display = 'block';
}

function confirmDeleteUser() {
    if (selectedPlayerName) {
        // Remove all scores for this player
        const originalLength = highScores.length;
        highScores = highScores.filter(score => score.name !== selectedPlayerName);
        
        // If we deleted the current player, reset to Guest
        if (gameState.playerName === selectedPlayerName) {
            gameState.playerName = 'Guest';
            gameState.currentLevel = 1;
            gameState.unlockedLevels = [1];
            gameState.scores = {};
            gameState.totalQuizzes = 0;
            gameState.achievements = [];
            updateUserDisplay();
        }
        
        saveGameState();
        updateLeaderboard(); // Update leaderboard after deletion
        showPopup(`Player "${selectedPlayerName}" deleted successfully.`, 'success');
        closeModal('delete-user-modal');
    }
}

function confirmSwitchUser() {
    if (selectedPlayerName) {
        // Switch to the selected player
        gameState.playerName = selectedPlayerName;
        
        // Load player's data from highScores
        const playerScores = highScores.filter(score => score.name === selectedPlayerName);
        if (playerScores.length > 0) {
            // Calculate current level based on best scores
            const bestScores = {};
            playerScores.forEach(score => {
                if (!bestScores[score.module] || score.score > bestScores[score.module]) {
                    bestScores[score.module] = score.score;
                }
            });
            
            gameState.scores = bestScores;
            // Update statistics accurately
            calculateAccurateStats();
            
            // Calculate unlocked levels based on completed modules
            const completedModules = Object.keys(bestScores).length;
            gameState.unlockedLevels = Array.from({length: Math.min(completedModules + 1, 12)}, (_, i) => i + 1);
            gameState.currentLevel = Math.max(...gameState.unlockedLevels);
        } else {
            // New player, reset to defaults
            gameState.currentLevel = 1;
            gameState.unlockedLevels = [1];
            gameState.scores = {};
            gameState.totalQuizzes = 0;
            gameState.achievements = [];
        }
        
        updateUserDisplay();
        saveGameState();
        showPopup(`Switched to player "${selectedPlayerName}"`, 'success');
        closeModal('switch-user-modal');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    selectedPlayerName = null;
}

function updateUserDisplay() {
    const playerNameDisplay = document.getElementById('player-name-display');
    const userStatus = document.getElementById('user-status');
    
    if (playerNameDisplay) {
        playerNameDisplay.textContent = gameState.playerName || 'Guest';
    }
    
    if (userStatus) {
        // Update user status indicator
        if (gameState.playerName && gameState.playerName !== 'Guest') {
            userStatus.textContent = '●';
            userStatus.style.color = '#4caf50';
            userStatus.title = 'User is logged in';
        } else {
            userStatus.textContent = '○';
            userStatus.style.color = '#ff9800';
            userStatus.title = 'Guest user';
        }
    }
}

// Show user information when user display area is clicked
function showUserInfo() {
    const stats = calculateAccurateStats();
    const totalUsers = Object.keys(gameState.allUsers).length;
    
    let userInfo = `👤 Current User: ${gameState.playerName || 'Guest'}\n\n`;
    userInfo += `📊 Your Statistics:\n`;
    userInfo += `• Modules Completed: ${stats.totalQuizzes}/12\n`;
    userInfo += `• Average Score: ${stats.averageScore}%\n`;
    userInfo += `• Levels Passed: ${stats.levelsCompleted}/12\n\n`;
    
    if (gameState.playerName && gameState.playerName !== 'Guest') {
        userInfo += `🎯 Current Level: ${Math.max(...gameState.unlockedLevels)}\n`;
        userInfo += `🔓 Unlocked Modules: ${gameState.unlockedLevels.length}/12\n\n`;
    }
    
    userInfo += `👥 Total Users: ${totalUsers}\n`;
    userInfo += `\n💡 Click the buttons to manage users!`;
    
    showPopup(userInfo, 'info');
    
    // Show additional guidance
    setTimeout(() => {
        showPopup('Use the buttons (➕🔄🗑️) to add, switch, or delete users!', 'info');
    }, 3000);
}

// Test function for quiz modules 9-12
function testQuizModules() {
    console.log('Testing quiz modules 9-12...');
    
    const modules = ['module-9', 'module-10', 'module-11', 'module-12'];
    
    modules.forEach(moduleId => {
        console.log(`\nTesting ${moduleId}:`);
        
        // Check if quiz data exists
        if (quizData[moduleId]) {
            console.log(`✅ Quiz data found: ${quizData[moduleId].length} questions`);
            
            // Check if HTML elements exist
            const questionContainer = document.getElementById(`${moduleId}-question-container`);
            const optionsContainer = document.getElementById(`${moduleId}-options-container`);
            const submitButton = document.getElementById(`${moduleId}-submit-answer`);
            const nextButton = document.getElementById(`${moduleId}-next-question`);
            
            console.log(`  - Question container: ${questionContainer ? '✅' : '❌'}`);
            console.log(`  - Options container: ${optionsContainer ? '✅' : '❌'}`);
            console.log(`  - Submit button: ${submitButton ? '✅' : '❌'}`);
            console.log(`  - Next button: ${nextButton ? '✅' : '❌'}`);
            
            // Test starting quiz
            try {
                startQuiz(moduleId);
                console.log(`  - Quiz start: ✅`);
            } catch (error) {
                console.log(`  - Quiz start: ❌ Error: ${error.message}`);
            }
        } else {
            console.log(`❌ No quiz data found for ${moduleId}`);
        }
    });
    
    console.log('\nQuiz module test completed!');
}

// Test function for performance tracking
function testPerformanceTracking() {
    console.log('Testing performance tracking...');
    
    // Simulate different user performance scenarios
    const testScenarios = [
        { name: 'New User', scores: {} },
        { name: 'Beginner', scores: { 'module-1': 65, 'module-2': 45 } },
        { name: 'Intermediate', scores: { 'module-1': 85, 'module-2': 78, 'module-3': 72, 'module-4': 90 } },
        { name: 'Advanced', scores: { 'module-1': 95, 'module-2': 88, 'module-3': 92, 'module-4': 85, 'module-5': 78, 'module-6': 90 } }
    ];
    
    testScenarios.forEach((scenario, index) => {
        console.log(`\n--- Testing ${scenario.name} ---`);
        
        // Set test scores
        gameState.scores = { ...scenario.scores };
        calculateAccurateStats();
        updatePerformancePage();
        
        // Show performance page
        showPage('performance');
        
        console.log(`Scores:`, scenario.scores);
        console.log(`Stats:`, calculateAccurateStats());
        
        // Wait before next scenario
        if (index < testScenarios.length - 1) {
            setTimeout(() => {
                console.log('Moving to next scenario...');
            }, 2000);
        }
    });
    
    console.log('\nPerformance tracking test completed!');
}

