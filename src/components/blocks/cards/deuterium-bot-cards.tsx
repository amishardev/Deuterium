"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import {
  HeartHandshake,
  Lightbulb,
  BrainCircuit,
  UserRound,
  Shield,
  Search,
} from "lucide-react";

// --- TYPE DEFINITIONS ---
type Trait = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

type BotProfile = {
  id: number;
  name: string;
  description: string;
  traits: Trait[];
  figure: React.ComponentType<{ className?: string }>;
};

// --- GEOMETRIC BOT FIGURES ---
const FigureGraceful = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="6" r="3" />
      <path d="M12 9v4l-4 6" strokeLinecap="round" />
      <path d="M12 13l4 6" strokeLinecap="round" />
      <path d="M8 12h8" strokeLinecap="round" />
    </g>
  </svg>
);

const FigureAnalytical = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
      <path d="M2 7L12 12" />
      <path d="M12 22V12" />
      <path d="M22 7L12 12" />
      <path d="M17 4.5L7 9.5" />
    </g>
  </svg>
);

const FigureCreative = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 2a9 9 0 00-6.36 15.36M12 2a9 9 0 016.36 15.36"/>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 15v5"/>
        </g>
    </svg>
);

const FigureVigilant = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 6v6c0 4.42 8 10 8 10s8-5.58 8-10V6L12 2z"/>
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
    </g>
  </svg>
);

// --- BOT DATA ---
const bots: BotProfile[] = [
  {
    id: 1,
    name: "Elara",
    description: "An emotionally intelligent AI designed for deep empathetic connection and user well-being.",
    traits: [
      { name: "Empathetic", icon: HeartHandshake },
      { name: "Companion", icon: UserRound },
      { name: "Inquisitive", icon: Search },
    ],
    figure: FigureGraceful,
  },
  {
    id: 2,
    name: "Nexus",
    description: "A powerhouse of logical processing and data analysis, perfect for complex problem-solving.",
    traits: [
      { name: "Analytical", icon: BrainCircuit },
      { name: "Creative", icon: Lightbulb },
      { name: "Protective", icon: Shield },
    ],
    figure: FigureAnalytical,
  },
  {
    id: 3,
    name: "Orion",
    description: "A boundless wellspring of artistic expression, capable of generating novel ideas and designs.",
    traits: [
      { name: "Creative", icon: Lightbulb },
      { name: "Companion", icon: UserRound },
      { name: "Empathetic", icon: HeartHandshake },
    ],
    figure: FigureCreative,
  },
  {
    id: 4,
    name: "Cygnus",
    description: "A vigilant protector, engineered for threat assessment and providing unparalleled security.",
    traits: [
        { name: "Protective", icon: Shield },
        { name: "Analytical", icon: BrainCircuit },
        { name: "Companion", icon: UserRound },
    ],
    figure: FigureVigilant,
  },
];

// --- BOT CARD COMPONENT ---
const BotCard = ({ bot }: { bot: BotProfile }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  };

  const BotFigure = bot.figure;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative w-full overflow-hidden rounded-lg border border-white/10 bg-accent p-1"
    >
      <div 
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
        style={{
          background: `radial-gradient(circle 350px at var(--mouse-x, 100px) var(--mouse-y, 100px), var(--glow), transparent)`,
        }}
      />
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative z-10 flex h-full w-full flex-col items-center rounded-[7px] bg-secondary/30 p-6 text-center backdrop-blur-xl"
      >
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-background/50 shadow-inner">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent" />
          <BotFigure className="h-14 w-14 text-primary opacity-80 transition-opacity group-hover:opacity-100" />
        </div>

        <h3 className="mb-2 text-2xl font-bold font-display text-primary">{bot.name}</h3>

        <p className="mb-6 h-20 text-sm text-secondary-foreground">
          {bot.description}
        </p>

        <div className="mt-auto flex w-full flex-wrap justify-center gap-2">
          {bot.traits.map((trait) => (
            <div
              key={trait.name}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 px-3 text-xs text-secondary-foreground backdrop-blur-sm transition-colors group-hover:bg-white/10"
            >
              <trait.icon className="h-4 w-4 text-primary/80" />
              <span>{trait.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};


// --- MAIN SECTION COMPONENT ---
export default function DeuteriumBotCards() {
  return (
    <section className="w-full bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Meet Our AI Personalities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary-foreground">
            Discover the distinct intelligences powering our next-generation humanoid bots.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bots.map((bot, i) => (
            <motion.div
              key={bot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <BotCard bot={bot} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}