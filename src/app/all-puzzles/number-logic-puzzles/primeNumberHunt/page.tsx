'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

interface PrimeNumberHuntProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Cell {
  value: number;
  isSelected: boolean;
  isPrime: boolean;
  isHighlighted: boolean;
}

const PrimeNumberHunt: React.FC<PrimeNumberHuntProps> = ({ difficulty }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [targetCount, setTargetCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const isPrime = (num: number): boolean => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i <= Math.sqrt(num); i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const generatePuzzle = useCallback(() => {
    let size: number;
    let maxNumber: number;
    let timeLimit: number;

    switch (difficulty) {
      case 'easy':
        size = 5;
        maxNumber = 50;
        timeLimit = 60;
        break;
      case 'medium':
        size = 7;
        maxNumber = 100;
        timeLimit = 90;
        break;
      case 'hard':
        size = 9;
        maxNumber = 200;
        timeLimit = 120;
        break;
      default:
        size = 5;
        maxNumber = 50;
        timeLimit = 60;
    }

    // Generate grid with numbers
    let attempts = 0;
    const generateValidGrid = (): Cell[][] => {
      attempts++;
      const newGrid: Cell[][] = [];
      let primeCount = 0;

      for (let i = 0; i < size; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < size; j++) {
          const value = Math.floor(Math.random() * maxNumber) + 1;
          const isPrimeValue = isPrime(value);
          
          row.push({
            value,
            isSelected: false,
            isPrime: isPrimeValue,
            isHighlighted: false
          });

          if (isPrimeValue) primeCount++;
        }
        newGrid.push(row);
      }

      if (primeCount < 2 && attempts < 5) {
        return generateValidGrid();
      }
      return newGrid;
    };

    const validGrid = generateValidGrid();
    setGrid(validGrid);
    setTargetCount(Math.max(2, Math.floor(validGrid.flat().filter(cell => cell.isPrime).length / 2)));
    setTimeLeft(timeLimit);
    setIsComplete(false);
    setIsIncorrect(false);
  }, [difficulty]);

  useEffect(() => {
    generatePuzzle();
  }, [difficulty, generatePuzzle]);

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

  const handleCellClick = (row: number, col: number) => {
    if (timeLeft === 0) return;

    const newGrid = [...grid];
    const cell = newGrid[row][col];

    if (cell.isSelected) {
      cell.isSelected = false;
    } else {
      cell.isSelected = true;
    }

    setGrid(newGrid);
    checkSolution();
  };

  const checkSolution = () => {
    // Get all selected cells from the current grid state
    const selectedCells = grid.flat().filter(cell => cell.isSelected);
    
    // Verify each selected cell's primality using the isPrime function
    const selectedPrimes = selectedCells.filter(cell => isPrime(cell.value));
    const selectedNonPrimes = selectedCells.filter(cell => !isPrime(cell.value));

    // Check solution validity
    if (selectedPrimes.length === targetCount && selectedNonPrimes.length === 0) {
      setIsComplete(true);
      setIsIncorrect(false);
    } else {
      setIsComplete(false);
      setIsIncorrect(selectedNonPrimes.length > 0 || selectedPrimes.length > targetCount);
    }
  };

  const getHint = () => {
    const remainingPrimes = grid.flat().filter(cell => {
      return isPrime(cell.value) && !cell.isSelected;
    });

    if (remainingPrimes.length === 0) return "You've found all prime numbers!";
    
    const randomPrime = remainingPrimes[Math.floor(Math.random() * remainingPrimes.length)];
    return `Hint: There's a prime number (${randomPrime.value}) in the grid`;
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Number Prime Hunt - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
        <div className="flex items-center gap-2">
            <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
            <p>Find {targetCount} prime numbers</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className='text-sm sm:text-base text-red-600'>Time Left: {timeLeft}s</p>
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
            <li>Each cell contains a number between 1 and {difficulty === 'easy' ? 50 : difficulty === 'medium' ? 100 : 200}</li>
            <li>Find the prime numbers in the grid</li>
            <li>Click to select/deselect numbers</li>
            <li>You need to find exactly {targetCount} prime numbers</li>
            <li>Watch out for the time limit!</li>
            <li>Use the hint button if you need help</li>
          </ol>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
          >
            Got it!
          </button>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-md p-2 sm:p-4 md:p-6 mb-4 sm:mb-6">
        <div className="grid gap-1 overflow-x-auto">
          <div className="min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center">
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center border-2 text-sm sm:text-base md:text-lg font-medium cursor-pointer
                      ${cell.isSelected ? 'bg-green-100 border-green-500 text-green-700' : 'border-gray-200'}`}
                  >
                    {cell.value}
                  </div>
                ))}
              </div>
            ))}
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
          onClick={() => generatePuzzle()}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Puzzle
        </button>
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-purple-50 p-3 sm:p-4 md:p-6 rounded-lg mt-4 sm:mt-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1" />
            <p className="text-sm sm:text-base text-purple-700 whitespace-pre-line">{getHint()}</p>
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">You`&apos;`ve found all the prime numbers!</p>
              <button
                onClick={() => {
                  setIsComplete(false);
                  generatePuzzle();
                }}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                New Puzzle
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {isComplete && <Confetti recycle={false} numberOfPieces={500} />}

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
              <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Not Quite Right</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {timeLeft === 0 ? "Time's up! Try again!" : "Keep looking for prime numbers!"}
              </p>
              <button
                onClick={() => {
                  setIsIncorrect(false);
                  if (timeLeft === 0) {
                    generatePuzzle();
                  }
                }}
                className="px-4 sm:px-6 py-2 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600 transition-colors"
              >
                {timeLeft === 0 ? 'New Puzzle' : 'Continue Solving'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PrimeNumberHuntPage() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between  mb-4 sm:mb-6 md:mb-8 ">
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
          <div className="flex items-center gap-2 ">
            <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 " />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 ">Number Prime Hunt</h1>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-wrap gap-2 sm:gap-3 justify-center">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg capitalize text-sm sm:text-base transition-colors ${
                difficulty === diff
                  ? diff === 'easy'
                    ? 'bg-green-500 text-white shadow-md'
                    : diff === 'medium'
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-red-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <PrimeNumberHunt difficulty={difficulty} />
      </div>
    </div>
  );
}
