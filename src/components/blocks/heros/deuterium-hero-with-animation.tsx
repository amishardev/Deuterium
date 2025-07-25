"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ClientOnly } from "@/components/ui/client-only";

// --- Helper Components ---

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Technologies", href: "#" },
  { name: "Our Bots", href: "#" },
  { name: "Labs", href: "#" },
  { name: "Join Us", href: "#" },
  { name: "Contact", href: "#" },
];

// Navbar logo component using the download.png image
const DefaultLogo = ({ className = "", ...props }: { className?: string }) => (
  <div className={cn("relative", className)} {...props}>
    <Image
      src="/download.png"
      alt="Deuterium Intelligence"
      width={200}
      height={200}
      className="w-full h-full object-contain"
      priority
      quality={100}
    />
  </div>
);

// Center logo component using the DEUTERIUM logo image
const CenterLogo = ({ className = "", ...props }: { className?: string }) => (
  <div className={cn("relative", className)} {...props}>
    <Image
      src="/deuterium-logo.png"
      alt="Deuterium Intelligence Logo"
      width={320}
      height={320}
      className="w-full h-full object-contain"
      priority
      quality={100}
    />
  </div>
);

const DesktopNav = () => (
  <nav className="hidden lg:flex items-center gap-8">
    {navLinks.map((link, i) => (
      <motion.a
        key={link.name}
        href={link.href}
        className="text-sm font-medium text-secondary-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 + i * 0.05, ease: "easeOut" }}
      >
        {link.name}
      </motion.a>
    ))}
  </nav>
);

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-background border-r border-border">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 -ml-3">
            <DefaultLogo className="h-12 w-auto" />
            <SheetClose asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </div>
          <nav className="flex flex-col gap-6 px-6 mt-8">
            {navLinks.map((link) => (
              <SheetClose asChild key={link.name}>
                <a
                  href={link.href}
                  className="text-lg font-medium text-secondary-foreground transition-colors hover:text-foreground"
                >
                  {link.name}
                </a>
              </SheetClose>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Header = () => (
    <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-lg border-b border-border"
    >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <DefaultLogo className="h-16 w-auto" />
        <DesktopNav />
        <MobileNav />
        </div>
    </motion.header>
);

const ParticleRing = () => {
  const Ring = ({ count, radius, duration, direction = 1 }: { count: number; radius: number; duration: number; direction?: number }) => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: 360 * direction }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-white"
          style={{
            transform: `rotate(${(360 / count) * i}deg) translateY(-${radius}px)`,
          }}
        />
      ))}
    </motion.div>
  );

  return (
    <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Ring count={60} radius={120} duration={30} direction={1} />
          <Ring count={50} radius={160} duration={45} direction={-1} />
          <Ring count={40} radius={200} duration={60} direction={1} />
        </motion.div>
      </AnimatePresence>
      <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
      >
        <CenterLogo className="w-32 h-32 sm:w-40 sm:h-40" />
      </motion.div>
    </div>
  );
};

const TypingAnimation = () => {
    const messages = React.useMemo(() => [
        "Advancing humanoid robotics",
        "Creating emotional AI",
        "Building tomorrow's companions",
    ], []);

    const [messageIndex, setMessageIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const handleTyping = () => {
            const currentMessage = messages[messageIndex];
            if (isDeleting) {
                if (charIndex > 0) {
                    setDisplayedText(currentMessage.substring(0, charIndex - 1));
                    setCharIndex((prev) => prev - 1);
                } else {
                    setIsDeleting(false);
                    setMessageIndex((prev) => (prev + 1) % messages.length);
                }
            } else {
                if (charIndex < currentMessage.length) {
                    setDisplayedText(currentMessage.substring(0, charIndex + 1));
                    setCharIndex((prev) => prev + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 2500);
                }
            }
        };

        const typingSpeed = isDeleting ? 40 : 80;
        const timeoutId = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timeoutId);
    }, [charIndex, isDeleting, displayedText, messageIndex, messages]);

    return (
        <div className="h-8 text-center">
            <p className="text-lg sm:text-xl text-secondary-foreground font-body">
                {displayedText}
                <motion.span
                    className="inline-block w-0.5 h-6 bg-foreground ml-2 align-bottom"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    aria-hidden="true"
                />
            </p>
        </div>
    );
};

const BackgroundParticles = () => {
    const [mounted, setMounted] = useState(false);

    // Generate deterministic particles to avoid hydration mismatch
    const particles = React.useMemo(() => {
        // Use a simple seeded random function for consistent results
        const seededRandom = (seed: number) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        return Array.from({ length: 75 }).map((_, i) => ({
            id: i,
            x: seededRandom(i * 1.1) * 100,
            y: seededRandom(i * 2.3) * 100,
            size: seededRandom(i * 3.7) * 2.5 + 1,
            duration: seededRandom(i * 4.1) * 20 + 20,
            delay: seededRandom(i * 5.9) * -30,
            xOffset: seededRandom(i * 6.7) * 20 - 10
        }));
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="absolute inset-0 z-0 h-full w-full overflow-hidden" aria-hidden="true" />;
    }

    return (
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden" aria-hidden="true">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white/5"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                    }}
                    animate={{ y: [0, -120, 0], x: [0, p.xOffset, 0] }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: p.delay,
                        ease: 'easeInOut'
                    }}
                />
            ))}
        </div>
    );
};

// --- Main Hero Component ---

export default function DeuteriumHeroWithAnimation() {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground flex flex-col items-center justify-center overflow-hidden">
      <ClientOnly>
        <BackgroundParticles />
      </ClientOnly>
      <Header />
      <main className="relative z-10 flex flex-grow flex-col items-center justify-center text-center px-4 pt-20">
        <div className="flex flex-col items-center justify-center">
          <ParticleRing />

          <motion.h1 
            className="mt-8 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
          >
            The Future of Intelligence
          </motion.h1>

          <motion.div
            className="mt-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          >
            <TypingAnimation />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
          >
            <Button
              size="lg"
              variant="outline"
              className="group bg-transparent text-lg text-foreground border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 ease-in-out hover:shadow-[0_0_25px_var(--color-glow)] px-8 py-6"
            >
              Explore Our Technology
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}