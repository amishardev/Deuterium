"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Scale, UserRound, Rocket } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const timelineData: Omit<TimelineItemProps, 'isLast'>[] = [
  {
    year: "2025",
    title: "Deuterium Established",
    description: "With a bold vision for the future, we officially launched Deuterium, laying the foundation for a next-gen ecosystem that redefines intelligence and connectivity.",
  },
  {
    year: "2025",
    title: "Founded IRA AI",
    description: "Designed to be a compassionate and intuitive companion, we introduced IRA — an intelligent humanoid assistant built to bring emotion and empathy into AI interaction.",
  },
  {
    year: "2025",
    title: "Made Trinity LLM",
    description: "Taking a giant leap in neural architecture, we created Trinity LLM — a powerful language model designed for real-time learning, conversation, and adaptive reasoning.",
  },
  {
    year: "2025",
    title: "Made Trinity OS",
    description: "Blending robotics with artificial intelligence, we developed Trinity OS — a fully adaptive, AI-based operating system crafted for humanoid and service robots.",
  },
];

const valueData = [
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We thrive on creativity and ingenuity, relentlessly pushing the boundaries of what's possible to craft novel solutions.",
  },
  {
    icon: Scale,
    title: "Ethics",
    description: "Our unwavering commitment to transparency and integrity forms the immutable cornerstone of our business and partnerships.",
  },
  {
    icon: UserRound,
    title: "Human-Centric Design",
    description: "We place users at the absolute heart of our design process, architecting intuitive, empathetic, and impactful experiences.",
  },
  {
    icon: Rocket,
    title: "Future-Forward Thinking",
    description: "We don't just follow trends; we anticipate and define them, building solutions that are not just current, but visionary.",
  },
];

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description }) => (
  <motion.div
    className="relative pl-12 group"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="absolute left-[3px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary transition-colors duration-300 group-hover:bg-primary" />
    <div className="absolute left-[3px] top-1 w-4 h-4 rounded-full bg-glow opacity-0 scale-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300 blur-sm" />
    <p className="text-sm font-medium text-secondary-foreground mb-1">{year}</p>
    <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
    <p className="text-base text-secondary-foreground">{description}</p>
  </motion.div>
);

export default function DeuteriumAboutTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  return (
    <section className="bg-background text-foreground font-body">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl font-display">
            Our Journey. Our Values.
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-lg text-secondary-foreground">
            A chronicle of our evolution and the principles that illuminate our path forward.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-24 lg:gap-16 items-start">
          {/* Timeline Column */}
          <div ref={scrollRef} className="relative">
            <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-border" />
            <motion.div 
              style={{ height: lineHeight }}
              className="absolute left-2.5 top-0 w-0.5 bg-primary origin-top"
            />
            <div className="space-y-20">
              {timelineData.map((item, index) => (
                <TimelineItem key={index} {...item} />
              ))}
            </div>
          </div>

          {/* Values Column */}
          <motion.div 
            className="flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {valueData.map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-lg border border-white/10 p-6"
                >
                  <div className="absolute inset-0 bg-accent opacity-50 backdrop-blur-sm group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative z-10 flex flex-col h-full">
                    <Icon className="w-8 h-8 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                    <h4 className="text-lg font-bold text-primary mb-2 font-display">{title}</h4>
                    <p className="text-sm text-secondary-foreground flex-grow">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}