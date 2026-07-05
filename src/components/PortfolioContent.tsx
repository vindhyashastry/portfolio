"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ExternalLink, Mail, Download, Menu, X, User, Briefcase, Cpu, Award } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  PaperclipIcon,
  PencilIcon,
  CompassIcon,
  ReactLogo,
  TypeScriptLogo,
  NextLogo,
  TailwindLogo,
  NodeLogo,
  Html5Logo,
  CssLogo,
  PythonLogo,
  SqlLogo,
  MySqlLogo,
  JavaScriptLogo,
} from "./Icons";
import { Typewriter } from "./Typewriter";

// Floating architect tool icon with looping bob animation
function FloatingIcon({
  icon: Icon,
  className,
  delay = 0,
  rotate = 0,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      style={{ rotate }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon className="h-full w-full" />
    </motion.div>
  );
}

// --- Animation Variants ---

// Hero: simple upward fade
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// About: slide in from the LEFT
const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

// Projects cards: scale up from slightly smaller
const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: "easeOut" as const } },
};

// Skills: slide in from the RIGHT
const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

// Experience: drop in from above with a slight tilt (like placing a sheet)
const dropIn: Variants = {
  hidden: { opacity: 0, y: -60, rotate: -1.5 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.75, ease: "easeOut" as const } },
};

