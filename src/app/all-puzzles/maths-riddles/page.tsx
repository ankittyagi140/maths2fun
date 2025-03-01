'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Puzzle, ChevronDown, ChevronUp, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { allRiddles } from '@/lib/allRiddles';
import { Riddle } from '@/lib/allRiddles';

const MATH_RIDDLES = allRiddles;
const RIDDLES_PER_PAGE = 10;  

export default function RiddlesPage() {
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({});
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | Riddle['difficulty']>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRiddles = MATH_RIDDLES.filter(riddle => 
    difficultyFilter === 'all' ? true : riddle.difficulty === difficultyFilter
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredRiddles.length / RIDDLES_PER_PAGE);
  const paginatedRiddles = filteredRiddles.slice(
    (currentPage - 1) * RIDDLES_PER_PAGE,
    currentPage * RIDDLES_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Reset state when changing pages
      setShowHints({});
      setShowAnswers({});
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleHint = (index: number) => {
    setShowHints(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAnswer = (index: number) => {
    setShowAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getDifficultyColor = (difficulty: Riddle['difficulty']) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-400 text-green-800';
      case 'medium': return 'bg-yellow-400 text-yellow-800';
      case 'hard': return 'bg-red-400 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center gap-2">
            <Puzzle className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Math Riddles</h1>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setDifficultyFilter('all');
              setCurrentPage(1);
            }}
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
              onClick={() => {
                setDifficultyFilter(diff as Riddle['difficulty']);
                setCurrentPage(1);
              }}
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

        {/* Pagination Info */}
        <div className="mb-4 text-sm text-gray-600">
          Showing page {currentPage} of {totalPages || 1} ({paginatedRiddles.length} of {filteredRiddles.length} riddles)
        </div>

        {/* Riddles Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {paginatedRiddles.map((riddle, index) => {
            const riddleIndex = (currentPage - 1) * RIDDLES_PER_PAGE + index;
            return (
              <motion.div
                key={riddleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl shadow-sm hover:shadow-md transition-shadow p-6" 
                style={{
                  background:
                  riddle.difficulty === 'easy' ? "#d1ffdf" : 
                  riddle.difficulty === 'medium' ?  "#fff3b8" : 
                  "#ffdfdf"
                }}
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
                        onClick={() => toggleHint(riddleIndex)}
                        className="flex items-center text-purple-600 hover:text-purple-700 text-sm"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        {showHints[riddleIndex] ? 'Hide Hint' : 'Show Hint'}
                      </button>
                      <AnimatePresence>
                        {showHints[riddleIndex] && (
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
                        onClick={() => toggleAnswer(riddleIndex)}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        {showAnswers[riddleIndex] ? (
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
                      {showAnswers[riddleIndex] && (
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
                  <div className="text-4xl font-bold text-black">#{riddleIndex + 1}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show first page, last page, current page, and pages around current page
                  return page === 1 || 
                         page === totalPages || 
                         (page >= currentPage - 1 && page <= currentPage + 1);
                })
                .map((page, index, array) => {
                  // Add ellipsis if needed
                  const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
                  const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1;
                  
                  return (
                    <div key={page} className="flex items-center">
                      {showEllipsisBefore && <span className="px-2 text-gray-400">...</span>}
                      
                      <button
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                      
                      {showEllipsisAfter && <span className="px-2 text-gray-400">...</span>}
                    </div>
                  );
                })}
            </div>
            
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-gray-500">
          {filteredRiddles.length === 0 && (
            <div className="py-12 text-gray-400">
              No riddles found for this difficulty level
            </div>
          )}
        </div>
      </div>
    </div>
  );
}