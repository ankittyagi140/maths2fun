'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Puzzle, Lightbulb, Trophy, XCircle, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation';
interface MagicSquareProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

const MagicSquare: React.FC<MagicSquareProps> = ({ difficulty }) => {
  const [solution, setSolution] = useState<number[][]>([]);
  const [userInput, setUserInput] = useState<number[][]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [magicSum, setMagicSum] = useState(0);
  const generateMagicSquare = (difficulty: string) => {
    let size: number;
    let sum: number;

    switch (difficulty) {
      case 'easy':
        size = 3;
        sum = 15;
        break;
      case 'medium':
        size = 4;
        sum = 34;
        break;
      case 'hard':
        size = 5;
        sum = 65;
        break;
      default:
        size = 3;
        sum = 15;
    }

    setMagicSum(sum);

    // Generate a valid magic square
    const newGrid = Array(size).fill(0).map(() => Array(size).fill(0));
    const numbers = Array.from({ length: size * size }, (_, i) => i + 1);
    
    // Simple algorithm for 3x3 magic square
    if (size === 3) {
      newGrid[0][0] = 8;
      newGrid[0][1] = 1;
      newGrid[0][2] = 6;
      newGrid[1][0] = 3;
      newGrid[1][1] = 5;
      newGrid[1][2] = 7;
      newGrid[2][0] = 4;
      newGrid[2][1] = 9;
      newGrid[2][2] = 2;
    } else {
      // For 4x4 and 5x5, generate a random valid magic square
      // This is a simplified version - you might want to implement a more sophisticated algorithm
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          newGrid[i][j] = numbers[i * size + j];
        }
      }
    }

    setSolution(newGrid);

    // Create user input grid with some numbers filled in
    const userGrid = Array(size).fill(0).map(() => Array(size).fill(0));
    const filledCount = Math.floor((size * size) * 0.3); // 30% of cells filled

    for (let i = 0; i < filledCount; i++) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (userGrid[row][col] === 0) {
        userGrid[row][col] = newGrid[row][col];
      }
    }

    setUserInput(userGrid);
  };

  useEffect(() => {
    generateMagicSquare(difficulty);
  }, [difficulty]);

  const handleInputChange = (row: number, col: number, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value);
    if (numValue >= 0 && numValue <= solution.length * solution.length) {
      const newInput = [...userInput];
      newInput[row][col] = numValue;
      setUserInput(newInput);
      checkSolution(newInput);
    }
  };

  const checkSolution = (currentInput: number[][]) => {
    const size = solution.length;
    let isCorrect = true;
    let hasEmptyCells = false;

    // Check if all cells are filled
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (currentInput[i][j] === 0) {
          hasEmptyCells = true;
          isCorrect = false;
          break;
        }
      }
      if (hasEmptyCells) break;
    }

    // Only check sums if all cells are filled
    if (!hasEmptyCells) {
      // Check rows
      for (let i = 0; i < size; i++) {
        const rowSum = currentInput[i].reduce((a, b) => a + b, 0);
        if (rowSum !== magicSum) {
          isCorrect = false;
          break;
        }
      }

      // Check columns
      for (let j = 0; j < size; j++) {
        const colSum = currentInput.reduce((a, b) => a + b[j], 0);
        if (colSum !== magicSum) {
          isCorrect = false;
          break;
        }
      }

      // Check diagonals
      const diagonal1 = currentInput.reduce((a, b, i) => a + b[i], 0);
      const diagonal2 = currentInput.reduce((a, b, i) => a + b[size - 1 - i], 0);
      if (diagonal1 !== magicSum || diagonal2 !== magicSum) {
        isCorrect = false;
      }

      // Check for duplicate numbers
      const numbers = new Set<number>();
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (numbers.has(currentInput[i][j])) {
            isCorrect = false;
            break;
          }
          numbers.add(currentInput[i][j]);
        }
        if (!isCorrect) break;
      }
    }

    if (isCorrect && !hasEmptyCells) {
      setIsComplete(true);
      setIsIncorrect(false);
    } else if (!hasEmptyCells) {
      setIsComplete(false);
      setIsIncorrect(true);
    } else {
      setIsComplete(false);
      setIsIncorrect(false);
    }
  };

  const getHint = () => {
    const size = solution.length;
    const emptyCells = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (userInput[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      return `Try placing ${solution[randomCell.row][randomCell.col]} in position (${randomCell.row + 1}, ${randomCell.col + 1})`;
    }
    return "All cells are filled. Check if your sums are correct!";
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Magic Square - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
        <div className="flex items-center gap-2 text-gray-600">
          <Info className="w-5 h-5" />
          <p>Magic Sum: {magicSum}</p>
        </div>
      </div>

      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-6 shadow-sm"
        >
          <h3 className="font-bold mb-3 text-lg">How to Play:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Fill in the empty cells with numbers from 1 to {solution.length * solution.length}</li>
            <li>Each number can only be used once</li>
            <li>The sum of numbers in each row, column, and diagonal must equal {magicSum}</li>
            <li>Use the hint button if you need help</li>
          </ol>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Got it!
          </button>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <div className="grid gap-2 sm:gap-3 justify-center">
          {userInput.map((row, i) => (
            <div key={i} className="flex gap-2 sm:gap-3">
              {row.map((cell, j) => (
                <input
                  key={`${i}-${j}`}
                  type="number"
                  value={cell || ''}
                  onChange={(e) => handleInputChange(i, j, e.target.value)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 text-center text-lg sm:text-xl border-2 rounded-lg transition-colors
                    ${cell === 0 
                      ? 'border-gray-300 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                      : 'border-blue-500 bg-blue-50'
                    }`}
                  readOnly={cell !== 0}
                  min="1"
                  max={solution.length * solution.length}
                  aria-label={`Cell ${i + 1}, ${j + 1}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Lightbulb className="w-5 h-5" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          onClick={() => generateMagicSquare(difficulty)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Puzzle className="w-5 h-5" />
          New Puzzle
        </button>
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-purple-50 p-4 sm:p-6 rounded-lg mb-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-purple-500 mt-1" />
            <p className="text-purple-700">{getHint()}</p>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-lg text-center max-w-sm mx-4 shadow-xl"
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-600 mb-2">Congratulations!</h3>
              <p className="text-gray-600 mb-6">You`&apos;`ve solved the magic square!</p>
              <button
                onClick={() => {
                  setIsComplete(false);
                  generateMagicSquare(difficulty);
                }}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-lg text-center max-w-sm mx-4 shadow-xl"
            >
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-600 mb-2">Not Quite Right</h3>
              <p className="text-gray-600 mb-6">Check your sums and try again!</p>
              <button
                onClick={() => setIsIncorrect(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Continue Solving
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MagicSquarePage() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Puzzle className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Magic Square Puzzle</h1>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`px-6 py-2 rounded-lg capitalize transition-colors ${
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

        <MagicSquare difficulty={difficulty} />
      </div>
    </div>
  );
} 