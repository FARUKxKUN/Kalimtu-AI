"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnimatedNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className="group relative inline-block overflow-hidden h-5 flex items-center text-sm"
    >
      <motion.div className="flex flex-col transition-transform duration-300 ease-out">
        <span className="text-[#A0A0B8] block h-5 flex items-center">
          {children}
        </span>
        <span className="text-[#C1FF00] block h-5 flex items-center font-bold">
          {children}
        </span>
      </motion.div>
    </a>
  );
};

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShape, setHeaderShape] = useState("rounded-full");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShape("rounded-2xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShape("rounded-full");
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <img src="/logo.svg" alt="Kalimtu Logo" className="h-6 w-auto object-contain" />
  );

  const loginButtonElement = (
    <button className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#3D3D54] bg-transparent text-[#A0A0B8] rounded-full hover:border-[#C1FF00]/60 hover:text-[#C1FF00] transition-colors duration-200 w-full sm:w-auto font-medium">
      Log In
    </button>
  );

  const signupButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div className="absolute inset-0 -m-2 rounded-full hidden sm:block bg-[#C1FF00] opacity-30 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-50 group-hover:blur-xl group-hover:-m-3"></div>
      <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-bold text-[#0A0A0F] bg-[#C1FF00] rounded-full hover:bg-[#D4FF33] transition-all duration-200 w-full sm:w-auto">
        Join Beta
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
                 flex flex-col items-center
                 pl-7 pr-7 py-3 backdrop-blur-md
                 ${headerShape}
                 border border-[#3D3D54] bg-[#0A0A0F]/70
                 w-[calc(100%-2rem)] sm:max-w-2xl lg:max-w-3xl
                 transition-[border-radius] duration-300 ease-out
                 shadow-lg shadow-[#C1FF00]/10`}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-10">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          {logoElement}
          <span className="hidden sm:inline text-sm font-bold text-white font-display tracking-tight">
            Kalimtu
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {loginButtonElement}
          {signupButtonElement}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-[#C1FF00] focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden flex flex-col items-center w-full mt-4 pb-4 border-t border-[#3D3D54] pt-4"
          >
            <nav className="flex flex-col items-center space-y-3 text-sm w-full mb-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#A0A0B8] hover:text-[#C1FF00] transition-colors w-full text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col items-center space-y-2 w-full gap-2">
              {loginButtonElement}
              {signupButtonElement}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
