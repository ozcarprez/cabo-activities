'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl text-white leading-none">CaboXplore</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link href="/auth/signin" className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg">
              <User className="w-4 h-4" />
              Sign In
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white rounded-lg transition-colors">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-cabo-dark/90 backdrop-blur-sm animate-slide-down">
          <div className="section-padding py-4 space-y-1">
            <Link href="/activities" className="block px-4 py-3 text-white/70 hover:text-white rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}>All Activities</Link>
            <div className="border-t border-white/10 my-2" />
            <Link href="/auth/signin" className="block px-4 py-3 text-white/70 hover:text-white rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}>Sign In</Link>
          </div>
        </div>
      )}
    </header>
  );
}
