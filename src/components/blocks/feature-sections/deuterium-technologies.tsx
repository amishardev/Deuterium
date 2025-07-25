"use client";

import React from "react";
import { motion } from "motion/react";
import { BrainCircuit, Bot, BotMessageSquare, Smile } from "lucide-react";

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

// A purely decorative particle component for the glassmorphism card background
const Particles: React.FC<{ count?: number }> = ({ count = 15 }) => {
  const particles = React.useMemo(() => 
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    })), 
  [count]);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/5"
          style={{
            width: p.size,
            height: p.size,
            top: p.y,
            left: p.x,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const technologies: {
  icon: IconComponent;
  title: string;
  description: string;
}[] = [
  {
    icon: (props) => (
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BrainCircuit {...props} />
      </motion.div>
    ),
    title: "Large Language Models",
    description: "Harnessing the power of vast neural networks to understand, generate, and revolutionize human-computer interaction.",
  },
  {
    icon: (props) => (
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Bot {...props} />
      </motion.div>
    ),
    title: "Humanoid Robotics",
    description: "Engineering advanced robotics with human-like dexterity and intelligence to operate in complex, real-world environments.",
  },
  {
    icon: (props) => (
      <motion.div
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BotMessageSquare {...props} />
      </motion.div>
    ),
    title: "Interactive AI",
    description: "Creating dynamic, conversational AI that engages users in natural, meaningful dialogue across various platforms.",
  },
  {
    icon: (props) => (
      <motion.div
        animate={{ scale: [1, 1.1, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Smile {...props} />
      </motion.div>
    ),
    title: "Disney-Inspired Robots",
    description: "Blending artistry with technology to build character-driven robots that inspire wonder, emotion, and connection.",
  },
];

interface TechnologyCardProps {
  icon: IconComponent;
  title: string;
  description: string;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    className="relative overflow-hidden rounded-2xl border border-white/10 bg-accent p-8 backdrop-blur-md"
    whileHover={{ 
      scale: 1.025, 
      boxShadow: "0 0 30px 5px var(--color-glow)",
      borderColor: 'rgba(255, 255, 255, 0.25)'
    }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    <Particles count={15} />
    <div className="relative z-10">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-black/25 ring-1 ring-white/10">
        <Icon className="h-9 w-9 text-white" />
      </div>
      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <p className="mt-2 text-base text-secondary-foreground">{description}</p>
    </div>
  </motion.div>
);

export default function DeuteriumTechnologies() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Our Core Technology Pillars
          </h2>
          <p className="mt-6 text-lg leading-8 text-secondary-foreground">
            We are at the forefront of innovation, engineering systems that are not only intelligent but also intuitive, interactive, and inspiring.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {technologies.map((tech) => (
            <TechnologyCard
              key={tech.title}
              icon={tech.icon}
              title={tech.title}
              description={tech.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
