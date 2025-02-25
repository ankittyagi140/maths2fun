'use client'
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

interface PuzzleCardProps {
  name: string;
  icon: ReactNode;
  description: string;
  category?: string;
  path?: string;
}

const PuzzleCard: FC<PuzzleCardProps> = ({ name, icon, description, path ,difficulty}) => {
  const router = useRouter(); // Fix variable naming (camelCase)

  const handlePuzzleCardClick = () => {
    if (path) {
      router.push(path); // Navigate to the puzzle page
    }
  };

  return (
    <div
      className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeIn"
    >
      <div className="bg-green-500/10 p-6 flex items-center justify-center h-48">
        <span className="text-6xl text-green-400">{icon}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-400">Difficulty: {difficulty}</span>
          {path && (
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click
                handlePuzzleCardClick();
              }}
            >
              Play Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PuzzleCard;
