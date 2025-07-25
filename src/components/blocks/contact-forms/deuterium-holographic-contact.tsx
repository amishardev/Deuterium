"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal, CheckCircle, AlertCircle, LoaderCircle } from 'lucide-react';

const HolographicInput = ({ id, label, ...props }: React.ComponentProps<typeof Input> & { label: string }) => (
  <div className="relative z-10 space-y-2">
    <Label htmlFor={id} className="text-sm font-light text-foreground/80">
      {label}
    </Label>
    <Input
      id={id}
      className="h-11 w-full rounded-none border-0 border-b border-foreground/30 bg-transparent px-1 py-2 text-base text-foreground transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-foreground focus:shadow-[0_2px_12px_-2px_var(--glow)] focus-visible:ring-0"
      {...props}
    />
  </div>
);

const HolographicTextarea = ({ id, label, ...props }: React.ComponentProps<typeof Textarea> & { label: string }) => (
  <div className="relative z-10 space-y-2">
    <Label htmlFor={id} className="text-sm font-light text-foreground/80">
      {label}
    </Label>
    <Textarea
      id={id}
      className="min-h-[100px] w-full resize-none rounded-none border-0 border-b border-foreground/30 bg-transparent px-1 py-2 text-base text-foreground transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-foreground focus:shadow-[0_2px_12px_-2px_var(--glow)] focus-visible:ring-0"
      {...props}
    />
  </div>
);

const Particles = React.memo(({ count = 60 }: { count?: number }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 5,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
});
Particles.displayName = 'Particles';


export default function DeuteriumHolographicContact() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status !== 'idle') return;
        setStatus('submitting');
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (Math.random() > 0.3) {
            setStatus('success');
        } else {
            setStatus('error');
        }

        setTimeout(() => setStatus('idle'), 4000);
    };

    const getButtonContent = () => {
        switch (status) {
            case 'submitting':
                return <><LoaderCircle className="h-5 w-5 animate-spin" /> Submitting...</>;
            case 'success':
                return <><CheckCircle className="h-5 w-5" /> Message Sent</>;
            case 'error':
                return <><AlertCircle className="h-5 w-5" /> Submission Failed</>;
            default:
                return <>Initiate Contact <SendHorizontal className="h-4 w-4" /></>;
        }
    };

    return (
        <section className="relative w-full overflow-hidden bg-background py-24 font-sans sm:py-32">
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
                backgroundSize: '3rem 3rem',
                maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)',
                }}
            />
            <Particles count={70} />

            <div className="container relative z-10 mx-auto max-w-2xl px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/10 bg-accent p-6 shadow-[0_8px_32px_var(--glow)] backdrop-blur-lg sm:p-8 md:p-12"
                >
                    <h2 className="mb-8 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-center font-display text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                        Initiate Contact
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
                            <HolographicInput id="name" label="Name" placeholder="John Doe" required type="text" />
                            <HolographicInput id="email" label="Email Address" placeholder="you@domain.com" required type="email" />
                        </div>
                        <HolographicInput id="company" label="Company / Organization" placeholder="Your Company Inc." type="text" />
                        <HolographicTextarea id="message" label="Message" placeholder="Detail your project, inquiry, or transmission..." required />
                        <div className="pt-4">
                            <Button
                                type="submit"
                                aria-live="polite"
                                disabled={status !== 'idle'}
                                className="group relative h-14 w-full overflow-hidden rounded-lg border border-primary bg-transparent text-lg font-semibold text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_25px_-5px_var(--glow),_inset_0_0_15px_-10px_var(--glow)] focus:shadow-[0_0_25px_-5px_var(--glow)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:shadow-none"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {getButtonContent()}
                                </span>
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}

