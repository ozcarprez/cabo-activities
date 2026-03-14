import { Shield, Zap, Heart, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your payment is protected with bank-level encryption. Book with confidence.',
    color: 'text-cabo-ocean',
    bg: 'bg-cabo-ocean/10',
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    description: 'Get your booking confirmed immediately. No waiting, no uncertainty.',
    color: 'text-cabo-sunset',
    bg: 'bg-cabo-sunset/10',
  },
  {
    icon: Heart,
    title: 'Verified Operators',
    description: 'Every operator is vetted for safety, quality, and guest satisfaction.',
    color: 'text-cabo-coral',
    bg: 'bg-cabo-coral/10',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our local team is always available to help before, during, and after your trip.',
    color: 'text-cabo-agave',
    bg: 'bg-cabo-agave/10',
  },
];

export function WhySection() {
  return (
    <section className="py-20 bg-cabo-dark relative overflow-hidden grain-overlay">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 border border-white/5 rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 border border-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cabo-ocean/5 rounded-full blur-3xl" />

      <div className="section-padding relative z-10">
        <div className="text-center mb-16">
          <span className="font-accent text-xs uppercase tracking-[0.25em] text-cabo-turquoise mb-2 block">Why CaboXplore</span>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">Book With Confidence</h2>
          <p className="text-white/40 max-w-md mx-auto">
            We&apos;re the trusted platform for booking activities in Los Cabos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={feature.title}
              className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 opacity-0 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
