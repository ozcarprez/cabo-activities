'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, Globe, ChevronDown } from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-ocean rounded-xl rotate-3 group-hover:rotate-6 transition-transform" />
              <svg className="relative z-10 w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8 6 4 10 4 14a8 8 0 1016 0c0-4-4-8-8-12z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl text-cabo-ocean-deep leading-none">CaboXplore</span>
              <span className="text-[10px] font-accent uppercase tracking-[0.2em] text-cabo-sand-dark leading-none mt-0.5">Los Cabos</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/activities" className="px-4 py-2 text-sm font-medium text-cabo-dark/70 hover:text-cabo-ocean transition-colors rounded-lg hover:bg-cabo-ocean/5">
              All Activities
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-cabo-dark/70 hover:text-cabo-ocean transition-colors rounded-lg hover:bg-cabo-ocean/5">
                Categories <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-cabo-ocean/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                {[
                  { name: 'Sport Fishing', slug: 'sport-fishing', emoji: '🎣' },
                  { name: 'Snorkel & Diving', slug: 'snorkel-diving', emoji: '🤿' },
                  { name: 'Boat Tours', slug: 'boat-tours', emoji: '🚤' },
                  { name: 'ATV & Land', slug: 'atv-land', emoji: '🏜️' },
                  { name: 'Sailing & Cruises', slug: 'sailing-cruises', emoji: '⛵' },
                  { name: 'Water Sports', slug: 'water-sports', emoji: '🏄' },
                  { name: 'Cultural Tours', slug: 'cultural-tours', emoji: '🎨' },
                  { name: 'Food & Drinks', slug: 'food-drinks', emoji: '🌮' },
                ].map(cat => (
                  <Link key={cat.slug} href={`/activities?category=${cat.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-cabo-sky/30 text-cabo-dark/70 hover:text-cabo-ocean transition-colors">
                    <span className="text-lg">{cat.emoji}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/activities?featured=true" className="px-4 py-2 text-sm font-medium text-cabo-dark/70 hover:text-cabo-ocean transition-colors rounded-lg hover:bg-cabo-ocean/5">
              Featured
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-cabo-dark/60 hover:text-cabo-ocean transition-colors rounded-lg hover:bg-cabo-ocean/5">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
            <Link href="/auth/signin" className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-cabo-dark/70 hover:text-cabo-ocean transition-colors rounded-lg hover:bg-cabo-ocean/5">
              <User className="w-4 h-4" />
              Sign In
            </Link>
            <Link href="/dashboard/operator" className="hidden lg:flex btn-primary !py-2 !px-4 !text-sm">
              List Your Activity
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-cabo-dark/70 hover:text-cabo-ocean rounded-lg hover:bg-cabo-ocean/5 transition-colors">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-cabo-ocean/10 bg-white animate-slide-down">
          <div className="section-padding py-4 space-y-1">
            <Link href="/activities" className="block px-4 py-3 text-cabo-dark/70 hover:text-cabo-ocean rounded-xl hover:bg-cabo-ocean/5 transition-colors"
              onClick={() => setMobileOpen(false)}>All Activities</Link>
            <Link href="/activities?featured=true" className="block px-4 py-3 text-cabo-dark/70 hover:text-cabo-ocean rounded-xl hover:bg-cabo-ocean/5 transition-colors"
              onClick={() => setMobileOpen(false)}>Featured</Link>
            <div className="border-t border-cabo-ocean/10 my-2" />
            <Link href="/auth/signin" className="block px-4 py-3 text-cabo-dark/70 hover:text-cabo-ocean rounded-xl hover:bg-cabo-ocean/5 transition-colors"
              onClick={() => setMobileOpen(false)}>Sign In</Link>
            <Link href="/dashboard/operator" className="block btn-primary text-center mt-2"
              onClick={() => setMobileOpen(false)}>List Your Activity</Link>
          </div>
        </div>
      )}
    </header>
  );
}
