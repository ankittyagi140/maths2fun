'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Cell {
  letter: string;
  isSelected: boolean;
  isPartOfWord: boolean;
  wordIndex: number;
}

interface Word {
  text: string;
  found: boolean;
  hint: string;
}

const MathWordSearch: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const mathWords = {
    easy: [
      { text: 'ADD', hint: 'Combining numbers' },
      { text: 'SUM', hint: 'Result of addition' },
      { text: 'TEN', hint: 'Base of our number system' }
    ],
    medium: [
      { text: 'ANGLE', hint: 'Space between intersecting lines' },
      { text: 'PRIME', hint: 'Divisible only by 1 and itself' },
      { text: 'LOGIC', hint: 'Reasoning framework' }
    ],
    hard: [
      { text: 'FRACTION', hint: 'Represents part of a whole' },
      { text: 'EQUATION', hint: 'Mathematical equality statement' },
      { text: 'GEOMETRY', hint: 'Study of shapes and spaces' }
    ]
  };

  const generateGrid = useCallback(() => {
    let size: number;
    let wordList: Word[];
    
    switch(difficulty) {
      case 'easy':
        size = 5;
        wordList = mathWords.easy.map(w => ({ ...w, found: false }));
        break;
      case 'medium':
        size = 7;
        wordList = mathWords.medium.map(w => ({ ...w, found: false }));
        break;
      case 'hard':
        size = 9;
        wordList = mathWords.hard.map(w => ({ ...w, found: false }));
        break;
    }

    const newGrid: Cell[][] = Array(size).fill(null).map(() => 
      Array(size).fill(null).map(() => ({
        letter: '',
        isSelected: false,
        isPartOfWord: false,
        wordIndex: -1
      }))
    );

    // Place words in grid
    wordList.forEach((word, wordIndex) => {
      const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      let placed = false;
      
      while (!placed) {
        const startX = Math.floor(Math.random() * (size - (direction === 'horizontal' ? word.text.length : 0)));
        const startY = Math.floor(Math.random() * (size - (direction === 'vertical' ? word.text.length : 0)));
        
        let canPlace = true;
        for (let i = 0; i < word.text.length; i++) {
          const x = direction === 'horizontal' ? startX + i : startX;
          const y = direction === 'vertical' ? startY + i : startY;
          if (newGrid[x][y].letter !== '' && newGrid[x][y].letter !== word.text[i]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.text.length; i++) {
            const x = direction === 'horizontal' ? startX + i : startX;
            const y = direction === 'vertical' ? startY + i : startY;
            newGrid[x][y] = {
              letter: word.text[i],
              isSelected: false,
              isPartOfWord: true,
              wordIndex
            };
          }
          placed = true;
        }
      }
    });

    // Fill empty spaces with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!newGrid[i][j].letter) {
          newGrid[i][j].letter = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    setGrid(newGrid);
    setWords(wordList);
    setTimeLeft(difficulty === 'easy' ? 120 : difficulty === 'medium' ? 180 : 240);
    setIsComplete(false);
    setIsFailed(false);
  }, [difficulty, mathWords]);

  useEffect(() => {
    generateGrid();
  }, [difficulty, generateGrid]);

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsFailed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isComplete]);

  const handleCellClick = (row: number, col: number) => {
    if (isComplete || isFailed) return;
    
    const newSelected = [...selectedCells, { row, col }];
    setSelectedCells(newSelected);
    
    // Check if selected letters form a word
    const selectedWord = newSelected.map(c => grid[c.row][c.col].letter).join('');
    const foundWord = words.find(w => 
      !w.found && (w.text === selectedWord || w.text === selectedWord.split('').reverse().join(''))
    );

    if (foundWord) {
      const newWords = words.map(w => 
        w.text === foundWord.text ? { ...w, found: true } : w
      );
      setWords(newWords);
      
      const newGrid = grid.map(row => 
        row.map(cell => ({
          ...cell,
          isSelected: false
        }))
      );
      setGrid(newGrid);
      setSelectedCells([]);

      if (newWords.every(w => w.found)) {
        setIsComplete(true);
      }
    } else if (newSelected.length === Math.max(...words.map(w => w.text.length))) {
      // Clear selection if max word length reached without match
      setSelectedCells([]);
      const newGrid = grid.map(row => 
        row.map(cell => ({
          ...cell,
          isSelected: false
        }))
      );
      setGrid(newGrid);
    }
  };

  const getHint = () => {
    const unfoundWords = words.filter(w => !w.found);
    if (unfoundWords.length === 0) return "All words found!";
    
    const randomWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
    return `Hint: ${randomWord.hint} (${randomWord.text.length} letters)`;
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Math Word Search - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          
          <div className="flex items-center gap-2">
            <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Words Found: {words.filter(w => w.found).length}/{words.length}</span>
          </div>
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
          <h3 className="font-bold mb-2 sm:mb-3 text-base sm:text-lg">How to Play</h3>
          <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
            <li>Find hidden math-related words in the grid</li>
            <li>Words can be horizontal, vertical, or diagonal</li>
            <li>Click and drag to select letters</li>
            <li>Find all words before time runs out</li>
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

      <div className="bg-white rounded-xl shadow-md p-2 sm:p-4 md:p-6 mb-4 sm:mb-6">
        <div className="grid gap-1 overflow-x-auto">
          <div className="min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
            {grid.map((row, i) => (
              <div key={i} className="flex justify-center">
                {row.map((cell, j) => (
                  <div
                    key={j}
                    onClick={() => handleCellClick(i, j)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center border-2 cursor-pointer text-sm sm:text-base md:text-lg font-medium
                      ${cell.isSelected ? 'bg-blue-100 border-blue-500' : 'border-gray-200'}
                      ${cell.isPartOfWord && words[cell.wordIndex]?.found ? 'bg-green-100 border-green-500' : ''}
                      ${selectedCells.some(c => c.row === i && c.col === j) ? 'bg-blue-200 border-blue-600' : ''}`}
                  >
                    {cell.letter}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-700 text-sm sm:text-base rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
          {showHint ? 'Hide Hint' : 'Get Hint'}
        </button>
        <button
          onClick={generateGrid}
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">You`&apos;`ve found all the words!</p>
              <button
                onClick={generateGrid}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                Play Again
              </button>
            </motion.div>
            <Confetti recycle={false} numberOfPieces={500} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFailed && (
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
              <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Time`&apos;`s Up!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Try to find the words faster next time!</p>
              <button
                onClick={generateGrid}
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

export default function MathWordSearchPage() {
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
          <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8 ">
            <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Math Word Search</h1>
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

        <MathWordSearch difficulty={difficulty} />
      </div>
    </div>
  );
}