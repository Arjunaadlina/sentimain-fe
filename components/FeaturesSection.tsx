/*eslint-disable */

import React from 'react'
import FloatingCard from './FloatingCard'
import { motion, useInView } from 'framer-motion'
import { BarChart3, Brain, Globe, Shield, Users, Zap } from 'lucide-react'

function FeaturesSection() {

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
              <section id="features" className="py-20 px-6  rounded-t-4xl mt-[-24px] z-10 relative bg-gradient-to-tl from-slate-950 via-slate-900 to-slate-950 ">
        <div className="max-w-7xl mx-auto">
          <MotionDiv className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Teknologi terdepan untuk analisis sentimen yang akurat dan otomasi scraping yang efisien
            </p>
          </MotionDiv>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: <Brain className="w-12 h-12 text-blue-400" />,
                title: "Deep Learning CNN",
                description: "Model neural network canggih untuk akurasi analisis sentimen",
                delay: 0
              },
              {
                icon: <Zap className="w-12 h-12 text-emerald-400" />,
                title: "Easy to Use",
                description: "Analisis data dengan mudah dan cepat",
                delay: 100
              },
              {
                icon: <Shield className="w-12 h-12 text-purple-400" />,
                title: "Enterprise Security",
                description: "Enkripsi end-to-end dan compliance dengan standar keamanan internasional",
                delay: 200
              },
              {
                icon: <Globe className="w-12 h-12 text-orange-400" />,
                title: "Multi-Platform Scraping",
                description: "Mendukung scraping dari berbagai platform media sosial dan website",
                delay: 300
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-cyan-400" />,
                title: "Advanced Analytics",
                description: "Dashboard komprehensif dengan visualisasi data dan insights mendalam",
                delay: 400
              },
              {
                icon: <Users className="w-12 h-12 text-pink-400" />,
                title: "Team Collaboration",
                description: "Fitur kolaborasi tim dengan role-based access control",
                delay: 500
              }
            ].map((feature, index) => (
              <FloatingCard key={index} delay={feature.delay} index={index}>
                <div className="p-8">
                  <motion.div 
                    className="mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: feature.delay / 1000 }}
                    viewport={{ once: true }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </FloatingCard>
            ))}
          </motion.div>
        </div>
      </section>
    )
}

export default FeaturesSection