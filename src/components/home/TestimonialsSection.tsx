'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jennifer & Mark',
    location: 'Austin, TX',
    activity: 'Luxury Sunset Sailing Cruise',
    rating: 5,
    text: 'The sunset sail was absolutely magical. The crew, the food, the champagne toast as the sun went down behind El Arco — pure perfection. We\'ve done similar tours in Greece and Croatia but this tops them all.',
    avatar: 'JM',
    color: 'bg-cabo-ocean',
  },
  {
    name: 'David Chen',
    location: 'Vancouver, BC',
    activity: 'Deep Sea Marlin Fishing Charter',
    rating: 5,
    text: 'Caught a 200lb striped marlin on my first trip! Captain Jorge knew exactly where to go. The whole experience from booking to the catch-and-release was seamless. Already planning our return trip.',
    avatar: 'DC',
    color: 'bg-cabo-sunset',
  },
  {
    name: 'The Rodriguez Family',
    location: 'Chicago, IL',
    activity: 'Whale Watching Eco-Tour',
    rating: 5,
    text: 'Our kids (8 and 11) were absolutely amazed seeing a mother whale with her calf just meters from our boat. The marine biologist guide made it educational and exciting. Unforgettable family memory.',
    avatar: 'RF',
    color: 'bg-cabo-agave',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-sand" />

      <div className="section-padding relative z-10">
        <div className="text-center mb-12">
          <span className="font-accent text-xs uppercase tracking-[0.25em] text-cabo-ocean mb-2 block">Traveler Stories</span>
          <h2 className="heading-2">What Our Guests Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-cabo-ocean/5 shadow-sm hover:shadow-lg transition-shadow duration-300 relative opacity-0 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <Quote className="absolute top-6 right-6 w-8 h-8 text-cabo-sky/50" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-cabo-sunset-warm text-cabo-sunset-warm" />
                ))}
              </div>

              <p className="text-cabo-dark/70 text-sm leading-relaxed mb-6">{t.text}</p>

              <div className="flex items-center gap-3 pt-4 border-t border-cabo-ocean/5">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-cabo-dark text-sm">{t.name}</p>
                  <p className="text-xs text-cabo-dark/40">{t.location} · {t.activity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
