import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Orbit, ArrowUpRight, Play, Zap, Shield, Battery, Radio, Settings, Locate, ChevronDown, CheckCircle2, Activity } from 'lucide-react';

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap');

@layer components {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.015);
    background-blend-mode: luminosity;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 4px 24px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .liquid-glass::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
    background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.05) 80%, rgba(255,255,255,0.2) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
  .liquid-glass-strong {
    background: rgba(255, 255, 255, 0.02);
    background-blend-mode: luminosity;
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    border: none;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2);
    position: relative; overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .liquid-glass-strong::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.2px;
    background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.4) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
  }
}
`;

const EASE = [0.16, 1, 0.3, 1];

const BlurText = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
        hidden: {},
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-[0.25em] inline-block"
          variants={{
            hidden: { filter: 'blur(12px)', opacity: 0, y: 40 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: EASE }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Reveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ filter: 'blur(12px)', opacity: 0, y: 40 }}
    whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.2, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 lg:px-12 flex justify-between items-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="pointer-events-auto"
      >
        <button className="w-12 h-12 flex items-center justify-center rounded-full liquid-glass hover:scale-105 transition-transform duration-500">
          <Orbit className="w-6 h-6 text-white" />
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="pointer-events-auto flex items-center gap-2"
      >
        <div className="hidden md:flex items-center space-x-8 px-8 py-3 rounded-full liquid-glass mr-4">
          {['Home', 'Voyages', 'Worlds', 'Innovation', 'Launch'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors duration-300">
          <span className="text-sm uppercase tracking-[0.1em]">Claim a Spot</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </motion.div>
    </nav>
  );
};

const HeroVideo = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          class="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_115329_5e00c9c5-4d69-49b7-94c3-9c31c60bb644.mp4"
        ></video>
      `;
    }
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full object-cover" />;
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0 w-full h-full">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040A]/40 to-[#02040A]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">
        <Reveal delay={0.2}>
          <div className="px-4 py-2 rounded-full liquid-glass mb-8 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/90">New Frontiers</span>
          </div>
        </Reveal>

        <BlurText 
          text="Venture Past Our Sky Across the Universe" 
          className="text-5xl md:text-7xl lg:text-9xl font-heading italic text-balance tracking-tight mb-8 justify-center"
        />

        <Reveal delay={0.6} className="max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-white/70 font-body leading-relaxed">
            Embark on the definitive luxury sub-orbital and deep space experience. 
            Designed for those who seek to transcend the bounds of our world.
          </p>
        </Reveal>

        <Reveal delay={0.8} className="flex flex-col sm:flex-row items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full liquid-glass-strong text-white font-medium hover:scale-105 transition-all duration-300">
            Explore Voyages
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full flex items-center justify-center gap-3 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300">
            <span className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center">
              <Play className="w-4 h-4 ml-1" />
            </span>
            Watch Video
          </button>
        </Reveal>
      </div>
    </section>
  );
};

const Mission = () => {
  return (
    <section className="relative py-40 flex flex-col items-center justify-center text-center px-6" id="innovation">
      <div className="absolute top-0 right-1/2 w-px h-32 bg-gradient-to-b from-transparent to-white/20" />
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <BlurText 
        text="We are not just building ships. We are engineering the next great chapter of human history." 
        className="text-4xl md:text-6xl font-heading italic max-w-4xl text-balance tracking-tight justify-center leading-tight"
      />
    </section>
  );
};

