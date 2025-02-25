import { PuzzlesCards } from "@/utils/types";
import PuzzleCard from "@/components/ui/puzzleCard";
import { MeasurementEstimationPuzzles } from "@/lib/measurement-estimation-puzzles";

const MeasurementEstimation:React.FC=()=>{

    const measurementEstimation:PuzzlesCards[] = MeasurementEstimationPuzzles;


    return (<section id="featured-puzzles" className="bg-neutral-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate__animated animate__fadeInDown">Measurement & Estimation Puzzles</h2>
            <p className="text-gray-300 max-w-2xl mx-auto animate__animated animate__fadeInUp">Challenge yourself with our most popular mathematical puzzles</p>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {
        measurementEstimation.map((game) => {
            return(<PuzzleCard key={game.id} {...game}/>)
        })
    }
          </div>
    
          <div className="text-center mt-12">
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 animate__animated animate__fadeInUp">
              View All Puzzles
            </button>
          </div>
        </div>
    
      </section>)
}
export default MeasurementEstimation;