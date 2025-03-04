'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

interface MathCrosswordsProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Cell {
  value: string;
  isEditable: boolean;
  isCorrect: boolean;
  isHighlighted: boolean;
}

interface Clue {
  number: number;
  direction: 'across' | 'down';
  text: string;
  answer: string;
}

const MathCrosswords: React.FC<MathCrosswordsProps> = ({ difficulty }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [clues, setClues] = useState<Clue[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [currentClue, setCurrentClue] = useState<number>(1);

  const generatePuzzle = (difficulty: string) => {
    let size: number;
    let maxNumber: number;

    switch (difficulty) {
      case 'easy':
        size = 5;
        maxNumber = 12;
        break;
      case 'medium':
        size = 7;
        maxNumber = 24;
        break;
      case 'hard':
        size = 9;
        maxNumber = 60;
        break;
      default:
        size = 5;
        maxNumber = 12;
    }

    // Generate number-based clues
    const newClues: Clue[] = [];
    let clueNumber = 1;

    // Across clues
    for (let i = 0; i < size; i++) {
      const num1 = Math.floor(Math.random() * maxNumber) + 1;
      const num2 = Math.floor(Math.random() * maxNumber) + 1;
      const operation = Math.random() < 0.5 ? '+' : '-';
      let answer: string;
      let text: string;

      if (operation === '+') {
        answer = (num1 + num2).toString();
        text = `Add ${num1} and ${num2}`;
      } else {
        answer = (num1 - num2).toString();
        text = `Subtract ${num2} from ${num1}`;
      }
      
      newClues.push({
        number: clueNumber,
        direction: 'across',
        text: text,
        answer: answer
      });
      clueNumber++;
    }

    // Down clues
    for (let i = 0; i < size; i++) {
      const num1 = Math.floor(Math.random() * maxNumber) + 1;
      const num2 = Math.floor(Math.random() * maxNumber) + 1;
      const operation = Math.random() < 0.5 ? '+' : '-';
      let answer: string;
      let text: string;

      if (operation === '+') {
        answer = (num1 + num2).toString();
        text = `Add ${num1} and ${num2}`;
      } else {
        answer = (num1 - num2).toString();
        text = `Subtract ${num2} from ${num1}`;
      }
      
      newClues.push({
        number: clueNumber,
        direction: 'down',
        text: text,
        answer: answer
      });
      clueNumber++;
    }

    // Create grid
    const newGrid: Cell[][] = [];
    for (let i = 0; i < size; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < size; j++) {
        row.push({
          value: '',
          isEditable: true,
          isCorrect: false,
          isHighlighted: false
        });
      }
      newGrid.push(row);
    }

    setGrid(newGrid);
    setClues(newClues);
    setSelectedCell(null);
    setCurrentClue(1);
    setIsComplete(false);
    setIsIncorrect(false);
  };

  useEffect(() => {
    generatePuzzle(difficulty);
  }, [difficulty]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const newGrid = [...grid];

    if (event.key >= '0' && event.key <= '9') {
      // Only allow numbers
      newGrid[row][col].value = event.key;
      setGrid(newGrid);
    } else if (event.key === 'ArrowRight' && col < grid[0].length - 1) {
      setSelectedCell({ row, col: col + 1 });
    } else if (event.key === 'ArrowLeft' && col > 0) {
      setSelectedCell({ row, col: col - 1 });
    } else if (event.key === 'ArrowDown' && row < grid.length - 1) {
      setSelectedCell({ row: row + 1, col });
    } else if (event.key === 'ArrowUp' && row > 0) {
      setSelectedCell({ row: row - 1, col });
    } else if (event.key === 'Enter') {
      checkSolution();
    }
  };

  const checkSolution = () => {
    let allCorrect = true;
    const newGrid = [...grid];

    // Check across answers
    for (let i = 0; i < grid.length; i++) {
      const acrossAnswer = grid[i].map(cell => cell.value).join('');
      const clue = clues.find(c => c.direction === 'across' && c.number === i + 1);
      
      if (clue && acrossAnswer === clue.answer) {
        for (let j = 0; j < grid[i].length; j++) {
          newGrid[i][j].isCorrect = true;
        }
      } else if (acrossAnswer.length === clue?.answer.length) {
        // Only mark as incorrect if the answer length matches
        allCorrect = false;
        for (let j = 0; j < grid[i].length; j++) {
          newGrid[i][j].isCorrect = false;
        }
      }
    }

    // Check down answers
    for (let i = 0; i < grid[0].length; i++) {
      const downAnswer = grid.map(row => row[i].value).join('');
      const clue = clues.find(c => c.direction === 'down' && c.number === i + grid.length + 1);
      
      if (clue && downAnswer === clue.answer) {
        for (let j = 0; j < grid.length; j++) {
          newGrid[j][i].isCorrect = true;
        }
      } else if (downAnswer.length === clue?.answer.length) {
        // Only mark as incorrect if the answer length matches
        allCorrect = false;
        for (let j = 0; j < grid.length; j++) {
          newGrid[j][i].isCorrect = false;
        }
      }
    }

    setGrid(newGrid);

    // Only show incorrect message if all cells in a row/column are filled
    const hasCompleteAnswer = grid.some((row, i) => {
      const acrossComplete = row.every(cell => cell.value !== '');
      const downComplete = grid.every(r => r[i].value !== '');
      return acrossComplete || downComplete;
    });

    if (allCorrect) {
      setIsComplete(true);
      setIsIncorrect(false);
    } else if (hasCompleteAnswer) {
      setIsComplete(false);
      setIsIncorrect(true);
    }
  };

  const getHint = () => {
    const currentClueObj = clues.find(c => c.number === currentClue);
    if (!currentClueObj) return '';

    let hint = `Hint for ${currentClueObj.direction} ${currentClueObj.number}: ${currentClueObj.text}`;
    
    // Add calculation hint
    const [num1, num2] = currentClueObj.text.match(/(\d+) and (\d+)/)?.slice(1).map(Number) || [];
    if (num1 && num2) {
      if (currentClueObj.text.includes('Add')) {
        hint += `\nStart with ${num1} and add ${num2}`;
      } else {
        hint += `\nStart with ${num1} and subtract ${num2}`;
      }
    }

    return hint;
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Number Math Crosswords - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
      </div>

      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-3 sm:p-4 md:p-6 rounded-lg mb-4 sm:mb-6 shadow-sm"
        >
          <h3 className="font-bold mb-2 sm:mb-3 text-base sm:text-lg">How to Play:</h3>
          <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
            <li>Click on any cell to start entering your answer</li>
            <li>Use number keys to enter numbers</li>
            <li>Use arrow keys to navigate between cells</li>
            <li>Solve both across and down clues</li>
            <li>Use the hint button if you need help with a specific clue</li>
          </ol>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
          >
            Got it!
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6">
          <div className="grid gap-1 mb-4">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center">
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onKeyDown={handleKeyPress}
                    tabIndex={0}
                    className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border-2 text-lg sm:text-xl font-medium cursor-pointer
                      ${cell.isCorrect ? 'bg-green-100 border-green-500 text-green-700' : ''}
                      ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                      ${cell.isHighlighted ? 'bg-yellow-50' : ''}`}
                  >
                    {cell.value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6">
          <h3 className="font-bold mb-4 text-lg">Clues</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Across</h4>
              {clues
                .filter(clue => clue.direction === 'across')
                .map(clue => (
                  <div key={clue.number} className="mb-2">
                    <span className="font-medium">{clue.number}.</span> {clue.text}
                  </div>
                ))}
            </div>
            <div>
              <h4 className="font-semibold mb-2">Down</h4>
              {clues
                .filter(clue => clue.direction === 'down')
                .map(clue => (
                  <div key={clue.number} className="mb-2">
                    <span className="font-medium">{clue.number}.</span> {clue.text}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-700 text-sm sm:text-base rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          onClick={() => generatePuzzle(difficulty)}
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">You`&apos;`ve completed the crossword puzzle!</p>
              <button
                onClick={() => {
                  setIsComplete(false);
                  generatePuzzle(difficulty);
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Keep trying! Check your answers carefully.</p>
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

export default function MathCrosswordsPage() {
  const router = useRouter();
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Number Math Crosswords</h1>
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

        <MathCrosswords difficulty={difficulty} />
      </div>
    </div>
  );
}
