'use client'
import { AppCards } from "@/utils/types";
import { useRouter } from "next/navigation";

interface CardsProps extends AppCards {
  style?: React.CSSProperties;
}

const Cards: React.FC<CardsProps> = ({ style, title, description, Icon, id, categories, bg, textColor, path }) => {
  const Router = useRouter();

  const handlePuzzleCardClick = (path: string) => {
    if (path) {
      Router.push(path);
    }
  };

  return (
    <div style={style}>
      {
        !categories ?
          <div key={id} style={{ backgroundColor: bg }} className="rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-105 transition-transform duration-300 shadow-sm">
              {Icon && <Icon />}
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold mb-4 font-['Comic_Sans_MS']" style={{ color: textColor }}>
                {title}
              </h3>
              <p className=" font-['Nunito']" style={{ color: textColor }}>{description}</p>
            </div>
          </div>
          :
          <div onClick={() => path && handlePuzzleCardClick(path)} key={id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform cursor-pointer hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp flex flex-col h-full">
            <div className='p-6' style={{ backgroundColor: bg }}>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                {Icon && <Icon />}
              </div>
              <h3 className="text-2xl font-bold mb-4 font-['Comic_Sans_MS']" style={{ color: textColor }}>
                {title}
              </h3>
            </div>
            <div className="pt-6 pr-6 pl-6 pb-2 flex-1">
              <p className="text-neutral-600  mb-4 font-['Nunito']">{description}</p>
            </div>
          </div>
      }
    </div>
  );
};

export default Cards;