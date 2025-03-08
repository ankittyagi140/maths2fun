'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft, Scale } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface EquationPart {
  expression: string;
  value: number;
  isVariable: boolean;
}

interface EquationPuzzle {
  leftSide: EquationPart[];
  rightSide: EquationPart[];
  answer: number;
  hint: string;
  timeLimit: number;
}

const generateEquationPuzzle = (difficulty: Difficulty): EquationPuzzle => {
  const generateNumber = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  let leftSide: EquationPart[];
  let rightSide: EquationPart[];
  let answer: number;
  let hint: string;
  let timeLimit: number;

  switch (difficulty) {
    case 'easy':
      // Simple equations like: x + 5 = 12
      answer = generateNumber(1, 20);
      const num1 = generateNumber(1, 10);
      leftSide = [
        { expression: 'x', value: answer, isVariable: true },
        { expression: '+', value: 0, isVariable: false },
        { expression: num1.toString(), value: num1, isVariable: false }
      ];
      rightSide = [
        { expression: (answer + num1).toString(), value: answer + num1, isVariable: false }
      ];
      hint = 'Subtract the number from the right side to find x';
      timeLimit = 30;
      break;

    case 'medium':
      // More complex equations like: 2x + 3 = x + 8
      answer = generateNumber(1, 15);
      leftSide = [
        { expression: '2x', value: 2 * answer, isVariable: true },
        { expression: '+', value: 0, isVariable: false },
        { expression: '3', value: 3, isVariable: false }
      ];
      rightSide = [
        { expression: 'x', value: answer, isVariable: true },
        { expression: '+', value: 0, isVariable: false },
        { expression: '8', value: 8, isVariable: false }
      ];
      hint = 'Move all x terms to one side and numbers to the other';
      timeLimit = 45;
      break;

    case 'hard':
      // Complex equations like: 3x - 4 = 2x + 5
      answer = generateNumber(1, 20);
      leftSide = [
        { expression: '3x', value: 3 * answer, isVariable: true },
        { expression: '-', value: 0, isVariable: false },
        { expression: '4', value: 4, isVariable: false }
      ];
      rightSide = [
        { expression: '2x', value: 2 * answer, isVariable: true },
        { expression: '+', value: 0, isVariable: false },
        { expression: '5', value: 5, isVariable: false }
      ];
      hint = 'Subtract 2x from both sides, then solve for x';
      timeLimit = 60;
      break;
  }

  return { leftSide, rightSide, answer, hint, timeLimit };
};

const EquationBalancer: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [puzzle, setPuzzle] = useState<EquationPuzzle | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isBalanced, setIsBalanced] = useState(false);

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
    const newPuzzle = generateEquationPuzzle(difficulty);
    setPuzzle(newPuzzle);
    setTimeLeft(newPuzzle.timeLimit);
    setUserAnswer('');
    setIsComplete(false);
    setIsIncorrect(false);
    setIsBalanced(false);
  };

  const handleAnswerSubmit = () => {
    if (!puzzle) return;

    const isCorrect = Math.abs(parseFloat(userAnswer) - puzzle.answer) < 0.001;

    if (isCorrect) {
      setIsBalanced(true);
      setTimeout(() => {
        setIsComplete(true);
      }, 1000);
    } else {
      setIsIncorrect(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center sm:text-left">
          Equation Balance - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className='text-sm sm:text-base text-red-600'>Time Left: {timeLeft}s</span>
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
            <li>Find the value of x that makes the equation balanced</li>
            <li>Type your answer and press Enter or click Submit</li>
            <li>Complete the equation before time runs out</li>
            <li>Use hints if you need help with solving strategies</li>
            <li>Watch the scale balance when you get it right!</li>
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
        {puzzle && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 font-mono flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  {puzzle.leftSide.map((part, index) => (
                    <span key={index} className={part.isVariable ? 'text-purple-600' : ''}>
                      {part.expression}
                    </span>
                  ))}
                </div>
                <span>=</span>
                <div className="flex items-center gap-2">
                  {puzzle.rightSide.map((part, index) => (
                    <span key={index} className={part.isVariable ? 'text-purple-600' : ''}>
                      {part.expression}
                    </span>
                  ))}
                </div>
              </div>
              <motion.div
                animate={isBalanced ? { rotate: 0 } : { rotate: [-2, 2, -2] }}
                transition={{ duration: 1, repeat: isBalanced ? 0 : Infinity }}
                className="mt-4"
              >
                <Scale className="w-12 h-12 mx-auto text-yellow-500" />
              </motion.div>
            </div>
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-2 text-sm text-gray-600">
                Enter the value of x:
              </div>
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
                step="0.1"
              />
              <button
                onClick={handleAnswerSubmit}
                className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Check Balance
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
          New Equation
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
            <p className="text-sm sm:text-base text-purple-700">{puzzle.hint}</p>
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
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Perfectly Balanced!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You found the correct value of x = {puzzle?.answer}
              </p>
              <button
                onClick={generateNewPuzzle}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                Try Another Equation
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
                {timeLeft === 0 ? "Time's Up!" : "Not Balanced"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                The correct value was: x = {puzzle?.answer}
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

export default function EquationBalancerPage() {
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
            <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Equation Balance</h1>
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

        <EquationBalancer difficulty={difficulty} />
      </div>
    </div>
  );
}
