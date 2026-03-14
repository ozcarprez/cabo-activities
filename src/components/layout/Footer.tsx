import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-cabo-dark text-white/70 relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-16 -translate-y-[95%]">
        <svg viewBox="0 0 1440 60" className="w-full h-full" preserveAspectRatio="none">
          <path fill="#0A1628" d="M0,20L80,24C160,28,320,36,480,38C640,40,800,36,960,30C1120,24,1280,16,1360,12L1440,8L1440,60L0,60Z" />
        </svg>
      </div>

      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8 6 4 10 4 14a8 8 0 1016 0c0-4-4-8-8-12z" />
                </svg>
              </div>
              <span className="font-display text-xl text-white">CaboXplore</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              Your gateway to unforgettable adventures in Cabo San Lucas, Mexico. 
              Discover, book, and experience the best of Los Cabos.
            </p>
            <div className="flex gap-3">
              {['instagram', 'facebook', 'twitter'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-cabo-ocean/30 flex items-center justify-center transition-colors text-white/40 hover:text-white text-xs uppercase font-accent">
                  {social[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Activities</h4>
            <ul className="space-y-2.5">
              {['Sport Fishing', 'Snorkel & Diving', 'Whale Watching', 'Sunset Sailing', 'ATV Adventures', 'Food Tours'].map(item => (
                <li key={item}>
                  <Link href="/activities" className="text-sm text-white/50 hover:text-cabo-turquoise transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'For Operators', 'Blog', 'Careers', 'Press'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/50 hover:text-cabo-turquoise transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              {['Help Center', 'Cancellation Policy', 'Safety', 'Terms of Service', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/50 hover:text-cabo-turquoise transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} CaboXplore. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <span className="text-cabo-coral">♥</span> in Los Cabos, Mexico
          </p>
        </div>
      </div>
    </footer>
  );
}
