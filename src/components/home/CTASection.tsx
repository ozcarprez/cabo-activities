import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="section-padding">
        <div className="relative bg-gradient-ocean rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
          <div className="absolute top-10 right-20 w-4 h-4 bg-cabo-sunset rounded-full animate-float" />
          <div className="absolute bottom-10 left-20 w-3 h-3 bg-cabo-turquoise rounded-full animate-float" style={{ animationDelay: '2s' }} />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-cabo-sunset-warm" />
              <span className="text-sm font-medium text-white/80">Are you a tour operator in Cabo?</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
              Grow Your Business With CaboXplore
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-lg">
              Join 50+ local operators already reaching thousands of travelers. 
              List your activities, manage bookings, and grow your revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard/operator" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-cabo-ocean-deep font-bold rounded-xl hover:bg-cabo-sand transition-colors shadow-xl">
                Start Listing <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
