'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket, Calendar, BookOpen, ChevronRight } from 'lucide-react';

const navLinks = [
  { href: '#products', label: 'Products', icon: Rocket },
  { href: '#meetups', label: 'Meetups', icon: Calendar },
  { href: '#story', label: 'Story', icon: BookOpen },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-background/95 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/delhi-devs-rebooted.png"
                alt="Delhi Devs Rebooted"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <span className="font-bold text-foreground text-sm sm:text-base">Delhi Devs Rebooted</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="#join">
              <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Join Community
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span 
              className={`w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} 
            />
            <span 
              className={`w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`} 
            />
            <span 
              className={`w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} 
            />
          </button>
        </nav>
      </header>

      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col pt-20 px-6 pb-8">
          <div className="flex-1 flex flex-col justify-center space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/50 hover:bg-card transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms' }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-lg font-semibold text-foreground">{link.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>

          <div 
            className={`transition-all duration-500 ${
              isMobileMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
          >
            <Link href="#join" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold shadow-lg shadow-primary/20"
              >
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}