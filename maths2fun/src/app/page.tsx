"use client";

import { useId } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs
import Cards from "@/components/ui/Cards";
import { AppCards } from "@/utils/types";
import { LandPlot, Pyramid, Calculator, Radius, Brain } from "lucide-react";
import Faqs from "@/components/custom/Faqs";

export default function Home() {
  const cardsElements: AppCards[] = [
    { title: "Interactive Learning", description: "Engage with colorful puzzles and games that make math concepts fun and easy to understand", id: uuidv4(), Icon: LandPlot, bg: "#FFE66D",textColor:"black" },
    { title: "Progress Tracking", description: "Watch your skills grow with achievement badges and progress charts", id: uuidv4(), Icon: Brain, bg: "#4ECDC4",textColor:"white" },
    { title: "Adaptive Difficulty", description: "Puzzles that adjust to your child's skill level for optimal learning", id: uuidv4(), Icon: Calculator, bg: "#FF6B6B",textColor:"white" },
    { title: "Parent Dashboard", description: "Monitor your child's progress and receive detailed learning reports", id: uuidv4(), Icon: Radius, bg: "#FFE66D",textColor:"black" },
    { title: "Rewards System", description: "Earn points, unlock new puzzles, and collect virtual rewards", id: uuidv4(), Icon: Pyramid, bg: "#4ECDC4",textColor:"white" },
  ];

  const cardsForCategories: AppCards[] = [
    { title: "Number & Logic Puzzles", description: "These puzzles challenge players to apply logical reasoning and numerical skills to solve problems. Games like Sudoku, number sequences, and magic squares require players to recognize patterns, complete sequences, or balance equations to progress.", id: uuidv4(), Icon: LandPlot, bg: "#FFE66D",textColor:"black" },
    { title: "Geometry & Spatial Puzzles", description: "Focusing on shapes, angles, and spatial awareness, these puzzles involve arranging geometric figures, understanding reflections, and solving 3D shape challenges. Players will improve their visual problem-solving skills through games like Tangrams and 3D Cube Stacking.", id: uuidv4(), Icon: LandPlot, bg: "#4ECDC4",textColor:"white" },
    { title: "Arithmetic & Calculation Puzzles", description: "Designed to enhance mental math skills, these games test addition, subtraction, multiplication, division, and fractions. Players solve fast-paced challenges, balance equations, or complete multiplication towers to sharpen their arithmetic proficiency.", id: uuidv4(), Icon: LandPlot, bg: "#FF6B6B",textColor:"white" },
    { title: "Time-Based & Multiplayer Puzzles", description: "These fast-paced puzzles add a competitive or cooperative element to math problem-solving. Players race against time or compete with others in duels, speed challenges, and escape room scenarios that require quick thinking and strategic planning.", id: uuidv4(), Icon: LandPlot, bg: "#FFE66D",textColor:"black" },
    { title: "Pattern Recognition & Matching Puzzles", description: "Players identify relationships between numbers, shapes, or sequences to complete puzzles. Games like Sudoku variations, math jigsaw puzzles, and binary code challenges encourage logical thinking and problem-solving through pattern detection.", id: uuidv4(), Icon: LandPlot, bg: "#4ECDC4",textColor:"white" },
    { title: "Measurement & Estimation Puzzles", description: "These puzzles involve real-world applications of math, requiring players to estimate weight, volume, time, and distances. From filling containers to calculating time on clock faces, players develop skills in unit conversions and precise measurements.", id: uuidv4(), Icon: LandPlot, bg: "#FF6B6B",textColor:"white" },
    { title: "Graph & Coordinate-Based Puzzles", description: "Players engage with coordinate planes, plotting points, and analyzing graphs to solve math challenges. These puzzles include treasure hunts using coordinates, graph-based challenges, and equation plotters, reinforcing skills in geometry and data interpretation.", id: uuidv4(), Icon: LandPlot, bg: "#FFE66D",textColor:"black" },
    { title: "Algebra & Advanced Math Puzzles", description: "These puzzles introduce algebraic reasoning, polynomials, matrices, and calculus in an engaging way. Players solve for variables, arrange algebraic expressions, and work with vectors or derivatives, making abstract math concepts more interactive.", id: uuidv4(), Icon: LandPlot, bg: "#4ECDC4",textColor:"white" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-black w-full flex-col flex justify-center items-center p-20">
      <div className="pt-20 pb-20">
        <h1 className="text-6xl font-bold mb-6 text-[#FFE66D] font-['Comic_Sans_MS']">
          Make Maths Fun with Puzzles!
        </h1>
        <h5 className="text-xl text-white mb-12 font-['Nunito'] max-w-2xl mx-auto">
          Engage your kids with interactive Maths puzzles that make learning an adventure
        </h5>
        <div className="flex items-center justify-center gap-8">
          <button className="bg-[#FF6B6B] text-white px-8 py-4 font-bold hover:bg-[#ff8585] transition-colors duration-300">
            Start Playing
          </button>
          <button className="bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] px-8 py-4 font-bold hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300">
            Learn More
          </button>
        </div>
        </div>
      </section>

      {/* Why Kids Love Our Maths Puzzles */}
      <section className="bg-white p-20">
        <div className="pt-20 pb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-neutral-800">
          Why Kids Love Our Maths Puzzles
        </h2>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
          {cardsElements.map((card) => (
            <Cards key={card.id} id={card.id} title={card.title} description={card.description} Icon={card.Icon} bg={card.bg} textColor={card.textColor}/>
          ))}
        </div>
        </div>
      </section>

      <section id="howItWorks" className="bg-neutral-900 py-20">
    <div className="container mx-auto px-4">
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
          <div className="text-center md:text-right">
            <a href="/signup" className="inline-block bg-[#FF6B6B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#ff8585] transition-colors duration-300 animate__animated animate__bounceIn">
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Puzzle Categories */}
      <section className="bg-white p-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-neutral-800">
          Explore Our Puzzle Categories
        </h2>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
          {cardsForCategories.map((card) => (
            <Cards key={card.id} id={card.id} title={card.title} description={card.description} Icon={card.Icon} bg={card.bg} categories={true} textColor={card.textColor}/>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="inline-block bg-[#4ECDC4] text-white px-8 py-4 rounded-full font-bold hover:bg-[#3dbdb5] transition-colors duration-300 animate__animated animate__bounceIn">
            Explore All Puzzles
          </button>
        </div>
      </section>
      <section id="faq" className="bg-white py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-neutral-800 font-['Comic_Sans_MS'] animate__animated animate__fadeIn">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-6">
      <Faqs/>
      </div>
  </section>
    </>
  );
}
