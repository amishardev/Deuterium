"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Cpu, FlaskConical, Palette, Users, Briefcase, MapPin, CheckCircle } from 'lucide-react';

type JobCategory = 'Engineering' | 'Research' | 'Design' | 'Leadership';

type Job = {
  id: string;
  title: string;
  category: JobCategory;
  level: string;
  location: string;
  team: string;
  requirements: string[];
};

const jobOpenings: Job[] = [
  {
    id: 'ai-research-scientist',
    title: 'AI Research Scientist',
    category: 'Research',
    level: 'Senior (L5)',
    location: 'Orbital Station VII',
    team: 'Cognitive Architectures',
    requirements: ['PhD in AI/ML or related field', '5+ years in neural network research', 'Proficiency in Hyper-PyTorch', 'Experience with quantum-annealing models'],
  },
  {
    id: 'robotics-engineer',
    title: 'Robotics Engineer',
    category: 'Engineering',
    level: 'Mid-Level (L4)',
    location: 'Mars Colony, Ares Prime',
    team: 'Autonomous Systems',
    requirements: ['B.S. in Mechatronics/Robotics', 'Expertise in ROS 2 & sim-to-real', 'Experience with bipedal locomotion', 'Fusion 360 & custom actuator design'],
  },
  {
    id: 'human-ai-interaction-designer',
    title: 'Human-AI Interaction Designer',
    category: 'Design',
    level: 'Lead (L6)',
    location: 'Earth HQ, Neo-Kyoto',
    team: 'User Empathy Division',
    requirements: ['Portfolio of AI-integrated products', 'Deep understanding of cognitive psychology', 'Mastery of holographic interface tools', 'Experience with multi-modal inputs'],
  },
  {
    id: 'machine-learning-engineer',
    title: 'Machine Learning Engineer',
    category: 'Engineering',
    level: 'Senior (L5)',
    location: 'Remote (Solar System)',
    team: 'Predictive Analytics Core',
    requirements: ['M.S. in Computer Science', 'Large-scale model deployment (MaaS)', 'Expert in distributed data processing', 'Fluent in Python, Rust, and Mojo'],
  },
  {
      id: 'quantum-computing-specialist',
      title: 'Quantum Computing Specialist',
      category: 'Research',
      level: 'Principal (L7)',
      location: 'Jupiter Deep Space Lab',
      team: 'Advanced Computation',
      requirements: ['Post-doc in Quantum Physics', 'Hands-on with q-bit stabilization', 'Algorithm design for quantum hardware', 'Top-secret security clearance required'],
  },
  {
      id: 'cybernetics-integration-lead',
      title: 'Cybernetics Integration Lead',
      category: 'Leadership',
      level: 'Director',
      location: 'Earth HQ, Neo-Kyoto',
      team: 'Executive Strategy',
      requirements: ['10+ years in human-machine interface', 'Proven track record of leading large teams', 'Biomedical engineering background', 'Strong ethical framework and vision'],
  },
  {
      id: 'xr-developer',
      title: 'Extended Reality (XR) Developer',
      category: 'Design',
      level: 'Mid-level (L4)',
      location: 'Virtual Office (Metaverse)',
      team: 'Immersive Experiences',
      requirements: ['Proficient in Unity/Unreal Engine 7', 'Experience with neuralink renderers', '3D asset optimization skills', 'Strong grasp of spatial computing'],
  },
  {
    id: 'devops-architect',
    title: 'DevOps Architect',
    category: 'Engineering',
    level: 'Staff Engineer (L6)',
    location: 'Cloud Sphere 01',
    team: 'Infrastructure Security',
    requirements: ['Expert in container orchestration', 'Infrastructure as Code (IaC) mastery', 'Experience with inter-planetary networks', 'Zero-trust security architecture'],
  }
];

const BackgroundEffects = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
    <div
      className="absolute top-0 left-0 w-full h-full scanner-line"
    />
    <style jsx>{`
      @keyframes scan {
        0% { transform: translateY(-10%); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { transform: translateY(110%); opacity: 0; }
      }
      .scanner-line::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(to right, transparent, var(--glow), transparent);
        animation: scan 8s linear infinite;
        animation-delay: -4s;
      }
    `}</style>
  </div>
);


const JobCard = ({ job }: { job: Job }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative group rounded-lg border border-border bg-accent/50 backdrop-blur-sm p-6 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_25px_var(--glow)]"
    >
      <div className="absolute -top-1 -right-1 bg-primary/10 w-16 h-16 rounded-full blur-2xl group-hover:w-24 group-hover:h-24 transition-all duration-500" />
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{job.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{job.team}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>
          <div className="border-t border-border my-4"></div>
          <p className="font-mono text-sm text-muted-foreground mb-4">Key Requirements:</p>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-secondary-foreground">
                <CheckCircle className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                <span className="font-mono">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Button variant="outline" className="w-full bg-transparent border-primary/30 text-secondary-foreground hover:bg-primary hover:text-primary-foreground group-hover:border-primary/80 transition-all duration-300">
            Transmit Application <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


const DeuteriumCareersBoard = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const categories: JobCategory[] = ['Engineering', 'Research', 'Design', 'Leadership'];

  const filteredJobs = useMemo(() => {
    if (activeTab === 'all') return jobOpenings;
    return jobOpenings.filter(job => job.category === activeTab);
  }, [activeTab, jobOpenings]);

  return (
    <section className="relative w-full bg-background text-foreground py-20 sm:py-24 lg:py-32">
      <BackgroundEffects />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="bg-accent border-secondary text-secondary-foreground mb-4 font-mono text-sm tracking-widest">
            JOIN.US
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/70">
            Open Transmissions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We are building the future of intelligence. We seek pioneers, dreamers, and builders to join our quest. Explore our open roles and help us shape the next era of technology.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-xl mx-auto grid-cols-2 sm:grid-cols-5 bg-secondary/30 p-1 rounded-lg backdrop-blur-sm border border-border">
            <TabsTrigger value="all" className="data-[state=active]:bg-accent data-[state=active]:text-foreground data-[state=active]:shadow-[0_0_15px_var(--glow)] rounded-md transition-all duration-300 py-2">All</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="data-[state=active]:bg-accent data-[state=active]:text-foreground data-[state=active]:shadow-[0_0_15px_var(--glow)] rounded-md transition-all duration-300 py-2">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mt-12">
            {filteredJobs.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                 </div>
            ) : (
                <div className="text-center py-16 px-6 bg-accent/30 rounded-lg border border-border backdrop-blur-sm">
                    <p className="text-lg text-muted-foreground font-mono">--// NO POSITIONS MATCHING CRITERIA //--</p>
                    <p className="mt-2 text-secondary-foreground">Check back soon or view all open roles.</p>
                </div>
            )}
            </div>
        </Tabs>
      </div>
    </section>
  );
};

export default DeuteriumCareersBoard;
