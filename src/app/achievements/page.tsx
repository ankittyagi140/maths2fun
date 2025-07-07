'use client';

import { Medal, Star, Target, Crown, Zap, BookOpen, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {useRouter} from 'next/navigation'

import type { LucideIcon } from 'lucide-react';
interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    progress: number;
    total: number;
    category: string;
    unlocked: boolean;
  }
  
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first learning module',
      icon: Medal,
      progress: 1,
      total: 1,
      category: 'Learning',
      unlocked: true
    },
    {
      id: '2',
      title: 'Quick Learner',
      description: 'Complete 5 learning modules',
      icon: Zap,
      progress: 3,
      total: 5,
      category: 'Learning',
      unlocked: false
    },
    {
      id: '3',
      title: 'Math Master',
      description: 'Score 100% in any math quiz',
      icon: Crown,
      progress: 90,
      total: 100,
      category: 'Quiz',
      unlocked: false
    },
    {
      id: '4',
      title: 'Perfect Streak',
      description: 'Maintain a 7-day learning streak',
      icon: Target,
      progress: 5,
      total: 7,
      category: 'Engagement',
      unlocked: false
    },
    {
      id: '5',
      title: 'Knowledge Seeker',
      description: 'Study for 10 hours total',
      icon: BookOpen,
      progress: 6,
      total: 10,
      category: 'Learning',
      unlocked: false
    },
    {
      id: '6',
      title: 'All-Star',
      description: 'Earn all basic achievements',
      icon: Star,
      progress: 2,
      total: 5,
      category: 'Special',
      unlocked: false
    }
  ];

 
export default function AchievementsPage() {
  const [filter, setFilter] = useState<string>('all');
    const router = useRouter();

    const {isAuth}=useAuth();
  const filteredAchievements = filter === 'all'
  ? achievements
  : achievements.filter(a => a.category.toLowerCase() === filter.toLowerCase());

const categories = ['all', ...new Set(achievements.map(a => a.category.toLowerCase()))];
        
  const handleBeginYourJourney = () => {
    router.push('/signup');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg text-5xl">🏅</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#2D3142] mb-2 font-['Comic_Sans_MS']">
            Achievement Hall
          </h1>
          <p className="text-xl text-[#4A4A4A] font-['Nunito']">Unlock your math mastery milestones</p>
        </div>

        {isAuth ? (
          <>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-5 py-2 rounded-full text-base font-bold transition-all border-2 shadow-sm ${
                    filter === category
                      ? 'bg-gradient-to-r from-yellow-200 to-pink-200 text-black border-yellow-400 shadow-md scale-105'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-yellow-50 hover:border-yellow-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAchievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                const progressPercentage = (achievement.progress / achievement.total) * 100;
                const isComplete = achievement.progress >= achievement.total;
                const pastelGradients = [
                  'from-pink-100 via-yellow-50 to-yellow-100',
                  'from-blue-100 via-purple-50 to-indigo-100',
                  'from-green-100 via-teal-50 to-cyan-100',
                  'from-yellow-100 via-pink-50 to-red-100',
                  'from-purple-100 via-blue-50 to-pink-100',
                  'from-orange-100 via-yellow-50 to-pink-100',
                  'from-cyan-100 via-blue-50 to-green-100',
                  'from-red-100 via-pink-50 to-yellow-100',
                  'from-indigo-100 via-purple-50 to-blue-100',
                ];
                const gradient = pastelGradients[idx % pastelGradients.length];
                return (
                  <div
                    key={achievement.id}
                    className={`group relative p-8 rounded-3xl border-2 transition-all bg-gradient-to-br ${gradient} ${
                      isComplete
                        ? 'border-[#4ECDC4] shadow-xl'
                        : 'border-gray-200 hover:border-yellow-400 shadow-md'
                    }`}
                  >
                    {/* Ribbon for completed achievements */}
                    {isComplete && (
                      <div className="absolute top-0 right-0 bg-[#4ECDC4] text-white px-4 py-1 text-sm font-bold rounded-bl-2xl shadow-md">
                        UNLOCKED!
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-4 rounded-2xl bg-white shadow-md`}>
                        <Icon className={`h-8 w-8 ${isComplete ? 'text-[#4ECDC4]' : 'text-yellow-500'}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#2D3142] mb-1 font-['Comic_Sans_MS']">
                          {achievement.title}
                        </h3>
                        <span className="text-base text-[#4A4A4A] font-semibold">
                          {achievement.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-[#6B7280] mb-6 font-['Nunito'] text-lg">
                      {achievement.description}
                    </p>
                    {/* Progress Section */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-base font-bold">
                        <span className="text-[#4A4A4A]">Progress</span>
                        <span className={`${isComplete ? 'text-[#4ECDC4]' : 'text-yellow-500'}`}>
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="h-4 bg-white rounded-full overflow-hidden border border-yellow-100">
                        <div
                          style={{ width: `${progressPercentage}%` }}
                          className={`h-full transition-all duration-500 rounded-full ${
                            isComplete ? 'bg-[#4ECDC4]' : 'bg-yellow-300'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
            <div className="max-w-md space-y-8">
              <Lock className="h-20 w-20 text-yellow-300 mx-auto" />
              <h2 className="text-4xl font-bold text-[#2D3142] font-['Comic_Sans_MS']">
                Adventure Awaits!
              </h2>
              <p className="text-xl text-[#6B7280] font-['Nunito']">
                Login to start collecting achievements and unlock math superpowers!
              </p>
              <button
                onClick={handleBeginYourJourney}
                className="group w-full md:w-auto bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-5 md:px-12 md:py-6 font-bold text-xl md:text-2xl rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl border-2 border-pink-300"
              >
                🚀 Begin Your Journey
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
