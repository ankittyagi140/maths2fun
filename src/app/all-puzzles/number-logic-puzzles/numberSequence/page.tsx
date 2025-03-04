'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

interface NumberSequenceProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Sequence {
  numbers: number[];
  answer: number;
  pattern: string;
  hint: string;
}

const NumberSequence: React.FC<NumberSequenceProps> = ({ difficulty }) => {
  const [sequence, setSequence] = useState<Sequence | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const generateSequence = (difficulty: string) => {
    let timeLimit: number;
    let maxNumber: number;
    let pattern: string;
    let numbers: number[];
    let answer: number;
    let hint: string;

    switch (difficulty) {
      case 'easy':
        timeLimit = 60;
        maxNumber = 20;
        // More variety in easy patterns
        const easyPattern = Math.floor(Math.random() * 4);
        switch (easyPattern) {
          case 0:
            // Simple addition
            const addDiff = Math.floor(Math.random() * 3) + 1;
            numbers = [Math.floor(Math.random() * maxNumber)];
            for (let i = 1; i < 4; i++) {
              numbers.push(numbers[i - 1] + addDiff);
            }
            answer = numbers[3] + addDiff;
            pattern = `Add ${addDiff}`;
            hint = `Look at the difference between consecutive numbers`;
            break;
          case 1:
            // Simple subtraction
            const subDiff = Math.floor(Math.random() * 3) + 1;
            numbers = [Math.floor(Math.random() * maxNumber) + 15];
            for (let i = 1; i < 4; i++) {
              numbers.push(numbers[i - 1] - subDiff);
            }
            answer = numbers[3] - subDiff;
            pattern = `Subtract ${subDiff}`;
            hint = `Look at the difference between consecutive numbers`;
            break;
          case 2:
            // Even numbers
            const evenStart = Math.floor(Math.random() * 5) * 2;
            numbers = [evenStart, evenStart + 2, evenStart + 4, evenStart + 6];
            answer = evenStart + 8;
            pattern = 'Add 2 (Even numbers)';
            hint = 'Look for even numbers in sequence';
            break;
          case 3:
            // Odd numbers
            const oddStart = Math.floor(Math.random() * 5) * 2 + 1;
            numbers = [oddStart, oddStart + 2, oddStart + 4, oddStart + 6];
            answer = oddStart + 8;
            pattern = 'Add 2 (Odd numbers)';
            hint = 'Look for odd numbers in sequence';
            break;
          default:
            numbers = [1, 2, 3, 4];
            answer = 5;
            pattern = 'Add 1';
            hint = 'Simple addition pattern';
        }
        break;

      case 'medium':
        timeLimit = 90;
        maxNumber = 50;
        // More complex patterns for medium
        const mediumPattern = Math.floor(Math.random() * 4);
        switch (mediumPattern) {
          case 0:
            // Multiplication
            const multFactor = Math.floor(Math.random() * 2) + 2;
            numbers = [Math.floor(Math.random() * 5) + 1];
            for (let i = 1; i < 4; i++) {
              numbers.push(numbers[i - 1] * multFactor);
            }
            answer = numbers[3] * multFactor;
            pattern = `Multiply by ${multFactor}`;
            hint = `Each number is ${multFactor} times the previous number`;
            break;
          case 1:
            // Division (only use numbers that divide evenly)
            const divFactor = Math.floor(Math.random() * 2) + 2;
            const startNum = Math.floor(Math.random() * 40) + 20;
            // Ensure the starting number is divisible by the factor
            numbers = [startNum - (startNum % divFactor)];
            for (let i = 1; i < 4; i++) {
              numbers.push(Math.round(numbers[i - 1] / divFactor));
            }
            answer = Math.round(numbers[3] / divFactor);
            pattern = `Divide by ${divFactor}`;
            hint = `Each number is divided by ${divFactor}`;
            break;
          case 2:
            // Square numbers
            const squareStart = Math.floor(Math.random() * 3) + 1;
            numbers = [squareStart, squareStart * squareStart, squareStart * squareStart * squareStart];
            answer = squareStart * squareStart * squareStart * squareStart;
            pattern = 'Square numbers';
            hint = 'Each number is the square of the previous number';
            break;
          case 3:
            // Add increasing numbers
            const start = Math.floor(Math.random() * 5) + 1;
            numbers = [start];
            for (let i = 1; i < 4; i++) {
              numbers.push(numbers[i - 1] + i + 1);
            }
            answer = numbers[3] + 5;
            pattern = 'Add increasing numbers';
            hint = 'The amount added increases by 1 each time';
            break;
          default:
            numbers = [2, 4, 8, 16];
            answer = 32;
            pattern = 'Multiply by 2';
            hint = 'Each number is doubled';
        }
        break;

      case 'hard':
        timeLimit = 120;
        maxNumber = 100;
        // Complex patterns for hard
        const hardPattern = Math.floor(Math.random() * 5);
        switch (hardPattern) {
          case 0:
            // Alternating operations
            const add = Math.floor(Math.random() * 3) + 1;
            const mult = Math.floor(Math.random() * 2) + 2;
            numbers = [Math.floor(Math.random() * 5) + 1];
            for (let i = 1; i < 4; i++) {
              numbers.push(i % 2 === 0 ? numbers[i - 1] + add : numbers[i - 1] * mult);
            }
            answer = numbers[3] + add;
            pattern = `Alternate: Add ${add}, Multiply by ${mult}`;
            hint = 'Look for alternating patterns between operations';
            break;
          case 1:
            // Fibonacci-like sequence
            numbers = [1, 2];
            for (let i = 2; i < 4; i++) {
              numbers.push(numbers[i - 1] + numbers[i - 2]);
            }
            answer = numbers[3] + numbers[2];
            pattern = 'Add previous two numbers';
            hint = 'Each number is the sum of the previous two numbers';
            break;
          case 2:
            // Cube numbers
            const cubeStart = Math.floor(Math.random() * 2) + 1;
            numbers = [cubeStart, cubeStart * cubeStart, cubeStart * cubeStart * cubeStart];
            answer = cubeStart * cubeStart * cubeStart * cubeStart;
            pattern = 'Cube numbers';
            hint = 'Each number is the cube of the previous number';
            break;
          case 3:
            // Prime numbers
            const primes = [2, 3, 5, 7, 11, 13, 17, 19];
            const startIndex = Math.floor(Math.random() * (primes.length - 4));
            numbers = primes.slice(startIndex, startIndex + 4);
            answer = primes[startIndex + 4];
            pattern = 'Prime numbers';
            hint = 'Look for prime numbers in sequence';
            break;
          case 4:
            // Triangular numbers
            const triStart = Math.floor(Math.random() * 3) + 1;
            numbers = [
              triStart,
              triStart + (triStart + 1),
              triStart + (triStart + 1) + (triStart + 2),
              triStart + (triStart + 1) + (triStart + 2) + (triStart + 3)
            ];
            answer = numbers[3] + (triStart + 4);
            pattern = 'Triangular numbers';
            hint = 'Each number adds the next integer in sequence';
            break;
          default:
            numbers = [2, 6, 12, 20];
            answer = 30;
            pattern = 'Add increasing even numbers';
            hint = 'Add 4, then 6, then 8, then 10';
        }
        break;

      default:
        timeLimit = 60;
        maxNumber = 20;
        numbers = [1, 2, 3, 4];
        answer = 5;
        pattern = 'Add 1';
        hint = 'Simple addition pattern';
    }

    setSequence({ numbers, answer, pattern, hint });
    setUserAnswer('');
    setTimeLeft(timeLimit);
    setIsComplete(false);
    setIsIncorrect(false);
  };

  useEffect(() => {
    generateSequence(difficulty);
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

  const handleSubmit = () => {
    const numAnswer = parseInt(userAnswer);
    if (!isNaN(numAnswer) && numAnswer === sequence?.answer) {
      setIsComplete(true);
      setIsIncorrect(false);
    } else {
      setIsIncorrect(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow numbers and negative sign
    const value = e.target.value.replace(/[^0-9-]/g, '');
    // Only allow one negative sign at the start
    if (value.startsWith('-') || !value.includes('-')) {
      setUserAnswer(value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Number Sequence - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
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
            <li>Look at the sequence of numbers</li>
            <li>Identify the pattern between numbers</li>
            <li>Enter the next number in the sequence</li>
            <li>Use hints if you need help</li>
            <li>Complete before time runs out!</li>
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
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          {sequence?.numbers.map((num, index) => (
            <div
              key={index}
              className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border-2 border-gray-200 rounded-lg text-xl sm:text-2xl font-bold"
            >
              {num}
            </div>
          ))}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border-2 border-blue-500 rounded-lg">
            <input
              type="text"
              inputMode="numeric"
              value={userAnswer}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full h-full text-center text-xl sm:text-2xl font-bold focus:outline-none"
              placeholder="?"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            Check Answer
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
          onClick={() => generateSequence(difficulty)}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Puzzle
        </button>
      </div>

      {showHint && sequence && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-purple-50 p-3 sm:p-4 md:p-6 rounded-lg mt-4 sm:mt-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1" />
            <p className="text-sm sm:text-base text-purple-700">{sequence.hint}</p>
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">You found the correct pattern!</p>
              <button
                onClick={() => {
                  setIsComplete(false);
                  generateSequence(difficulty);
                }}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                New Puzzle
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
              <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Not Quite Right</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {timeLeft === 0 ? "Time's up! Try again!" : "Keep looking for the pattern!"}
              </p>
              <button
                onClick={() => {
                  setIsIncorrect(false);
                  if (timeLeft === 0) {
                    generateSequence(difficulty);
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

export default function NumberSequencePage() {
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Number Sequence</h1>
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

        <NumberSequence difficulty={difficulty} />
      </div>
    </div>
  );
}
