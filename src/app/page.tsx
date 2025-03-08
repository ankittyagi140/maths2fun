"use client";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/ui/Loader";
import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/web-vitals';
import { AppCards } from "@/utils/types";
import { 
  Brain, BrainCircuit, Calculator, CalculatorIcon, 
  LandPlot, MapPinCheckInside, Circle, Pyramid 
} from "lucide-react";
import Image from 'next/image';
import HeroImage from '@/public/hero-image.jpg';

const Cards = dynamic(() => import('@/components/ui/Cards'), {
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-lg animate-pulse" 
         style={{minHeight: '300px'}} />
  )
});

const Faqs = dynamic(() => import('@/components/custom/Faqs'), {
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
});

export default function Home() {
 
  const cardsElements: AppCards[] = [
    { title: "Interactive Learning", description: "Engage with colorful puzzles and games that make math concepts fun and easy to understand", id: uuidv4(), Icon: LandPlot, bg: "#FFE66D", textColor: "black" },
    { title: "Progress Tracking", description: "Watch your skills grow with achievement badges and progress charts", id: uuidv4(), Icon: Brain, bg: "#4ECDC4", textColor: "white" },
    { title: "Adaptive Difficulty", description: "Puzzles that adjust to your child's skill level for optimal learning", id: uuidv4(), Icon: Calculator, bg: "#FF6B6B", textColor: "white" },
    { title: "Parent Dashboard", description: "Monitor your child's progress and receive detailed learning reports", id: uuidv4(), Icon: Circle, bg: "#FFE66D", textColor: "black" },
    { title: "Rewards System", description: "Earn points, unlock new puzzles, and collect virtual rewards", id: uuidv4(), Icon: Pyramid, bg: "#4ECDC4", textColor: "white" },
  ];

  const cardsForCategories: AppCards[] = [
    { 
      title: "Number & Logic Puzzles", 
      description: "Boost logical reasoning and numerical skills with puzzles like Sudoku, number sequences, and magic squares. Spot patterns, solve equations, and enhance problem-solving abilities.", 
      id: uuidv4(), 
      Icon: LandPlot, 
      bg: "#FFE66D", 
      textColor: "black", 
      path: "/all-puzzles/number-logic-puzzles" 
    },
    { 
      title: "Geometry & Spatial Puzzles", 
      description: "Improve spatial awareness and geometric reasoning with puzzles like Tangrams and 3D shape challenges. Master reflections, angles, and object arrangements.", 
      id: uuidv4(), 
      Icon: Calculator, 
      bg: "#4ECDC4", 
      textColor: "black", 
      path: "/all-puzzles/geometry-spatial-puzzles" 
    },
    { 
      title: "Arithmetic & Calculation Puzzles", 
      description: "Sharpen mental math with fast-paced addition, subtraction, multiplication, and division challenges. Solve equations, fractions, and multiplication towers for a math workout.", 
      id: uuidv4(), 
      Icon: Brain, 
      bg: "#FF6B6B", 
      textColor: "black", 
      path: "/all-puzzles/arithmetic-calculation-puzzles" 
    },
    { 
      title: "Time-Based & Multiplayer Puzzles", 
      description: "Race against time or challenge others in math duels, speed rounds, and strategy-driven escape room puzzles. Enhance quick thinking and problem-solving skills.", 
      id: uuidv4(), 
      Icon: MapPinCheckInside, 
      bg: "#FFE66D", 
      textColor: "black", 
      path: "/all-puzzles/time-based-multiplayer-puzzles" 
    },
    { 
      title: "Pattern Recognition & Matching Puzzles", 
      description: "Train your brain with pattern-based puzzles like Sudoku variations, math jigsaws, and binary code challenges. Strengthen logical thinking through shape and number recognition.", 
      id: uuidv4(), 
      Icon: LandPlot, 
      bg: "#4ECDC4", 
      textColor: "black", 
      path: "/all-puzzles/pattern-recognition-matching-puzzles" 
    },
    { 
      title: "Measurement & Estimation Puzzles", 
      description: "Apply real-world math by estimating weight, volume, time, and distance. Convert units, read clock faces, and solve practical measurement challenges.", 
      id: uuidv4(), 
      Icon: CalculatorIcon, 
      bg: "#FF6B6B", 
      textColor: "black", 
      path: "/all-puzzles/measurement-estimation-puzzles" 
    },
    { 
      title: "Graph & Coordinate-Based Puzzles", 
      description: "Explore coordinate planes, plot graphs, and analyze data with interactive puzzles. Solve treasure hunts, graph-based challenges, and equation plotters.", 
      id: uuidv4(), 
      Icon: LandPlot, 
      bg: "#FFE66D", 
      textColor: "black", 
      path: "/all-puzzles/graph-coordinate-based-puzzles" 
    },
    { 
      title: "Algebra & Advanced Math Puzzles", 
      description: "Make algebra, polynomials, and calculus fun with interactive puzzles. Solve for variables, manipulate expressions, and explore vectors, matrices, and derivatives.", 
      id: uuidv4(), 
      Icon: LandPlot, 
      bg: "#4ECDC4", 
      textColor: "black", 
      path: "/all-puzzles/algebra-advance-maths-puzzles" 
    },
    { 
      title: "Maths Riddles", 
      description: "Solve tricky math riddles, brain teasers, and logic-based challenges. Test your reasoning, problem-solving, and number skills with engaging word problems.", 
      id: uuidv4(), 
      Icon: BrainCircuit, 
      bg: "#FFE66D", 
      textColor: "black", 
      path: "/all-puzzles/maths-riddles" 
    }    
  ];
  const router = useRouter();
  const {isAuth,loading} = useAuth()

//   const handleExploreAllPuzzles=()=>{
// router.push('/all-puzzles')
//   }

  const handleLearnMoreClick=()=>{
    router.push('/learn-more')
  }

  const handleStartPlayingClick=()=>{
  router.push('/all-puzzles')
  }

  const handleStartFreeTrial = () => {
    if (isAuth) {
      router.push('/all-puzzles')
    }
    else router.push('/signup');
  }

// useEffect(() => {
//   const handleBeforeInstallPrompt = (event: Event) => {
//     event.preventDefault();
//     setDeferredPrompt(event as BeforeInstallPromptEvent);

//     // Check if the user is on a mobile or tablet device
//     if (window.matchMedia("(max-width: 1024px)").matches) {
//       setShowInstallPrompt(true); // Show the install prompt for mobile/tablet
//     }
//   };
//   window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//   return () => {
//     window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//   };
// }, []);

// const handleInstallClick = () => {
//   if (deferredPrompt) {
//     deferredPrompt.prompt();
//     deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === "accepted") {
//         console.log("User accepted the install prompt");
//       } else {
//         console.log("User dismissed the install prompt");
//       }
//       setDeferredPrompt(null);
//       setShowInstallPrompt(false); // Hide the prompt after action
//     });
//   }
// };

// const handleCancelClick = () => {
//   setShowInstallPrompt(false); // Hide the prompt without installing
// };

  return (
    <>
    {/*Loader*/}
    {loading ? <Loader/> : null}
     

      {/* Hero Section */}
      <section className="bg-black w-full flex-col flex justify-center items-center py-8 px-4 md:p-20 min-h-[80vh]">
        <div className="pt-8 pb-8 md:pt-20 md:pb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-[#FFE66D] text-center font-['Comic_Sans_MS']">
            Make Maths Fun with Puzzles!
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 md:mb-12 font-['Nunito'] max-w-2xl mx-auto text-center">
            Engage your kids with interactive Maths puzzles that make learning an adventure
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <button onClick={handleStartPlayingClick} className="w-full md:w-auto bg-[#FF6B6B] text-greys px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-[#ff8585] transition-colors duration-300 text-sm md:text-base">
              Start Playing
            </button>
            <button onClick={handleLearnMoreClick} className="w-full md:w-auto bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 text-sm md:text-base">
              Learn More
            </button>
          </div>
          <Image
            src={HeroImage}
            alt="Math Puzzles"
            priority
            quality={75}
            sizes="100vw"
            fill
            className="object-cover"
          />
        </div>
      </section>

       {/* Puzzle Categories */}
       <section className="bg-white py-12 px-4 md:p-20">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-black font-['Comic_Sans_MS']">
          Explore Our Puzzle Categories
        </h2>
        <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 min-h-[800px]">
          {cardsForCategories.map((card) => (
            <Cards key={card.id} id={card.id} title={card.title} description={card.description} Icon={card.Icon} bg={card.bg} categories={true} textColor={card.textColor} path={card.path} style={{
              width: '100%',
              height: '300px',
              aspectRatio: '1/1'
            }} />
          ))}
        </div>
        {/*<div className="text-center mt-8 md:mt-12 w-full">
          <button onClick={handleExploreAllPuzzles} className="bg-transparent border-2 w-full border-[#4ECDC4] text-[#4ECDC4] py-4 px-8 bordred-full font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 animate__animated animate__bounceIn"
          >
            Explore All Puzzles
          </button>
        </div>*/}
        </div>
      </section>


      {/*** How Our Math Puzzles Work ***/}
      <section className="bg-neutral-900 py-12 px-4 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-[#FFE66D] font-['Comic_Sans_MS']">
            How Our Math Puzzles Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center animate__animated animate__fadeInUp">
              <div className="bg-[#4ECDC4] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-['Comic_Sans_MS']">Choose Your Level</h3>
              <p className="text-neutral-300 font-['Nunito']">Pick from different difficulty levels that match your skills</p>
            </div>

            <div className="text-center animate__animated animate__fadeInUp">
              <div className="bg-[#FF6B6B] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-['Comic_Sans_MS']">Solve Puzzles</h3>
              <p className="text-neutral-300 font-['Nunito']">Complete fun math challenges with colorful animations</p>
            </div>

            <div className="text-center animate__animated animate__fadeInUp">
              <div className="bg-[#FFE66D] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-['Comic_Sans_MS']">Earn Rewards</h3>
              <p className="text-neutral-300 font-['Nunito']">Get stars and unlock new levels as you progress</p>
            </div>

            <div className="text-center animate__animated animate__fadeInUp">
              <div className="bg-[#4ECDC4] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">4️⃣</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-['Comic_Sans_MS']">Track Progress</h3>
              <p className="text-neutral-300 font-['Nunito']">See your improvement with fun progress charts</p>
            </div>
          </div>
          <div className="mt-8 md:mt-20 bg-neutral-800 rounded-xl md:rounded-2xl p-4 md:p-12 animate__animated animate__fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-[#FFE66D] font-['Comic_Sans_MS']">Ready to Start Learning?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-[#4ECDC4] mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-white font-['Nunito']">Start with a free trial - no credit card needed</p>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-[#4ECDC4] mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-white font-['Nunito']">Access to 50+ starter puzzles</p>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-[#4ECDC4] mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-white font-['Nunito']">Parent dashboard included</p>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <button onClick={handleStartFreeTrial} className="inline-block bg-[#FF6B6B] text-white px-8 py-4 font-bold hover:bg-[#ff8585] transition-colors duration-300 animate__animated animate__bounceIn">
                  Start Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Why Kids Love Our Maths Puzzles */}
       <section className="bg-white py-12 px-4 md:p-20">
        <div className="pt-8 pb-8 md:pt-20 md:pb-20 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-black font-['Comic_Sans_MS']">
            Why Kids Love Our Maths Puzzles
          </h2>
          <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {cardsElements.map((card) => (
              <Cards key={card.id} id={card.id} title={card.title} description={card.description} Icon={card.Icon} bg={card.bg} textColor={card.textColor} style={{
                width: '100%',
                height: '300px',
                aspectRatio: '1/1'
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-12 px-4 md:p-20">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-neutral-800 font-['Comic_Sans_MS']">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
          <Faqs />
        </div>
        </div>
      </section>
    </>
  );
}
