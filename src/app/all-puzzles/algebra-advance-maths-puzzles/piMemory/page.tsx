'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, Clock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type Difficulty = 'easy' | 'medium' | 'hard';

interface PiChallenge {
  digits: string;
  timeLimit: number;
  requiredLength: number;
  hint: string;
}

const PI_DIGITS = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067";

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generatePiChallenge = (difficulty: Difficulty): PiChallenge => {
  let randomLength: number;
  let timeLimit: number;
//   let hint: string;

  switch (difficulty) {
    case 'easy':
      randomLength = getRandomInt(2, 10);
      timeLimit = 20 + randomLength * 2; // Dynamic time based on length
    //   hint = `Break it into chunks: ${PI_DIGITS.slice(0, 4)} | ${PI_DIGITS.slice(4, randomLength + 2)}`;
      break;
    case 'medium':
      randomLength = getRandomInt(10, 15);
      timeLimit = 30 + randomLength * 2;
    //   hint = 'Try grouping digits in sets of 3 or 4 for easier memorization';
      break;
    case 'hard':
      randomLength = getRandomInt(15, 20);
      timeLimit = 40 + randomLength * 2;
    //   hint = 'Create a story or pattern with the numbers to help remember them';
      break;
  }

  const digits = PI_DIGITS.slice(0, randomLength + 2); // +2 to include "3."
  
  // Generate a more specific hint based on the actual digits
  const generateSpecificHint = (digits: string): string => {
    const groups = [];
    let currentIndex = 0;
    while (currentIndex < digits.length) {
      if (currentIndex === 0) {
        groups.push(digits.slice(0, 4)); // "3.14"
        currentIndex = 4;
      } else {
        const groupSize = Math.min(4, digits.length - currentIndex);
        groups.push(digits.slice(currentIndex, currentIndex + groupSize));
        currentIndex += groupSize;
      }
    }
    return `Try this pattern: ${groups.join(' | ')}`;
  };

  return {
    digits,
    timeLimit,
    requiredLength: digits.length,
    hint: generateSpecificHint(digits)
  };
};

const PiMemory: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const [challenge, setChallenge] = useState<PiChallenge | null>(null);
  const [userInput, setUserInput] = useState('');
  const [showDigits, setShowDigits] = useState(true);
  const [memorizationPhase, setMemorizationPhase] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  useEffect(() => {
    generateNewChallenge();
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft > 0 && memorizationPhase) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setMemorizationPhase(false);
            setShowDigits(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, memorizationPhase]);

  const generateNewChallenge = () => {
    const newChallenge = generatePiChallenge(difficulty);
    setChallenge(newChallenge);
    setUserInput('');
    setTimeLeft(newChallenge.timeLimit);
    setMemorizationPhase(true);
    setShowDigits(true);
    setIsComplete(false);
    setIsIncorrect(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= (challenge?.requiredLength || 0)) {
      setUserInput(value);
    }
  };

  const checkAnswer = () => {
    if (!challenge) return;

    if (userInput === challenge.digits) {
      setIsComplete(true);
    } else {
      setIsIncorrect(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center sm:text-left">
          Pi Memory Challenge - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
          {memorizationPhase && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className='text-sm sm:text-base text-red-600'>Memorization Time: {timeLeft}s</span>
            </div>
          )}
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
            <li>Memorize the displayed digits of Pi within the time limit</li>
            <li>Once the time is up, the digits will disappear</li>
            <li>Enter the digits you memorized, including the decimal point</li>
            <li>Submit your answer to check if it matches</li>
            <li>Use hints if you need help with memorization techniques!</li>
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
        {challenge && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {memorizationPhase ? 'Memorize these digits:' : 'Enter the digits you memorized:'}
              </h3>
              {memorizationPhase ? (
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 font-mono tracking-wider">
                  {showDigits ? challenge.digits : '•'.repeat(challenge.digits.length)}
                </div>
              ) : (
                <div className="max-w-sm mx-auto">
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Enter Pi digits..."
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg font-mono"
                    maxLength={challenge.requiredLength}
                  />
                  <button
                    onClick={checkAnswer}
                    className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Check Answer
                  </button>
                </div>
              )}
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
        {memorizationPhase && (
          <button
            onClick={() => setShowDigits(!showDigits)}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showDigits ? (
              <>
                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                Hide Digits
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                Show Digits
              </>
            )}
          </button>
        )}
        <button
          onClick={generateNewChallenge}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 text-sm sm:text-base rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
          New Challenge
        </button>
      </div>

      {showHint && challenge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-purple-50 p-3 sm:p-4 md:p-6 rounded-lg mt-4 sm:mt-6 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mt-1" />
            <p className="text-sm sm:text-base text-purple-700">{challenge.hint}</p>
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
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Perfect Memory!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You successfully memorized {challenge?.requiredLength} digits of Pi!
              </p>
              <button
                onClick={generateNewChallenge}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
              >
                Try Another Challenge
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
                The correct digits were: {challenge?.digits}
              </p>
              <button
                onClick={() => {
                  setIsIncorrect(false);
                  generateNewChallenge();
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

export default function PiMemoryPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Pi Memory Challenge</h1>
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

        <PiMemory difficulty={difficulty} />
      </div>
    </div>
  );
}
