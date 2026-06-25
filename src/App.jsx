import React, { useState, useEffect, useRef } from 'react';

// --- SCROLL REVEAL COMPONENT ---
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.15 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

function App() {
  const [filmIdx, setFilmIdx] = useState(0);
  const [colorMode, setColorMode] = useState(false); 
  const [localReveal, setLocalReveal] = useState({}); 
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  
  // Footer Auto-Scroll State
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const tvTitles = [
    { title: 'STATIC //', sub: 'NOISE' },
    { title: 'WAVE', sub: 'LENGTH' },
    { title: 'CHROMA', sub: '' },
    { title: 'PRESS /', sub: 'PAUSE' }
  ];

  const films = [
    { id: '01', title: 'MIDNIGHT STANCE', meta: 'JDM CIVIC — 2026', bg: 'bg-gradient-to-br from-[#1a1410] to-[#0a0806]' },
    { id: '02', title: 'RWP AUTO SHOW', meta: 'EVENT RECAP — 2025', bg: 'bg-gradient-to-br from-[#0d1a0d] to-[#050a05]' },
    { id: '03', title: 'HIGH-END TAILORING', meta: 'BRAND FILM — 2026', bg: 'bg-gradient-to-br from-[#1a0d1a] to-[#080408]' },
    { id: '04', title: 'MUSHTAQ CAMPAIGN', meta: 'COMMERCIAL — 2025', bg: 'bg-gradient-to-br from-[#1a1a0d] to-[#080806]' },
  ];

  const thumbnails = [
    { id: 't1', title: 'Cover / Issue 14', cat: 'EDITORIAL', span: 'col-span-12 md:col-span-7', aspect: 'aspect-square md:aspect-video', swatch: 'from-[#c8341f] via-[#e8761a] to-[#1a3c5e]' },
    { id: 't2', title: 'Short / Vertical', cat: 'DOCUMENTARY', span: 'col-span-12 md:col-span-5', aspect: 'aspect-[4/5]', swatch: 'from-[#1a3a2e] to-[#f4efe6]' },
    { id: 't3', title: 'YouTube / Long-form', cat: 'SERIES', span: 'col-span-12 md:col-span-4', aspect: 'aspect-video', swatch: 'from-[#1e1a3a] to-[#e8c062]' },
    { id: 't4', title: 'Series / Episode 03', cat: 'MINI SERIES', span: 'col-span-12 md:col-span-4', aspect: 'aspect-video', swatch: 'from-[#0e1e2e] to-[#c8e8f8]' },
    { id: 't5', title: 'Brand / Campaign', cat: 'COMMERCIAL', span: 'col-span-12 md:col-span-4', aspect: 'aspect-video', swatch: 'from-[#2e1a0a] to-[#f4c070]' },
    { id: 't6', title: 'Podcast / Visual ID', cat: 'IDENTITY', span: 'col-span-12 md:col-span-6', aspect: 'aspect-[4/3]', swatch: 'from-[#0a1a0a] to-[#6cd46c]' },
    { id: 't7', title: 'Social / Reel Cover', cat: 'SOCIAL', span: 'col-span-12 md:col-span-6', aspect: 'aspect-[4/3]', swatch: 'from-[#1a0e1e] to-[#f8a8d0]' },
  ];

  const handleThumbClick = (id) => {
    setLocalReveal(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Footer Scroll Logic
  useEffect(() => {
    let interval;
    if (isAutoScrolling && scrollRef.current) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += 1;
          if (scrollRef.current.scrollTop >= scrollRef.current.scrollHeight / 2) {
            scrollRef.current.scrollTop = 0;
          }
        }
      }, 25);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleScrollInteraction = () => {
    setIsAutoScrolling(false);
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  // --- NTFY FORM SUBMIT LOGIC ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const notificationBody = `Name: ${name}\nEmail: ${email}\n\nProject Details:\n${message}`;

    // IMPORTANT: Change this to your secret topic string!
    const ntfyTopic = "ccc-portfolio-quotes-x9f2a"; 
    
    try {
      await fetch(`https://ntfy.sh/${ntfyTopic}`, {
        method: 'POST',
        body: notificationBody,
        headers: {
          'Title': 'New Quote Request! (CCC)',
          'Tags': 'clapper,envelope',
          'Priority': 'urgent'
        }
      });
      
      alert("Quote request sent successfully! I'll get back to you soon.");
      e.target.reset();
      
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Something went wrong. Please use the direct links below to contact me.");
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-[#C8341F] selection:text-white bg-[#F4EFE6] scroll-smooth">
      <div className="grain-overlay pointer-events-none"></div>

      {/* CUSTOM CURSOR */}
      <div className="fixed top-0 left-0 w-2 h-2 bg-[#C8341F] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden md:block" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}></div>
      <div className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-[#0E0D0B] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out hidden md:block" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}></div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-[#F4EFE6]/90 backdrop-blur-md border-b border-[#0E0D0B]/10">
        <a href="#home" className="flex flex-col shrink-0 pr-4">
          <span className="font-serif text-2xl font-black italic tracking-tighter text-[#0E0D0B]">CCC</span>
          <span className="font-sans text-[0.55rem] tracking-[0.2em] font-medium text-[#C8341F]">CREATIVE CUT CO.</span>
        </a>
        
        <ul className="flex items-center gap-4 md:gap-6 font-mono text-[0.55rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-[#7A7268] overflow-x-auto no-scrollbar whitespace-nowrap">
          <li><a href="#home" className="hover:text-[#0E0D0B] transition-colors">Home</a></li>
          <li><a href="#films" className="hover:text-[#0E0D0B] transition-colors">Projects</a></li>
          <li><a href="#thumbnails" className="hover:text-[#0E0D0B] transition-colors">Gallery</a></li>
          <li><a href="#skills" className="hover:text-[#0E0D0B] transition-colors">Skills</a></li>
          <li><a href="#director" className="hover:text-[#0E0D0B] transition-colors">About Me</a></li>
          <li><a href="#contact" className="hover:text-[#C8341F] transition-colors font-bold text-[#0E0D0B]">Contact Me</a></li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 relative overflow-hidden">
        <FadeIn>
          <div className="font-mono text-[0.65rem] tracking-[0.25em] text-[#C8341F] uppercase mb-6 text-center">CCC STUDIOS</div>
          <h1 className="font-serif text-5xl md:text-7xl font-black italic tracking-tighter leading-none text-center mb-4">
            EVERY<br /><em className="text-[#C8341F]">FRAME</em><br />MATTERS
          </h1>
          <p className="font-sans text-sm md:text-base text-[#7A7268] tracking-wider text-center mb-12">Cinematic Motion & Design</p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-[#0E0D0B] rounded-2xl p-4 md:p-7 shadow-[0_20px_80px_rgba(14,13,11,0.35)] relative">
              <div className="relative aspect-video bg-[#050504] rounded-md overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1410_0%,#050504_70%)]"></div>
                <div className="absolute inset-0 scanlines z-10 pointer-events-none"></div>
                <div className="relative z-30 text-center flex flex-col items-center">
                  <h2 className="font-serif text-4xl md:text-6xl font-black italic text-[#F4EFE6] leading-none drop-shadow-2xl">
                    {tvTitles[filmIdx].title}<br />
                    <span className="text-[#C8341F]">{tvTitles[filmIdx].sub}</span>
                  </h2>
                </div>
              </div>
              <div className="flex justify-center gap-4 md:gap-8 pt-6 pb-2 relative z-40">
                <button onClick={() => setFilmIdx((prev) => (prev - 1 + tvTitles.length) % tvTitles.length)} className="font-mono text-[0.65rem] tracking-[0.12em] text-[#7A7268] border border-[#7A7268]/30 px-4 py-2 rounded hover:bg-[#2A2926] transition-all cursor-pointer">REWIND</button>
                <button className="font-mono text-[0.65rem] tracking-[0.12em] text-[#C8341F] border border-[#C8341F] px-4 py-2 rounded cursor-pointer">PLAY</button>
                <button onClick={() => setFilmIdx((prev) => (prev + 1) % tvTitles.length)} className="font-mono text-[0.65rem] tracking-[0.12em] text-[#7A7268] border border-[#7A7268]/30 px-4 py-2 rounded hover:bg-[#2A2926] transition-all cursor-pointer">FFWD</button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 01 / THE REEL */}
      <section id="films" className="pt-24 pb-12 relative z-10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-6 mb-8">
             <div className="font-mono text-[0.6rem] text-[#C8341F] tracking-[0.2em] mb-2">01 / PROJECTS</div>
             <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0E0D0B] leading-none">Selected<br /><em className="italic">Works</em></h2>
          </div>
        </FadeIn>
        
        <FadeIn delay={200}>
          <div className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-8 snap-x no-scrollbar cursor-grab active:cursor-grabbing">
            {films.map((film) => (
              <article key={film.id} className="relative w-[85vw] md:w-[400px] aspect-video rounded-lg overflow-hidden shrink-0 snap-center group cursor-pointer">
                <div className={`absolute inset-0 ${film.bg} transition-transform duration-[6000ms] group-hover:scale-110`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B]/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-5 z-30">
                  <span className="font-mono text-[0.55rem] text-[#C8341F] tracking-[0.2em] block mb-1">{film.id}</span>
                  <h3 className="font-serif text-lg md:text-xl font-black italic text-[#F4EFE6] leading-tight">{film.title}</h3>
                  <span className="font-mono text-[0.55rem] text-[#F4EFE6]/50 tracking-[0.15em] block mt-1">{film.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 02 / THUMBNAIL GALLERY */}
      <section id="thumbnails" className="pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between border-b border-[#0E0D0B]/10 pb-4 gap-4 mb-8">
              <div>
                <div className="font-mono text-[0.6rem] text-[#C8341F] tracking-[0.2em] mb-2">02 / THUMBNAILS</div>
                <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0E0D0B] leading-none">The<br /><em className="italic">Gallery</em></h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.6rem] tracking-[0.15em] text-[#7A7268] pr-2">
                  CLICK TILE TO REVEAL OR →
                </span>
                <button 
                  onClick={() => setColorMode(!colorMode)}
                  className={`font-mono text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border rounded flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                    colorMode ? 'bg-[#0E0D0B] text-[#F4EFE6] border-[#0E0D0B]' : 'bg-transparent text-[#7A7268] border-[#0E0D0B]/20 hover:bg-[#0E0D0B] hover:text-[#F4EFE6]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${colorMode ? 'bg-[#4CAF50]' : 'bg-[#B8B3A8]'}`}></span>
                  TOGGLE ALL
                </button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid grid-cols-12 gap-3 md:gap-5">
               {thumbnails.map((thumb) => {
                 const isRevealed = colorMode || localReveal[thumb.id];
                 return (
                  <div 
                    key={thumb.id} 
                    onClick={() => handleThumbClick(thumb.id)}
                    className={`${thumb.span} relative rounded-lg bg-[#2A2926] ${thumb.aspect} overflow-hidden cursor-pointer group`}
                  >
                     <div className={`w-full h-full bg-gradient-to-br ${thumb.swatch} transition-all duration-500 ease-out ${isRevealed ? 'grayscale-0 contrast-100 brightness-100' : 'grayscale contrast-125 brightness-90 group-hover:grayscale-[50%]'}`}></div>
                     
                     <div className={`absolute inset-0 bg-gradient-to-br from-[#0E0D0B]/60 to-[#F4EFE6]/5 mix-blend-color transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}></div>
                     
                     <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#0E0D0B]/90 to-transparent flex items-end justify-between z-10">
                       <span className="font-mono text-[0.6rem] text-[#F4EFE6] tracking-[0.16em] uppercase">{thumb.title}</span>
                       <span className="font-mono text-[0.5rem] text-[#C8341F] tracking-[0.18em]">{thumb.cat}</span>
                     </div>
                  </div>
                 );
               })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 03 / SKILLS */}
      <section id="skills" className="pt-16 pb-24 px-6 border-t border-[#0E0D0B]/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="font-mono text-[0.6rem] text-[#C8341F] tracking-[0.2em] mb-6">03 / SKILLS</div>
            <h2 className="font-serif text-5xl md:text-8xl font-black text-[#0E0D0B] leading-[0.85] tracking-tighter uppercase break-words">
              Video Edit<br/>
              <span className="text-[#C8341F] italic">& Graphic</span><br/>
              Design.
            </h2>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#0E0D0B]/20 pt-8">
              <div>
                <div className="font-mono text-[0.6rem] text-[#7A7268] tracking-[0.18em] mb-2">01. VIDEO</div>
                <ul className="font-sans font-bold text-lg text-[#0E0D0B] space-y-1">
                  <li>Premiere Pro</li>
                  <li>After Effects</li>
                  <li>DaVinci Resolve</li>
                  <li>CapCut PC</li>
                </ul>
              </div>
              <div>
                <div className="font-mono text-[0.6rem] text-[#7A7268] tracking-[0.18em] mb-2">02. DESIGN</div>
                <ul className="font-sans font-bold text-lg text-[#0E0D0B] space-y-1">
                  <li>Photoshop</li>
                  <li>Illustrator</li>
                  <li>Figma</li>
                  <li>Brand Identity</li>
                </ul>
              </div>
              <div>
                <div className="font-mono text-[0.6rem] text-[#7A7268] tracking-[0.18em] mb-2">03. WEB</div>
                <ul className="font-sans font-bold text-lg text-[#0E0D0B] space-y-1">
                  <li>React JS</li>
                  <li>Tailwind CSS</li>
                  <li>Vite</li>
                  <li>Git / Vercel</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 04 / DIRECTOR'S NOTE */}
      <section id="director" className="pt-24 pb-24 px-6 bg-[#0E0D0B] text-[#F4EFE6]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="border-b border-[#F4EFE6]/10 pb-4 mb-12">
              <div className="font-mono text-[0.6rem] text-[#C8341F] tracking-[0.2em] mb-2">04 / ABOUT ME</div>
              <h2 className="font-serif text-3xl md:text-5xl font-black leading-none">Founder<br /><em className="italic text-[#C8341F]">of CCC</em></h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <FadeIn delay={200}>                
            </FadeIn>

            <FadeIn delay={400}>
              <div className="flex flex-col gap-6">
                <blockquote className="font-serif text-xl md:text-3xl font-bold italic border-l-4 border-[#C8341F] pl-6">
                  "At Creative Cut Co., we believe every frame is a decision."
                </blockquote>
                <p className="text-base text-[#F4EFE6]/80 leading-relaxed">
                  I bridge the gap between cinematic motion and structural design. As a computer science student based in Rawalpindi, my technical background allows me to push creative boundaries across video editing, brand identity, and web development.
                </p>
                <p className="text-base text-[#F4EFE6]/80 leading-relaxed">
                  Whether crafting high-octane automotive edits, elegant fashion commercials, or full digital ecosystems, my goal is always visual precision.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 05 / FOOTER / CONTACTS */}
      <footer id="contact" className="bg-[#0E0D0B] text-[#F4EFE6] pt-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center pb-12">
               <div className="font-mono text-[0.6rem] text-[#C8341F] tracking-[0.2em] mb-2">05 / GET IN TOUCH</div>
               <h2 className="font-serif text-4xl md:text-6xl font-black italic mb-4">Let's Build.</h2>
               <p className="font-sans text-[#7A7268] max-w-md mx-auto text-sm md:text-base">
                 Ready to elevate your visuals? Fill out the form below to start the conversation, or reach out through my direct links.
               </p>
            </div>
          </FadeIn>

          {/* CONTACT FORM */}
          <FadeIn delay={200}>
            <div className="max-w-2xl mx-auto mb-20 bg-[#161513] p-6 md:p-10 rounded-xl border border-[#F4EFE6]/5 shadow-2xl relative z-20">
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[0.6rem] text-[#7A7268] tracking-[0.2em] uppercase">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Your name" 
                      className="bg-transparent border-b border-[#F4EFE6]/20 py-2 text-[#F4EFE6] font-sans focus:outline-none focus:border-[#C8341F] transition-colors placeholder:text-[#F4EFE6]/20 rounded-none w-full" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[0.6rem] text-[#7A7268] tracking-[0.2em] uppercase">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="john@example.com" 
                      className="bg-transparent border-b border-[#F4EFE6]/20 py-2 text-[#F4EFE6] font-sans focus:outline-none focus:border-[#C8341F] transition-colors placeholder:text-[#F4EFE6]/20 rounded-none w-full" 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[0.6rem] text-[#7A7268] tracking-[0.2em] uppercase">Project Details</label>
                  <textarea 
                    name="message"
                    rows="3" 
                    required
                    placeholder="Tell me about your vision, timeline, and goals..." 
                    className="bg-transparent border-b border-[#F4EFE6]/20 py-2 text-[#F4EFE6] font-sans focus:outline-none focus:border-[#C8341F] transition-colors placeholder:text-[#F4EFE6]/20 resize-none rounded-none w-full"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="mt-4 border border-[#C8341F] text-[#C8341F] font-mono text-[0.7rem] tracking-[0.2em] uppercase py-4 hover:bg-[#C8341F] hover:text-[#F4EFE6] transition-all cursor-pointer w-full font-bold"
                >
                  Get a Quote!
                </button>
              </form>
            </div>
          </FadeIn>
        </div>

        {/* Javascript Auto-Scroll Contact List */}
        <div className="w-full h-[350px] relative border-t border-[#F4EFE6]/10 bg-[#0a0a0a]">
          
          <div className="absolute top-6 left-0 w-full flex justify-center z-20 pointer-events-none">
            <span className="font-mono text-[0.55rem] tracking-[0.15em] text-[#7A7268] border border-[#7A7268]/30 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-full px-4 py-1.5 inline-block">
              SCROLL ↑ OR CLICK ANY TO CHAT
             </span>
          </div>

          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0E0D0B] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0E0D0B] to-transparent z-10 pointer-events-none"></div>
          
          <div 
            ref={scrollRef}
            onWheel={handleScrollInteraction}
            onTouchMove={handleScrollInteraction}
            onMouseDown={handleScrollInteraction}
            className="w-full h-full overflow-y-scroll no-scrollbar pt-[80px]"
          >
            {[1, 2].map((loopId) => (
              <div key={loopId} className="flex flex-col items-center gap-16 pb-16">
                
                {/* WHATSAPP */}
                <div className="text-center">
                  <span className="font-mono text-[0.55rem] text-[#7A7268] tracking-[0.25em] block mb-3">WHATSAPP</span>
                  <a href="https://wa.me/923095928327" target="_blank" rel="noopener noreferrer" className="font-serif text-3xl font-bold italic text-[#F4EFE6] hover:text-[#C8341F] transition-colors flex items-center justify-center gap-3">
                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    +92 309 5928327
                  </a>
                </div>
                <div className="w-1.5 h-1.5 bg-[#C8341F] rounded-full mx-auto"></div>

                {/* FIVERR */}
                <div className="text-center">
                  <span className="font-mono text-[0.55rem] text-[#7A7268] tracking-[0.25em] block mb-3">FIVERR</span>
                  <a href="https://www.fiverr.com/sellers/aliulhassan/" target="_blank" rel="noopener noreferrer" className="font-serif text-3xl font-bold italic text-[#F4EFE6] hover:text-[#C8341F] transition-colors flex items-center justify-center gap-3">
                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="currentColor"/>
                      <text x="12" y="16" fill="#0E0D0B" fontFamily="serif" fontWeight="900" fontSize="13" textAnchor="middle">fi</text>
                    </svg>
                    @aliulhassan
                  </a>
                </div>
                <div className="w-1.5 h-1.5 bg-[#C8341F] rounded-full mx-auto"></div>

                {/* LINKEDIN */}
                <div className="text-center">
                  <span className="font-mono text-[0.55rem] text-[#7A7268] tracking-[0.25em] block mb-3">LINKEDIN</span>
                  <a href="http://www.linkedin.com/in/ali-hassan-94161131b" target="_blank" rel="noopener noreferrer" className="font-serif text-3xl font-bold italic text-[#F4EFE6] hover:text-[#C8341F] transition-colors flex items-center justify-center gap-3">
                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    Ali Hassan
                  </a>
                </div>
                <div className="w-1.5 h-1.5 bg-[#C8341F] rounded-full mx-auto"></div>

                {/* INSTAGRAM */}
                <div className="text-center">
                  <span className="font-mono text-[0.55rem] text-[#7A7268] tracking-[0.25em] block mb-3">INSTAGRAM</span>
                  <a href="https://instagram.com/ali._.hassan16" target="_blank" rel="noopener noreferrer" className="font-serif text-3xl font-bold italic text-[#F4EFE6] hover:text-[#C8341F] transition-colors flex items-center justify-center gap-3">
                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    @ali._.hassan16
                  </a>
                </div>
                <div className="w-1.5 h-1.5 bg-[#C8341F] rounded-full mx-auto"></div>

              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#F4EFE6]/10 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="font-serif text-base font-black italic text-[#F4EFE6]">
            CCC <span className="text-[#C8341F]">CREATIVE CUT CO.</span>
          </div>
          <div className="font-serif text-base font-black italic text-[#F4EFE6]-[0.25rem] text-[#7A7268] tracking-[0.05em]">
            ✉ creativecutco.studio@gmail.com
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;