// Contact: spring up from below with a bounce
const springUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function PortfolioContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "experience", label: "Experience", icon: Award },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const sections = ["hero", "about", "projects", "skills", "experience", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px", // triggers when section dominates viewport
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const bannerItems = [
    { src: "/icons/typescript.svg", label: "TypeScript" },
    { src: "/icons/react.svg", label: "React" },
    { src: "/icons/javascript.svg", label: "JavaScript" },
    { src: "/icons/html5.png", label: "HTML5" },
    { src: "/icons/python.png", label: "Python" },
    { src: "/icons/database.png", label: "SQL" },
    { src: "/icons/mysql.png", label: "MySQL" },
    { src: "/icons/tailwind.png", label: "Tailwind CSS" },
    { src: "/icons/css3.png", label: "CSS3" },
    { src: "/icons/nextjs.svg", label: "Next.js" },
  ];

  // Projects used for carousel (two per slide)
  const projects = [
    {
      name: "TriMind AI",
      desc: "Domain-based AI assistant with document querying, intelligent response generation, and AI-powered insights. Built with TypeScript and Next.js.",
      images: ["/projects/c7.png", "/projects/c8.png", "/projects/c9.png"],
      demo: "https://trimindai.vercel.app/",
      source: "https://github.com/vindhyashastry/trimind",
      tags: ["Next.js", "TypeScript", "RAG"],
    },
    {
      name: "Air Drawing",
      desc: "Real-time gesture recognition system using Python and OpenCV. Implemented backend logic for processing image data and translating gestures to drawings.",
      images: ["/projects/c4.jpeg", "/projects/c5.jpeg", "/projects/c6.jpeg"],
      // demo: "#",
      source: "https://github.com/vindhyashastry/air-draw",
      tags: ["Python", "OpenCV", "Computer Vision"],
    },
    {
      name: "Career Mirror",
      desc: "Frontend for an AI-powered career guidance platform. Built responsive UI for personality-based career assessment workflows with a focus on usability.",
      images: ["/projects/c1.png", "/projects/c3.png", "/projects/c2.png"],
      demo: "https://careermirror-ai.vercel.app/",
      source: "https://github.com/vindhyashastry/careermirror-ai",
      tags: ["React", "Tailwind CSS", "AI"],
    },
    {
      name: "Subscription Tracker",
      desc: "Full-stack web app using the MERN stack. Implemented REST APIs, CRUD functionality, database schema design, and server-side logic.",
      images: [],
      demo: "#",
      source: "https://github.com/vindhyashastry/subscriptiontracker",
      tags: ["MongoDB", "Express", "React", "Node.js"],
    },
  ];

  const [activePhotoIndexes, setActivePhotoIndexes] = useState<number[]>(Array(projects.length).fill(0));
  const touchStartX = useRef<number | null>(null);

  const changePhotoIndex = (projectIndex: number, direction: 1 | -1, total: number) => {
    setActivePhotoIndexes(prev =>
      prev.map((value, i) =>
        i === projectIndex ? (value + direction + total) % total : value
      )
    );
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>, projectIndex: number) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX ?? null;
    if (startX === null || endX === null) return;
    const dx = endX - startX;
    const total = projects[projectIndex].images.length;
    if (dx > 40) changePhotoIndex(projectIndex, -1, total);
    if (dx < -40) changePhotoIndex(projectIndex, 1, total);
    touchStartX.current = null;
  };

  const cardVariant = {
    hidden: { opacity: 0.6, scale: 0.96, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 20 },
    },
  } as any;

  const reflections = [
    {
      title: "Hosting the tech fest as a part of my MCA",
      description:
        "Somewhere between managing logistics and troubleshooting last-minute chaos, I realized organizing a tech fest teaches you more about problem-solving than any textbook.",
      image: "/achieve/host.jpeg",
      rotate: "-4deg",
    },
    {
      title: "inter college web design wins",
      description:
        "Winning first place at each one wasn't the plan going in,I just kept showing up with ideas I actually cared about, and somehow that kept working.I learnt frontend a lot from these experiences.",
      image: "/achieve/win2.jpeg",
      rotate: "3deg",
    },
    {
      title: "Smart India Hackathon",
      description:
        "as a team member, I worked on building an attendance system that cut a 15-minute process down to 30 seconds, using face recognition that had to work offline-first",
      image: "/achieve/sih.jpeg",
      rotate: "-2deg",
    },
  ];

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden">
      <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 pointer-events-none">
        <div className="flex h-14 items-center gap-4 rounded-full border border-line bg-background/80 px-4 py-2 shadow-[0_8px_32px_rgba(4,8,18,0.5)] backdrop-blur-xl pointer-events-auto md:gap-6 md:px-6">
          {/* Logo / Link back to hero */}
          <a href="#hero" className="flex items-center justify-center font-serif text-sm font-black uppercase tracking-[0.25em] text-transparent bg-gradient-to-r from-slate-100 via-slate-300 to-[#4c6f98] bg-clip-text hover:opacity-80 transition-opacity">
            PORTFOLIO
          </a>
          <span className="h-5 w-[1px] bg-line"></span>

          {/* Desktop Nav Items */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="relative group/nav">
                    <a
                      href={`#${item.id}`}
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${isActive ? "text-white" : "text-muted-foreground hover:text-ink"
                        }`}
                    >
                      <IconComponent className="h-[18px] w-[18px] relative z-20" />
                    </a>

                    {/* Sliding active pill indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 rounded-full bg-orange z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Tooltip */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 scale-95 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200 z-50">
                      <div className="rounded border border-line bg-background/95 px-2.5 py-1 text-center font-mono text-[10px] uppercase tracking-widest text-blueprint shadow-lg whitespace-nowrap">
                        {item.label}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <span className="hidden h-5 w-[1px] bg-line md:inline"></span>

          {/* Mobile hamburger menu toggler */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-background/80 text-blueprint transition-all hover:border-blueprint hover:bg-background/95 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* A small desktop visual detail to keep blueprint flavor */}
          <div className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-blueprint-dim md:block">
            Scale 1:1
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col border-[8px] border-background bg-background/95 bg-[linear-gradient(rgba(76,111,152,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(76,111,152,0.08)_1px,transparent_1px)] bg-[size:28px_28px] p-6 md:p-12"
          >
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="font-mono text-sm tracking-widest text-blueprint">[ V.MCA ] / NAVIGATION</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all hover:border-blueprint hover:bg-background/95"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-blueprint" />
              </button>
            </div>
            <nav className="flex flex-1 items-center justify-center">
              <ul className="grid gap-6 font-mono text-2xl uppercase tracking-[0.25em] text-muted-foreground">
                {navItems.map((item, i) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={() => setMenuOpen(false)}
                        className={`group inline-flex items-center gap-4 rounded-full border px-6 py-3.5 text-left transition-all ${isActive
                          ? "border-orange bg-orange/10 text-white"
                          : "border-line hover:border-blueprint hover:bg-blueprint/5 hover:text-ink"
                          }`}
                      >
                        <IconComponent className={`h-5 w-5 ${isActive ? "text-orange" : "text-blueprint-dim"}`} />
                        <span>{item.label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <div className="border-t border-line pt-4 font-mono text-xs uppercase tracking-widest text-blueprint-dim">
              sheet navigation — scale 1:1
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* HERO SECTION */}
        <section id="hero" className="relative mx-auto w-full max-w-6xl px-4 py-12 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="relative border border-line p-6 md:p-12"
          >
            <div className="absolute -top-4 right-6 text-blueprint opacity-85">
              <PaperclipIcon className="h-9 w-9" />
            </div>
            <div className="absolute -top-3 left-6 bg-background px-2 font-mono text-xs uppercase tracking-widest text-blueprint">
              fig.01 — hero
            </div>
            {/* Corner markers */}
            <span className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-blueprint"></span>
            <span className="absolute -top-1 -right-1 h-2 w-2 border-t border-r border-blueprint"></span>
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-blueprint"></span>
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-blueprint"></span>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-blueprint">bangalore,india</p>
                <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-ink sm:text-5xl md:text-5xl">
                  Hi! I'm <span className="text-blueprint font-semibold">Vindhya M D</span>
                </h1>
                <p className="mt-3 font-mono text-xl font-semibold text-blueprint md:text-2xl text-shadow-amber-700">
                  <Typewriter text="Frontend Engineer" delay={0.05} />
                </p>
                <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                  I design and build the blueprints for how people experience the web;Turning ideas into interfaces with <strong className="text-ink">React, Next.js &amp; TypeScript</strong>, and following the wiring wherever the backend needs me to.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="border border-orange bg-orange px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-orange/80"
                  >
                    view projects →
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-blueprint hover:text-ink"
                  >
                    get in touch
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/resume.pdf"
                    download
                    target="_blank"
                    rel="noreferrer noopener"
                    className="border border-orange px-5 py-2.5 font-mono text-sm uppercase tracking-[0.35em] text-white transition-colors hover:bg-orange/80"
                  >
                    download resume →
                  </motion.a>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:items-end">
                <motion.div
                  initial={{ scale: 0.6, rotate: -8, opacity: 0.85 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
                  className="group relative h-80 w-80 overflow-hidden rounded-[2rem] bg-transparent shadow-[0_0_50px_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_0_60px_rgba(243,91,4,0.18)] md:h-[420px] md:w-[420px]"
                >
                  <Image
                    src="/profile.jpg"
                    alt="Vindhya M D"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    priority
                    loading="eager"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ENDLESS SCROLL BANNER */}
        <div className="w-full overflow-hidden border-b border-line bg-background/50 py-3">
          <div className="flex animate-marquee items-center gap-8 whitespace-nowrap font-mono text-sm text-blueprint-dim uppercase tracking-widest">
            {[...bannerItems, ...bannerItems].map((item, index) => (
              <div key={`${item.label}-${index}`} className="inline-flex items-center gap-3 pr-4">
                <img src={item.src} alt={item.label} className="h-5 w-5 object-contain" />
                <span>{item.label}</span>
                <span className="text-line">/</span>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about" className="relative mx-auto w-full max-w-6xl px-4 py-12 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
            className="relative border border-line p-6 md:p-12"
          >
            <div className="absolute -top-4 right-6 text-blueprint opacity-85">
              <PaperclipIcon className="h-9 w-9" />
            </div>
            <div className="absolute -top-3 left-6 bg-background px-2 font-mono text-xs uppercase tracking-widest text-blueprint">
              fig.02 — about
            </div>
            <span className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-blueprint"></span>
            <span className="absolute -top-1 -right-1 h-2 w-2 border-t border-r border-blueprint"></span>
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-blueprint"></span>
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-blueprint"></span>
            {/* Floating Pencil */}
            <FloatingIcon icon={PencilIcon} className="-bottom-6 right-10 h-12 w-12 text-orange opacity-25" delay={0.7} rotate={-40} />
            <FloatingIcon icon={PencilIcon} className="top-4 -left-5 h-7 w-7 text-blueprint opacity-20" delay={2} rotate={30} />

            <h2 className="mb-6 font-mono text-base md:text-lg uppercase tracking-[0.3em] text-blueprint-dim">— about</h2>
            <div className="grid gap-6 md:grid-cols-[auto_1fr]">
              <div className="hidden font-mono text-xs uppercase tracking-[0.3em] text-blueprint-dim md:block">
                note<br />01
              </div>
              <p className="max-w-3xl font-sans text-base leading-relaxed text-ink md:text-lg">
                Last summer, I <span className="text-blueprint font-semibold">shipped analytics dashboards and AI-powered features</span> at Equilibrate.AI. I debugged API integration issues that no one else wanted to touch.
                I code across the stack. <span className="text-blueprint font-semibold">Frontend:</span> React, TypeScript, responsive design. <span className="text-blueprint font-semibold">Backend:</span> Python, Django, REST APIs, SQL. I'm strongest in frontend, but I don't just design interfaces, I build them end-to-end, from database to user-facing code.
                I'm driven by <span className="text-orange font-semibold">curiosity</span> and impatient with mediocrity. I write code that's <span className="text-blueprint font-semibold">clean enough to maintain, fast enough to not annoy users</span>, and honest enough to admit when I've made a mistake.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                { label: "MCA GPA", value: "9.7 / 10" },
                { label: "Internship", value: "6 months" },

              ].map((stat) => (
                <div key={stat.label} className="border border-dashed border-line p-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-blueprint-dim">{stat.label}</div>
                  <div className="mt-1 font-mono text-base font-semibold text-orange">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="relative mx-auto w-full max-w-6xl px-4 py-12 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="relative border border-line p-6 md:p-12"
          >
            <div className="absolute -top-4 right-6 text-blueprint opacity-85">
              <PaperclipIcon className="h-9 w-9" />
            </div>
            <div className="absolute -top-3 left-6 bg-background px-2 font-mono text-xs uppercase tracking-widest text-blueprint">
              fig.03 — projects
            </div>
            <span className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-blueprint"></span>
            <span className="absolute -top-1 -right-1 h-2 w-2 border-t border-r border-blueprint"></span>
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-blueprint"></span>
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-blueprint"></span>
            {/* Floating Compass */}
            <FloatingIcon icon={CompassIcon} className="-top-8 left-1/2 h-14 w-14 text-orange opacity-20" delay={0.5} rotate={20} />
            <FloatingIcon icon={CompassIcon} className="bottom-4 -left-6 h-8 w-8 text-blueprint opacity-15" delay={1.8} rotate={-15} />

            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project.name}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="group border border-dashed border-line p-5 bg-background/40 transition-colors duration-300 hover:bg-orange/10 hover:border-orange/50"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-blueprint-dim">
                    <span>sheet.{index + 1}</span>
                    <span>scale 1:1</span>
                  </div>
                  <h3 className="mt-4 font-mono text-lg text-ink">{project.name}</h3>
                  <div
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(event) => handleTouchEnd(event, index)}
                    className="group relative mt-3 h-40 w-full overflow-hidden rounded-md bg-background/20 transition duration-300"
                  >
                    {project.images.length > 0 ? (
                      <>
                        <Image
                          src={project.images[activePhotoIndexes[index]]}
                          alt={`${project.name} screenshot ${activePhotoIndexes[index] + 1}`}
                          width={620}
                          height={320}
                          className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/75 to-transparent px-3 py-2">
                          <button
                            type="button"
                            onClick={() => changePhotoIndex(index, -1, project.images.length)}
                            className="rounded-full border border-line bg-background/70 px-2 py-1 text-xs uppercase tracking-[0.2em] text-blueprint transition hover:border-blueprint"
                          >
                            ◀
                          </button>
                          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blueprint-dim">
                            {activePhotoIndexes[index] + 1}/{project.images.length}
                          </span>
                          <button
                            type="button"
                            onClick={() => changePhotoIndex(index, 1, project.images.length)}
                            className="rounded-full border border-line bg-background/70 px-2 py-1 text-xs uppercase tracking-[0.2em] text-blueprint transition hover:border-blueprint"
                          >
                            ▶
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center border border-dashed border-line bg-background/30 text-center font-mono text-sm uppercase tracking-[0.3em] text-blueprint-dim">
                        building under process
                      </div>
                    )}
                  </div>
                  <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <li key={tag} className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-blueprint">{tag}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex gap-4 border-t border-dashed border-line pt-4 font-mono text-xs uppercase tracking-widest">
                    {project.demo ? (
                      <a href={project.demo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-ink hover:text-orange"><ExternalLink className="h-3.5 w-3.5" /> live demo</a>
                    ) : null}
                    <a href={project.source} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-ink hover:text-orange"><GithubIcon className="h-3.5 w-3.5" /> source</a>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="relative mx-auto w-full max-w-6xl px-4 py-12 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
            className="relative border border-line p-6 md:p-12"
          >
            <div className="absolute -top-4 right-6 text-blueprint opacity-85">
              <PaperclipIcon className="h-9 w-9" />
            </div>
            <div className="absolute -top-3 left-6 bg-background px-2 font-mono text-xs uppercase tracking-widest text-blueprint">
              fig.04 — skills
            </div>
            <span className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-blueprint"></span>
            <span className="absolute -top-1 -right-1 h-2 w-2 border-t border-r border-blueprint"></span>
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-blueprint"></span>
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-blueprint"></span>

            <h2 className="mb-6 font-mono text-base md:text-lg uppercase tracking-[0.3em] text-blueprint-dim">— legend</h2>

            <motion.div
              className="grid gap-6 md:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { category: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "Tailwind CSS", "CSS Grid", "shadcn/ui"] },
                { category: "Backend & Data", skills: ["Python", "Django", "Node.js", "Express.js", "REST APIs", "PostgreSQL", "SQL", "MongoDB", "Zustand"] },
                { category: "Tools & Concepts", skills: ["Git", "GitHub", "Postman", "Apache ECharts", "Agile / Scrum", "SDLC", "OOP", "AI Coding Tools"] }
              ].map((group, i) => (
                <motion.div key={i} variants={scaleUp} className="border border-line p-5">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blueprint">
                    <span className="inline-block h-2 w-6 border-t border-dashed border-blueprint"></span>
                    {group.category}
                  </div>
                  <ul className="mt-4 space-y-1.5 font-mono text-sm text-ink">
                    {group.skills.map(skill => (
                      <li key={skill} className="flex items-baseline gap-2">
                        <span className="text-blueprint-dim">—</span>{skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
            <p className="mt-6 max-w-2xl font-sans text-sm text-muted-foreground">
              Backend (Django, Node.js) and database layers are growing areas — comfortable enough to build features and read existing code, actively deepening depth.
            </p>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="relative mx-auto w-full max-w-6xl px-4 py-12 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={dropIn}
            className="relative border border-line p-6 md:p-12"
          >
            <div className="absolute -top-4 right-6 text-blueprint opacity-85">
              <PaperclipIcon className="h-9 w-9" />
            </div>
            <div className="absolute -top-3 left-6 bg-background px-2 font-mono text-xs uppercase tracking-widest text-blueprint">
              fig.05 — experience &amp; education
            </div>
            <span className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-blueprint"></span>
            <span className="absolute -top-1 -right-1 h-2 w-2 border-t border-r border-blueprint"></span>
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-blueprint"></span>
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-blueprint"></span>

            <h2 className="mb-8 font-mono text-base md:text-lg uppercase tracking-[0.3em] text-blueprint-dim">— record of work</h2>

            <div className="relative grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] md:gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                className="self-center relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
              >
                <Image
                  src="/exp.png"
                  alt="Experience illustration"
                  width={560}
                  height={560}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background/95 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.85, ease: "easeOut", delay: 0.05 }}
                className="relative z-10 space-y-5 rounded-[2rem] border border-line/20 bg-background/95 p-6 md:p-8 backdrop-blur-sm lg:-ml-6 xl:-ml-10"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-blueprint-dim">
                  <div>Jan 2026 – Jun 2026</div>
                  <div className="mt-1 text-blueprint">6 months</div>
                </div>
                <div>
                  <h3 className="font-mono text-lg font-semibold text-ink">Front End Developer Intern</h3>
                  <p className="font-mono text-sm text-orange">Equilibrate.AI</p>
                  <div className="mt-3 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest text-blueprint-dim">
                    <a href="https://www.aidashboardbuilder.com" target="_blank" rel="noreferrer noopener" className="hover:text-blueprint">aidashboardbuilder.com ↗</a>
                    <a href="https://www.another-ai.app" target="_blank" rel="noreferrer noopener" className="hover:text-blueprint">another-ai.app ↗</a>
                  </div>
                </div>
                <ul className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-muted-foreground list-none">
                  <li className="relative pl-5">
                    <span className="absolute left-0 top-0 text-orange">—</span>
                    Built responsive UI using React, Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
                  </li>
                  <li className="relative pl-5">
                    <span className="absolute left-0 top-0 text-orange">—</span>
                    Developed <strong className="text-ink">ADRO analytics dashboard</strong> with Apache ECharts for interactive data visualization.
                  </li>
                  <li className="relative pl-5">
                    <span className="absolute left-0 top-0 text-orange">—</span>
                    Debugged <strong className="text-ink">API integration </strong>failures using Chrome DevTools; identified CORS issues and coordinated with backend to fix endpoint URLs; tested GET/POST/PUT requests in Postman to verify fixes.
                  </li>
                  <li className="relative pl-5">
                    <span className="absolute left-0 top-0 text-orange">—</span>
                    Implemented lightweight global state management using <strong className="text-ink">Zustand</strong> to improve performance.
                  </li>
                  <li className="relative pl-5">
                    <span className="absolute left-0 top-0 text-orange">—</span>
                    Contributed to an AI-powered WhatsApp-integrated task manager (reminders, to-dos, sketchpad, AI assistant).
                  </li>
                  <li className="relative pl-5">
                    <span className="absolute left-0 top-0 text-orange">—</span>
                    Built <strong className="text-ink">SEO-optimized</strong> interfaces, improved UI/UX, and supported testing across modules.
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="mt-8 border-t border-line pt-8">
              <h2 className="mb-6 font-mono text-base md:text-lg uppercase tracking-[0.3em] text-blueprint-dim">— education</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { school: "Nitte Meenakshi Institute of Technology", degree: "MCA", period: "Dec 2024 – Jul 2026", gpa: "9.7 / 10.0" },
                  { school: "National Institute of Engineering", degree: "BCA", period: "Sep 2020 – Jul 2023", gpa: "8.0 / 10.0" },
                ].map((edu) => (
                  <div key={edu.school} className="border border-dashed border-line p-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-blueprint-dim">{edu.period}</div>
                    <div className="mt-1 font-mono text-sm font-semibold text-ink">{edu.degree}</div>
                    <div className="font-sans text-sm text-muted-foreground">{edu.school}</div>
                    <div className="mt-2 font-mono text-xs text-orange">GPA {edu.gpa}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-8">
              <h2 className="mb-6 font-mono text-base md:text-lg uppercase tracking-[0.3em] text-blueprint-dim">— moments I’m grateful for</h2>
              <div className="grid gap-8">
                {reflections.map((story, idx) => (
                  <div
                    key={story.title}
                    className="grid gap-4 rounded-[1.75rem] border border-line/20 bg-background/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.12)] lg:grid-cols-[1fr_240px] lg:items-start"
                  >
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-blueprint-dim">moment {idx + 1}</div>
                      <h3 className="mt-3 font-mono text-lg font-semibold text-ink capitalize">{story.title}</h3>
                      <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground">
                        {story.description}
                      </p>
                    </div>
                    <div className="relative flex items-start justify-center">
                      <div className="absolute inset-0 rounded-[1.5rem] border border-line/20 bg-blueprint/5 opacity-25" />
                      <div className="absolute left-1/2 top-[-20px] z-10 -translate-x-1/2">
                        <svg viewBox="0 0 32 40" className="h-10 w-10 drop-shadow-[0_0_12px_rgba(243,91,4,0.25)]">
                          <defs>
                            <linearGradient id="pin-head-grad" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#fbbf24" />
                              <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                            <linearGradient id="pin-body-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#fde68a" />
                              <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                          </defs>
                          <path d="M16 0C9.372 0 4 5.372 4 12c0 4.34 2.5 8.4 6.25 10.42L12 34.5a2 2 0 0 0 4 0l1.75-12.08C25.5 20.4 28 16.34 28 12c0-6.628-5.372-12-12-12Z" fill="url(#pin-head-grad)" />
                          <path d="M15 28h2v8h-2z" fill="#f59e0b" />
                          <path d="M14 34h4v4h-4z" fill="#d97706" />
                          <circle cx="16" cy="11" r="2.5" fill="rgba(255,255,255,0.65)" />
                        </svg>
                      </div>
                      <div
                        className="relative overflow-hidden rounded-[1.5rem] border border-line/20 px-1 py-1"
                        style={{ transform: `rotate(${story.rotate})` }}
                      >
                        <div className="absolute left-3 top-3 h-5 w-10 -rotate-6 rounded-b-lg bg-blueprint/20" />
                        <div className="absolute right-3 top-4 h-5 w-10 rotate-6 rounded-b-lg bg-blueprint/10" />
                        <Image
                          src={story.image}
                          alt={`${story.title} snapshot`}
                          width={260}
                          height={180}
                          className="h-44 w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="relative mx-auto w-full max-w-6xl px-4 py-12 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={springUp}
            className="relative border border-line p-6 md:p-12"
          >
            <div className="absolute -top-4 right-6 text-blueprint opacity-85">
              <PaperclipIcon className="h-9 w-9" />
            </div>
            <div className="absolute -top-3 left-6 bg-background px-2 font-mono text-xs uppercase tracking-widest text-blueprint">
              fig.06 — contact
            </div>
            <span className="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-blueprint"></span>
            <span className="absolute -top-1 -right-1 h-2 w-2 border-t border-r border-blueprint"></span>
            <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-blueprint"></span>
            <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-blueprint"></span>

            <motion.h2 variants={fadeIn} className="mb-6 font-mono text-base md:text-lg uppercase tracking-[0.3em] text-blueprint-dim">— reach out</motion.h2>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Mail, label: "email", value: "vindhyashastry23@gmail.com", href: "mailto:vindhyashastry23@gmail.com" },
                { icon: LinkedinIcon, label: "linkedin", value: "linkedin.com/in/vindhya", href: "https://www.linkedin.com/in/vindhya-m-d/" },
                { icon: GithubIcon, label: "github", value: "github.com/vindhyashastry", href: "https://github.com/vindhyashastry" }
              ].map((contact, i) => (
                <motion.a
                  key={i}
                  variants={fadeIn}
                  whileHover={{ y: -5, borderColor: "var(--color-blueprint)" }}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-3 border border-line p-4 transition-all hover:border-blueprint hover:shadow-[0_0_15px_rgba(76,111,152,0.2)] bg-background/40"
                >
                  <contact.icon className="h-4 w-4 text-blueprint" />
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-blueprint-dim">{contact.label}</div>
                    <div className="truncate font-mono text-sm text-ink">{contact.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 font-mono text-[10px] uppercase tracking-widest text-blueprint-dim sm:flex-row">
          <span>© 2026 Vindhya M D — drafted by hand · Bangalore</span>
          <span>rev. 01 · sheet 06/06 </span>
        </div>
      </footer>
    </div>
  );
}
