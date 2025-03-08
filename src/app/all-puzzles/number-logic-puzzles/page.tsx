import { PuzzlesCards } from "@/utils/types";
import { NumberLogicPuzzles } from "@/lib/number-logic-puzzles";
import PuzzleCard from "@/components/ui/puzzleCard";

const NumberLogicPuzzle:React.FC=()=>{

    const numberLogicPuzzlesGames:PuzzlesCards[] = NumberLogicPuzzles;


    return (<section id="featured-puzzles" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4 animate__animated animate__fadeInDown">Number and Logic Puzzles</h2>
            <p className="text-black max-w-2xl mx-auto animate__animated animate__fadeInUp">Challenge yourself with our most popular mathematical puzzles</p>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {
        numberLogicPuzzlesGames.map((game) => {
            return(<PuzzleCard key={game.id} {...game}  bg="#FFE66D" banner="#4ECDC4"/>)
        })
    }
          </div>
{/*     
          <div className="text-center mt-12">
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 animate__animated animate__fadeInUp">
              View All Puzzles
            </button>
          </div> */}
        </div>
    
      </section>)
}
export default NumberLogicPuzzle;