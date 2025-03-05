'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Equation {
  equation: string;
  solution: number;
  hint: string;
}

// Define equations for each difficulty level
const equations = {
  easy: [
    { equation: '2x + 3 = 7', solution: 2, hint: 'Subtract 3 from both sides, then divide by 2' },
    { equation: '4x - 2 = 10', solution: 3, hint: 'Add 2 to both sides, then divide by 4' },
    { equation: 'x + 5 = 12', solution: 7, hint: 'Subtract 5 from both sides' },
    { equation: '3x - 6 = 9', solution: 5, hint: 'Add 6 to both sides, then divide by 3' },
    { equation: '5x + 2 = 17', solution: 3, hint: 'Subtract 2 from both sides, then divide by 5' },
    { equation: '2x - 8 = 4', solution: 6, hint: 'Add 8 to both sides, then divide by 2' },
    { equation: '7x + 1 = 22', solution: 3, hint: 'Subtract 1 from both sides, then divide by 7' },
    { equation: '4x + 6 = 18', solution: 3, hint: 'Subtract 6 from both sides, then divide by 4' },
    { equation: '3x - 3 = 12', solution: 5, hint: 'Add 3 to both sides, then divide by 3' },
    { equation: '6x + 4 = 28', solution: 4, hint: 'Subtract 4 from both sides, then divide by 6' },
    { equation: '2x - 5 = 11', solution: 8, hint: 'Add 5 to both sides, then divide by 2' },
    { equation: '8x + 3 = 35', solution: 4, hint: 'Subtract 3 from both sides, then divide by 8' },
    { equation: '5x - 10 = 15', solution: 5, hint: 'Add 10 to both sides, then divide by 5' },
    { equation: '3x + 7 = 22', solution: 5, hint: 'Subtract 7 from both sides, then divide by 3' },
    { equation: '4x - 4 = 16', solution: 5, hint: 'Add 4 to both sides, then divide by 4' },
    { equation: '7x + 5 = 40', solution: 5, hint: 'Subtract 5 from both sides, then divide by 7' },
    { equation: '6x - 12 = 24', solution: 6, hint: 'Add 12 to both sides, then divide by 6' },
    { equation: '9x + 2 = 38', solution: 4, hint: 'Subtract 2 from both sides, then divide by 9' },
    { equation: '5x - 15 = 20', solution: 7, hint: 'Add 15 to both sides, then divide by 5' },
    { equation: '8x + 8 = 48', solution: 5, hint: 'Subtract 8 from both sides, then divide by 8' }
  ],
  medium: [
    { equation: '3x² - 12 = 15', solution: 3, hint: 'Add 12 to both sides, then take the square root' },
    { equation: '2x² + 5x = 12', solution: 2, hint: 'Use quadratic formula: -b ± √(b² - 4ac) / 2a' },
    { equation: '4x - 2x² = 6', solution: -1, hint: 'Rearrange to standard form: 2x² - 4x + 6 = 0' },
    { equation: 'x² + 6x + 9 = 0', solution: -3, hint: 'This is a perfect square trinomial (x + 3)²' },
    { equation: '2x² - 8 = 0', solution: 2, hint: 'Add 8 to both sides, then take the square root' },
    { equation: 'x² - 4x = 5', solution: 5, hint: 'Rearrange to standard form: x² - 4x - 5 = 0' },
    { equation: '3x² + 6x = -3', solution: -1, hint: 'Rearrange to 3x² + 6x + 3 = 0, then factor' },
    { equation: 'x² - 9 = 0', solution: 3, hint: 'Add 9 to both sides, then take the square root' },
    { equation: '2x² + 8x + 8 = 0', solution: -2, hint: 'Factor out 2, then solve x² + 4x + 4 = 0' },
    { equation: '4x² - 16 = 0', solution: 2, hint: 'Factor out 4, then solve x² - 4 = 0' },
    { equation: 'x² + 2x - 15 = 0', solution: 3, hint: 'Factor into (x + 5)(x - 3) = 0' },
    { equation: '3x² - 27 = 0', solution: 3, hint: 'Factor out 3, then solve x² - 9 = 0' },
    { equation: '2x² - 7x + 3 = 0', solution: 3, hint: 'Use quadratic formula with a=2, b=-7, c=3' },
    { equation: 'x² + 10x + 25 = 0', solution: -5, hint: 'This is (x + 5)² = 0' },
    { equation: '4x² + 12x + 9 = 0', solution: -1.5, hint: 'Factor out common factor, then complete the square' },
    { equation: 'x² - 6x + 8 = 0', solution: 2, hint: 'Factor into (x - 2)(x - 4) = 0' },
    { equation: '2x² + 5x - 12 = 0', solution: 1.5, hint: 'Use quadratic formula with a=2, b=5, c=-12' },
    { equation: '3x² - 12x + 12 = 0', solution: 2, hint: 'Factor out 3, then solve x² - 4x + 4 = 0' },
    { equation: 'x² + 4x - 21 = 0', solution: 3, hint: 'Factor into (x + 7)(x - 3) = 0' },
    { equation: '5x² - 20 = 0', solution: 2, hint: 'Factor out 5, then solve x² - 4 = 0' }
  ],
  hard: [
    { equation: '2x³ - 3x² + x - 6 = 0', solution: 2, hint: 'Try factoring or synthetic division' },
    { equation: '√(x + 4) + 2 = 6', solution: 16, hint: 'Subtract 2 from both sides, then square the result' },
    { equation: '|2x - 4| = 10', solution: 7, hint: 'Consider both cases: 2x - 4 = 10 and 2x - 4 = -10' },
    { equation: 'x³ - 6x² + 11x - 6 = 0', solution: 1, hint: 'Try factoring (x - 1)(x - 2)(x - 3) = 0' },
    { equation: '√(2x + 1) = 3', solution: 4, hint: 'Square both sides, then solve 2x + 1 = 9' },
    { equation: '|3x + 1| = 7', solution: 2, hint: 'Consider both cases: 3x + 1 = 7 and 3x + 1 = -7' },
    { equation: 'x³ - x² - 4x + 4 = 0', solution: 2, hint: 'Factor out (x - 2)(x² + x - 2) = 0' },
    { equation: '√(x - 2) + √(x + 2) = 4', solution: 3, hint: 'Square both sides, be careful with cross terms' },
    { equation: '|4x - 8| + 3 = 11', solution: 4, hint: 'Subtract 3 from both sides, then solve |4x - 8| = 8' },
    { equation: 'x³ + x² - 4x - 4 = 0', solution: -2, hint: 'Try factoring (x + 2)(x² - x - 2) = 0' },
    { equation: '√(3x - 1) = 2', solution: 1.67, hint: 'Square both sides, then solve 3x - 1 = 4' },
    { equation: '|5x + 2| - 4 = 6', solution: 2, hint: 'Add 4 to both sides, then solve |5x + 2| = 10' },
    { equation: 'x³ - 3x² - 9x + 27 = 0', solution: 3, hint: 'Factor out (x - 3)(x² + 0x - 9) = 0' },
    { equation: '√(x + 1) + √(x - 1) = 3', solution: 2, hint: 'Square both sides, watch for cross terms' },
    { equation: '|2x + 5| + 2 = 9', solution: -7, hint: 'Subtract 2 from both sides, then solve |2x + 5| = 7' },
    { equation: 'x³ + 8 = 27', solution: 3, hint: 'Subtract 8 from both sides, then take cube root' },
    { equation: '√(4x + 3) - 1 = 2', solution: 1.75, hint: 'Add 1 to both sides, then square the result' },
    { equation: '|3x - 6| + 5 = 14', solution: 3, hint: 'Subtract 5 from both sides, then solve |3x - 6| = 9' },
    { equation: 'x³ - 7x² + 14x - 8 = 0', solution: 2, hint: 'Try factoring or synthetic division' },
    { equation: '√(2x - 1) + √(2x + 1) = 5', solution: 3, hint: 'Square both sides, be careful with cross terms' }
  ]
};

