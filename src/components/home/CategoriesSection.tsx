'use client';

import Link from 'next/link';
import { categories } from '@/lib/sample-data';

const categoryEmojis: Record<string, { emoji: string; gradient: string }> = {
  'sport-fishing': { emoji: '🎣', gradient: 'from-blue-500/10 to-cyan-500/10' },
  'snorkel-diving': { emoji: '🤿', gradient: 'from-teal-500/10 to-emerald-500/10' },
  'boat-tours': { emoji: '🚤', gradient: 'from-sky-500/10 to-blue-500/10' },
  'atv-land': { emoji: '🏜️', gradient: 'from-amber-500/10 to-orange-500/10' },
  'sailing-cruises': { emoji: '⛵', gradient: 'from-indigo-500/10 to-purple-500/10' },
  'water-sports': { emoji: '🏄', gradient: 'from-cyan-500/10 to-blue-500/10' },
  'cultural-tours': { emoji: '🎨', gradient: 'from-rose-500/10 to-pink-500/10' },
  'food-drinks': { emoji: '🌮', gradient: 'from-orange-500/10 to-red-500/10' },
};

export function CategoriesSection() {
  return (
    <section className="py-20 bg-cabo-white relative">
      <div className="section-padding">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="font-accent text-xs uppercase tracking-[0.25em] text-cabo-ocean mb-2 block">Explore by category</span>
            <h2 className="heading-2">Find Your Adventure</h2>
          </div>
          <Link href="/activities" className="hidden sm:block text-sm font-semibold text-cabo-ocean hover:text-cabo-ocean-deep transition-colors">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const meta = categoryEmojis[cat.slug] || { emoji: '🌊', gradient: 'from-gray-500/10 to-gray-500/10' };
            return (
              <Link key={cat.id} href={`/activities?category=${cat.slug}`}
                className={`group relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-br ${meta.gradient} border border-white/50 
                hover:shadow-xl hover:shadow-cabo-ocean/10 hover:-translate-y-1 transition-all duration-300
                opacity-0 animate-slide-up`}
                style={{ animationDelay: `${i * 0.06}s` }}>
                <span className="text-3xl sm:text-4xl mb-3 block">{meta.emoji}</span>
                <h3 className="font-semibold text-cabo-dark text-sm sm:text-base mb-1">{cat.name}</h3>
                <p className="text-xs text-cabo-dark/45 line-clamp-2 leading-relaxed">{cat.description}</p>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cabo-ocean/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
