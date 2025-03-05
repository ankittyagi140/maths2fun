'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DerivativeQuestion {
  expression: string;
  answer: string;
  hint: string;
}

interface CalculusRacePuzzle {
  questions: DerivativeQuestion[];
  timeLimit: number;
}

const generateCalculusRacePuzzle = (difficulty: Difficulty): CalculusRacePuzzle => {
  const questions: DerivativeQuestion[] = [];
  let timeLimit: number;

  switch (difficulty) {
    case 'easy':
      questions.push(
        
            { expression: '4x²', answer: '8x', hint: 'Power rule: Multiply by the power and reduce the power by 1' },
            { expression: '7x³', answer: '21x²', hint: 'Power rule with a coefficient' },
            { expression: 'x⁵', answer: '5x⁴', hint: 'Apply the power rule: nx^(n-1)' },
            { expression: '6x', answer: '6', hint: 'The derivative of ax is a' },
            { expression: '2x⁶', answer: '12x⁵', hint: 'Power rule: Multiply by the power and reduce the power by 1' },
            { expression: 'x⁷', answer: '7x⁶', hint: 'Apply the power rule: nx^(n-1)' },
            { expression: '3x⁴', answer: '12x³', hint: 'Power rule with a coefficient' },
            { expression: '8x²', answer: '16x', hint: 'Power rule: Multiply by the power and reduce the power by 1' },
            { expression: 'x⁸', answer: '8x⁷', hint: 'Apply the power rule: nx^(n-1)' },
            { expression: '9x³', answer: '27x²', hint: 'Power rule with a coefficient' },
            { expression: '10x', answer: '10', hint: 'The derivative of ax is a' },
            { expression: 'x⁹', answer: '9x⁸', hint: 'Apply the power rule: nx^(n-1)' },
            { expression: '11x²', answer: '22x', hint: 'Power rule: Multiply by the power and reduce the power by 1' },
            { expression: '12x⁴', answer: '48x³', hint: 'Power rule with a coefficient' },
            { expression: 'x¹⁰', answer: '10x⁹', hint: 'Apply the power rule: nx^(n-1)' },
            { expression: '13x³', answer: '39x²', hint: 'Power rule with a coefficient' },
            { expression: '14x', answer: '14', hint: 'The derivative of ax is a' },
            { expression: 'x¹¹', answer: '11x¹⁰', hint: 'Apply the power rule: nx^(n-1)' },
            { expression: '15x⁵', answer: '75x⁴', hint: 'Power rule with a coefficient' },
            { expression: '16x²', answer: '32x', hint: 'Power rule: Multiply by the power and reduce the power by 1' }
        
      );
      timeLimit = 120; // 2 minutes
      break;
    case 'medium':
      questions.push(
        
            { expression: 'tan(x)', answer: 'sec²(x)', hint: 'The derivative of tan(x) is sec²(x)' },
            { expression: 'cot(x)', answer: '-csc²(x)', hint: 'The derivative of cot(x) is -csc²(x)' },
            { expression: 'sec(x)', answer: 'sec(x)tan(x)', hint: 'The derivative of sec(x) is sec(x)tan(x)' },
            { expression: 'csc(x)', answer: '-csc(x)cot(x)', hint: 'The derivative of csc(x) is -csc(x)cot(x)' },
            { expression: 'e^(2x)', answer: '2e^(2x)', hint: 'Use the chain rule: derivative of e^(u) is e^(u) * u\'' },
            { expression: 'ln(2x)', answer: '1/x', hint: 'The derivative of ln(u) is u\'/u' },
            { expression: 'sin(3x)', answer: '3cos(3x)', hint: 'Use the chain rule: derivative of sin(u) is cos(u) * u\'' },
            { expression: 'cos(4x)', answer: '-4sin(4x)', hint: 'Use the chain rule: derivative of cos(u) is -sin(u) * u\'' },
            { expression: 'e^(x²)', answer: '2xe^(x²)', hint: 'Use the chain rule: derivative of e^(u) is e^(u) * u\'' },
            { expression: 'ln(x³)', answer: '3/x', hint: 'The derivative of ln(u) is u\'/u' },
            { expression: 'x³cos(x)', answer: '3x²cos(x) - x³sin(x)', hint: 'Use the product rule' },
            { expression: 'e^xsin(x)', answer: 'e^xsin(x) + e^xcos(x)', hint: 'Use the product rule' },
            { expression: 'xln(x)', answer: '1 + ln(x)', hint: 'Use the product rule' },
            { expression: 'sin(x)cos(x)', answer: 'cos²(x) - sin²(x)', hint: 'Use the product rule' },
            { expression: 'e^xln(x)', answer: 'e^xln(x) + e^x/x', hint: 'Use the product rule' },
            { expression: 'x²e^x', answer: '2xe^x + x²e^x', hint: 'Use the product rule' },
            { expression: 'tan(x)sin(x)', answer: 'sec²(x)sin(x) + tan(x)cos(x)', hint: 'Use the product rule' },
            { expression: 'ln(x)cos(x)', answer: 'cos(x)/x - ln(x)sin(x)', hint: 'Use the product rule' },
            { expression: 'e^x/x', answer: '(e^x * x - e^x)/x²', hint: 'Use the quotient rule' },
            { expression: 'sin(x)/x', answer: '(xcos(x) - sin(x))/x²', hint: 'Use the quotient rule' }
        
      );
      timeLimit = 180; // 3 minutes
      break;
    case 'hard':
      questions.push(
        { expression: 'tan(x)', answer: 'sec²(x)', hint: 'Remember the derivative of tan(x)' },
        { expression: 'x³e^x', answer: '3x²e^x + x³e^x', hint: 'Product rule with exponential' },
        { expression: 'sin²(x)', answer: '2sin(x)cos(x)', hint: 'Chain rule with trigonometric functions' },
        { expression: 'ln(x²+1)', answer: '2x/(x²+1)', hint: 'Chain rule with natural log' },
        { expression: '√(1-x²)', answer: '-x/√(1-x²)', hint: 'Chain rule with square root' }
      );
      timeLimit = 240; // 4 minutes
      break;
  }

  return { questions, timeLimit };
};

