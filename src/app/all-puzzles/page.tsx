import { PuzzlesCards } from "@/utils/types";
import PuzzleCard from "@/components/ui/puzzleCard";
import { AllMathsPuzzles } from "@/lib/allMathsPuzzles";

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
        <section id="featured-puzzles" className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-black mb-4 animate__animated animate__fadeInDown">Maths Puzzles</h2>
                    <p className="text-black max-w-2xl mx-auto animate__animated animate__fadeInUp">
                        Challenge yourself with our collection of mathematical puzzles
                    </p>
                </div>

                {/* Render puzzles by category */}
                {categories.map((category) => (
                    <div key={category} className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {puzzlesByCategory[category].map((game) => (
                                <PuzzleCard 
                                    key={game.id} 
                                    {...game} 
                                    bg="#4ECDC4" 
                                    banner="#FFE66D" 
                                    subCategory={game.subCategory}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllPuzzles;