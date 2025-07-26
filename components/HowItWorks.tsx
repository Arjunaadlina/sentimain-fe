/*eslint-disable */

import React from 'react'
import FloatingCard from './FloatingCard'
import { motion, useInView } from 'framer-motion'
import { Cpu, Eye, Target } from 'lucide-react'

function HowItWorks() {
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


    const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };


  return (
          <section id="how-it-works" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <MotionDiv className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Proses sederhana dalam 3 langkah untuk mendapatkan insights sentimen yang powerful
            </p>
          </MotionDiv>

          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                step: "01",
                icon: <Target className="w-16 h-16 text-blue-400" />,
                title: "Data Collection",
                description: "Otomasi scraping data dari berbagai sumber seperti media sosial, review, dan forum dengan teknologi scraping terdepan"
              },
              {
                step: "02", 
                icon: <Cpu className="w-16 h-16 text-emerald-400" />,
                title: "AI Processing",
                description: "Model Deep Learning CNN memproses dan menganalisis sentimen dari data yang dikumpulkan dengan akurasi tinggi"
              },
              {
                step: "03",
                icon: <Eye className="w-16 h-16 text-purple-400" />,
                title: "Insights & Reports",
                description: "Dashboard interaktif menampilkan hasil analisis dalam bentuk visualisasi yang mudah dipahami dan actionable"
              }
            ].map((step, index) => (
              <FloatingCard key={index} delay={index * 200}>
                <div className="p-8 text-center">
                  <motion.div 
                    className="text-6xl font-bold text-slate-700 mb-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {step.step}
                  </motion.div>
                  <motion.div 
                    className="mb-6 flex justify-center"
                    initial={{ scale: 0, rotate: 180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </FloatingCard>
            ))}
          </motion.div>
        </div>
      </section>
  )
}

export default HowItWorks