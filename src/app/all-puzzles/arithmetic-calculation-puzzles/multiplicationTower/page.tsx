'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft, Building2 } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface TowerBlock {
  multiplicand: number;
  multiplier: number;
  answer: number | null;
  isCorrect: boolean | null;
}

interface MultiplicationTower {
  blocks: TowerBlock[];
  timeLimit: number;
  hint: string;
}

const generateTower = (difficulty: Difficulty): MultiplicationTower => {
  const getBlockCount = () => {
    switch (difficulty) {
      case 'easy': return 5;
      case 'medium': return 7;
      case 'hard': return 9;
    }
  };

  const getNumberRange = () => {
    switch (difficulty) {
      case 'easy': return { min: 2, max: 5 };
      case 'medium': return { min: 3, max: 9 };
      case 'hard': return { min: 6, max: 12 };
    }
  };

  const blockCount = getBlockCount();
  const range = getNumberRange();
  const blocks: TowerBlock[] = [];

  for (let i = 0; i < blockCount; i++) {
    const multiplicand = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    const multiplier = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    blocks.push({
      multiplicand,
      multiplier,
      answer: null,
      isCorrect: null
    });
  }

  const hint = difficulty === 'easy'
    ? 'Start with the basic multiplication tables you know best!'
    : difficulty === 'medium'
    ? 'Break down larger numbers into smaller ones you know'
    : 'Use multiplication tricks like doubling and halving';

  const timeLimit = difficulty === 'easy' ? 120 : difficulty === 'medium' ? 180 : 240;

  return { blocks, timeLimit, hint };
};

const MultiplicationTower: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [tower, setTower] = useState<MultiplicationTower | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [results, setResults] = useState<{ correct: number; wrong: number } | null>(null);

  const generateNewTower = useCallback(() => {
    const newTower = generateTower(difficulty);
    setTower(newTower);
    setTimeLeft(newTower.timeLimit);
    setAnswers(new Array(newTower.blocks.length).fill(null));
    setResults(null);
    setIsComplete(false);
    setIsIncorrect(false);
  }, [difficulty]);

  useEffect(() => {
    generateNewTower();
  }, [generateNewTower]);

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

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value === '' ? null : parseInt(value);
    setAnswers(newAnswers);
  };

  const handleCheckAllAnswers = () => {
    if (!tower) return;

    let correct = 0;
    let wrong = 0;

    answers.forEach((answer, index) => {
      if (answer === null) {
        wrong++;
        return;
      }
      const correctAnswer = tower.blocks[index].multiplicand * tower.blocks[index].multiplier;
      if (answer === correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    setResults({ correct, wrong });
    if (wrong === 0) {
      setIsComplete(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center sm:text-left">
          Multiplication Tower - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base text-red-600">Time Left: {timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <span className="text-sm sm:text-base text-green-600">Score: {results ? results.correct : 0}/{tower?.blocks.length}</span>
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
            <li>Solve each multiplication problem in the tower</li>
            <li>Enter your answers in any order</li>
            <li>Check your answers when ready</li>
            <li>Complete all problems before time runs out</li>
            <li>Get all answers correct to win!</li>
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
        {tower && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              {tower.blocks.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    w-full p-3 sm:p-4 rounded-lg flex items-center justify-between
                    ${results ? 
                      answers[index] === block.multiplicand * block.multiplier
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                      : 'bg-gray-50 border border-gray-200'}
                  `}
                >
                  <span className="text-lg sm:text-xl font-semibold">
                    {block.multiplicand} × {block.multiplier} =
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={answers[index] === null ? '' : answers[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      placeholder="?"
                      className="w-20 px-2 py-1 text-lg font-semibold text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={results !== null}
                    />
                    {results && (
                      <span className="text-xl">
                        {answers[index] === block.multiplicand * block.multiplier ? '✅' : '❌'}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col xs:flex-row gap-2 sm:gap-4 justify-center">
        <button
          onClick={handleCheckAllAnswers}
          disabled={answers.some(a => a === null) || results !== null}
          className={`
            flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg w-full xs:w-auto
            ${answers.some(a => a === null) || results !== null
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors'}
          `}
        >
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
          Check Answers
        </button>
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 text-purple-700 text-sm sm:text-base rounded-lg hover:bg-purple-200 transition-colors w-full xs:w-auto"
        >
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          onClick={generateNewTower}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors w-full xs:w-auto"
        >
          <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Tower
        </button>
      </div>

      {showHint && tower && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-purple-50 p-3 sm:p-4 rounded-lg mt-4 sm:mt-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1" />
            <p className="text-sm sm:text-base text-purple-700">{tower.hint}</p>
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
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Tower Complete!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You solved all {tower?.blocks.length} multiplication problems!
              </p>
              <button
                onClick={generateNewTower}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                Build Another Tower
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
                {timeLeft === 0 ? "Time's Up!" : "Keep Building!"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Practice your multiplication tables and try again!
              </p>
              <button
                onClick={() => {
                  setIsIncorrect(false);
                  generateNewTower();
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

export default function MultiplicationTowerPage() {
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
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Multiplication Tower</h1>
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

        <MultiplicationTower difficulty={difficulty} />
      </div>
    </div>
  );
}
