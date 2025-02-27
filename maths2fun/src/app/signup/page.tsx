'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/Toastcontext';

export default function SignupPage() {
  const { signup, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const {addToast} = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      router.push('/login');
      addToast("Signup Success",'success')
    } catch (error:unknown) {
      if (error instanceof Error) {
        setError(error.message);
        addToast(error.message, 'error');
      } else {
        setError('An unexpected error occurred');
        addToast('An unexpected error occurred', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Create Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
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
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-m font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none"
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