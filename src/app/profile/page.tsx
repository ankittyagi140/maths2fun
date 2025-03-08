'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebase-config';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

import {Loader} from '@/components/ui/Loader';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { useToast } from '@/context/Toastcontext';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const {addToast} = useToast();
  const {isAuth} = useAuth();

  useEffect(() => {
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName || '');
    }
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setLoadingProfile(true);
    try {
      await updateProfile(auth.currentUser, { displayName });
      addToast('Profile updated successfully!','success' );
    } catch (error) {
      addToast((error as Error).message || 'Failed to update profile', 'error' );
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user?.email) return;

    if (newPassword !== confirmPassword) {
      addToast( 'New passwords do not match','error' );
      return;
    }

    setLoadingPassword(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      addToast( 'Password updated successfully!','success' );
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      addToast((error as Error).message || 'Failed to update password', 'error' );
    } finally {
      setLoadingPassword(false);
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Lock className="h-14 w-14 sm:h-16 sm:w-16 text-gray-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Please login to change your profile information and security settings.
          </p>
          <Link
            href="/login"
            className="w-full flex justify-center items-center gap-2 bg-transparent border-2 px-6 py-3 md:px-8 md:py-4 border-[#4ECDC4] text-[#4ECDC4] shadow-sm text-m font-medium hover:bg-[#4ECDC4] hover:text-white transition-colors duration-300 text-sm md:text-base"
          >
            Login to Continue
          </Link>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-4 sm:gap-6">
            <div className="flex-1">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Profile Section */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Profile Information</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-sm sm:text-base font-medium mb-1.5">Email</label>
                      <input
                        type="email"
                        value={auth.currentUser?.email || ''}
                        disabled
                        className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-medium mb-1.5">Display Name</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        disabled={loadingProfile}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loadingProfile}
                      className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-m font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none"
                    >
                      {loadingProfile ? (
                        <>
                          <Loader className="h-4 w-4 sm:h-5 sm:w-5" />
                          Updating...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </button>
                  </form>
                </div>

                {/* Password Section */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Security Settings</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-sm sm:text-base font-medium mb-1.5">Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        required
                        disabled={loadingPassword}
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-medium mb-1.5">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        required
                        disabled={loadingPassword}
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-medium mb-1.5">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        required
                        disabled={loadingPassword}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loadingPassword}
                      className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-m font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none"
                    >
                      {loadingPassword ? (
                        <>
                          <Loader className="h-4 w-4 sm:h-5 sm:w-5" />
                          Updating...
                        </>
                      ) : (
                        'Change Password'
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}