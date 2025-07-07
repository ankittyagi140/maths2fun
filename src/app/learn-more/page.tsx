'use client';

import Cards from '@/components/ui/Cards';
import { BookOpen, BrainCircuit, Trophy, Gamepad, Calculator, Zap, Target, Star } from 'lucide-react';
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LearnMorePage() {
  const {isAuth} = useAuth();
  const router = useRouter();

  const handleStartNow=()=>{
    if(isAuth){
      router.push('/all-puzzles')
    }else router.push('/signup')
  }

  // Features data for cards
  const features = [
    {
      Icon: BrainCircuit,
      title: 'Interactive Learning',
      description: 'Engage with dynamic problem-solving modules that adapt to your skill level.',
      gradient: 'from-pink-200 via-yellow-100 to-yellow-200',
      accent: '#ec4899',
    },
    {
      Icon: Gamepad,
      title: 'Gamified Challenges',
      description: 'Earn rewards, unlock achievements, and climb leaderboards.',
      gradient: 'from-blue-200 via-purple-100 to-indigo-100',
      accent: '#3b82f6',
    },
    {
      Icon: Calculator,
      title: 'Progress Tracking',
      description: 'Detailed analytics to monitor your improvement over time.',
      gradient: 'from-green-200 via-teal-100 to-cyan-100',
      accent: '#22c55e',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 w-full flex flex-col justify-center items-center py-16 px-4 md:py-28 min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-yellow-300 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-green-300 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-bounce">
            <span className="text-7xl md:text-9xl">📚</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-center font-['Comic_Sans_MS'] drop-shadow-2xl leading-tight">
            Transform Your Math Skills
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 font-['Nunito'] max-w-2xl mx-auto text-center leading-relaxed">
            Master mathematics through interactive learning and gamified challenges.
          </p>
          <button
            onClick={handleStartNow}
            className="group w-full md:w-auto bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-5 md:px-12 md:py-6 font-bold text-xl md:text-2xl rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl border-2 border-pink-300"
          >
            🚀 Start Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:py-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-800 font-['Comic_Sans_MS'] animate__animated animate__fadeIn">
            Why Choose Maths2Fun?
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className={`rounded-3xl border-2 border-white shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer bg-gradient-to-br ${feature.gradient} p-10 md:p-12 flex flex-col items-center`}
                style={{ minHeight: '340px', textDecoration: 'none' }}
              >
                <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mb-6 mx-auto transition-transform duration-300 group-hover:animate-bounce`}>
                  <feature.Icon size={44} color={feature.accent} />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3 text-center font-['Comic_Sans_MS']">
                  {feature.title}
                </h3>
                <div className="flex justify-center mb-3">
                  <span className="block w-16 h-1 rounded-full" style={{backgroundColor: feature.accent, opacity: 0.4}}></span>
                </div>
                <p className="text-lg md:text-xl text-gray-700 font-semibold text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Our Math Puzzles Work */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-20 px-4 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-8 shadow-2xl">
              <span className="text-5xl">🎓</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-['Comic_Sans_MS']">
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-pink-100 via-yellow-50 to-yellow-100 py-20 px-4 md:py-28">
        <div className="max-w-6xl mx-auto text-center pt-10 pb-10">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-800 font-['Comic_Sans_MS'] animate__animated animate__fadeIn">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <TestimonialCard
              quote="Maths2Fun completely changed my perspective on mathematics. The interactive lessons made complex concepts easy to understand!"
              author="Sarah, Grade 11"
              bg="linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%)"
            />
            <TestimonialCard
              quote="I went from struggling with algebra to topping my class. The gamification keeps me motivated!"
              author="Raj, Grade 9"
              bg="linear-gradient(135deg, #4ECDC4 0%, #FFD93D 100%)"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-2 text-yellow-300 font-['Comic_Sans_MS'] animate__animated animate__fadeIn">Ready to Master Mathematics?</h2>
          <p className="text-2xl mb-8">Join thousands of students already improving their math skills!</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleStartNow}
              className="group w-full md:w-auto bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-5 md:px-12 md:py-6 font-bold text-xl md:text-2xl rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl border-2 border-pink-300"
            >
              🚀 Start Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function TestimonialCard({ quote, author, bg }: { 
  quote: string;
  author: string;
  bg: string;
}) {
  return (
    <div className="p-10 rounded-3xl shadow-xl text-left flex flex-col items-start" style={{ background: bg }}>
      <BookOpen className="w-10 h-10 text-white mb-4" />
      <p className="text-white mb-4 italic text-lg md:text-xl">&ldquo;{quote}&rdquo;</p>
      <p className="font-bold text-white text-lg md:text-xl">- {author}</p>
    </div>
  );
}