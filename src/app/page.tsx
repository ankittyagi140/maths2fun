"use client";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/ui/Loader";
import { AppCards } from "@/utils/types";
import { 
  Brain, BrainCircuit, Calculator, CalculatorIcon, 
  LandPlot, MapPinCheckInside, Circle, Pyramid,
  Star, Trophy, Target, Zap, Heart, Sparkles
} from "lucide-react";


const Cards = dynamic(() => import('@/components/ui/Cards'), {
  loading: () => (
    <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl animate-pulse shadow-lg" 
         style={{minHeight: '300px'}} />
  )
});

const Faqs = dynamic(() => import('@/components/custom/Faqs'), {
  loading: () => <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl animate-pulse shadow-lg" />
});

export default function Home() {
 
  const cardsElements: AppCards[] = [
    { 
      title: "🎮 Interactive Learning", 
      description: "Engage with colorful puzzles and games that make math concepts fun and easy to understand", 
      id: uuidv4(), 
      Icon: Zap, 
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
      textColor: "white" 
    },
    { 
      title: "📊 Progress Tracking", 
      description: "Watch your skills grow with achievement badges and progress charts", 
      id: uuidv4(), 
      Icon: Target, 
      bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", 
      textColor: "white" 
    },
    { 
      title: "🎯 Adaptive Difficulty", 
      description: "Puzzles that adjust to your child's skill level for optimal learning", 
      id: uuidv4(), 
      Icon: Brain, 
      bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", 
      textColor: "white" 
    },
    { 
      title: "👨‍👩‍👧‍👦 Parent Dashboard", 
      description: "Monitor your child's progress and receive detailed learning reports", 
      id: uuidv4(), 
      Icon: Heart, 
      bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", 
      textColor: "white" 
    },
    { 
      title: "🏆 Rewards System", 
      description: "Earn points, unlock new puzzles, and collect virtual rewards", 
      id: uuidv4(), 
      Icon: Trophy, 
      bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", 
      textColor: "white" 
    },
  ];

  const cardsForCategories: AppCards[] = [
    { 
      title: "🧩 Number & Logic Puzzles", 
      description: "Boost logical reasoning and numerical skills with puzzles like Sudoku, number sequences, and magic squares.", 
      id: uuidv4(), 
      Icon: Calculator, 
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
      textColor: "white", 
      path: "/all-puzzles/number-logic-puzzles" 
    },
    { 
      title: "🔺 Geometry & Spatial Puzzles", 
      description: "Improve spatial awareness and geometric reasoning with puzzles like Tangrams and 3D shape challenges.", 
      id: uuidv4(), 
      Icon: LandPlot, 
      bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", 
      textColor: "white", 
      path: "/all-puzzles/geometry-spatial-puzzles" 
    },
    { 
      title: "➕ Arithmetic & Calculation Puzzles", 
      description: "Sharpen mental math with fast-paced addition, subtraction, multiplication, and division challenges.", 
      id: uuidv4(), 
      Icon: Brain, 
      bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", 
      textColor: "white", 
      path: "/all-puzzles/arithmetic-calculation-puzzles" 
    },
    { 
      title: "⏰ Time-Based & Multiplayer Puzzles", 
      description: "Race against time or challenge others in math duels, speed rounds, and strategy-driven puzzles.", 
      id: uuidv4(), 
      Icon: Zap, 
      bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", 
      textColor: "white", 
      path: "/all-puzzles/time-based-multiplayer-puzzles" 
    },
    { 
      title: "🎨 Pattern Recognition & Matching Puzzles", 
      description: "Train your brain with pattern-based puzzles like Sudoku variations and math jigsaws.", 
      id: uuidv4(), 
      Icon: Target, 
      bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", 
      textColor: "white", 
      path: "/all-puzzles/pattern-recognition-matching-puzzles" 
    },
    { 
      title: "📏 Measurement & Estimation Puzzles", 
      description: "Apply real-world math by estimating weight, volume, time, and distance with practical challenges.", 
      id: uuidv4(), 
      Icon: CalculatorIcon, 
      bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", 
      textColor: "black", 
      path: "/all-puzzles/measurement-estimation-puzzles" 
    },
    { 
      title: "📈 Graph & Coordinate-Based Puzzles", 
      description: "Explore coordinate planes, plot graphs, and analyze data with interactive puzzles.", 
      id: uuidv4(), 
      Icon: MapPinCheckInside, 
      bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", 
      textColor: "black", 
      path: "/all-puzzles/graph-coordinate-based-puzzles" 
    },
    { 
      title: "🔢 Algebra & Advanced Math Puzzles", 
      description: "Make algebra, polynomials, and calculus fun with interactive puzzles and problem-solving.", 
      id: uuidv4(), 
      Icon: BrainCircuit, 
      bg: "linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)", 
      textColor: "white", 
      path: "/all-puzzles/algebra-advance-maths-puzzles" 
    },
    { 
      title: "🧠 Maths Riddles", 
      description: "Solve tricky math riddles, brain teasers, and logic-based challenges with engaging word problems.", 
      id: uuidv4(), 
      Icon: Sparkles, 
      bg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", 
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



  return (
    <>
    {/*Loader*/}
    {loading ? <Loader/> : null}
     
    {/* Floating Math Elements Background */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-20 left-10 text-3xl animate-bounce opacity-20" style={{animationDelay: '0s'}}>🔢</div>
      <div className="absolute top-40 right-20 text-2xl animate-bounce opacity-20" style={{animationDelay: '1s'}}>➕</div>
      <div className="absolute top-60 left-20 text-xl animate-bounce opacity-20" style={{animationDelay: '2s'}}>➖</div>
      <div className="absolute top-80 right-10 text-2xl animate-bounce opacity-20" style={{animationDelay: '3s'}}>✖️</div>
      <div className="absolute top-96 left-32 text-xl animate-bounce opacity-20" style={{animationDelay: '4s'}}>➗</div>
      <div className="absolute top-1/4 right-1/3 text-2xl animate-bounce opacity-20" style={{animationDelay: '5s'}}>🔺</div>
      <div className="absolute top-1/3 left-1/4 text-xl animate-bounce opacity-20" style={{animationDelay: '6s'}}>⭕</div>
      <div className="absolute top-1/2 right-1/4 text-2xl animate-bounce opacity-20" style={{animationDelay: '7s'}}>⭐</div>
    </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 w-full flex-col flex justify-center items-center py-12 px-4 md:py-24 min-h-[85vh] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-yellow-300 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-green-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="mb-8 animate-bounce">
            <span className="text-7xl md:text-9xl">🧮</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 text-white text-center font-['Comic_Sans_MS'] drop-shadow-2xl leading-tight">
            Make Maths Fun! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 font-['Nunito'] max-w-4xl mx-auto text-center leading-relaxed">
            🚀 Transform learning into an exciting adventure with interactive math puzzles designed for curious minds!
            <br />
            <span className="text-yellow-200 font-semibold text-2xl md:text-3xl">Join thousands of happy learners! 🌟</span>
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <button 
              onClick={handleStartPlayingClick} 
              className="group w-full md:w-auto bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-5 md:px-12 md:py-6 font-bold text-xl md:text-2xl rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl border-2 border-pink-300"
            >
              🎮 Start Playing Now!
            </button>
            <button 
              onClick={handleLearnMoreClick} 
              className="group w-full md:w-auto bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 md:px-12 md:py-6 font-bold text-xl md:text-2xl rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl"
            >
              📚 Learn More
            </button>
          </div>
        </div>
      </section>

       {/* Puzzle Categories */}
       <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-20 px-4 md:py-28 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <span className="text-4xl">🎯</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold mb-6 text-gray-800 font-['Comic_Sans_MS']">
              Explore Our Puzzle Categories! 🎨
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our collection of fun and educational math puzzles designed just for you! 🌈
            </p>
          </div>
          <div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {cardsForCategories.map((card, index) => {
              // Assign a unique gradient and accent color for each card
              const gradients = [
                'from-pink-200 via-yellow-100 to-yellow-200',
                'from-blue-200 via-purple-100 to-indigo-100',
                'from-green-200 via-teal-100 to-cyan-100',
                'from-yellow-200 via-pink-100 to-red-100',
                'from-purple-200 via-blue-100 to-pink-100',
                'from-orange-200 via-yellow-100 to-pink-100',
                'from-cyan-200 via-blue-100 to-green-100',
                'from-red-200 via-pink-100 to-yellow-100',
                'from-indigo-200 via-purple-100 to-blue-100',
              ];
              const accentColors = [
                '#ec4899', // pink-500
                '#3b82f6', // blue-500
                '#22c55e', // green-500
                '#eab308', // yellow-500
                '#a21caf', // purple-500
                '#f59e42', // orange-500
                '#06b6d4', // cyan-500
                '#ef4444', // red-500
                '#6366f1', // indigo-500
              ];
              const gradient = gradients[index % gradients.length];
              const accent = accentColors[index % accentColors.length];
              return (
                <a
                  key={card.id}
                  href={card.path}
                  className={`group block rounded-3xl border-2 border-white shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer bg-gradient-to-br ${gradient} p-8 md:p-10`}
                  style={{ minHeight: '340px', textDecoration: 'none' }}
                >
                  <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mb-6 mx-auto transition-transform duration-300 group-hover:animate-bounce`}> 
                    <card.Icon size={44} color={accent} />
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-extrabold text-gray-800 mb-3 text-center font-['Comic_Sans_MS'] flex items-center justify-center gap-2`}>
                    <span>{card.title}</span>
                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                  </h3>
                  <div className="flex justify-center mb-3">
                    <span className={`block w-16 h-1 rounded-full`} style={{backgroundColor: accent, opacity: 0.4}}></span>
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 font-semibold text-center leading-relaxed">
                    {card.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>


      {/*** How Our Math Puzzles Work ***/}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-20 px-4 md:py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-8 shadow-2xl">
              <span className="text-5xl">🎓</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white font-['Comic_Sans_MS']">
              How Our Math Puzzles Work! 🚀
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Follow these simple steps to become a math master! 🌟
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            <div className="text-center group transform hover:scale-110 transition-all duration-500 animate__animated animate__fadeInUp">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-cyan-300/50">
                <span className="text-6xl">1️⃣</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white font-['Comic_Sans_MS']">Choose Your Level 🎯</h3>
              <p className="text-gray-300 font-['Nunito'] text-lg leading-relaxed">Pick from different difficulty levels that match your skills perfectly!</p>
            </div>

            <div className="text-center group transform hover:scale-110 transition-all duration-500 animate__animated animate__fadeInUp" style={{animationDelay: '0.2s'}}>
              <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-pink-300/50">
                <span className="text-6xl">2️⃣</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white font-['Comic_Sans_MS']">Solve Puzzles 🧩</h3>
              <p className="text-gray-300 font-['Nunito'] text-lg leading-relaxed">Complete fun math challenges with colorful animations and sounds!</p>
            </div>

            <div className="text-center group transform hover:scale-110 transition-all duration-500 animate__animated animate__fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-yellow-300/50">
                <span className="text-6xl">3️⃣</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white font-['Comic_Sans_MS']">Earn Rewards 🏆</h3>
              <p className="text-gray-300 font-['Nunito'] text-lg leading-relaxed">Get stars, badges, and unlock new levels as you progress!</p>
            </div>

            <div className="text-center group transform hover:scale-110 transition-all duration-500 animate__animated animate__fadeInUp" style={{animationDelay: '0.6s'}}>
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-green-300/50">
                <span className="text-6xl">4️⃣</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white font-['Comic_Sans_MS']">Track Progress 📊</h3>
              <p className="text-gray-300 font-['Nunito'] text-lg leading-relaxed">See your improvement with fun progress charts and achievements!</p>
            </div>
          </div>
          
          <div className="mt-20 md:mt-32 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-3xl p-10 md:p-20 animate__animated animate__fadeIn shadow-2xl border border-gray-600/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-5xl font-bold mb-8 text-yellow-300 font-['Comic_Sans_MS']">
                  Ready to Start Learning? 🎉
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center group">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-lg">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <p className="text-white font-['Nunito'] text-xl">Start with a free trial - no credit card needed! 🆓</p>
                  </div>
                  <div className="flex items-center group">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-lg">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <p className="text-white font-['Nunito'] text-xl">Access to 50+ starter puzzles! 🧩</p>
                  </div>
                  <div className="flex items-center group">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-lg">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <p className="text-white font-['Nunito'] text-xl">Parent dashboard included! 👨‍👩‍👧‍👦</p>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <button 
                  onClick={handleStartFreeTrial} 
                  className="group inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-6 font-bold text-2xl rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-xl border-2 border-pink-300 animate__animated animate__bounceIn"
                >
                  🚀 Start Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Why Kids Love Our Maths Puzzles */}
       <section className="bg-gradient-to-br from-pink-100 via-yellow-50 to-yellow-100 py-20 px-4 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mb-6 shadow-lg">
              <span className="text-4xl">❤️</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold mb-6 text-gray-800 font-['Comic_Sans_MS']">
              Why Kids Love Our Maths Puzzles! 🌟
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes our puzzles so special and fun! 🎈
            </p>
          </div>
          <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {cardsElements.map((card, index) => (
              <div
                key={card.id}
                className="bg-white rounded-3xl shadow-xl border-2 border-pink-200 flex flex-col items-center p-6 md:p-8 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-yellow-300"
                style={{ minHeight: '340px', justifyContent: 'flex-start' }}
              >
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 shadow-md">
                  <card.Icon size={38} color="#f5576c" />
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-gray-800 mb-2 text-center" style={{letterSpacing: '0.5px'}}>
                  {card.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 font-semibold text-center" style={{lineHeight: '1.4'}}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <span className="text-4xl">❓</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold mb-6 text-gray-800 font-['Comic_Sans_MS']">
              Frequently Asked Questions! 🤔
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Got questions? We've got answers! 💡
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
            <Faqs />
          </div>
        </div>
      </section>
    </>
  );
}
