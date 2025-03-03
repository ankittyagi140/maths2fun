'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';
import { useToast } from "@/context/Toastcontext";
import { Loader } from '@/components/ui/Loader';

export default function LoginPage() {
  const { login, googleLogin, loading, isAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      addToast('User Login Success', 'success')
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        addToast(error.message, 'error');
      } else {
        addToast('An unexpected error occurred', 'error');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (!isAuth) {
        await googleLogin()
        addToast('User Login Success', 'success')
        router.push('/');
      } else {
        addToast("User is already login", 'error')
      }
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        addToast(error.message, 'error');
      } else {
        addToast('An unexpected error occurred', 'error');
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {
          loading ? <Loader /> : null
        }

        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
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
              className="w-full flex justify-center items-center gap-2 bg-transparent border-2 px-6 py-3 md:px-8 md:py-4 border-[#4ECDC4] text-[#4ECDC4] shadow-sm text-m font-medium hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 text-sm md:text-base"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center gap-2  bg-[#FF6B6B] text-white px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-[#ff8585] transition-colors duration-300 text-sm md:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V9h2c1.1 0 2-.9 2-2V5.08c2.87.86 5 3.54 5 6.92 0 2.21-.98 4.19-2.53 5.39z" />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don&ldquo;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
} 