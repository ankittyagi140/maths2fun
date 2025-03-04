'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Lightbulb, Trophy, XCircle, ArrowLeft } from 'lucide-react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

interface DivisibilityProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Rule {
  value: number;
  label: string;
  isSelected: boolean;
}

const DivisibilityChallenge: React.FC<DivisibilityProps> = ({ difficulty }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [targetSum, setTargetSum] = useState<number>(0);

  const generatePuzzle = (difficulty: string) => {
    let size: number;
    let maxNumber: number;
    let ruleCount: number;

    switch (difficulty) {
      case 'easy':
        size = 4;
        maxNumber = 50;
        ruleCount = 2;
        break;
      case 'medium':
        size = 5;
        maxNumber = 100;
        ruleCount = 3;
        break;
      case 'hard':
        size = 6;
        maxNumber = 150;
        ruleCount = 4;
        break;
      default:
        size = 4;
        maxNumber = 50;
        ruleCount = 2;
    }

    // Generate rules based on difficulty
    const possibleRules = [
      { value: 2, label: 'Even numbers' },
      { value: 3, label: 'Sum of digits divisible by 3' },
      { value: 4, label: 'Last two digits divisible by 4' },
      { value: 5, label: 'Ends with 0 or 5' },
      { value: 6, label: 'Even and sum of digits divisible by 3' },
      { value: 8, label: 'Last three digits divisible by 8' },
      { value: 9, label: 'Sum of digits divisible by 9' }
    ];

    // Shuffle and select rules
    const shuffledRules = [...possibleRules].sort(() => Math.random() - 0.5);
    const selectedRules = shuffledRules.slice(0, ruleCount).map(rule => ({
      ...rule,
      isSelected: false
    }));

    // Generate numbers that follow the rules
    const generatedNumbers: number[] = [];
    const maxAttempts = 1000;
    let attempts = 0;

    // Generate numbers that follow the rules
    while (generatedNumbers.length < size * size && attempts < maxAttempts) {
      const num = Math.floor(Math.random() * maxNumber) + 1;
      
      // Check if number follows any of the selected rules
      const followsRule = selectedRules.some(rule => {
        switch (rule.value) {
          case 2: return num % 2 === 0;
          case 3: return (num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)) % 3 === 0;
          case 4: return num % 4 === 0;
          case 5: return num % 5 === 0;
          case 6: return num % 6 === 0;
          case 8: return num % 8 === 0;
          case 9: return (num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)) % 9 === 0;
          default: return false;
        }
      });

      if (followsRule && !generatedNumbers.includes(num)) {
        generatedNumbers.push(num);
      }
      attempts++;
    }

    // Calculate target sum (sum of digits of selected numbers)
    const target = Math.floor(Math.random() * 20) + 10; // Random target between 10 and 30

    // Shuffle the final array
    const shuffledNumbers = [...generatedNumbers].sort(() => Math.random() - 0.5);

    setNumbers(shuffledNumbers);
    setRules(selectedRules);
    setSelectedNumbers([]);
    setTargetSum(target);
    setIsComplete(false);
    setIsIncorrect(false);
  };

  useEffect(() => {
    generatePuzzle(difficulty);
  }, [difficulty]);

  const handleNumberClick = (number: number) => {
    setSelectedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      }
      if (prev.length < rules.length) {
        const newSelection = [...prev, number];
        checkSolution(newSelection);
        return newSelection;
      }
      return prev;
    });
  };

  const handleRuleClick = (index: number) => {
    setRules(prev => {
      const newRules = [...prev];
      newRules[index].isSelected = !newRules[index].isSelected;
      return newRules;
    });
  };

  const checkSolution = (currentSelection: number[]) => {
    if (currentSelection.length !== rules.length) {
      return;
    }

    // Calculate sum of digits of selected numbers
    const sumOfDigits = currentSelection.reduce((sum, num) => {
      return sum + num.toString().split('').reduce((digitSum, digit) => digitSum + parseInt(digit), 0);
    }, 0);

    if (sumOfDigits === targetSum) {
      setIsComplete(true);
      setIsIncorrect(false);
    } else {
      setIsComplete(false);
      setIsIncorrect(true);
    }
  };

  const getHint = () => {
    if (selectedNumbers.length === 0) {
      return `Try to find numbers whose digits sum up to ${targetSum}.`;
    }

    const currentSum = selectedNumbers.reduce((sum, num) => {
      return sum + num.toString().split('').reduce((digitSum, digit) => digitSum + parseInt(digit), 0);
    }, 0);

    if (currentSum < targetSum) {
      return `Current sum of digits is ${currentSum}. Look for a number that would add up to ${targetSum}.`;
    } else if (currentSum > targetSum) {
      return `Current sum of digits (${currentSum}) is too high. Try selecting different numbers.`;
    }

    return "You're getting closer! Keep trying different combinations.";
  };

  return (
    <div className="max-w-2xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Number Rules Challenge - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
        <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
          <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />
          <p>Target Sum of Digits: {targetSum}</p>
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
            <li>Select numbers that follow the given rules</li>
            <li>The sum of digits of selected numbers should equal the target</li>
            <li>You need to select exactly {rules.length} numbers</li>
            <li>Click a selected number to deselect it</li>
            <li>Use the hint button if you need help</li>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
          {rules.map((rule, index) => (
            <button
              key={index}
              onClick={() => handleRuleClick(index)}
              className={`p-2 rounded-lg text-sm sm:text-base transition-colors ${
                rule.isSelected
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                  : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              {rule.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {numbers.map((number, index) => (
            <button
              key={index}
              onClick={() => handleNumberClick(number)}
              className={`p-4 rounded-lg text-lg sm:text-xl font-medium transition-colors ${
                selectedNumbers.includes(number)
                  ? 'bg-green-100 text-green-700 border-2 border-green-500'
                  : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              {number}
            </button>
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">You`&apos;`ve found the correct number combination!</p>
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Try a different combination of numbers!</p>
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

export default function DivisibilityChallengePage() {
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Divisibility Challenge</h1>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-wrap gap-2 sm:gap-3 justify-center">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
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

        <DivisibilityChallenge difficulty={difficulty} />
      </div>
    </div>
  );
}
