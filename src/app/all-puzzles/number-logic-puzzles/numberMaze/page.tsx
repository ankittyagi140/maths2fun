'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Puzzle, Lightbulb, Trophy, XCircle, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

interface Cell {
  value: number;
  isStart: boolean;
  isEnd: boolean;
  isPath: boolean;
}

interface NumberMazeProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

const NumberMaze: React.FC<NumberMazeProps> = ({ difficulty }) => {
  const [maze, setMaze] = useState<Cell[][]>([]);
  const [selectedPath, setSelectedPath] = useState<{ row: number; col: number }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [pattern, setPattern] = useState<string>('');

  const generateMaze = (difficulty: string) => {
    let size: number;
    let patternType: string;

    switch (difficulty) {
      case 'easy':
        size = 5;
        patternType = 'increment';
        break;
      case 'medium':
        size = 7;
        patternType = 'alternate';
        break;
      case 'hard':
        size = 9;
        patternType = 'fibonacci';
        break;
      default:
        size = 5;
        patternType = 'increment';
    }

    setPattern(patternType);

    // Generate maze based on pattern
    const newMaze: Cell[][] = Array(size).fill(0).map(() => 
      Array(size).fill(0).map(() => ({
        value: 0,
        isStart: false,
        isEnd: false,
        isPath: false
      }))
    );

    // Generate numbers based on pattern
    const numbers: number[] = [];
    switch (patternType) {
      case 'increment':
        // Generate numbers from 1 to size*size
        for (let i = 1; i <= size * size; i++) {
          numbers.push(i);
        }
        break;
      case 'alternate':
        // Generate alternating even and odd numbers
        let even = 2;
        let odd = 1;
        for (let i = 0; i < size * size; i++) {
          if (i % 2 === 0) {
            numbers.push(even);
            even += 2;
          } else {
            numbers.push(odd);
            odd += 2;
          }
        }
        break;
      case 'fibonacci':
        // Generate Fibonacci sequence
        let a = 1, b = 2;
        numbers.push(a, b);
        for (let i = 2; i < size * size; i++) {
          const next = a + b;
          numbers.push(next);
          a = b;
          b = next;
        }
        break;
    }

    // Create a valid path first
    const path: { row: number; col: number }[] = [];
    let currentRow = 0;
    let currentCol = 0;
    path.push({ row: currentRow, col: currentCol });

    // Generate a random path to the end
    while (currentRow < size - 1 || currentCol < size - 1) {
      const possibleMoves = [];
      if (currentRow < size - 1) possibleMoves.push({ row: currentRow + 1, col: currentCol });
      if (currentCol < size - 1) possibleMoves.push({ row: currentRow, col: currentCol + 1 });
      
      const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      path.push(move);
      currentRow = move.row;
      currentCol = move.col;
    }

    // Place numbers along the path following the pattern
    const pathNumbers = [...numbers].slice(0, path.length);
    path.forEach(({ row, col }, index) => {
      newMaze[row][col].value = pathNumbers[index];
    });

    // Fill remaining cells with remaining numbers
    const remainingNumbers = numbers.slice(path.length);
    const remainingCells = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!path.some(p => p.row === i && p.col === j)) {
          remainingCells.push({ row: i, col: j });
        }
      }
    }

    // Shuffle remaining cells and numbers
    for (let i = remainingCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingCells[i], remainingCells[j]] = [remainingCells[j], remainingCells[i]];
    }

    for (let i = 0; i < remainingCells.length; i++) {
      newMaze[remainingCells[i].row][remainingCells[i].col].value = remainingNumbers[i];
    }

    // Set start and end points
    newMaze[0][0].isStart = true;
    newMaze[size - 1][size - 1].isEnd = true;

    setMaze(newMaze);
    setSelectedPath([]);
    setIsComplete(false);
    setIsIncorrect(false);
  };

  useEffect(() => {
    generateMaze(difficulty);
  }, [difficulty]);

  const handleCellClick = (row: number, col: number) => {
    if (maze[row][col].isPath) {
      // Remove path from this cell onwards
      const newPath = selectedPath.slice(0, selectedPath.findIndex(p => p.row === row && p.col === col));
      setSelectedPath(newPath);
      const newMaze = maze.map(row => row.map(cell => ({ ...cell, isPath: false })));
      newPath.forEach(({ row, col }) => {
        newMaze[row][col].isPath = true;
      });
      setMaze(newMaze);
      return;
    }

    // Check if the cell is adjacent to the last selected cell
    const lastCell = selectedPath[selectedPath.length - 1];
    if (!lastCell || 
        (Math.abs(row - lastCell.row) === 1 && col === lastCell.col) ||
        (Math.abs(col - lastCell.col) === 1 && row === lastCell.row)) {
      
      // Check if the number follows the pattern
      const lastValue = lastCell ? maze[lastCell.row][lastCell.col].value : 0;
      const currentValue = maze[row][col].value;
      let isValid = false;

      switch (pattern) {
        case 'increment':
          isValid = currentValue > lastValue;
          break;
        case 'alternate':
          isValid = (lastValue % 2 === 0 && currentValue % 2 === 1) ||
                   (lastValue % 2 === 1 && currentValue % 2 === 0);
          break;
        case 'fibonacci':
          if (selectedPath.length === 0) {
            isValid = currentValue === 1 || currentValue === 2;
          } else if (selectedPath.length === 1) {
            isValid = currentValue === 1 || currentValue === 2;
          } else {
            const prevValue = maze[selectedPath[selectedPath.length - 2].row][selectedPath[selectedPath.length - 2].col].value;
            isValid = currentValue === lastValue + prevValue;
          }
          break;
      }

      if (isValid || !lastCell) {
        const newPath = [...selectedPath, { row, col }];
        setSelectedPath(newPath);
        const newMaze = maze.map(row => row.map(cell => ({ ...cell, isPath: false })));
        newPath.forEach(({ row, col }) => {
          newMaze[row][col].isPath = true;
        });
        setMaze(newMaze);
        checkSolution(newPath);
      }
    }
  };

  const checkSolution = (path: { row: number; col: number }[]) => {
    const lastCell = path[path.length - 1];
    if (maze[lastCell.row][lastCell.col].isEnd) {
      setIsComplete(true);
      setIsIncorrect(false);
    } else {
      setIsComplete(false);
      setIsIncorrect(false);
    }
  };

  const getHint = () => {
    if (selectedPath.length === 0) {
      switch (pattern) {
        case 'increment':
          return "Start from the top-left corner and find a path where each number increases.";
        case 'alternate':
          return "Start from the top-left corner and find a path alternating between even and odd numbers.";
        case 'fibonacci':
          return "Start from the top-left corner and find a path following the Fibonacci sequence (each number is the sum of the previous two).";
        default:
          return "Start from the top-left corner and follow the pattern to reach the bottom-right corner.";
      }
    }

    const lastCell = selectedPath[selectedPath.length - 1];
    const lastValue = maze[lastCell.row][lastCell.col].value;
    
    // Get all possible next moves
    const adjacentCells = [
      { row: lastCell.row - 1, col: lastCell.col },
      { row: lastCell.row + 1, col: lastCell.col },
      { row: lastCell.row, col: lastCell.col - 1 },
      { row: lastCell.row, col: lastCell.col + 1 }
    ].filter(({ row, col }) => 
      row >= 0 && row < maze.length && col >= 0 && col < maze.length
    );

    // Filter valid next moves based on pattern
    const validNextCells = adjacentCells.filter(({ row, col }) => {
      const currentValue = maze[row][col].value;
      
      switch (pattern) {
        case 'increment':
          return currentValue > lastValue;
        case 'alternate':
          return (lastValue % 2 === 0 && currentValue % 2 === 1) ||
                 (lastValue % 2 === 1 && currentValue % 2 === 0);
        case 'fibonacci':
          if (selectedPath.length === 0) {
            return currentValue === 1 || currentValue === 2;
          } else if (selectedPath.length === 1) {
            return currentValue === 1 || currentValue === 2;
          } else {
            const prevValue = maze[selectedPath[selectedPath.length - 2].row][selectedPath[selectedPath.length - 2].col].value;
            return currentValue === lastValue + prevValue;
          }
        default:
          return false;
      }
    });

    if (validNextCells.length > 0) {
      const nextCell = validNextCells[Math.floor(Math.random() * validNextCells.length)];
      const nextValue = maze[nextCell.row][nextCell.col].value;
      
      switch (pattern) {
        case 'increment':
          return `Look for a number greater than ${lastValue} in an adjacent cell.`;
        case 'alternate':
          return lastValue % 2 === 0 
            ? `Look for an odd number in an adjacent cell.`
            : `Look for an even number in an adjacent cell.`;
        case 'fibonacci':
          if (selectedPath.length === 0) {
            return "Start with either 1 or 2.";
          } else if (selectedPath.length === 1) {
            return "Next number should be either 1 or 2.";
          } else {
            const prevValue = maze[selectedPath[selectedPath.length - 2].row][selectedPath[selectedPath.length - 2].col].value;
            const expectedValue = lastValue + prevValue;
            return `Look for the number ${expectedValue} in an adjacent cell.`;
          }
        default:
          return `Try moving to the cell with value ${nextValue}`;
      }
    }

    // If no valid moves found, provide backtracking hint
    switch (pattern) {
      case 'increment':
        return "You've reached a dead end. Try backtracking to find a path with increasing numbers.";
      case 'alternate':
        return "You've reached a dead end. Try backtracking to maintain the even/odd pattern.";
      case 'fibonacci':
        return "You've reached a dead end. Try backtracking to maintain the Fibonacci sequence.";
      default:
        return "You might need to backtrack and try a different path.";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Number Maze - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
        <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
          <Info className="w-4 h-4 sm:w-5 sm:h-5" />
          <p>Pattern: {pattern.charAt(0).toUpperCase() + pattern.slice(1)}</p>
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
            <li>Start from the top-left corner</li>
            <li>Move to adjacent cells (up, down, left, right) following the pattern:
              <ul className="list-disc list-inside ml-4 mt-1 text-sm">
                <li>Easy: Numbers must increase</li>
                <li>Medium: Alternate between even and odd numbers</li>
                <li>Hard: Follow the Fibonacci sequence</li>
              </ul>
            </li>
            <li>Reach the bottom-right corner to win</li>
            <li>Click a cell in your path to backtrack</li>
          </ol>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
          >
            Got it!
          </button>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-md p-2 sm:p-4 md:p-6 mb-4 sm:mb-6 overflow-x-auto">
        <div className="grid gap-1 sm:gap-2 md:gap-3 min-w-fit">
          {maze.map((row, i) => (
            <div key={i} className="flex gap-1 justify-center sm:gap-2 md:gap-3">
              {row.map((cell, j) => (
                <button
                  key={`${i}-${j}`}
                  onClick={() => handleCellClick(i, j)}
                  className={`w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center text-sm sm:text-base md:text-lg rounded-lg transition-colors
                    ${cell.isStart ? 'bg-green-100 border-2 border-green-500' :
                      cell.isEnd ? 'bg-red-100 border-2 border-red-500' :
                      cell.isPath ? 'bg-blue-100 border-2 border-blue-500' :
                      'bg-gray-50 border-2 border-gray-200 hover:border-blue-300'}`}
                >
                  <span className={`${cell.isPath ? 'text-blue-700 font-bold' : 'text-gray-700'}`}>
                    {cell.value}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-700 text-sm sm:text-base rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          onClick={() => generateMaze(difficulty)}
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
          className="bg-purple-50 p-3 sm:p-4 md:p-6 rounded-lg mb-4 sm:mb-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1" />
            <p className="text-sm sm:text-base text-purple-700">{getHint()}</p>
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">You`&apos;`ve solved the number maze!</p>
              <button
                onClick={() => {
                  setIsComplete(false);
                  generateMaze(difficulty);
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Check the pattern and try again!</p>
              <button
                onClick={() => setIsIncorrect(false)}
                className="px-4 sm:px-6 py-2 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600 transition-colors"
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

export default function NumberMazePage() {
  const router = useRouter()
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Number Maze Puzzle</h1>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-wrap gap-2 sm:gap-3 justify-center">
          {(['easy', 'medium'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg capitalize text-sm sm:text-base transition-colors ${
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

        <NumberMaze difficulty={difficulty} />
      </div>
    </div>
  );
}
