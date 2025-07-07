import { PuzzlesCards } from "@/utils/types";
import PuzzleCard from "@/components/ui/puzzleCard";
import { AllMathsPuzzles } from "@/lib/allMathsPuzzles";
import { BookOpen, Zap, Star, Calculator, Brain, Trophy, Gamepad } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  'Logic': Brain,
  'Arithmetic': Calculator,
  'Geometry': BookOpen,
  'Challenge': Zap,
  'Fun': Star,
  'Game': Gamepad,
  'Special': Trophy,
};

const pastelGradients = [
  'from-pink-100 via-yellow-50 to-yellow-100',
  'from-blue-100 via-purple-50 to-indigo-100',
  'from-green-100 via-teal-50 to-cyan-100',
  'from-yellow-100 via-pink-50 to-red-100',
  'from-purple-100 via-blue-50 to-pink-100',
  'from-orange-100 via-yellow-50 to-pink-100',
  'from-cyan-100 via-blue-50 to-green-100',
  'from-red-100 via-pink-50 to-yellow-100',
  'from-indigo-100 via-purple-50 to-blue-100',
];

const AllPuzzles: React.FC = () => {
    const allMathsPuzzles: PuzzlesCards[] = AllMathsPuzzles;
    
    // Group puzzles by category
    const puzzlesByCategory = allMathsPuzzles.reduce((acc, puzzle) => {
        const category = puzzle.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(puzzle);
        return acc;
    }, {} as Record<string, PuzzlesCards[]>);

    // Get unique categories
    const categories = Object.keys(puzzlesByCategory);

    return (
        <section id="featured-puzzles" className="bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 py-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInDown font-['Comic_Sans_MS']">🧩 Maths Puzzles</h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto animate__animated animate__fadeInUp font-['Nunito']">
                        Challenge yourself with our collection of mathematical puzzles!
                    </p>
                </div>

                {/* Render puzzles by category */}
                {categories.map((category, idx) => {
                  const Icon = categoryIcons[category] || Star;
                  const gradient = pastelGradients[idx % pastelGradients.length];
                  return (
                    <div key={category} className={`mb-20 bg-gradient-to-br ${gradient} rounded-3xl p-8 md:p-12 shadow-lg`}>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md">
                          <Icon size={32} color="#f59e42" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 font-['Comic_Sans_MS']">{category}</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {puzzlesByCategory[category].map((game) => (
                          <div key={game.id} className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                            <PuzzleCard 
                              {...game} 
                              bg="#FFE66D" 
                              banner="#4ECDC4" 
                              subCategory={game.subCategory}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
        </section>
    );
};

export default AllPuzzles;