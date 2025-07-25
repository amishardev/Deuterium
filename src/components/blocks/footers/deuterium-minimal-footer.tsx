"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { DeuteriumLogo } from "@/components/ui/deuterium-logo";

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
    ariaLabel: "Follow Deuterium Intelligence on Twitter",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
    ariaLabel: "Follow Deuterium Intelligence on LinkedIn",
  },
  {
    name: "GitHub",
    href: "#",
    icon: Github,
    ariaLabel: "Check out Deuterium Intelligence on GitHub",
  },
];

const footerLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Contact", href: "#" },
];

export default function DeuteriumMinimalFooter() {
  return (
    <footer className="w-full bg-transparent font-sans">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-accent p-8 backdrop-blur-xl sm:p-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 25%, var(--glow), transparent 50%), radial-gradient(circle at 80% 85%, var(--glow), transparent 40%)",
            }}
          />

          {/* Top section: Logo, Tagline, and Social Links */}
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
              <Link href="#" aria-label="Deuterium Intelligence Homepage">
                <DeuteriumLogo className="h-8 w-auto" textClassName="text-xl font-medium tracking-wide" />
              </Link>
              <p className="max-w-sm text-sm text-secondary-foreground">
                Advancing the Future of Intelligence
              </p>
            </div>
            <div className="flex items-center gap-5">
              {socialLinks.map(({ name, href, icon: Icon, ariaLabel }) => (
                <Link
                  key={name}
                  href={href}
                  aria-label={ariaLabel}
                  className="group"
                >
                  <Icon className="size-5 text-secondary-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-foreground" />
                </Link>
              ))}
            </div>
          </div>

          <hr className="my-8 border-border/50" />

          {/* Bottom section: Copyright and Footer Links */}
          <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-secondary-foreground">
              &copy; {new Date().getFullYear()} Deuterium Intelligence. All
              rights reserved.
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {footerLinks.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="text-sm text-secondary-foreground transition-colors hover:text-foreground"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}