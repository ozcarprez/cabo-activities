'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-cabo-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cabo-sky/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-cabo-sunset/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-ocean rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8 6 4 10 4 14a8 8 0 1016 0c0-4-4-8-8-12z" />
              </svg>
            </div>
            <span className="font-display text-2xl text-cabo-ocean-deep">CaboXplore</span>
          </Link>
          <h1 className="heading-2 mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="text-cabo-dark/50">
            {isSignUp ? 'Start booking amazing experiences in Cabo' : 'Sign in to manage your bookings and reviews'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-cabo-ocean/10 p-6 sm:p-8 shadow-xl shadow-cabo-ocean/5">
          {/* Social login */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 hover:bg-cabo-ocean/5 transition-colors text-sm font-medium text-cabo-dark mb-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cabo-ocean/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs text-cabo-dark/30 uppercase tracking-wider">or</span>
            </div>
          </div>

          {/* Email form */}
          <form className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Full Name</label>
                <input type="text" placeholder="Your name" className="w-full px-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10" />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-cabo-dark/25" />
                <input type="email" placeholder="you@example.com" className="w-full pl-11 pr-4 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-cabo-dark/25" />
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full pl-11 pr-11 py-3 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cabo-dark/25 hover:text-cabo-dark/50">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-cabo-ocean hover:underline">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="w-full btn-accent !py-3.5 flex items-center justify-center gap-2">
              {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-cabo-dark/40 mt-6">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-cabo-ocean font-medium hover:underline">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
