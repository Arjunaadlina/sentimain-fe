import Image from "next/image"
import { motion } from "framer-motion";
import { useState } from "react";
import GlowingButton from "./GlowingButton";
import {  ArrowRight,Eye, Target,
  TrendingUp,
  MessageSquare,
  Heart,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  ThumbsDown,
  BarChart,
  PieChart,
  Activity,
  Search,
  Database, Brain } from 'lucide-react';


function HeroSection() {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const analysisIcons = [
    TrendingUp, Brain, MessageSquare, Target, Eye, Heart,
    Smile, Frown, Meh, ThumbsUp, ThumbsDown, BarChart,
    PieChart, Activity, Search, Database
  ];

  type AnimatedIconProps = {
    Icon: React.ComponentType<{ size?: number }>;
    delay: number;
    index: number;
    total: number;
  };
  
  const AnimatedIcon: React.FC<AnimatedIconProps> = ({ Icon, delay, index, total }) => {
    const angle = (index / total) * 360;
    const radius = 300;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
  
    return (
      <motion.div
        className="absolute left-1/2 top-1/2"
        initial={{ 
          x: 0, 
          y: 0, 
          opacity: 0,
          scale: 0
        }}
        animate={{ 
          x: x, 
          y: y, 
          opacity: 0.6,
          scale: 1
        }}
        transition={{
          duration: 1.2,
          delay: delay + index * 0.1,
          ease: "easeOut"
        }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut"
          }}
          className="text-slate-400/60 hover:text-blue-400/80 transition-colors duration-300"
        >
          <Icon size={24} />
        </motion.div>
      </motion.div>
    );
  };

  // Function to handle the form submission or navigation
  const handleGetStarted = () => {
    if (youtubeUrl.trim()) {
      // Encode the URL to make it safe for query parameters
      const encodedUrl = encodeURIComponent(youtubeUrl);
      // Navigate to analyze page with the URL as a query parameter
      window.location.href = `/analyze?url=${encodedUrl}`;
    } else {
      // If no URL is provided, just go to the analyze page
      window.location.href = '/analyze';
    }
  };

  // Function to handle Enter key press in input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGetStarted();
    }
  };
  
  return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative md:px-15">
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]" />
            </div>

            <section className="relative pt-32 pb-20 px-6">
              <div className="max-w-7xl ">
                {/* Floating Icons around the title */}
                <div className="absolute inset-0 pointer-events-none">
                  {analysisIcons.map((Icon, index) => (
                    <AnimatedIcon
                      key={index}
                      Icon={Icon}
                      delay={1.5}
                      index={index}
                      total={analysisIcons.length}
                    />
                  ))}
                </div>

                <motion.div 
                  className="mb-8 relative z-10"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.h1 
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent "
                      style={{ backgroundSize: '200% 200%' }}
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                      Intelligent
                    </motion.span>
                    <br />
                    <span className="text-white">Sentiment Analysis</span>
                  </motion.h1>
                  <motion.p 
                    className="text-xl md:text-2xl text-white max-w-3xl  mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Know your society, create policy
                  </motion.p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col sm:flex-col gap-4 mb-16 relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className='flex flex-col sm:flex-row items-start sm:items-end gap-4 md:gap-12'>
                    <div className='w-full sm:w-[400px]'>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        YouTube Video URL
                      </label>
                      <input
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-200 placeholder-slate-400"
                      />
                    </div>
                    <div onClick={handleGetStarted} className='cursor-pointer'>
                      <GlowingButton primary className="text-md px-12 py-3 cursor-pointer">
                        <span className="flex items-center gap-2">
                          Get Started Free <ArrowRight className="w-5 h-5" />
                        </span>
                      </GlowingButton>
                    </div>
                    <div className='absolute xl:right-[-50px] lg:right-[-50px] md:right-[-50px] hidden md:block md:top-[-200px] lg:top-[-250px]'>
                    <Image
                      src={"/laptop.png"}
                      className='xl:w-[400px] xl:h-[400px] object-contain lg:w-[300px] lg:h-[300px] md:w-[200px] md:h-[200px] w-[200px] h-[200px] hidden md:block'
                      alt="Laptop"
                      width={400}
                      height={300}
                     />
                     </div>
                  </div>

                  <motion.p 
                    className="text-xl md:text-2xl text-slate-300 max-w-3xl  mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Revolusi kebijakan berbasis opini publik digital dengan teknologi Deep Learning CNN secara real-time.
                  </motion.p>
                </motion.div>
              </div>
            </section>
          </div>
  )
}

export default HeroSection