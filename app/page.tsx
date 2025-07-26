"use client";
/*eslint-disable */
import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {  ArrowRight, Menu, X } from 'lucide-react';
  import GlowingButton from '../components/GlowingButton';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import Image from 'next/image';
import PricingSection from '@/components/PricingSection';
import HowItWorks from '@/components/HowItWorks';
import FeaturesSection from '@/components/FeaturesSection';
import HeroSection from '@/components/HeroSection';

  import Link from "next/link";

const SentimentDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  type MotionDivProps = {
    children: React.ReactNode;
    className?: string;
    variants?: any;
    delay?: number;
    [key: string]: any;
  };

  const MotionDiv: React.FC<MotionDivProps> = ({ children, className = "", variants = fadeInUp, delay = 0, ...props }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        className={className}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={variants}
        transition={{ ...variants.transition, delay: delay / 1000 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]"
          animate={{ 
            background: [
              "radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)",
              "radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)",
              "radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"
          animate={{ 
            background: [
              "radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)",
              "radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.1),transparent_50%)",
              "radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(34,197,94,0.05),transparent_50%)]" />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/20 border-b border-slate-800/30 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src="/S.png" alt="SentimAIn" width={36} height={32}/>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SentimAIn
              </span>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <Link href="/analyze">
              <GlowingButton primary>Get Started</GlowingButton>
              </Link>
            </motion.div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <HeroSection />


      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Pricing Section */}
      <PricingSection /> 

      {/* About Section */}
      <AboutSection />

      {/* CTA Section */}
      <section id="cta" className="py-20 px-6">
        <MotionDiv className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Bergabunglah dengan ribuan perusahaan yang telah merasakan manfaat analisis sentimen AI untuk mengoptimalkan strategi bisnis mereka.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <GlowingButton primary className="text-lg px-12 py-5">
              <span className="flex items-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </span>
            </GlowingButton>
            <GlowingButton className="text-lg px-12 py-5">
              Schedule Demo
            </GlowingButton>
          </motion.div>
        </MotionDiv>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SentimentDashboard;