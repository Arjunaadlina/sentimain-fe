/*eslint-disable */
import { motion } from 'framer-motion'
import FloatingCard from './FloatingCard';
import { Star, Zap, Shield } from 'lucide-react';   

import React from 'react';
import { Variants } from 'framer-motion';

type MotionDivProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  [key: string]: any;
};

// You may want to define fadeInUp if it's not defined elsewhere
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// You may also need to import useInView if not already imported
import { useInView } from 'framer-motion';

function AboutSection() {

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
          <section id="about" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MotionDiv>
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Mengapa SentimAIn?
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                SentimAIn menggunakan teknologi Deep Learning CNN terdepan untuk memberikan analisis sentimen yang paling akurat di industri. Dengan otomasi scraping yang canggih, kami membantu bisnis memahami persepsi pelanggan secara real-time.
              </p>
              
              <div className="space-y-6">
                {[
                  { 
                    title: "Akurasi Tinggi", 
                    desc: "Model CNN kami mencapai akurasi > 85% dalam analisis sentimen",
                    icon: <Star className="w-6 h-6 text-yellow-400" />
                  },
                  { 
                    title: "Skalabilitas Enterprise", 
                    desc: "Mampu memproses jutaan data per hari tanpa menurunkan performa",
                    icon: <Zap className="w-6 h-6 text-blue-400" />
                  },
                  { 
                    title: "Keamanan Terjamin", 
                    desc: "Enkripsi end-to-end dan compliance dengan standar internasional",
                    icon: <Shield className="w-6 h-6 text-emerald-400" />
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </MotionDiv>

            <MotionDiv delay={400}>
              <FloatingCard>
                <div className="p-8">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Teknologi CNN Deep Learning</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Natural Language Processing", value: "Advanced", color: "blue" },
                        { label: "Sentiment Classification", value: "> 85%", color: "emerald" },
                        { label: "Language Support", value: "Indonesian", color: "purple" },
                        { label: "Real-time Processing", value: "< 0.3s", color: "orange" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex justify-between items-center"
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-slate-300">{item.label}</span>
                          <span className={`text-${item.color}-400 font-semibold`}>{item.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </MotionDiv>
          </div>
        </div>
      </section>
  )
}

export default AboutSection