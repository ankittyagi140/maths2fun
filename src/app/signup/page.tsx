'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/Toastcontext';
import { Loader } from '@/components/ui/Loader';

export default function SignupPage() {
  const { signup, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const {addToast} = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      router.push('/login');
      addToast("Signup Success, Please login to Continue",'success')
    } catch (error:unknown) {
      if (error instanceof Error) {
        addToast(error.message, 'error');
      } else {
        addToast('An unexpected error occurred', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {loading ? <Loader/> : null}
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Create Account</h2>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full p-2.5 sm:p-3 border rounded-lg  focus:ring-blue-500 text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="w-full p-2.5 sm:p-3 border rounded-lg  focus:ring-blue-500 text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-transparent px-6 py-3 md:px-8 md:py-4 border-2 border-[#4ECDC4] text-[#4ECDC4] shadow-sm text-m font-medium hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 text-sm md:text-base"
            >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
} 