const XHunter: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [currentEquation, setCurrentEquation] = useState<Equation | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [attempts, setAttempts] = useState(3);

  const generateEquation = useCallback(() => {
    const equationList = equations[difficulty];
    const randomIndex = Math.floor(Math.random() * equationList.length);
    setCurrentEquation(equationList[randomIndex]);
    setUserAnswer('');
    setTimeLeft(difficulty === 'easy' ? 120 : difficulty === 'medium' ? 180 : 240);
    setAttempts(3);
    setIsComplete(false);
    setIsIncorrect(false);
  }, [difficulty]);

  useEffect(() => {
    generateEquation();
  }, [generateEquation]);

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

  const handleSubmit = () => {
    if (!currentEquation) return;

    const numAnswer = parseFloat(userAnswer);
    if (Math.abs(numAnswer - currentEquation.solution) < 0.001) {
      setIsComplete(true);
      setIsIncorrect(false);
    } else {
      setAttempts(prev => {
        if (prev <= 1) {
          setIsIncorrect(true);
          return 0;
        }
        return prev - 1;
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">X Hunter - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className='text-sm sm:text-base text-red-600'>Time Left: {timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Attempts Left: {attempts}</span>
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
            <li>Solve the equation for x</li>
            <li>Enter your answer in decimal form</li>
            <li>You have 3 attempts per equation</li>
            <li>Complete before time runs out</li>
            <li>Use hints if needed</li>
          </ol>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
          >
            Got it!
          </button>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
        <div className="text-center mb-6">
          <div className="text-2xl sm:text-3xl md:text-4xl font-mono mb-4">
            {currentEquation?.equation}
          </div>
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter value of x"
              className="w-40 sm:w-48 px-3 py-2 border-2 border-gray-300 rounded-lg text-center focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Check
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-700 text-sm sm:text-base rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          onClick={generateEquation}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Equation
        </button>
      </div>

      {showHint && currentEquation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-purple-50 p-3 sm:p-4 md:p-6 rounded-lg mt-4 sm:mt-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1" />
            <p className="text-sm sm:text-base text-purple-700">{currentEquation.hint}</p>
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
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Congratulations!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">You solved the equation correctly!</p>
              <button
                onClick={generateEquation}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                Next Equation
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
                {timeLeft === 0 ? "Time's Up!" : "Out of Attempts!"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                The correct value of x was: {currentEquation?.solution}
              </p>
              <button
                onClick={generateEquation}
                className="px-4 sm:px-6 py-2 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600 transition-colors"
              >
                Try New Equation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function XHunterPage() {
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">X Hunter</h1>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-wrap gap-2 sm:gap-3 justify-center">
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg capitalize text-sm sm:text-base transition-colors ${
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

        <XHunter difficulty={difficulty} />
      </div>
    </div>
  );
}