const Specs = () => {
  const specsData = [
    { icon: <Zap className="w-5 h-5"/>, label: "Cruising Speed", value: "0.2c" },
    { icon: <Shield className="w-5 h-5"/>, label: "Hull Integrity", value: "Quantum-Weave" },
    { icon: <Settings className="w-5 h-5"/>, label: "Capacity", value: "800 Souls" },
    { icon: <Battery className="w-5 h-5"/>, label: "Life Support", value: "Infinity Loop" },
    { icon: <Radio className="w-5 h-5"/>, label: "Deep Comms", value: "Tachyon Link" },
    { icon: <CheckCircle2 className="w-5 h-5"/>, label: "Shielding", value: "Thermal-Mass" },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto" id="voyages">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <Reveal className="group h-[650px] w-full rounded-[2.5rem] liquid-glass overflow-hidden relative p-8 flex flex-col justify-end">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop" 
            alt="Space Vessel" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="relative z-20">
            <p className="text-white/70 uppercase tracking-[0.2em] text-sm mb-2">Odyssey Class</p>
            <h3 className="text-4xl font-heading italic text-white tracking-tight">The Apex Voyager</h3>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center lg:pl-12">
          <Reveal delay={0.2}>
            <h2 className="text-5xl font-heading italic mb-12 tracking-tight">Unrivaled Engineering</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {specsData.map((spec, i) => (
              <Reveal key={i} delay={0.1 * i + 0.3} className="liquid-glass p-6 rounded-3xl flex flex-col gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                  {spec.icon}
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-1">{spec.label}</p>
                  <p className="text-xl font-medium">{spec.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { title: "Zero-G Lounge", desc: "Experience true weightlessness in our premium observation deck.", icon: <Activity /> },
    { title: "Hyper-Sleep Pods", desc: "Arrive refreshed with stasis-grade hibernation chambers.", icon: <Settings /> },
    { title: "Synthetic Gravity", desc: "Maintains optimal 1G environments for extended interstellar trips.", icon: <Zap /> },
    { title: "Culinary Printers", desc: "High-fidelity molecular gastronomy for gourmet meals anywhere.", icon: <Settings /> },
    { title: "Bio-Sphere Park", desc: "A massive central terrarium generating fresh oxygen and nature.", icon: <CheckCircle2 /> },
    { title: "Quantum Computing", desc: "Real-time navigation mapping across the known universe.", icon: <Shield /> },
  ];

  return (
    <section className="relative py-32 px-6 lg:px-12 max-w-screen-2xl mx-auto">
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="mb-20 text-center">
        <Reveal>
          <h2 className="text-5xl md:text-6xl font-heading italic tracking-tight">Engineering the Impossible</h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {features.map((f, i) => (
          <Reveal key={i} delay={0.1 * i} className="liquid-glass-strong p-8 rounded-[2rem] hover:-translate-y-1 transition-transform duration-500 group">
            <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center mb-6 bg-white/5 text-white/70">
              {f.icon}
            </div>
            <h4 className="text-2xl font-heading italic mb-3">{f.title}</h4>
            <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Timeline = () => {
  const steps = [
    { title: "Atmospheric Ascent", desc: "Breach the thermosphere in under 4 minutes with multi-stage dampening." },
    { title: "Orbital Transfer", desc: "Align trajectories in low-Earth orbit as we prep the main thrusters." },
    { title: "Deep Space Cruise", desc: "Slip into the silence of the void in unparalleled quiet luxury." },
    { title: "Destination Arrival", desc: "Enter orbit around distant worlds, ready for planetary descent." }
  ];

  return (
    <section className="py-32 px-6 relative max-w-5xl mx-auto">
      <Reveal className="text-center mb-24">
        <h2 className="text-5xl font-heading italic tracking-tight">The Journey Paradigm</h2>
      </Reveal>
      
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2" />
        
        {steps.map((step, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} className={`relative flex flex-col md:flex-row items-center mb-16 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white md:-translate-x-1/2 shadow-[0_0_20px_5px_rgba(255,255,255,0.3)] z-10" />
              
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                <Reveal delay={0.2} className="liquid-glass p-8 rounded-3xl inline-block w-full text-left">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Phase {i + 1}</p>
                  <h4 className="text-2xl font-heading italic mb-3 text-white">{step.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Destinations = () => {
  const places = [
    { name: "Mars", label: "Red Sands Resort", img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1600&auto=format&fit=crop" },
    { name: "Lunar Gateway", label: "Orbital Hub", img: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=1600&auto=format&fit=crop" },
    { name: "Titan", label: "Methane Lakes", img: "https://images.unsplash.com/photo-1630839437035-dac17da580d0?q=80&w=1600&auto=format&fit=crop" },
    { name: "Europa", label: "Subsurface Oceans", img: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1600&auto=format&fit=crop" }
  ];

  return (
    <section className="py-32 px-6 lg:px-12 max-w-screen-2xl mx-auto" id="worlds">
      <div className="flex justify-between items-end mb-16">
        <Reveal>
          <h2 className="text-5xl md:text-6xl font-heading italic tracking-tight">Worlds Await</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <button className="hidden md:flex items-center gap-2 text-sm uppercase tracking-[0.1em] text-white/60 hover:text-white transition-colors">
            View All Destinations <ArrowUpRight className="w-4 h-4"/>
          </button>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {places.map((p, i) => {
          const isLarge = i === 0 || i === 3;
          return (
            <Reveal key={i} delay={0.1 * i} className={`group relative rounded-[2rem] overflow-hidden h-[400px] md:h-[500px] ${isLarge ? 'md:col-span-2' : 'col-span-1'}`}>
              <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out z-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/20 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex justify-between items-end">
                <div>
                  <p className="text-white/70 uppercase tracking-[0.2em] text-sm mb-2">{p.label}</p>
                  <h3 className="text-4xl font-heading italic text-white tracking-tight">{p.name}</h3>
                </div>
                <button className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "What is the training protocol required?", a: "All passengers undergo a 3-week orbital adaptation program at our terrestrial center before boarding." },
    { q: "How secure is the quantum drive?", a: "Our proprietary systems feature triple-redundant fail-safes and real-time core shielding." },
    { q: "Can I bring biological pets?", a: "Currently, only registered service synthetics are permitted on Class-A deep space cruises." },
    { q: "What medical facilities are aboard?", a: "A fully staffed Tier 1 trauma and stasis recovery bay operates 24/7." },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="py-32 px-6 max-w-4xl mx-auto">
      <Reveal className="text-center mb-16">
        <h2 className="text-5xl font-heading italic tracking-tight">Common Inquiries</h2>
      </Reveal>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={0.1 * i}>
              <button 
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left liquid-glass p-6 rounded-3xl group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-white/50 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-white/60 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 pt-24 pb-8 px-6 lg:px-12 max-w-screen-2xl mx-auto mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <div className="lg:col-span-6 flex flex-col gap-8">
          <Orbit className="w-8 h-8 text-white" />
          <h2 className="text-6xl font-heading italic tracking-tight max-w-md">The universe is calling.</h2>
          <div className="flex gap-4 max-w-md mt-4">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="w-full liquid-glass rounded-full px-6 py-4 outline-none text-sm placeholder:text-white/30 placeholder:tracking-[0.1em]"
            />
            <button className="px-8 rounded-full bg-white text-black text-sm uppercase tracking-[0.1em] font-medium hover:bg-white/90">
              Subscribe
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-4">
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">Missions</p>
          {['Orbital Edge', 'Lunar Base Alpha', 'Mars Horizon', 'Deep Voyager'].map(link => (
            <a key={link} href="#" className="text-white/70 hover:text-white transition-colors">{link}</a>
          ))}
        </div>

        <div className="lg:col-span-3 flex flex-col gap-4">
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">Company</p>
          {['Our Story', 'Engineering', 'Careers', 'Press'].map(link => (
            <a key={link} href="#" className="text-white/70 hover:text-white transition-colors">{link}</a>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
        <p className="text-white/40 text-sm tracking-wide">© 2026 OMNI GALACTIC. ALL RIGHTS RESERVED.</p>
        
        <div className="flex items-center gap-6">
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Partners:</span>
          <span className="font-heading italic text-xl text-white/60">Aeon</span>
          <span className="font-heading italic text-xl text-white/60">Vela</span>
          <span className="font-heading italic text-xl text-white/60">Zeno</span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="min-h-screen bg-[#02040A] font-body selection:bg-white/30 selection:text-white overflow-x-hidden text-white w-full">
        <Navbar />
        <main>
          <Hero />
          <Mission />
          <Specs />
          <Features />
          <Timeline />
          <Destinations />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
}
