'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft, Pizza } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';
type Operation = '+' | '-' | '×' | '÷';

interface Fraction {
  numerator: number;
  denominator: number;
}

interface FractionPuzzle {
  fraction1: Fraction;
  fraction2: Fraction;
  operation: Operation;
  answer: Fraction;
  hint: string;
  timeLimit: number;
}

const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};

const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

const generateFraction = (maxDenominator: number): Fraction => {
  const denominator = Math.floor(Math.random() * (maxDenominator - 1)) + 2;
  const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
  return { numerator, denominator };
};

const simplifyFraction = (fraction: Fraction): Fraction => {
  const divisor = gcd(fraction.numerator, fraction.denominator);
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor
  };
};

const generateFractionPuzzle = (difficulty: Difficulty): FractionPuzzle => {
  let fraction1: Fraction, fraction2: Fraction, operation: Operation, answer: Fraction, hint: string;
  let timeLimit: number;

  switch (difficulty) {
    case 'easy':
      // Simple addition/subtraction with same denominators
      fraction1 = generateFraction(6);
      fraction2 = { numerator: Math.floor(Math.random() * 3) + 1, denominator: fraction1.denominator };
      operation = Math.random() < 0.5 ? '+' : '-';
      answer = operation === '+' 
        ? { numerator: fraction1.numerator + fraction2.numerator, denominator: fraction1.denominator }
        : { numerator: fraction1.numerator - fraction2.numerator, denominator: fraction1.denominator };
      hint = 'When denominators are the same, just add/subtract the numerators';
      timeLimit = 30;
      break;

    case 'medium':
      // Mixed operations with different denominators
      fraction1 = generateFraction(8);
      fraction2 = generateFraction(8);
      operation = ['+', '-', '×'][Math.floor(Math.random() * 3)] as Operation;
      
      if (operation === '×') {
        answer = {
          numerator: fraction1.numerator * fraction2.numerator,
          denominator: fraction1.denominator * fraction2.denominator
        };
        hint = 'Multiply numerators together and denominators together';
      } else {
        // Calculate LCM for addition/subtraction
        const commonDenominator = lcm(fraction1.denominator, fraction2.denominator);
        const newNum1 = fraction1.numerator * (commonDenominator / fraction1.denominator);
        const newNum2 = fraction2.numerator * (commonDenominator / fraction2.denominator);
        answer = {
          numerator: operation === '+' ? newNum1 + newNum2 : newNum1 - newNum2,
          denominator: commonDenominator
        };
        hint = 'Find a common denominator first, then add/subtract numerators';
      }
      timeLimit = 45;
      break;

    case 'hard':
      // Complex operations including division
      fraction1 = generateFraction(12);
      fraction2 = generateFraction(12);
      operation = ['×', '÷'][Math.floor(Math.random() * 2)] as Operation;
      
      if (operation === '÷') {
        answer = {
          numerator: fraction1.numerator * fraction2.denominator,
          denominator: fraction1.denominator * fraction2.numerator
        };
        hint = 'To divide fractions, multiply by the reciprocal';
      } else {
        answer = {
          numerator: fraction1.numerator * fraction2.numerator,
          denominator: fraction1.denominator * fraction2.denominator
        };
        hint = 'Multiply numerators and denominators, then simplify';
      }
      timeLimit = 60;
      break;
  }

  answer = simplifyFraction(answer);
  return { fraction1, fraction2, operation, answer, hint, timeLimit };
};

const FractionChallenge: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [puzzle, setPuzzle] = useState<FractionPuzzle | null>(null);
  const [userNumerator, setUserNumerator] = useState('');
  const [userDenominator, setUserDenominator] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

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
    const newPuzzle = generateFractionPuzzle(difficulty);
    setPuzzle(newPuzzle);
    setTimeLeft(newPuzzle.timeLimit);
    setUserNumerator('');
    setUserDenominator('');
    setIsComplete(false);
    setIsIncorrect(false);
  };

  const handleAnswerSubmit = () => {
    if (!puzzle) return;

    const userFraction = {
      numerator: parseInt(userNumerator),
      denominator: parseInt(userDenominator)
    };

    const simplifiedUserFraction = simplifyFraction(userFraction);
    const isCorrect = 
      simplifiedUserFraction.numerator === puzzle.answer.numerator &&
      simplifiedUserFraction.denominator === puzzle.answer.denominator;

    if (isCorrect) {
      setIsComplete(true);
    } else {
      setIsIncorrect(true);
    }
  };

  const renderPizzaSlices = (fraction: Fraction) => {
    const slices = [];
    const totalSlices = fraction.denominator;
    const filledSlices = fraction.numerator;

    for (let i = 0; i < totalSlices; i++) {
      const rotation = (360 / totalSlices) * i;
      slices.push(
        <motion.div
          key={i}
          className={`absolute w-full h-full origin-center
            ${i < filledSlices ? 'bg-yellow-500' : 'bg-gray-200'}`}
          style={{
            clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%)',
            transform: `rotate(${rotation}deg)`,
          }}
        />
      );
    }
    return (
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {slices}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center sm:text-left">
          Fraction Challenge - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
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
            <li>Look at the pizza slices to visualize the fractions</li>
            <li>Perform the indicated operation on the fractions</li>
            <li>Enter your answer as a simplified fraction</li>
            <li>Complete the challenge before time runs out</li>
            <li>Use hints if you need help with fraction operations!</li>
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
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center justify-center gap-8 w-full max-w-2xl">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden">
                    {renderPizzaSlices(puzzle.fraction1)}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                      <span className="text-xl font-bold text-white">
                        {puzzle.fraction1.numerator}/{puzzle.fraction1.denominator}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 flex items-center">
                  {puzzle.operation}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden">
                    {renderPizzaSlices(puzzle.fraction2)}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                      <span className="text-xl font-bold text-white">
                        {puzzle.fraction2.numerator}/{puzzle.fraction2.denominator}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-sm mx-auto pt-4">
                <div className="text-center mb-4 text-gray-600 font-medium">
                  Enter your answer:
                </div>
                <div className="flex items-center justify-center gap-4">
                  <input
                    type="number"
                    value={userNumerator}
                    onChange={(e) => setUserNumerator(e.target.value)}
                    placeholder="Numerator"
                    className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAnswerSubmit();
                      }
                    }}
                  />
                  <div className="text-2xl font-bold">/</div>
                  <input
                    type="number"
                    value={userDenominator}
                    onChange={(e) => setUserDenominator(e.target.value)}
                    placeholder="Denominator"
                    className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAnswerSubmit();
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleAnswerSubmit}
                  className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Check Answer
                </button>
              </div>
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
          New Challenge
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
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Perfect Slice!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You found the correct fraction: {puzzle?.answer.numerator}/{puzzle?.answer.denominator}
              </p>
              <button
                onClick={generateNewPuzzle}
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
                {timeLeft === 0 ? "Time's Up!" : "Not Quite Right"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                The correct fraction was: {puzzle?.answer.numerator}/{puzzle?.answer.denominator}
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

export default function FractionChallengePage() {
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
            <Pizza className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Fraction Challenge</h1>
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

        <FractionChallenge difficulty={difficulty} />
      </div>
    </div>
  );
}