const CalculusRace: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [puzzle, setPuzzle] = useState<CalculusRacePuzzle | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateNewPuzzle();
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsIncorrect(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isComplete]);

  const generateNewPuzzle = () => {
    const newPuzzle = generateCalculusRacePuzzle(difficulty);
    setPuzzle(newPuzzle);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setTimeLeft(newPuzzle.timeLimit);
    setScore(0);
    setIsComplete(false);
    setIsIncorrect(false);
  };

  const formatAnswer = (answer: string): string => {
    // Convert x2, x3, etc. to x^2, x^3
    let formatted = answer.replace(/x(\d+)/g, 'x^$1');
    // Convert special unicode superscript numbers to regular exponents
    formatted = formatted.replace(/[²³⁴⁵⁶⁷⁸⁹⁰]/g, (match) => {
      const superscriptMap: { [key: string]: string } = {
        '²': '2', '³': '3', '⁴': '4', '⁵': '5',
        '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁰': '0'
      };
      return '^' + superscriptMap[match];
    });
    return formatted;
  };

  const handleAnswerSubmit = () => {
    if (!puzzle) return;

    const currentQuestion = puzzle.questions[currentQuestionIndex];
    const formattedUserAnswer = formatAnswer(userAnswer.replace(/\s+/g, ''));
    const formattedCorrectAnswer = formatAnswer(currentQuestion.answer.replace(/\s+/g, ''));
    
    const isAnswerCorrect = formattedUserAnswer === formattedCorrectAnswer;

    if (isAnswerCorrect) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
      
      setTimeout(() => {
        setIsCorrect(false);
        if (currentQuestionIndex < puzzle.questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setUserAnswer('');
        } else {
          setIsComplete(true);
        }
      }, 1500);
    } else {
      setIsIncorrect(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center sm:text-left">
          Calculus Race - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className='text-sm sm:text-base text-red-600'>Time Left: {timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Score: {score}/{puzzle?.questions.length}</span>
          </div>
        </div>
      </div>

      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-3 sm:p-4 md:p-6 rounded-lg mb-4 sm:mb-6 shadow-sm"
        >
          <h3 className="font-bold mb-2 sm:mb-3 text-base sm:text-lg">How to Play:</h3>
          <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
            <li>Find the derivative of the given expression</li>
            <li>Type your answer using any of these formats:
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>Use caret: x^2 for x squared</li>
                <li>Use numbers: x2 for x squared</li>
                <li>Use superscript: x² for x squared</li>
              </ul>
            </li>
            <li>Submit your answer to move to the next question</li>
            <li>Complete all questions before time runs out</li>
            <li>Use hints if you need help, but try to solve independently first!</li>
          </ol>
          <div className="mt-3 p-2 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Examples:</p>
            <ul className="mt-1 space-y-1 text-sm text-blue-700">
              <li>• 2x² can be entered as: 2x^2 or 2x2</li>
              <li>• x³ can be entered as: x^3 or x3</li>
              <li>• 3x⁴ can be entered as: 3x^4 or 3x4</li>
            </ul>
          </div>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
          >
            Got it!
          </button>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        {puzzle && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Find the derivative:</h3>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
                {puzzle.questions[currentQuestionIndex].expression}
              </div>
            </div>
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-2 text-sm text-gray-600">
                Enter your answer (e.g., x^2, x2, or x²)
              </div>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswerSubmit();
                  }
                }}
              />
              <button
                onClick={handleAnswerSubmit}
                className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col xs:flex-row gap-2 sm:gap-4 justify-center">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-700 text-sm sm:text-base rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          onClick={generateNewPuzzle}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Puzzle
        </button>
      </div>

      {showHint && puzzle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-purple-50 p-3 sm:p-4 md:p-6 rounded-lg mt-4 sm:mt-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1" />
            <p className="text-sm sm:text-base text-purple-700">
              {puzzle.questions[currentQuestionIndex].hint}
            </p>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg text-center max-w-sm w-full mx-auto shadow-xl"
            >
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Race Complete!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You solved all derivatives with a score of {score}/{puzzle?.questions.length}!
              </p>
              <button
                onClick={generateNewPuzzle}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                Try Another Race
              </button>
            </motion.div>
            <Confetti recycle={false} numberOfPieces={500} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg text-center max-w-sm w-full mx-auto shadow-xl"
            >
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Correct!</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Great job! Moving to next question...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isIncorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg text-center max-w-sm w-full mx-auto shadow-xl"
            >
              <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
                {timeLeft === 0 ? "Time's Up!" : "Incorrect Answer"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                The correct answer was: {puzzle?.questions[currentQuestionIndex].answer}
              </p>
              <button
                onClick={() => {
                  setIsIncorrect(false);
                  generateNewPuzzle();
                }}
                className="px-4 sm:px-6 py-2 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CalculusRacePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
      <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Calculus Race</h1>
          </div>
        </div>

        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-wrap gap-2 sm:gap-3 justify-center">
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg capitalize text-sm sm:text-base transition-colors flex-1 xs:flex-none ${
                difficulty === level
                  ? level === 'easy'
                    ? 'bg-green-500 text-white shadow-md'
                    : level === 'medium'
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-red-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <CalculusRace difficulty={difficulty} />
      </div>
    </div>
  );
}
