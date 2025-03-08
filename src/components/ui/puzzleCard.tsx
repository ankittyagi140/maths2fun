'use client'
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

interface PuzzleCardProps {
  name: string;
  icon: ReactNode;
  description: string;
  category?: string;
  subCategory?: string;
  path?: string;
  difficulty?: string;
  bg?:string
  banner?:string
}

const PuzzleCard: FC<PuzzleCardProps> = ({ name, icon, description, path ,difficulty,bg,banner,subCategory}) => {
  const router = useRouter(); // Fix variable naming (camelCase)

  const handlePuzzleCardClick = () => {
    if (path) {
      router.push(path); // Navigate to the puzzle page
    }
  };

  return (
    <div
    onClick={(e) => {
      e.stopPropagation();
      handlePuzzleCardClick();
    }}
      className="bg-white cursor-pointer rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeIn"
    >
      <div className=" p-6 flex items-center relative justify-center h-48" style={{ backgroundColor: bg }}>
      <span className="text-black absolute top-0 left-0  px-2 py-1" style={{ backgroundColor: banner }}>Difficulty: {difficulty}</span>
        <span className="text-6xl text-green-400 ">{icon}</span>
        <span className="text-white absolute bottom-0 right-0  px-2 py-1 bg-pink-500" >{subCategory}</span>
      </div>
      <div className="p-6 flex-1">
        <h3 className="text-xl font-bold text-black mb-2">{name}</h3>
        <p className="text-black-400 mb-4">{description}</p>
      </div>
      {/* <div className="px-6 pb-6 mt-auto">
        {path && (
          <button
            className="bg-transparent border-2 w-full border-[#4ECDC4] text-[#4ECDC4] py-2 px-4 bordred-full font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 animate__animated animate__bounceIn"
           
          >
            Play Now
          </button>
        )}
      </div> */}
    </div>
  );
};

export default PuzzleCard;
