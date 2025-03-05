'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface MatrixCell {
  value: number;
  isFixed: boolean;
  isSelected: boolean;
}

interface MatrixPuzzle {
  grid: MatrixCell[][];
  solution: number[][];
  hint: string;
  rule: string;
}

// Helper function to generate matrix puzzles
const generateMatrixPuzzles = (difficulty: Difficulty): MatrixPuzzle => {
  const size = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
  let grid: MatrixCell[][] = [];
  const solution: number[][] = [];
  let hint = '';
  let rule = '';

  // Generate solution matrix first
  for (let i = 0; i < size; i++) {
    solution[i] = [];
    for (let j = 0; j < size; j++) {
      solution[i][j] = Math.floor(Math.random() * 9) + 1;
    }
  }

  // Create puzzle grid with some cells hidden
  grid = Array(size).fill(null).map(() => 
    Array(size).fill(null).map(() => ({
      value: 0,
      isFixed: Math.random() < 0.4, // Reduce probability of fixed cells
      isSelected: false
    }))
  );

  // Fill in fixed cells with solution values
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j].isFixed) {
        grid[i][j].value = solution[i][j];
      }
    }
  }

  switch (difficulty) {
    case 'easy':
      hint = 'Each row and column must sum to the same value';
      rule = 'Fill in missing numbers so each row and column sums to the same value';
      break;
    case 'medium':
      hint = 'Each row, column, and diagonal must sum to the same value';
      rule = 'Fill in missing numbers so each row, column, and diagonal sums to the same value';
      break;
    case 'hard':
      hint = 'Each row, column, diagonal, and 2x2 block must sum to a specific value';
      rule = 'Fill in missing numbers so each row, column, diagonal, and 2x2 block sums to a specific value';
      break;
  }

  return { grid, solution, hint, rule };
};

const MatrixMaster: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [puzzle, setPuzzle] = useState<MatrixPuzzle | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [userGrid, setUserGrid] = useState<MatrixCell[][]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const generatePuzzle = useCallback(() => {
    const newPuzzle = generateMatrixPuzzles(difficulty);
    setPuzzle(newPuzzle);
    setUserGrid(JSON.parse(JSON.stringify(newPuzzle.grid)));
    setSelectedCell(null);
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

  const handleCellClick = (row: number, col: number) => {
    if (!userGrid[row][col].isFixed) {
      const newGrid = userGrid.map(r => r.map(cell => ({ ...cell, isSelected: false })));
      newGrid[row][col].isSelected = true;
      setUserGrid(newGrid);
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (number: number) => {
    if (!selectedCell || !puzzle) return;

    const { row, col } = selectedCell;
    const newGrid = userGrid.map(r => r.map(cell => ({ ...cell })));
    newGrid[row][col].value = number;
    newGrid[row][col].isSelected = false;
    setUserGrid(newGrid);
    setSelectedCell(null);

    // Check if puzzle is complete
    const isCorrect = newGrid.every((row, i) =>
      row.every((cell, j) => cell.value === puzzle.solution[i][j])
    );

    if (isCorrect) {
      setIsComplete(true);
    }
  };

  const checkSums = () => {
    if (!puzzle) return false;
    
    const size = userGrid.length;
    const rowSums = userGrid.map(row => row.reduce((sum, cell) => sum + cell.value, 0));
    const colSums = Array(size).fill(0).map((_, col) => 
      userGrid.reduce((sum, row) => sum + row[col].value, 0)
    );

    const targetSum = rowSums[0];
    const isValid = rowSums.every(sum => sum === targetSum) && 
                   colSums.every(sum => sum === targetSum);

    if (!isValid) {
      setIsIncorrect(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Matrix Master - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
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
            <li>Click on empty cells to select them</li>
            <li>Use number buttons to fill in values</li>
            <li>{puzzle?.rule}</li>
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
        <div className="grid gap-2 mb-6">
          {userGrid.map((row, i) => (
            <div key={i} className="flex justify-center gap-2">
              {row.map((cell, j) => (
                <button
                  key={j}
                  onClick={() => handleCellClick(i, j)}
                  disabled={cell.isFixed}
                  className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold rounded-lg transition-colors
                    ${cell.isFixed ? 'bg-gray-100 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100'}
                    ${cell.isSelected ? 'bg-blue-200 border-blue-500' : ''}
                    border-2 ${cell.isFixed ? 'border-gray-300' : 'border-blue-300'}`}
                >
                  {cell.value || ''}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-w-sm mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              disabled={!selectedCell}
              className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors
                ${selectedCell 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' 
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
            >
              {num}
            </button>
          ))}
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
        <button
          onClick={checkSums}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
        >
          Check Solution
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
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Congratulations!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">You solved the matrix puzzle!</p>
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
                {timeLeft === 0 ? "Time's Up!" : "Not Quite Right"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Check the sums in each row and column
              </p>
              <button
                onClick={() => setIsIncorrect(false)}
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

export default function MatrixMasterPage() {
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Matrix Master</h1>
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

        <MatrixMaster difficulty={difficulty} />
      </div>
    </div>
  );
}
