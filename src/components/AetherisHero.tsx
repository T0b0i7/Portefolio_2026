import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { FadingVideo } from './FadingVideo';
import { BlurText } from './BlurText';

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4';

export function AetherisHero() {
  const fadeUp = (delay: number) => ({
    initial: { filter: 'blur(10px)' as any, opacity: 0, y: 20 },
    animate: { filter: 'blur(0px)' as any, opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut', delay },
  });

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: '120%', height: '120%' }}
      />

      <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <a
            href="#"
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.01)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <span className="text-white lowercase text-lg" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>a</span>
          </a>

          <div
            className="hidden lg:flex items-center gap-0 px-1.5 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.01)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            {['Home', 'Voyages', 'Worlds', 'Innovation', 'Plan Launch'].map((link) => (
              <a
                key={link}
                href="#"
                className="px-3 py-2 text-sm font-medium text-white/90"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              className="ml-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1"
            >
              Claim a Spot
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="w-12 h-12" />
        </div>
      </nav>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">
          <motion.div
            {...fadeUp(0.4)}
            className="inline-flex items-center rounded-full px-0 py-0"
            style={{
              background: 'rgba(255,255,255,0.01)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full">
              New
            </span>
            <span className="text-sm text-white/90 pr-3" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Maiden Crewed Voyage to Mars Arrives 2026
            </span>
          </motion.div>

          <div className="mt-6">
            <BlurText
              text="Venture Past Our Sky Across the Universe"
              className="text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[0.8] max-w-2xl tracking-[-4px]"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
            />
          </div>

          <motion.p
            {...fadeUp(0.8)}
            className="mt-4 text-sm md:text-base text-white max-w-2xl font-light leading-tight"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering bring deep-space exploration within reach—secure and extraordinary.
          </motion.p>

          <motion.div
            {...fadeUp(1.1)}
            className="flex items-center gap-6 mt-6"
          >
            <a
              href="#"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2"
              style={{
                background: 'rgba(255,255,255,0.01)',
                backdropFilter: 'blur(50px)',
                WebkitBackdropFilter: 'blur(50px)',
                boxShadow: '4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15)',
              }}
            >
              Start Your Voyage
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white text-sm font-medium flex items-center gap-2"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              <Play className="w-4 h-4 fill-current" />
              View Liftoff
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(1.3)}
            className="flex items-stretch gap-4 mt-8"
          >
            <div
              className="p-5 w-[220px] rounded-[1.25rem]"
              style={{
                background: 'rgba(255,255,255,0.01)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p className="text-4xl mt-3 tracking-[-1px] leading-none text-white" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
                34.5 Min
              </p>
              <p className="text-xs text-white mt-2 font-light" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Average Videos Watch Time
              </p>
            </div>
            <div
              className="p-5 w-[220px] rounded-[1.25rem]"
              style={{
                background: 'rgba(255,255,255,0.01)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <p className="text-4xl mt-3 tracking-[-1px] leading-none text-white" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
                2.8B+
              </p>
              <p className="text-xs text-white mt-2 font-light" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Users Across the Globe
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(1.4)}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <div
            className="rounded-full px-3.5 py-1 text-xs font-medium text-white"
            style={{
              background: 'rgba(255,255,255,0.01)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            Collaborating with top aerospace pioneers globally
          </div>
          <div
            className="flex items-center gap-6 md:gap-10 text-2xl md:text-3xl text-white tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            <span>Aeon</span>
            <span className="text-white/40 font-body text-xl">·</span>
            <span>Vela</span>
            <span className="text-white/40 font-body text-xl">·</span>
            <span>Apex</span>
            <span className="text-white/40 font-body text-xl">·</span>
            <span>Orbit</span>
            <span className="text-white/40 font-body text-xl">·</span>
            <span>Zeno</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
