import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [filmIdx, setFilmIdx] = useState(0);
  const [colorMode, setColorMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  
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

  // Auto-scroll logic
  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += 1;
          if (scrollRef.current.scrollTop >= scrollRef.current.scrollHeight / 2) {
            scrollRef.current.scrollTop = 0;
          }
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleInteraction = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#C8341F] selection:text-white bg-[#F4EFE6]">
      <div className="grain-overlay"></div>

      <div className="fixed top-0 left-0 w-2 h-2 bg-[#C8341F] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden md:block" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}></div>
      <div className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-[#0E0D0B] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out hidden md:block" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}></div>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-[#F4EFE6]/90 backdrop-blur-md border-b border-[#0E0D0B]/10">
        <a href="#" className="flex flex-col">
          <span className="font-serif text-2xl font-black italic tracking-tighter text-[#0E0D0B]">CCC</span>
          <span className="font-sans text-[0.55rem] tracking-[0.2em] font-medium text-[#C8341F]">CREATIVE CUT CO.</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 font-mono text-[0.65rem] tracking-[0.18em] uppercase text-[#7A7268]">
          <li><a href="#films" className="hover:text-[#0E0D0B] transition-colors">The Reel</a></li>
          <li><a href="#thumbnails" className="hover:text-[#0E0D0B] transition-colors">Gallery</a></li>
          <li><a href="#director" className="hover:text-[#0E0D0B] transition-colors">Director</a></li>
        </ul>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="font-mono text-[0.65rem] tracking-[0.25em] text-[#C8341F] uppercase mb-6 text-center">CCC STUDIOS</div>
        <h1 className="font-serif text-5xl md:text-7xl font-black italic tracking-tighter leading-none text-center mb-4">
          EVERY<br /><em className="text-[#C8341F]">FRAME</em><br />MATTERS
        </h1>
        <p className="font-sans text-sm md:text-base text-[#7A7268] tracking-wider text-center mb-12">Cinematic Motion & Design</p>

        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-[#0E0D0B] rounded-2xl p-4 md:p-7 shadow-[0_20px_80px_rgba(14,13,11,0.35)] relative">
            <div className="relative aspect-video bg-[#050504] rounded-md overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1410_0%,#050504_70%)]"></div>
              <div className="absolute inset-0 scanlines z-10"></div>
              <div className="relative z-30 text-center flex flex-col items-center">
                <h2 className="font-serif text-4xl md:text-6xl font-black italic text-[#F4EFE6] leading-none drop-shadow-2xl">
                  {tvTitles[filmIdx].title}<br />
                  <span className="text-[#C8341F]">{tvTitles[filmIdx].sub}</span>
                </h2>
              </div>
            </div>
            <div className="flex justify-center gap-4 md:gap-8 pt-6 pb-2">
              <button onClick={() => setFilmIdx((prev) => (prev - 1 + tvTitles.length) % tvTitles.length)} className="font-mono text-[0.65rem] tracking-[0.12em] text-[#7A7268] border border-[#7A7268]/30 px-4 py-2 rounded hover:bg-[#2A2926] transition-all">REWIND</button>
              <button className="font-mono text-[0.65rem] tracking-[0.12em] text-[#C8341F] border border-[#C8341F] px-4 py-2 rounded">PLAY</button>
              <button onClick={() => setFilmIdx((prev) => (prev + 1) % tvTitles.length)} className="font-mono text-[0.65rem] tracking-[0.12em] text-[#7A7268] border border-[#7A7268]/30 px-4 py-2 rounded hover:bg-[#2A2926] transition-all">FFWD</button>
            </div>
          </div>
        </div>
      </section>

      {/* 01 / THE REEL (HORIZONTAL FILMSTRIP) */}
      <section id="films" className="pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex items-end justify-between border-b border-[#0E0D0B]/10 pb-4">
            <div>
              <div className="font-mono text-[0.6rem] text-[#C8341F] tracking-[0.2em] mb-2">01 / THE REEL</div>
              <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0E0D0B] leading-none">
                Selected<br /><em className="italic">Works</em>
              </h2>
            </div>
            <div className="hidden md:block font-mono text-[0.6rem] tracking-[0.18em] text-[#F4EFE6] bg-[#0E0D0B] px-4 py-2 rounded-full animate-pulse">
              SWIPE TO BROWSE
            </div>
          </div>
        </div>

        {/* Scrolling Track */}
        <div className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-8 snap-x snap-mandatory no-scrollbar">
          {films.map((film) => (
            <article 
              key={film.id} 
              className="relative w-[85vw] md:w-[400px] aspect-video rounded-lg overflow-hidden shrink-0 snap-center group cursor-pointer"
            >
              {/* Background & Grain */}
              <div className={`absolute inset-0 ${film.bg} transition-transform duration-[6000ms] ease-out group-hover:scale-110`}>
                <div className="absolute inset-0 grain-overlay opacity-40 mix-blend-overlay"></div>
                {/* Subtle Film Stripes */}
                <div className="absolute inset-0 opacity-15" style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(244,239,230,0.3) 2px, rgba(244,239,230,0.3) 3px)' }}></div>
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B]/90 via-[#0E0D0B]/20 to-transparent z-10"></div>

              {/* Play Button Overlay (Shows on Hover) */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0E0D0B]/30 backdrop-blur-sm">
                <div className="w-14 h-14 border-2 border-[#F4EFE6] rounded-full flex items-center justify-center bg-[#0E0D0B]/40">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#F4EFE6] ml-1">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>

              {/* Text Information */}
              <div className="absolute bottom-0 left-0 w-full p-5 z-30">
                <span className="font-mono text-[0.55rem] text-[#C8341F] tracking-[0.2em] block mb-1">{film.id}</span>
                <h3 className="font-serif text-lg md:text-xl font-black italic text-[#F4EFE6] leading-tight tracking-tight">
                  {film.title}
                </h3>
                <span className="font-mono text-[0.55rem] text-[#F4EFE6]/50 tracking-[0.15em] mt-1 block">
                  {film.meta}
                </span>
              </div>
            </article>
          ))}
          {/* Padding element so the last item can scroll to the center */}
          <div className="w-[10vw] shrink-0"></div>
        </div>
      </section>

      {/* 02 / THUMBNAIL GALLERY (BENTO GRID) */}
      <section id="thumbnails" className="pt-16 pb-24 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Controls */}
          <div className="flex flex-wrap items-end justify-between border-b border-[#0E0D0B]/10 pb-4 gap-4 mb-8">
            <div>
              <div className="font-mono text-[0.6rem] text-[#C8341F] tracking-[0.2em] mb-2">02 / THUMBNAIL GALLERY</div>
              <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0E0D0B] leading-none">
                The<br /><em className="italic">Gallery</em>
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex font-mono text-[0.6rem] tracking-[0.15em] text-[#7A7268] px-3 py-1.5 border border-[#7A7268]/30 rounded-full bg-[#7A7268]/5">
                HOVER TO REVEAL COLOR
              </span>
              
              <button 
                onClick={() => setColorMode(!colorMode)}
                className={`font-mono text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border rounded flex items-center gap-2 transition-all duration-300 ${
                  colorMode 
                    ? 'bg-[#0E0D0B] text-[#F4EFE6] border-[#0E0D0B]' 
                    : 'bg-transparent text-[#7A7268] border-[#0E0D0B]/20 hover:bg-[#0E0D0B] hover:text-[#F4EFE6]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${colorMode ? 'bg-[#4CAF50]' : 'bg-[#B8B3A8]'}`}></span>
                B&W / COLOR
              </button>
            </div>
          </div>

          {/* 12-Column Grid */}
          <div className="grid grid-cols-12 gap-3 md:gap-5">
            {thumbnails.map((thumb) => (
              <div 
                key={thumb.id} 
                className={`relative rounded-lg overflow-hidden bg-[#2A2926] cursor-pointer group ${thumb.span}`}
              >
                <div className={`relative w-full ${thumb.aspect} overflow-hidden`}>
                  
                  {/* The Abstract Shape/Color Visual (Replace with real <img> tags later) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${thumb.swatch} transition-all duration-500 ease-out 
                    ${colorMode ? 'grayscale-0 contrast-100 brightness-100' : 'grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100'}
                  `}>
                    {/* Placeholder Geometry overlay */}
                    <div className="absolute inset-0 opacity-20 border-[20px] border-white/10 m-4 rounded-3xl"></div>
                  </div>

                  {/* Ink Wash Overlay (Fades out on color reveal) */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#0E0D0B]/55 to-[#F4EFE6]/5 mix-blend-color transition-opacity duration-500 
                    ${colorMode ? 'opacity-0' : 'group-hover:opacity-0'}
                  `}></div>

                  {/* Label Text at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 bg-gradient-to-t from-[#0E0D0B]/85 to-transparent flex items-end justify-between gap-2 z-10">
                    <span className="font-mono text-[0.5rem] md:text-[0.62rem] text-[#F4EFE6]/80 tracking-[0.16em] uppercase leading-tight">
                      {thumb.title}
                    </span>
                    <span className="font-mono text-[0.5rem] text-[#C8341F] tracking-[0.18em] whitespace-nowrap">
                      {thumb.cat}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 03 / DIRECTOR'S NOTE */}
      <section id="director" className="pt-24 pb-16 px-6 relative z-10 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto">
          
          <div className="border-b border-[#0E0D0B]/10 pb-4 mb-12">
            <div className="font-mono text-[0.6rem] text-[#C8341F] tracking-[0.2em] mb-2">03 / DIRECTOR'S NOTE</div>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0E0D0B] leading-none">
              A Note<br /><em className="italic">From The Edit</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            
            {/* Left Column: Portrait & Stats */}
            <div>
              {/* Portrait Image Placeholder */}
              <div className="w-full aspect-[3/4] bg-[#2A2926] rounded-lg relative overflow-hidden mb-6 max-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] via-[#2d2419] to-[#0d0b08]"></div>
                <div className="absolute inset-0 grain-overlay opacity-50 mix-blend-overlay"></div>
                
                {/* Text Overlay on Portrait */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-serif text-2xl md:text-3xl font-black italic text-[#F4EFE6] leading-none">
                    Ali Hassan
                  </div>
                  <div className="font-mono text-[0.58rem] text-[#C8341F] tracking-[0.2em] mt-2">
                    DIRECTOR / EDITOR / DESIGNER
                  </div>
                </div>
              </div>

              {/* Stat Rows */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#0E0D0B]/10">
          
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-mono text-[0.58rem] text-[#7A7268] tracking-[0.18em]">Speciality</span>
                  <span className="font-mono text-[0.58rem] text-[#0E0D0B] tracking-[0.1em]">Video Editing +  Thumbnails Design</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-mono text-[0.58rem] text-[#7A7268] tracking-[0.18em]">Tools</span>
                  <span className="font-mono text-[0.58rem] text-[#0E0D0B] tracking-[0.1em]">Premiere / After Effects / Capcut</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-mono text-[0.58rem] text-[#7A7268] tracking-[0.18em]">Other Skills</span>
                  <span className="font-mono text-[0.58rem] text-[#0E0D0B] tracking-[0.1em]">Brand Identity/AI-Enhanced Workflow</span>
                </div>
               
              </div>
            </div>

            {/* Right Column: Copy */}
            <div className="flex flex-col gap-6">
              <blockquote className="font-serif text-xl md:text-3xl font-bold italic leading-snug text-[#0E0D0B] border-l-4 border-[#C8341F] pl-6 tracking-tight">
                "Editing is not about cutting. It is about <em className="text-[#C8341F]">choosing what stays</em>."
              </blockquote>
              
              <p className="font-sans text-base text-[#2A2926] leading-relaxed">
                Every frame is a decision. Every cut is a commitment. I approach my work with a singular focus on visual storytelling—ensuring that every asset, whether it is a cinematic automotive edit or a high-end brand concept, commands immediate attention.
              </p>
              
              <p className="font-sans text-base text-[#2A2926] leading-relaxed">
                My primary crafts reside in the cutting room and the design canvas. I specialize in professional video editing and graphic design, bridging high-end aesthetics with precise execution. While web development serves as a powerful technical backbone to bring these visions to life on screen, the core of my work is always visual impact.
              </p>
      
              <div className="flex flex-col gap-3 pt-4 border-t border-[#0E0D0B]/10 mt-4">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-mono text-[0.58rem] text-[#7A7268] tracking-[0.18em]">Contact</span>
                  <a href="mailto:your-email@gmail.com" className="font-mono text-[0.58rem] text-[#C8341F] tracking-[0.1em] hover:underline">
                    hello@alihassan.co
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 04 / PRESS (PULL QUOTES) */}
      <section className="bg-[#0E0D0B] text-[#F4EFE6] pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-[#F4EFE6]/10 pb-4 mb-10">
            <div className="font-mono text-[0.6rem] text-[#C8341F]/80 tracking-[0.2em] mb-2">04 / PRESS</div>
            <h2 className="font-serif text-3xl md:text-5xl font-black leading-none">
              What They<br /><em className="italic text-[#C8341F]">Said</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { quote: "A tactile sense of time. Every cut feels earned, every frame inhabited.", source: "CREATIVE DIRECTOR", sub: "Commercial Project" },
              { quote: "The thumbnails alone tell you everything about how they see their work. Compositional intelligence, restraint, then revelation.", source: "AGENCY LEAD", sub: "Brand Campaign" },
              { quote: "Working with this editor changed how I think about my own footage. They found the film inside the rushes.", source: "CLIENT", sub: "Independent Documentary" }
            ].map((press, i) => (
              <article key={i} className="border border-[#F4EFE6]/10 p-6 md:p-8 rounded-lg hover:border-[#C8341F]/50 transition-colors">
                <div className="font-serif text-5xl font-black italic text-[#C8341F] leading-[0.5] mb-6 opacity-70">"</div>
                <blockquote className="font-serif text-lg md:text-xl italic leading-relaxed text-[#F4EFE6]/90 mb-6 tracking-tight">
                  "{press.quote}"
                </blockquote>
                <footer className="font-mono text-[0.58rem] text-[#7A7268] tracking-[0.2em] flex flex-col gap-1">
                  <strong className="text-[#F4EFE6]/60 font-normal">{press.source}</strong>
                  <span>{press.sub}</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER / END CREDITS */}
      

      <footer className="bg-[#0E0D0B] text-[#F4EFE6] pt-12 relative">
        <div ref={scrollRef} onTouchStart={handleInteraction} onMouseDown={handleInteraction} className="w-full h-[300px] overflow-y-scroll scrollbar-hide py-12 relative border-y border-[#F4EFE6]/10">
          <div className="flex flex-col items-center gap-12">
            {[1, 2].map((list) => (
              <React.Fragment key={list}>
                <div className="text-center"><span className="font-mono text-[0.55rem] text-[#7A7268] tracking-[0.25em] block mb-2">WHATSAPP</span><a href="#" className="font-serif text-xl italic hover:text-[#C8341F]">Chat Now</a></div>
                <div className="text-center"><span className="font-mono text-[0.55rem] text-[#7A7268] tracking-[0.25em] block mb-2">FIVERR</span><a href="#" className="font-serif text-xl italic hover:text-[#C8341F]">@aliulhassan</a></div>
                <div className="text-center"><span className="font-mono text-[0.55rem] text-[#7A7268] tracking-[0.25em] block mb-2">LINKEDIN</span><a href="#" className="font-serif text-xl italic hover:text-[#C8341F]">Ali Hassan</a></div>
                <div className="text-center"><span className="font-mono text-[0.55rem] text-[#7A7268] tracking-[0.25em] block mb-2">INSTAGRAM</span><a href="#" className="font-serif text-xl italic hover:text-[#C8341F]">@cc_studios</a></div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="p-6 text-center font-mono text-[0.55rem] tracking-[0.35em] text-[#7A7268]">2026 — CREATIVE CUT CO.</div>
      </footer>
    </div>
  );
}

export default App;