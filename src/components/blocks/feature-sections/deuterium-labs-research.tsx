"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  BrainCog,
  Move3d,
  BotMessageSquare,
  UsersRound,
  Icon as LucideIcon,
} from "lucide-react";

// Assuming shadcn/ui Progress component is available at this path
// Also assuming a `cn` utility exists for merging Tailwind classes
import { Progress } from "@/components/ui/progress";

type Metric = {
  name: string;
  value: string;
};

type ResearchProject = {
  icon: LucideIcon;
  title: string;
  status: string;
  progress: number;
  metrics: Metric[];
  color: string;
};

const researchProjects: ResearchProject[] = [
  {
    icon: BrainCog,
    title: "Emotional AI Development",
    status: "Active Research",
    progress: 75,
    metrics: [
      { name: "Sentiment Accuracy", value: "92.1%" },
      { name: "Nuance Detection", value: "85.7%" },
    ],
    color: "var(--color-chart-1)",
  },
  {
    icon: Move3d,
    title: "Advanced Locomotion",
    status: "Simulation Phase",
    progress: 45,
    metrics: [
      { name: "Terrain Adaptability", value: "68%" },
      { name: "Energy Efficiency", value: "+15%" },
    ],
    color: "var(--color-chart-2)",
  },
  {
    icon: BotMessageSquare,
    title: "Natural Language Processing",
    status: "Model Training",
    progress: 88,
    metrics: [
      { name: "Token Throughput", value: "1.2T/s" },
      { name: "Context Window", value: "256k" },
    ],
    color: "var(--color-chart-3)",
  },
  {
    icon: UsersRound,
    title: "Human-Robot Interaction",
    status: "User Testing",
    progress: 62,
    metrics: [
      { name: "Task Success Rate", value: "94%" },
      { name: "User Trust Score", value: "8.9/10" },
    ],
    color: "var(--color-chart-4)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const ProjectCard = ({ project, index }: { project: ResearchProject; index: number }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      custom={index}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border bg-accent/70 p-6 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-primary/80 hover:shadow-[0_0_20px_5px_var(--glow)] border-secondary"
    >
      <div className="flex items-start justify-between">
        <project.icon className="h-8 w-8 text-secondary-foreground transition-colors duration-300 group-hover:text-primary" />
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: project.color, boxShadow: `0 0 8px 0px ${project.color}` }}
          />
          <span className="text-xs font-medium text-secondary-foreground">{project.status}</span>
        </div>
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground md:text-lg">{project.title}</h3>
      <div className="flex-grow" />
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          {project.metrics.map((metric) => (
            <div key={metric.name} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{metric.name}</span>
              <span className="font-mono font-medium text-foreground">{metric.value}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-mono font-semibold text-foreground">{project.progress}%</span>
          </div>
          <Progress
            value={project.progress}
            className="h-2 bg-secondary/50 [&>div]:bg-[var(--progress-color)]"
            style={{ "--progress-color": project.color } as React.CSSProperties}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function DeuteriumLabsResearch() {
  return (
    <section id="research" className="w-full bg-background py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Labs & Research
          </h2>
          <p className="mt-4 text-lg text-secondary-foreground">
            Explore our active R&D projects at the forefront of AI and robotics,
            pushing the boundaries of what's possible.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {researchProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
