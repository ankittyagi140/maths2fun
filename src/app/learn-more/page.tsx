'use client';

import Cards from '@/components/ui/Cards';
import { BookOpen, BrainCircuit, Trophy, Gamepad, Calculator } from 'lucide-react';
import Link from 'next/link';
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black w-full flex-col flex justify-center items-center py-8 px-4 md:p-20">
        <div className="max-w-6xl mx-auto text-center pt-20 pb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-[#FFE66D] text-center font-['Comic_Sans_MS']">Transform Your Math Skills</h1>
          <p className="text-lg md:text-xl text-white mb-8 md:mb-12 font-['Nunito'] max-w-2xl mx-auto text-center">Master mathematics through interactive learning and gamified challenges</p>
          <Link 
            href="/signup" 
            className="bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] px-8 py-4 font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300"
          >
            Start Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
     
      <section className="bg-white py-12 px-4 md:p-20">
        <div className="pt-8 pb-8 md:pt-20 md:pb-20 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black font-['Comic_Sans_MS'] animate__animated animate__fadeIn">Why Choose Maths2Fun?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Cards 
              Icon={BrainCircuit}
              id= {uuidv4()}
              title="Interactive Learning"
              description="Engage with dynamic problem-solving modules that adapt to your skill level"
              bg="#FFE66D"
              textColor="black" 
            />
            <Cards 
              Icon={Gamepad}
              id={uuidv4()}
              title="Gamified Challenges"
              description="Earn rewards, unlock achievements, and climb leaderboards"
             bg="#4ECDC4"
             textColor="white"
            />
            <Cards 
              Icon={Calculator}
              id={uuidv4()}
              title="Progress Tracking"
              description="Detailed analytics to monitor your improvement over time"
               bg="#FF6B6B"
               textColor="white"
            />
          </div>
        </div>
      </section>

       {/*** How Our Math Puzzles Work ***/}
       <section id="howItWorks" className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#FFE66D] font-['Comic_Sans_MS'] animate__animated animate__fadeIn">
            How Our Math Puzzles Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
          <div className="mt-20 bg-neutral-800 rounded-2xl p-8 md:p-12 animate__animated animate__fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
             
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-12 px-4 md:p-20">
        <div className="max-w-6xl mx-auto text-center pt-20 pb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black font-['Comic_Sans_MS'] animate__animated animate__fadeIn">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="Maths2Fun completely changed my perspective on mathematics. The interactive lessons made complex concepts easy to understand!"
              author="Sarah, Grade 11"
              bg="#FF6B6B"
            />
            <TestimonialCard
              quote="I went from struggling with algebra to topping my class. The gamification keeps me motivated!"
              author="Raj, Grade 9"
              bg="#4ECDC4"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Trophy className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 text-[#FFE66D] font-['Comic_Sans_MS'] animate__animated animate__fadeIn">Ready to Master Mathematics?</h2>
          <p className="text-xl mb-8">Join thousands of students already improving their math skills</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/signup" 
              className="bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] px-8 py-4 font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300"
            >
              Get Started Now
            </Link>
            {/* <Link 
              href="/demo" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Try Demo
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}


function TestimonialCard({ quote, author,bg }: { 
  quote: string;
  author: string;
  bg:string
}) {
  return (
    <div className=" p-8 rounded-xl shadow-lg" style={{ backgroundColor: bg }}>
      <BookOpen className="w-8 h-8 text-white mb-4" />
      <p className="text-white mb-4 italic">&ldquo;{quote}&ldquo;</p>
      <p className="font-semibold text-white">- {author}</p>
    </div>
  );
}