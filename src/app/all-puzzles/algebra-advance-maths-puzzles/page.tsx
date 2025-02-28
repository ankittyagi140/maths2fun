import { PuzzlesCards } from "@/utils/types";
import PuzzleCard from "@/components/ui/puzzleCard";
import { AlgebraAdvanceMathsPuzzles } from "@/lib/algebra-advance-maths-puzzles";

const AlgebraAdvanceMaths:React.FC=()=>{

    const alzebraAdvanceMaths:PuzzlesCards[] = AlgebraAdvanceMathsPuzzles;


    return (<section id="featured-puzzles" className="bg-white-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4 animate__animated animate__fadeInDown">Alzebra and Advance Maths Puzzles</h2>
            <p className="text-black max-w-2xl mx-auto animate__animated animate__fadeInUp">Challenge yourself with our most popular mathematical puzzles</p>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {
        alzebraAdvanceMaths.map((game) => {
            return(<PuzzleCard key={game.id} {...game}  bg="#4ECDC4" banner="#FFE66D"/>)
        })
    }
          </div>
    
          <div className="text-center mt-12">
            <button 
            className="bg-transparent border-2 w-full border-[#4ECDC4] text-[#4ECDC4] py-2 px-4 bordred-full font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 animate__animated animate__bounceIn">
            View All Puzzles
            </button>
          </div>
        </div>
    
      </section>)
}
export default AlgebraAdvanceMaths;