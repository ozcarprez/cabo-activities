'use client';

import { useState } from 'react';
import { Search, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { categories } from '@/lib/sample-data';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1585178667555-57d57e0a2035?w=1920&q=80"
          alt="El Arco de Cabo San Lucas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cabo-dark/60 via-cabo-dark/40 to-cabo-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-cabo-ocean-deep/30 to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 right-10 w-72 h-72 bg-cabo-turquoise/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cabo-sunset/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      {/* Content */}
      <div className="relative z-10 section-padding w-full pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-dark rounded-full mb-8 opacity-0 animate-fade-in">
            <span className="w-2 h-2 bg-cabo-turquoise rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              200+ unforgettable experiences in Los Cabos
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6 opacity-0 animate-slide-up stagger-1">
            Discover<br />
            <span className="text-cabo-turquoise">Cabo San Lucas</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed opacity-0 animate-slide-up stagger-2">
            From thrilling deep-sea fishing to magical sunset sails past El Arco — 
            find and book the adventure of a lifetime.
          </p>

          {/* Search bar */}
          <div className="glass rounded-2xl p-2 sm:p-3 max-w-3xl opacity-0 animate-slide-up stagger-3 shadow-2xl shadow-black/20">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Activity search */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cabo-ocean/5 transition-colors cursor-pointer">
                <Search className="w-5 h-5 text-cabo-ocean shrink-0" />
                <div className="flex-1">
                  <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block">Activity</label>
                  <input
                    type="text"
                    placeholder="What do you want to do?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-cabo-dark placeholder:text-cabo-dark/30 text-sm focus:outline-none mt-0.5"
                  />
                </div>
              </div>

              <div className="hidden sm:block w-px bg-cabo-ocean/10 my-2" />

              {/* Date */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cabo-ocean/5 transition-colors cursor-pointer sm:w-48">
                <Calendar className="w-5 h-5 text-cabo-ocean shrink-0" />
                <div>
                  <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block">Date</label>
                  <span className="text-sm text-cabo-dark/40 mt-0.5 block">Pick a date</span>
                </div>
              </div>

              <div className="hidden sm:block w-px bg-cabo-ocean/10 my-2" />

              {/* Category */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cabo-ocean/5 transition-colors cursor-pointer sm:w-48">
                <MapPin className="w-5 h-5 text-cabo-ocean shrink-0" />
                <div className="flex-1">
                  <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block">Category</label>
                  <span className="text-sm text-cabo-dark/40 mt-0.5 block">All categories</span>
                </div>
                <ChevronDown className="w-4 h-4 text-cabo-dark/30" />
              </div>

              {/* Search button */}
              <button className="btn-accent !rounded-xl !px-8 !py-4 sm:!py-3 whitespace-nowrap">
                <Search className="w-5 h-5 sm:mr-2" />
                <span className="sm:inline hidden">Search</span>
              </button>
            </div>
          </div>

          {/* Quick category pills */}
          <div className="flex flex-wrap gap-2 mt-6 opacity-0 animate-fade-in stagger-4">
            <span className="text-sm text-white/40 py-1.5">Popular:</span>
            {['Whale Watching', 'Sunset Sailing', 'Fishing', 'Snorkel', 'Tacos & Tequila'].map(tag => (
              <a key={tag} href={`/activities?q=${encodeURIComponent(tag)}`}
                className="px-3.5 py-1.5 text-sm text-white/70 border border-white/15 rounded-full hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                {tag}
              </a>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-8 left-0 right-0 section-padding">
          <div className="flex items-center gap-8 sm:gap-12 opacity-0 animate-fade-in stagger-5">
            {[
              { number: '10K+', label: 'Happy Travelers' },
              { number: '200+', label: 'Experiences' },
              { number: '4.8', label: 'Avg Rating' },
              { number: '50+', label: 'Local Operators' },
            ].map(stat => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-xs text-white/40 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path fill="#FAFAFA"
            d="M0,40L60,42C120,44,240,48,360,48C480,48,600,44,720,38C840,32,960,24,1080,28C1200,32,1320,48,1380,56L1440,64L1440,80L0,80Z" />
        </svg>
      </div>
    </section>
  );
}
