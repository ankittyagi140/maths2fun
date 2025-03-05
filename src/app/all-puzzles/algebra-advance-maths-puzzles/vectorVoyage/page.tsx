'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Vector {
  x: number;
  y: number;
}

interface GridCell {
  type: 'empty' | 'start' | 'end' | 'obstacle' | 'path';
  vector?: Vector;
}

interface VectorPuzzle {
  grid: GridCell[][];
  start: Vector;
  end: Vector;
  availableVectors: Vector[];
  hint: string;
  maxMoves: number;
}

const generateVectorPuzzle = (difficulty: Difficulty): VectorPuzzle => {
  const size = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 9;
  const grid: GridCell[][] = Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => ({ type: 'empty' }))
  );

  // Generate start and end positions
  const start = {
    x: Math.floor(Math.random() * (size - 2)) + 1,
    y: Math.floor(Math.random() * (size - 2)) + 1
  };
  let end;
  do {
    end = {
      x: Math.floor(Math.random() * (size - 2)) + 1,
      y: Math.floor(Math.random() * (size - 2)) + 1
    };
  } while (end.x === start.x && end.y === start.y);

  // Set start and end points
  grid[start.y][start.x] = { type: 'start' };
  grid[end.y][end.x] = { type: 'end' };

  // Add obstacles based on difficulty
  const obstacleCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 8;
  for (let i = 0; i < obstacleCount; i++) {
    let ox, oy;
    do {
      ox = Math.floor(Math.random() * (size - 2)) + 1;
      oy = Math.floor(Math.random() * (size - 2)) + 1;
    } while (
      (ox === start.x && oy === start.y) ||
      (ox === end.x && oy === end.y) ||
      grid[oy][ox].type !== 'empty'
    );
    grid[oy][ox] = { type: 'obstacle' };
  }

  // Generate available vectors based on difficulty
  let availableVectors: Vector[];
  switch (difficulty) {
    case 'easy':
      availableVectors = [
        { x: 1, y: 0 }, { x: -1, y: 0 }, // Right, Left
        { x: 0, y: 1 }, { x: 0, y: -1 }  // Down, Up
      ];
      break;
    case 'medium':
      availableVectors = [
        { x: 1, y: 0 }, { x: -1, y: 0 },
        { x: 0, y: 1 }, { x: 0, y: -1 },
        { x: 1, y: 1 }, { x: -1, y: -1 }  // Diagonals
      ];
      break;
    case 'hard':
      availableVectors = [
        { x: 1, y: 0 }, { x: -1, y: 0 },
        { x: 0, y: 1 }, { x: 0, y: -1 },
        { x: 1, y: 1 }, { x: -1, y: -1 },
        { x: 2, y: 0 }, { x: 0, y: 2 }    // Double steps
      ];
      break;
  }

  return {
    grid,
    start,
    end,
    availableVectors,
    hint: getHintForDifficulty(difficulty),
    maxMoves: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 12
  };
};

const getHintForDifficulty = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'Use basic vectors (up, down, left, right) to reach the target';
    case 'medium':
      return 'Diagonal movements are available. Plan your path carefully!';
    case 'hard':
      return 'Use double-step vectors to reach the target in fewer moves';
    default:
      return 'Navigate to the target using vector movements';
  }
};

const VectorVoyage: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [puzzle, setPuzzle] = useState<VectorPuzzle | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Vector | null>(null);
  const [path, setPath] = useState<Vector[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [movesLeft, setMovesLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const generatePuzzle = useCallback(() => {
    const newPuzzle = generateVectorPuzzle(difficulty);
    setPuzzle(newPuzzle);
    setCurrentPosition(newPuzzle.start);
    setPath([newPuzzle.start]);
    setMovesLeft(newPuzzle.maxMoves);
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

  const handleVectorClick = (vector: Vector) => {
    if (!currentPosition || !puzzle || movesLeft <= 0) return;

    const newPosition = {
      x: currentPosition.x + vector.x,
      y: currentPosition.y + vector.y
    };

    // Check if move is valid
    if (
      newPosition.x < 0 || newPosition.x >= puzzle.grid[0].length ||
      newPosition.y < 0 || newPosition.y >= puzzle.grid.length ||
      puzzle.grid[newPosition.y][newPosition.x].type === 'obstacle'
    ) {
      setIsIncorrect(true);
      return;
    }

    // Update position and path
    setCurrentPosition(newPosition);
    setPath([...path, newPosition]);
    setMovesLeft(prev => prev - 1);

    // Check if target reached
    if (newPosition.x === puzzle.end.x && newPosition.y === puzzle.end.y) {
      setIsComplete(true);
    } else if (movesLeft <= 1) {
      setIsIncorrect(true);
    }
  };

  const getVectorArrow = (vector: Vector) => {
    if (vector.x === 1 && vector.y === 0) return <ArrowRight />;
    if (vector.x === -1 && vector.y === 0) return <ArrowLeft />;
    if (vector.x === 0 && vector.y === 1) return <ArrowDown />;
    if (vector.x === 0 && vector.y === -1) return <ArrowUp />;
    return `(${vector.x},${vector.y})`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center sm:text-left">Vector Voyage - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className='text-sm sm:text-base text-red-600'>Time Left: {timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Moves Left: {movesLeft}</span>
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
            <li>Use vector movements to navigate from start (🟢) to end (🎯)</li>
            <li>Click vector buttons to move in that direction</li>
            <li>Avoid obstacles (⬛)</li>
            <li>Reach the target within the move limit</li>
            <li>Complete before time runs out</li>
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
        <div className="grid gap-0.5 sm:gap-1 mb-4 sm:mb-6 justify-center">
          {puzzle?.grid.map((row, i) => (
            <div key={i} className="flex justify-center gap-0.5 sm:gap-1">
              {row.map((cell, j) => (
                <div
                  key={j}
                  className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg text-sm sm:text-base
                    ${cell.type === 'obstacle' ? 'bg-gray-800' : 'bg-gray-100'}
                    ${cell.type === 'start' ? 'bg-green-500' : ''}
                    ${cell.type === 'end' ? 'bg-red-500' : ''}
                    ${path.some(p => p.x === j && p.y === i) ? 'bg-blue-200' : ''}`}
                >
                  {cell.type === 'start' && '🟢'}
                  {cell.type === 'end' && '🎯'}
                  {cell.type === 'obstacle' && '⬛'}
                  {currentPosition?.x === j && currentPosition?.y === i && '📍'}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xs sm:max-w-sm mx-auto">
          {puzzle?.availableVectors.map((vector, index) => (
            <button
              key={index}
              onClick={() => handleVectorClick(vector)}
              disabled={isComplete || isIncorrect || movesLeft <= 0}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base transition-colors
                ${isComplete || isIncorrect || movesLeft <= 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              {getVectorArrow(vector)}
            </button>
          ))}
        </div>
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
          onClick={generatePuzzle}
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
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Target Reached!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You completed the vector voyage in {puzzle?.maxMoves ? puzzle.maxMoves - movesLeft : 0} moves!
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
                {timeLeft === 0 ? "Time's Up!" : movesLeft <= 0 ? "Out of Moves!" : "Invalid Move!"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Try planning your route more carefully
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

export default function VectorVoyagePage() {
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Vector Voyage</h1>
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

        <VectorVoyage difficulty={difficulty} />
      </div>
    </div>
  );
}
