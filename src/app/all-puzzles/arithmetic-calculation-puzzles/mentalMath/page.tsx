'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';
type Operation = '+' | '-' | '×' | '÷';

interface MathProblem {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  hint: string;
}

interface MathChallenge {
  problems: MathProblem[];
  timeLimit: number;
  currentProblemIndex: number;
}

const generateNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateMathProblem = (difficulty: Difficulty): MathProblem => {
  let num1: number, num2: number, operation: Operation, answer: number, hint: string;

  switch (difficulty) {
    case 'easy':
      operation = ['+', '-'][Math.floor(Math.random() * 2)] as Operation;
      if (operation === '+') {
        num1 = generateNumber(1, 20);
        num2 = generateNumber(1, 20);
        answer = num1 + num2;
        hint = 'Try breaking down the numbers into tens and ones';
      } else {
        num1 = generateNumber(10, 30);
        num2 = generateNumber(1, num1);
        answer = num1 - num2;
        hint = 'Count down from the larger number';
      }
      break;

    case 'medium':
      operation = ['+', '-', '×'][Math.floor(Math.random() * 3)] as Operation;
      if (operation === '×') {
        num1 = generateNumber(2, 12);
        num2 = generateNumber(2, 12);
        answer = num1 * num2;
        hint = 'Use multiplication tables or break into smaller multiplications';
      } else if (operation === '+') {
        num1 = generateNumber(10, 50);
        num2 = generateNumber(10, 50);
        answer = num1 + num2;
        hint = 'Add the tens first, then the ones';
      } else {
        num1 = generateNumber(20, 100);
        num2 = generateNumber(10, num1);
        answer = num1 - num2;
        hint = 'Subtract tens first, then ones';
      }
      break;

    case 'hard':
      operation = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)] as Operation;
      if (operation === '÷') {
        num2 = generateNumber(2, 12);
        answer = generateNumber(2, 12);
        num1 = num2 * answer;
        hint = 'Think of multiplication in reverse';
      } else if (operation === '×') {
        num1 = generateNumber(12, 20);
        num2 = generateNumber(2, 12);
        answer = num1 * num2;
        hint = 'Break down into simpler multiplications';
      } else if (operation === '+') {
        num1 = generateNumber(100, 500);
        num2 = generateNumber(100, 500);
        answer = num1 + num2;
        hint = 'Add hundreds, then tens, then ones';
      } else {
        num1 = generateNumber(100, 1000);
        num2 = generateNumber(50, num1);
        answer = num1 - num2;
        hint = 'Subtract hundreds, then tens, then ones';
      }
      break;
  }

  return { num1, num2, operation, answer, hint };
};

const generateMathChallenge = (difficulty: Difficulty): MathChallenge => {
  const problems = Array(5).fill(null).map(() => generateMathProblem(difficulty));
  const timeLimit = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 45 : 60;

  return {
    problems,
    timeLimit,
    currentProblemIndex: 0,
  };
};

const MentalMathChallenge: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [challenge, setChallenge] = useState<MathChallenge | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateNewChallenge();
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

  const generateNewChallenge = () => {
    const newChallenge = generateMathChallenge(difficulty);
    setChallenge(newChallenge);
    setTimeLeft(newChallenge.timeLimit);
    setUserAnswer('');
    setScore(0);
    setIsComplete(false);
    setIsIncorrect(false);
  };

  const handleAnswerSubmit = () => {
    if (!challenge) return;

    const currentProblem = challenge.problems[challenge.currentProblemIndex];
    const isCorrect = parseInt(userAnswer) === currentProblem.answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      if (challenge.currentProblemIndex < challenge.problems.length - 1) {
        setChallenge(prev => ({
          ...prev!,
          currentProblemIndex: prev!.currentProblemIndex + 1
        }));
        setUserAnswer('');
      } else {
        setIsComplete(true);
      }
    } else {
      setIsIncorrect(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center sm:text-left">
          Mental Math Challenge - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className='text-sm sm:text-base text-red-600'>Time Left: {timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Score: {score}/{challenge?.problems.length}</span>
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
            <li>Solve each arithmetic problem mentally</li>
            <li>Type your answer and press Enter or click Submit</li>
            <li>Complete all problems before time runs out</li>
            <li>Use hints if you need help with calculation strategies</li>
            <li>Try to improve your speed and accuracy!</li>
          </ol>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
          >
            Got it!
          </button>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        {challenge && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Problem {challenge.currentProblemIndex + 1} of {challenge.problems.length}</h3>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 font-mono">
                {challenge.problems[challenge.currentProblemIndex].num1} {' '}
                {challenge.problems[challenge.currentProblemIndex].operation} {' '}
                {challenge.problems[challenge.currentProblemIndex].num2} = ?
              </div>
            </div>
            <div className="max-w-sm mx-auto">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswerSubmit();
                  }
                }}
                placeholder="Enter your answer..."
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg font-mono"
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
          onClick={generateNewChallenge}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Challenge
        </button>
      </div>

      {showHint && challenge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-purple-50 p-3 sm:p-4 md:p-6 rounded-lg mt-4 sm:mt-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1" />
            <p className="text-sm sm:text-base text-purple-700">
              {challenge.problems[challenge.currentProblemIndex].hint}
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
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Challenge Complete!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You solved {score} out of {challenge?.problems.length} problems correctly!
              </p>
              <button
                onClick={generateNewChallenge}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                Try Another Challenge
              </button>
            </motion.div>
            <Confetti recycle={false} numberOfPieces={500} />
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
                The correct answer was: {challenge?.problems[challenge.currentProblemIndex].answer}
              </p>
              <button
                onClick={() => {
                  setIsIncorrect(false);
                  generateNewChallenge();
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

export default function MentalMathPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xs:flex-row items-center justify-between gap-2 xs:gap-4 mb-4 sm:mb-6 md:mb-8">
          <button
            onClick={() => router.back()}
            className="w-full xs:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Mental Math Challenge</h1>
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

        <MentalMathChallenge difficulty={difficulty} />
      </div>
    </div>
  );
}
