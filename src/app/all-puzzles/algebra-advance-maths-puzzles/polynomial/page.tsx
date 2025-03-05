'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface PolynomialTerm {
  coefficient: number;
  exponent: number;
  isSelected?: boolean;
}

interface PolynomialPuzzle {
  terms: PolynomialTerm[];
  correctOrder: number[];
  hint: string;
  description: string;
}

const polynomialPuzzles = {
    easy: [
        {
          terms: [
            { coefficient: 1, exponent: 2 },
            { coefficient: -3, exponent: 1 },
            { coefficient: 2, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Arrange terms in descending order of exponents',
          description: 'x² - 3x + 2'
        },
        {
          terms: [
            { coefficient: 2, exponent: 2 },
            { coefficient: -5, exponent: 1 },
            { coefficient: 3, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Start with the highest power of x',
          description: '2x² - 5x + 3'
        },
        {
          terms: [
            { coefficient: -1, exponent: 2 },
            { coefficient: 4, exponent: 1 },
            { coefficient: -2, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Remember: constant terms go last',
          description: '-x² + 4x - 2'
        },
        {
          terms: [
            { coefficient: 3, exponent: 2 },
            { coefficient: 0, exponent: 1 },
            { coefficient: -4, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Rearrange by exponent',
          description: '3x² + 0x - 4'
        },
        {
          terms: [
            { coefficient: 4, exponent: 2 },
            { coefficient: -1, exponent: 1 },
            { coefficient: 6, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Highest exponent first',
          description: '4x² - x + 6'
        },
        {
          terms: [
            { coefficient: -2, exponent: 2 },
            { coefficient: 3, exponent: 1 },
            { coefficient: -5, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Sort by degree',
          description: '-2x² + 3x - 5'
        },
        {
          terms: [
            { coefficient: 5, exponent: 2 },
            { coefficient: -2, exponent: 1 },
            { coefficient: 7, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Descending exponents',
          description: '5x² - 2x + 7'
        },
        {
          terms: [
            { coefficient: 1, exponent: 2 },
            { coefficient: -4, exponent: 1 },
            { coefficient: 4, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Identify quadratic term first',
          description: 'x² - 4x + 4'
        },
        {
          terms: [
            { coefficient: 6, exponent: 2 },
            { coefficient: -3, exponent: 1 },
            { coefficient: 0, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Order terms properly',
          description: '6x² - 3x + 0'
        },
        {
          terms: [
            { coefficient: -3, exponent: 2 },
            { coefficient: 2, exponent: 1 },
            { coefficient: -1, exponent: 0 }
          ],
          correctOrder: [0, 1, 2],
          hint: 'Sort decreasingly',
          description: '-3x² + 2x - 1'
        }
    ],
 medium:[
    {
      terms: [
        { coefficient: 5, exponent: 3 },
        { coefficient: -2, exponent: 2 },
        { coefficient: 4, exponent: 1 },
        { coefficient: -1, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Arrange from highest to lowest power',
      description: '5x³ - 2x² + 4x - 1'
    },
    {
      terms: [
        { coefficient: -3, exponent: 3 },
        { coefficient: 2, exponent: 1 },
        { coefficient: 6, exponent: 0 },
        { coefficient: -1, exponent: 2 }
      ],
      correctOrder: [0, 3, 1, 2],
      hint: 'Look for the cubic term first',
      description: '-3x³ - x² + 2x + 6'
    },
    {
      terms: [
        { coefficient: 7, exponent: 2 },
        { coefficient: -4, exponent: 1 },
        { coefficient: 3, exponent: 0 },
        { coefficient: 1, exponent: 3 }
      ],
      correctOrder: [3, 0, 1, 2],
      hint: 'Group terms by decreasing exponents',
      description: 'x³ + 7x² - 4x + 3'
    },
    {
      terms: [
        { coefficient: -1, exponent: 3 },
        { coefficient: 5, exponent: 2 },
        { coefficient: -2, exponent: 1 },
        { coefficient: 8, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Arrange from highest to lowest power',
      description: '-x³ + 5x² - 2x + 8'
    },
    {
      terms: [
        { coefficient: 6, exponent: 3 },
        { coefficient: -3, exponent: 2 },
        { coefficient: 7, exponent: 1 },
        { coefficient: -9, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Look for the cubic term first',
      description: '6x³ - 3x² + 7x - 9'
    },
    {
      terms: [
        { coefficient: 2, exponent: 2 },
        { coefficient: -5, exponent: 1 },
        { coefficient: 1, exponent: 3 },
        { coefficient: 4, exponent: 0 }
      ],
      correctOrder: [2, 0, 1, 3],
      hint: 'Group terms by decreasing exponents',
      description: 'x³ + 2x² - 5x + 4'
    },
    {
      terms: [
        { coefficient: -4, exponent: 3 },
        { coefficient: 3, exponent: 2 },
        { coefficient: -2, exponent: 1 },
        { coefficient: 1, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Arrange from highest to lowest power',
      description: '-4x³ + 3x² - 2x + 1'
    },
    {
      terms: [
        { coefficient: 1, exponent: 3 },
        { coefficient: -6, exponent: 2 },
        { coefficient: 2, exponent: 1 },
        { coefficient: -7, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Look for the cubic term first',
      description: 'x³ - 6x² + 2x - 7'
    },
    {
      terms: [
        { coefficient: 3, exponent: 3 },
        { coefficient: -1, exponent: 2 },
        { coefficient: 5, exponent: 1 },
        { coefficient: -2, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Group terms by decreasing exponents',
      description: '3x³ - x² + 5x - 2'
    },
    {
      terms: [
        { coefficient: -2, exponent: 3 },
        { coefficient: 4, exponent: 2 },
        { coefficient: -3, exponent: 1 },
        { coefficient: 6, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3],
      hint: 'Arrange from highest to lowest power',
      description: '-2x³ + 4x² - 3x + 6'
    }
],
hard:[
    {
      terms: [
        { coefficient: 4, exponent: 5 },
        { coefficient: -2, exponent: 4 },
        { coefficient: 3, exponent: 3 },
        { coefficient: -1, exponent: 2 },
        { coefficient: 6, exponent: 1 },
        { coefficient: -7, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      hint: 'Start with the fifth degree term',
      description: '4x⁵ - 2x⁴ + 3x³ - x² + 6x - 7'
    },
    {
      terms: [
        { coefficient: -3, exponent: 4 },
        { coefficient: 5, exponent: 3 },
        { coefficient: -1, exponent: 5 },
        { coefficient: 2, exponent: 2 },
        { coefficient: -4, exponent: 1 },
        { coefficient: 8, exponent: 0 }
      ],
      correctOrder: [2, 0, 1, 3, 4, 5],
      hint: 'Find the term with the highest exponent first',
      description: '-x⁵ - 3x⁴ + 5x³ + 2x² - 4x + 8'
    },
    {
      terms: [
        { coefficient: 1, exponent: 5 },
        { coefficient: -2, exponent: 4 },
        { coefficient: 3, exponent: 3 },
        { coefficient: -4, exponent: 2 },
        { coefficient: 5, exponent: 1 },
        { coefficient: -6, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      hint: 'Arrange from highest to lowest power',
      description: 'x⁵ - 2x⁴ + 3x³ - 4x² + 5x - 6'
    },
    {
      terms: [
        { coefficient: 6, exponent: 4 },
        { coefficient: -5, exponent: 3 },
        { coefficient: 4, exponent: 2 },
        { coefficient: -3, exponent: 1 },
        { coefficient: 2, exponent: 0 },
        { coefficient: -1, exponent: 5 }
      ],
      correctOrder: [5, 0, 1, 2, 3, 4],
      hint: 'Look for the fifth degree term first',
      description: '-x⁵ + 6x⁴ - 5x³ + 4x² - 3x + 2'
    },
    {
      terms: [
        { coefficient: -2, exponent: 5 },
        { coefficient: 3, exponent: 4 },
        { coefficient: -4, exponent: 3 },
        { coefficient: 5, exponent: 2 },
        { coefficient: -6, exponent: 1 },
        { coefficient: 7, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      hint: 'Start with the highest exponent',
      description: '-2x⁵ + 3x⁴ - 4x³ + 5x² - 6x + 7'
    },
    {
      terms: [
        { coefficient: 1, exponent: 6 },
        { coefficient: -2, exponent: 5 },
        { coefficient: 3, exponent: 4 },
        { coefficient: -4, exponent: 3 },
        { coefficient: 5, exponent: 2 },
        { coefficient: -6, exponent: 1 },
        { coefficient: 7, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3, 4, 5, 6],
      hint: 'Arrange from highest to lowest power',
      description: 'x⁶ - 2x⁵ + 3x⁴ - 4x³ + 5x² - 6x + 7'
    },
    {
      terms: [
        { coefficient: -3, exponent: 6 },
        { coefficient: 4, exponent: 5 },
        { coefficient: -5, exponent: 4 },
        { coefficient: 6, exponent: 3 },
        { coefficient: -7, exponent: 2 },
        { coefficient: 8, exponent: 1 },
        { coefficient: -9, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3, 4, 5, 6],
      hint: 'Start with the sixth degree term',
      description: '-3x⁶ + 4x⁵ - 5x⁴ + 6x³ - 7x² + 8x - 9'
    },
    {
      terms: [
        { coefficient: 2, exponent: 5 },
        { coefficient: -3, exponent: 4 },
        { coefficient: 4, exponent: 3 },
        { coefficient: -5, exponent: 2 },
        { coefficient: 6, exponent: 1 },
        { coefficient: -7, exponent: 0 },
        { coefficient: 1, exponent: 6 }
      ],
      correctOrder: [6, 0, 1, 2, 3, 4, 5],
      hint: 'Find the term with the highest exponent first',
      description: 'x⁶ + 2x⁵ - 3x⁴ + 4x³ - 5x² + 6x - 7'
    },
    {
      terms: [
        { coefficient: -1, exponent: 6 },
        { coefficient: 2, exponent: 5 },
        { coefficient: -3, exponent: 4 },
        { coefficient: 4, exponent: 3 },
        { coefficient: -5, exponent: 2 },
        { coefficient: 6, exponent: 1 },
        { coefficient: -7, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3, 4, 5, 6],
      hint: 'Arrange from highest to lowest power',
      description: '-x⁶ + 2x⁵ - 3x⁴ + 4x³ - 5x² + 6x - 7'
    },
    {
      terms: [
        { coefficient: 5, exponent: 6 },
        { coefficient: -4, exponent: 5 },
        { coefficient: 3, exponent: 4 },
        { coefficient: -2, exponent: 3 },
        { coefficient: 1, exponent: 2 },
        { coefficient: -6, exponent: 1 },
        { coefficient: 7, exponent: 0 }
      ],
      correctOrder: [0, 1, 2, 3, 4, 5, 6],
      hint: 'Start with the sixth degree term',
      description: '5x⁶ - 4x⁵ + 3x⁴ - 2x³ + x² - 6x + 7'
    }
],
};

const PolynomialPuzzle: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [currentPuzzle, setCurrentPuzzle] = useState<PolynomialPuzzle | null>(null);
  const [selectedTerms, setSelectedTerms] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const generatePuzzle = useCallback(() => {
    const puzzleList = polynomialPuzzles[difficulty];
    const randomIndex = Math.floor(Math.random() * puzzleList.length);
    setCurrentPuzzle(puzzleList[randomIndex]);
    setSelectedTerms([]);
    setTimeLeft(difficulty === 'easy' ? 120 : difficulty === 'medium' ? 180 : 240);
    setIsComplete(false);
    setIsIncorrect(false);
  }, [difficulty]);

  useEffect(() => {
    generatePuzzle();
  }, [generatePuzzle]);

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

  const handleTermClick = (index: number) => {
    if (isComplete || isIncorrect) return;

    if (selectedTerms.includes(index)) {
      setSelectedTerms(selectedTerms.filter(i => i !== index));
    } else {
      setSelectedTerms([...selectedTerms, index]);
    }
  };

  const handleSubmit = () => {
    if (!currentPuzzle || selectedTerms.length !== currentPuzzle.terms.length) return;

    if (selectedTerms.every((term, i) => term === currentPuzzle.correctOrder[i])) {
      setIsComplete(true);
      setIsIncorrect(false);
    } else {
      setIsIncorrect(true);
    }
  };

  const formatTerm = (term: PolynomialTerm): string => {
    let result = '';
    if (term.coefficient === 1 && term.exponent > 0) {
      result = '';
    } else if (term.coefficient === -1 && term.exponent > 0) {
      result = '-';
    } else {
      result = term.coefficient.toString();
    }

    if (term.exponent > 0) {
      result += 'x';
      if (term.exponent > 1) {
        result += term.exponent;
      }
    }

    return result;
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Polynomial Puzzle - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className='text-sm sm:text-base text-red-600'>Time Left: {timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Terms Selected: {selectedTerms.length}/{currentPuzzle?.terms.length}</span>
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
            <li>Click terms in the correct order (highest to lowest degree)</li>
            <li>Selected terms will be highlighted</li>
            <li>Click a term again to deselect it</li>
            <li>Submit when all terms are in order</li>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {currentPuzzle?.terms.map((term, index) => (
            <button
              key={index}
              onClick={() => handleTermClick(index)}
              className={`p-3 rounded-lg text-center text-lg font-mono transition-colors
                ${selectedTerms.includes(index) 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {formatTerm(term)}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedTerms.length !== currentPuzzle?.terms.length}
            className={`px-6 py-2 rounded-lg text-white transition-colors
              ${selectedTerms.length === currentPuzzle?.terms.length
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Check Order
          </button>
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
          onClick={generatePuzzle}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Puzzle
        </button>
      </div>

      {showHint && currentPuzzle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-purple-50 p-3 sm:p-4 md:p-6 rounded-lg mt-4 sm:mt-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1" />
            <p className="text-sm sm:text-base text-purple-700">{currentPuzzle.hint}</p>
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Correct order: {currentPuzzle?.description}
              </p>
              <button
                onClick={generatePuzzle}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                Next Puzzle
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
                {timeLeft === 0 ? "Time's Up!" : "Incorrect Order"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                The correct order was: {currentPuzzle?.description}
              </p>
              <button
                onClick={generatePuzzle}
                className="px-4 sm:px-6 py-2 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600 transition-colors"
              >
                Try New Puzzle
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PolynomialPage() {
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Polynomial Puzzle</h1>
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

        <PolynomialPuzzle difficulty={difficulty} />
      </div>
    </div>
  );
}
