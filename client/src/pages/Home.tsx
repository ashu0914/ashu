/**
 * Prismatic Lift style: kinetic color-field editorial with cobalt, solar orange,
 * acid lime and pearl surfaces. Every chapter is a scroll-triggered visual scene.
 */
import { useEffect, useState, type CSSProperties } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  AudioLines,
  Bot,
  Braces,
  Code2,
  Cpu,
  Github,
  Menu,
  Mic2,
  Network,
  Orbit,
  Sparkles,
  X,
} from "lucide-react";
import PrismaticShards from "@/components/PrismaticShards";

const NAV_ITEMS = [
  ["About", "about"],
  ["Focus", "focus"],
  ["Jaya AI", "jaya"],
  ["Mindset", "mindset"],
] as const;

const SKILLS = [
  { number: "01", title: "Python", detail: "Applications, APIs, useful foundations", icon: Braces, color: "#2455f5" },
  { number: "02", title: "AI / ML", detail: "Models, concepts, hands-on experiments", icon: Sparkles, color: "#ff613a" },
  { number: "03", title: "Generative AI", detail: "Useful interactions with intelligent systems", icon: Bot, color: "#d9ff43" },
  { number: "04", title: "Automation", detail: "Turning repeated steps into clean flows", icon: Network, color: "#a376ff" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function LaunchLine({ light = false }: { light?: boolean }) {
  return <span className={`launch-line ${light ? "launch-line--light" : ""}`} aria-hidden="true"><i /><b /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      setScrollY(window.scrollY);
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(window.scrollY / maxScroll, 1));
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });
    scrollHandler();
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const revealItems = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            const id = (entry.target as HTMLElement).dataset.chapter;
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.18, rootMargin: "-8% 0px -36% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const selectNav = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const heroDepth = Math.min(scrollY * 0.16, 96);

  return (
    <main className="prismatic-page overflow-x-clip bg-[#f5f3ee] text-[#121216] selection:bg-[#d9ff43] selection:text-[#121216]">
      <div className="launch-progress hidden lg:block" aria-hidden="true"><i style={{ height: `${scrollProgress * 100}%` }} /><b style={{ top: `${scrollProgress * 100}%` }} /></div>
      <header className="prismatic-header fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button onClick={() => scrollToSection("about")} className="group flex items-center gap-3" aria-label="Scroll to start">
            <img src="/manus-storage/ashirwad-aj-mark_22b01e01.png" alt="AJ geometric signal mark" className="h-10 w-10 object-contain transition-transform duration-300 group-hover:rotate-12" />
            <span className="hidden text-left sm:block">
              <span className="block font-display text-sm font-bold tracking-[-0.03em] text-[#121216]">AJ<span className="text-[#2455f5]">//</span></span>
              <span className="block font-mono text-[0.48rem] uppercase tracking-[0.18em] text-black/45">Ashirwad Jha</span>
            </span>
          </button>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map(([label, id]) => (
              <button key={id} onClick={() => selectNav(id)} className={`nav-pill ${activeSection === id ? "is-active" : ""}`}>
                <span>{label}</span><i />
              </button>
            ))}
          </nav>
          <button onClick={() => setMenuOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white/60 text-[#121216] lg:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && <nav className="border-t border-black/10 bg-[#f5f3ee] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
          {NAV_ITEMS.map(([label, id], index) => <button key={id} onClick={() => selectNav(id)} className="flex w-full items-center justify-between border-b border-black/10 py-3 text-left font-display text-2xl font-bold tracking-[-0.04em]"><span><small className="mr-3 font-mono text-[0.6rem] text-[#2455f5]">0{index + 1}</small>{label}</span><ArrowDownRight size={19} /></button>)}
        </nav>}
      </header>

      <section id="about" data-chapter="about" className="chapter hero-chapter relative min-h-[100svh] overflow-hidden pt-[78px]">
        <div className="hero-sun hero-float" style={{ transform: `translate3d(0, ${heroDepth * 0.35}px, 0)` }} />
        <div className="hero-cobalt-panel" style={{ transform: `translate3d(0, ${heroDepth * -0.23}px, 0)` }} />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit hero-float" aria-hidden="true"><i /><b /><span /></div>
        <div className="mx-auto grid min-h-[calc(100svh-78px)] max-w-[1500px] grid-cols-1 items-end px-5 pb-8 pt-9 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12 lg:pb-12">
          <div className="relative z-10 pb-5 lg:pb-12">
            <div className="scroll-reveal mb-8 flex items-center gap-3 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[#2455f5]">
              <span className="h-2 w-2 rounded-full bg-[#ff613a]" /> AJ// PROFILE_01 / CSE DIPLOMA / IN MOTION
            </div>
            <h1 className="scroll-reveal hero-title max-w-[9ch] font-display text-[clamp(4.4rem,10vw,10rem)] font-bold uppercase leading-[0.77] tracking-[-0.085em] text-[#121216]" style={{ transitionDelay: "80ms" }}>
              TURN <span className="text-[#2455f5]">CURIOSITY</span> INTO SYSTEMS.
            </h1>
            <div className="scroll-reveal mt-8 max-w-lg border-l-2 border-[#ff613a] pl-5" style={{ transitionDelay: "160ms" }}>
              <p className="font-body text-base leading-7 text-black/72 sm:text-lg">I am Ashirwad Jha—an emerging developer learning how Python, AI, and thoughtful software become useful experiences.</p>
              <button onClick={() => scrollToSection("focus")} className="mt-6 inline-flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#121216] transition-transform hover:translate-x-1">Explore the signal <ArrowDown size={16} className="text-[#2455f5]" /></button>
            </div>
          </div>
          <div className="relative h-[53svh] min-h-[420px] lg:h-[calc(100svh-120px)] lg:min-h-[640px]">
            <div className="hero-image-card scroll-reveal absolute bottom-0 right-[-3vw] top-[2%] w-[min(730px,98vw)] overflow-hidden bg-[#121216]" style={{ transitionDelay: "180ms", transform: `translate3d(0, ${heroDepth * -0.3}px, 0)` }}>
              <img src="/manus-storage/ashirwad-hero-portrait_a56b0801.jpg" alt="Cinematic portrait treatment for Ashirwad Jha" className="h-full w-full object-cover object-[65%_center] mix-blend-luminosity" />
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(36,85,245,0.1),transparent_45%),linear-gradient(0deg,rgba(18,18,22,0.70),transparent_48%)]" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_5px,rgba(245,243,238,0.11)_6px)] opacity-30" />
              <div className="absolute bottom-5 left-5 rounded-full bg-[#d9ff43] px-3 py-2 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-[#121216]">AJ// EXPERIMENTING IN PUBLIC</div>
            </div>
            <div className="hero-name-tag absolute right-[9%] top-[10%] hidden rotate-90 origin-top-right font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[#121216] lg:block">ASHIRWAD JHA / SOFTWARE DEVELOPER</div>
          </div>
        </div>
        <div className="absolute bottom-7 left-5 hidden items-center gap-4 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-black/45 sm:flex lg:left-12"><LaunchLine /> Scroll to enter</div>
      </section>

      <section id="focus" data-chapter="focus" className="chapter cobalt-chapter relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="color-disk color-disk--lime" />
        <div className="color-disk color-disk--orange" />
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="scroll-reveal grid grid-cols-1 gap-10 lg:grid-cols-[0.64fr_1.36fr] lg:gap-20">
            <div>
              <p className="chapter-label text-[#d9ff43]"><span>02</span> AJ// CORE FOCUS</p>
              <h2 className="mt-7 max-w-sm font-display text-[clamp(3.6rem,6vw,7rem)] font-bold uppercase leading-[0.78] tracking-[-0.08em] text-white">WHAT I’M <span className="text-[#d9ff43]">BUILDING</span> TOWARD.</h2>
            </div>
            <div className="self-end border-l border-white/30 pl-6 font-body text-lg leading-8 text-white/80 sm:pl-9 sm:text-xl">My focus is not a fixed list. It is a working toolkit: Python for building, AI/ML for understanding intelligence, and automation for making systems more useful.</div>
          </div>
          <div className="skill-spectrum mt-16 sm:mt-24">
            {SKILLS.map(({ number, title, detail, icon: Icon, color }, index) => <article key={title} className="skill-tile scroll-reveal" style={{ transitionDelay: `${index * 80}ms`, "--skill-color": color } as CSSProperties}>
              <span className="font-mono text-[0.63rem] tracking-[0.15em]">{number}</span>
              <Icon size={27} strokeWidth={1.4} />
              <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-[-0.06em] sm:text-5xl">{title}</h3>
              <p className="font-mono text-[0.58rem] uppercase leading-5 tracking-[0.11em]">{detail}</p>
              <ArrowUpRight size={19} className="skill-arrow" />
            </article>)}
          </div>
        </div>
      </section>

      <section id="jaya" data-chapter="jaya" className="chapter jaya-chapter relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="jaya-band jaya-band--one" />
        <div className="jaya-band jaya-band--two" />
        <div className="jaya-glow" />
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-24 lg:px-12">
          <div className="relative min-h-[450px] scroll-reveal">
            <div className="jaya-frame absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#11111a]">
              <div className="jaya-system-field" aria-hidden="true">
                <span className="jaya-system-grid" />
                <span className="jaya-system-route jaya-system-route--one" /><span className="jaya-system-route jaya-system-route--two" /><span className="jaya-system-route jaya-system-route--three" />
                <div className="jaya-system-node"><AudioLines size={15} /><strong>VOICE / INPUT.01</strong></div>
                <div className="jaya-system-node"><Cpu size={15} /><strong>MEMORY / STATE.02</strong></div>
                <div className="jaya-system-core"><Bot size={26} /><span>JAYA<br />CORE</span><i /></div>
                <div className="jaya-system-node"><Sparkles size={15} /><strong>REASON / MODEL.03</strong></div>
                <div className="jaya-system-node"><Code2 size={15} /><strong>ACTION / EXECUTE.04</strong></div>
              </div>
              <PrismaticShards />
              <div className="absolute bottom-5 left-5 rounded-full bg-[#d9ff43] px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.13em] text-[#121216]">ACTIVE BUILD / JAYA_AI</div>
            </div>
          </div>
          <div className="scroll-reveal" style={{ transitionDelay: "100ms" }}>
            <p className="chapter-label text-[#ff8b70]"><span>03</span> AJ// LONG-TERM PROJECT</p>
            <h2 className="mt-7 font-display text-[clamp(4rem,7vw,7.6rem)] font-bold uppercase leading-[0.78] tracking-[-0.085em] text-white">JAYA <span className="text-[#ff613a]">AI</span></h2>
            <p className="mt-8 max-w-xl font-body text-lg leading-8 text-white/76">A Python-based personal AI voice assistant built as a growing system of speech, memory, response, and action.</p>
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[{ icon: AudioLines, text: "Speech input" }, { icon: Mic2, text: "Voice interface" }, { icon: Bot, text: "AI responses" }, { icon: Cpu, text: "Memory layer" }, { icon: Code2, text: "Commands" }, { icon: Orbit, text: "Automation" }].map(({ icon: Icon, text }, index) => <div key={text} className="jaya-chip" style={{ transitionDelay: `${index * 60}ms` }}><Icon size={16} /><span>{text}</span></div>)}
            </div>
            <p className="mt-9 border-l-2 border-[#d9ff43] pl-5 font-body leading-7 text-white/58">Jaya AI is where I practice the details that make intelligent applications feel coherent: components communicating clearly, useful commands, and a structure that can keep growing.</p>
          </div>
        </div>
      </section>

      <section id="mindset" data-chapter="mindset" className="chapter lime-chapter relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="mindset-shape mindset-shape--orange" /><div className="mindset-shape mindset-shape--blue" />
        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="scroll-reveal max-w-6xl">
            <p className="chapter-label text-[#2455f5]"><span>04</span> AJ// ENGINEERING MINDSET</p>
            <h2 className="mt-9 font-display text-[clamp(4.1rem,10vw,10.8rem)] font-bold uppercase leading-[0.74] tracking-[-0.09em] text-[#121216]">DON’T JUST <span className="text-[#ff613a]">RUN</span> THE CODE.<br />UNDERSTAND THE <span className="text-[#2455f5]">MACHINE.</span></h2>
          </div>
          <div className="mt-14 grid max-w-4xl gap-7 border-t-2 border-[#121216] pt-7 font-body text-lg leading-8 text-black/72 sm:mt-20 sm:grid-cols-2 sm:gap-14 sm:text-xl">
            <p className="scroll-reveal">I believe understanding code matters more than simply making it work. My current goal is to build a strong foundation in programming, data structures, AI/ML concepts, and software engineering.</p>
            <p className="scroll-reveal" style={{ transitionDelay: "100ms" }}>I want to be able to independently understand, design, debug, and build applications. Every new project is a chance to look deeper, test an idea, and leave with a more useful question.</p>
          </div>
        </div>
      </section>

      <section data-chapter="next" className="chapter next-chapter relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="next-star next-star--one" /><div className="next-star next-star--two" /><div className="next-star next-star--three" />
        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="scroll-reveal grid grid-cols-1 gap-12 border-y border-white/25 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-24 lg:py-24">
            <div>
              <p className="chapter-label text-[#d9ff43]"><span>05</span> AJ// NEXT VECTOR</p>
              <h2 className="mt-8 font-display text-[clamp(4.5rem,9vw,10rem)] font-bold uppercase leading-[0.74] tracking-[-0.09em] text-white">ONE<br />EXPERIMENT.<br /><span className="text-[#d9ff43]">THEN THE NEXT.</span></h2>
            </div>
            <div className="pb-2">
              <p className="max-w-md font-body text-lg leading-8 text-white/72">I am looking for opportunities to contribute to real projects, learn from experienced developers, and gradually take on more complex engineering challenges.</p>
              <a href="mailto:hello@ashirwadjha.dev" className="launch-button mt-8"><span className="cta-node" /> Start a conversation <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <footer className="flex flex-col gap-5 py-8 font-mono text-[0.57rem] uppercase tracking-[0.16em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-display text-base font-bold tracking-[-0.03em] text-white">AJ<span className="text-[#d9ff43]">//</span> <small className="ml-1 font-mono text-[0.52rem] font-normal tracking-[0.15em] text-white/45">ASHIRWAD JHA / SOFTWARE DEVELOPER</small></span>
            <div className="flex items-center gap-5"><span>Python · AI/ML · Gen AI</span><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub profile placeholder" className="transition-colors hover:text-[#d9ff43]"><Github size={16} /></a><span>Build continues</span></div>
          </footer>
        </div>
      </section>
    </main>
  );
}
