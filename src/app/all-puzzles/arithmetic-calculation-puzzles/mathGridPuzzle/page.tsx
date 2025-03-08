'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft, Grid } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface GridCell {
  value: number | null;
  isFixed: boolean;
  isHighlighted: boolean;
}

interface MathGridPuzzle {
  grid: GridCell[][];
  solution: number[][];
  hint: string;
  timeLimit: number;
  size: number;
}

const generateMathGridPuzzle = (difficulty: Difficulty): MathGridPuzzle => {
  const getSize = () => {
    switch (difficulty) {
      case 'easy': return 3;
      case 'medium': return 4;
      case 'hard': return 5;
    }
  };

  const size = getSize();
  const grid: GridCell[][] = Array(size).fill(null).map(() => 
    Array(size).fill(null).map(() => ({
      value: null,
      isFixed: false,
      isHighlighted: false
    }))
  );
  
  const solution: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));

  // Generate solution based on difficulty
  switch (difficulty) {
    case 'easy':
      // Simple pattern: Each row and column sums to the same number
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          solution[i][j] = (i + j + 1) * 2;
        }
      }
      break;

    case 'medium':
      // Medium pattern: Numbers follow a multiplication pattern
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          solution[i][j] = (i + 1) * (j + 2);
        }
      }
      break;

    case 'hard':
      // Hard pattern: Complex mathematical relationships
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          solution[i][j] = (i + 2) * (j + 2) + Math.floor((i + j) / 2);
        }
      }
      break;
  }

  // Fill some cells as fixed numbers
  const fixedCellCount = Math.floor(size * size * 0.4);
  for (let k = 0; k < fixedCellCount; k++) {
    let i, j;
    do {
      i = Math.floor(Math.random() * size);
      j = Math.floor(Math.random() * size);
    } while (grid[i][j].isFixed);

    grid[i][j] = {
      value: solution[i][j],
      isFixed: true,
      isHighlighted: false
    };
  }

  const hint = difficulty === 'easy' 
    ? 'Look for patterns in rows and columns - they all sum to the same number!'
    : difficulty === 'medium'
    ? 'Think about multiplication patterns between adjacent numbers'
    : 'Consider both multiplication and addition patterns in the grid';

  const timeLimit = difficulty === 'easy' ? 120 : difficulty === 'medium' ? 180 : 240;

  return { grid, solution, hint, timeLimit, size };
};

const MathGridPuzzle: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [puzzle, setPuzzle] = useState<MathGridPuzzle | null>(null);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
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
    const newPuzzle = generateMathGridPuzzle(difficulty);
    setPuzzle(newPuzzle);
    setTimeLeft(newPuzzle.timeLimit);
    setSelectedCell(null);
    setIsComplete(false);
    setIsIncorrect(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!puzzle || puzzle.grid[row][col].isFixed) return;
    setSelectedCell([row, col]);
  };

  const handleNumberInput = (number: number) => {
    if (!puzzle || !selectedCell) return;
    const [row, col] = selectedCell;
    
    const newGrid = puzzle.grid.map(r => r.map(cell => ({ ...cell })));
    newGrid[row][col].value = number;
    
    setPuzzle({ ...puzzle, grid: newGrid });
    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: GridCell[][]) => {
    if (!puzzle) return;

    // Check if all cells are filled
    const isGridFilled = currentGrid.every(row => 
      row.every(cell => cell.value !== null)
    );

    if (!isGridFilled) return;

    // Check if solution matches
    const isCorrect = currentGrid.every((row, i) =>
      row.every((cell, j) => cell.value === puzzle.solution[i][j])
    );

    if (isCorrect) {
      setIsComplete(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center sm:text-left">
          Math Grid Puzzle - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
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
            <li>Fill in the empty cells with numbers</li>
            <li>Numbers follow a specific pattern in each grid</li>
            <li>Use the fixed numbers as clues</li>
            <li>Complete the grid before time runs out</li>
            <li>Use hints if you need help finding patterns!</li>
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
            <div className="grid gap-2 max-w-md mx-auto" 
              style={{ 
                gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))` 
              }}
            >
              {puzzle.grid.map((row, i) => 
                row.map((cell, j) => (
                  <button
                    key={`${i}-${j}`}
                    onClick={() => handleCellClick(i, j)}
                    disabled={cell.isFixed}
                    className={`
                      aspect-square flex items-center justify-center text-xl font-bold rounded-lg
                      transition-colors
                      ${cell.isFixed 
                        ? 'bg-gray-200 text-gray-700' 
                        : selectedCell?.[0] === i && selectedCell?.[1] === j
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-white border-2 border-gray-200 hover:border-blue-500'}
                    `}
                  >
                    {cell.value}
                  </button>
                ))
              )}
            </div>

            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
                <button
                  key={number}
                  onClick={() => handleNumberInput(number)}
                  disabled={!selectedCell}
                  className={`
                    aspect-square flex items-center justify-center text-xl font-bold rounded-lg
                    transition-colors
                    ${selectedCell
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                  `}
                >
                  {number}
                </button>
              ))}
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
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Puzzle Complete!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You solved the grid pattern!
              </p>
              <button
                onClick={generateNewPuzzle}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                Try Another Puzzle
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
                Keep trying! Look for patterns in the numbers.
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

export default function MathGridPuzzlePage() {
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
            <Grid className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Math Grid Puzzle</h1>
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

        <MathGridPuzzle difficulty={difficulty} />
      </div>
    </div>
  );
}
