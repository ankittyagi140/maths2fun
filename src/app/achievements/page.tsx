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
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D3142] mb-2 font-['Comic_Sans_MS']">
            🏆 Achievement Hall
          </h1>
          <p className="text-[#4A4A4A] font-['Nunito']">Unlock your math mastery milestones</p>
        </div>

        {isAuth ? (
          <>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === category
                      ? 'bg-[#FFE66D] text-black shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredAchievements.map((achievement) => {
                const Icon = achievement.icon;
                const progressPercentage = (achievement.progress / achievement.total) * 100;
                const isComplete = achievement.progress >= achievement.total;

                return (
                  <div
                    key={achievement.id}
                    className={`group relative p-6 rounded-xl border-2 transition-all ${
                      isComplete
                        ? 'border-[#4ECDC4] bg-[#F0FAF9]'
                        : 'border-gray-200 hover:border-[#FFE66D]'
                    }`}
                  >
                    {/* Ribbon for completed achievements */}
                    {isComplete && (
                      <div className="absolute top-0 right-0 bg-[#4ECDC4] text-white px-4 py-1 text-sm font-bold rounded-bl-xl">
                        UNLOCKED!
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${isComplete ? 'bg-[#4ECDC4]' : 'bg-gray-100'}`}>
                        <Icon className={`h-6 w-6 ${isComplete ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#2D3142] mb-1">
                          {achievement.title}
                        </h3>
                        <span className="text-sm text-[#4A4A4A]">
                          {achievement.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-[#6B7280] mb-6 font-['Nunito']">
                      {achievement.description}
                    </p>

                    {/* Progress Section */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-[#4A4A4A]">Progress</span>
                        <span className={`${isComplete ? 'text-[#4ECDC4]' : 'text-[#6B7280]'}`}>
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${progressPercentage}%` }}
                          className={`h-full transition-all duration-500 ${
                            isComplete ? 'bg-[#4ECDC4]' : 'bg-[#FFE66D]'
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
            <div className="max-w-md space-y-6">
              <Lock className="h-14 w-14 sm:h-16 sm:w-16 text-gray-400 mx-auto" />
              <h2 className="text-3xl font-bold text-[#2D3142] font-['Comic_Sans_MS']">
                Adventure Awaits!
              </h2>
              <p className="text-[#6B7280] font-['Nunito']">
                Login to start collecting achievements and unlock math superpowers!
              </p>
              <button
                onClick={handleBeginYourJourney}
                className="w-full flex justify-center items-center gap-2 bg-transparent border-2 px-6 py-3 md:px-8 md:py-4 border-[#4ECDC4] text-[#4ECDC4] shadow-sm text-m font-medium hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 text-sm md:text-base"
              >
                Begin Your Journey
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
