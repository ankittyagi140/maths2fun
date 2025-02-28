'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Puzzle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { allRiddles } from '@/lib/allRiddles';
import { Riddle } from '@/lib/allRiddles';



const MATH_RIDDLES = allRiddles;
  

export default function RiddlesPage() {
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({});
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | Riddle['difficulty']>('all');

  const filteredRiddles = MATH_RIDDLES.filter(riddle => 
    difficultyFilter === 'all' ? true : riddle.difficulty === difficultyFilter
  );

  const toggleHint = (index: number) => {
    setShowHints(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAnswer = (index: number) => {
    setShowAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getDifficultyColor = (difficulty: Riddle['difficulty']) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-end mb-8">
          {/* <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Puzzles
          </Link> */}
          <div className="flex items-center gap-2">
            <Puzzle className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Math Riddles</h1>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setDifficultyFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              difficultyFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            All ({MATH_RIDDLES.length})
          </button>
          {['easy', 'medium', 'hard'].map(diff => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff as Riddle['difficulty'])}
              className={`px-4 py-2 rounded-lg capitalize ${
                difficultyFilter === diff
                  ? `${getDifficultyColor(diff as Riddle['difficulty'])} font-bold`
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {diff} ({MATH_RIDDLES.filter(r => r.difficulty === diff).length})
            </button>
          ))}
        </div>

        {/* Riddles Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {filteredRiddles.map((riddle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`${getDifficultyColor(riddle.difficulty)} px-3 py-1 rounded-full text-sm`}>
                      {riddle.difficulty}
                    </span>
                  </div>
                  <p className="text-lg font-medium text-gray-800 mb-4">
                    {riddle.question}
                  </p>
                  
                  {/* Hint Section */}
                  <div className="mb-4">
                    <button
                      onClick={() => toggleHint(index)}
                      className="flex items-center text-purple-600 hover:text-purple-700 text-sm"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      {showHints[index] ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <AnimatePresence>
                      {showHints[index] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 text-purple-600 text-sm"
                        >
                          💡 Hint: {riddle.hint}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Answer Section */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleAnswer(index)}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      {showAnswers[index] ? (
                        <>
                          <ChevronUp className="w-5 h-5 mr-2" />
                          Hide Answer
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-5 h-5 mr-2" />
                          Show Answer
                        </>
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showAnswers[index] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 mt-4 border-t border-gray-100"
                      >
                        <div className="flex items-center gap-2 text-green-600">
                          <Info className="w-5 h-5" />
                          <span className="font-medium">Answer:</span>
                        </div>
                        <p className="mt-2 text-gray-700">{riddle.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="text-4xl font-bold text-gray-200">#{index + 1}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500">
          {filteredRiddles.length === 0 && (
            <div className="py-12 text-gray-400">
              No riddles found for this difficulty level
            </div>
          )}
          <p className="text-sm">
            Showing {filteredRiddles.length} of {MATH_RIDDLES.length} riddles
          </p>
        </div>
      </div>
    </div>
  );
} 