/*eslint-disable */

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle } from 'lucide-react';
import FloatingCard from './FloatingCard';
import GlowingButton from './GlowingButton';

function PricingSection() {
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
          <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Pilih paket berlangganan yang sesuai dengan kebutuhan analisis media sosial Anda
            </p>
          </MotionDiv>

          <motion.div 
            className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                name: "Free",
                price: "0",
                period: "/bulan",
                description: "Jelajahi fitur dasar analisis komentar media sosial untuk melihat sentimen publik secara sederhana",
                features: [
                  "Maksimal 500 komentar per bulan",
                  "1 platform scraping",
                  "Basic sentiment analysis (positif/negatif/netral)",
                  "Tampilan dashboard sederhana",
                  "Email support",
                  "Data retention 10 hari"
                ],
                popular: false,
                delay: 0
              },
              {
                name: "Starter",
                price: "299.000",
                period: "/bulan",
                description: "Tingkatkan kemampuan analisis yang lebih tinggi dengan hasil sentimen dan tren topik yang lebih detail",
                features: [
                  "Semua fitur Free",
                  "Hingga 1.000 komentar/bulan",
                  "3 platform scraping",
                  "Sentiment analysis lanjutan (emosi, intensitas, sarcasm detection)",
                  "Analisis tren topik dan keyword",
                  "Rekomendasi konten berdasarkan segmentasi audiens",
                  "Data retention 30 hari",
                  "Ringkasan berupa PDF"
                ],
                popular: false,
                delay: 100
              },
              {
                name: "Professional",
                price: "899.000", 
                period: "/bulan",
                description: "Lakukan analisis secara profesional untuk mendapatkan insight mendalam terkait persepsi masyarakat",
                features: [
                  "Semua fitur Starter",
                  "Hingga 100.000 komentar/bulan",
                  "10 platform scraping",
                  "Analisis persepsi masyarakat mendalam",
                  "Rekomendasi konten/kebijakan berbasis kebutuhan",
                  "Monitoring opini publik real time",
                  "Custom reports",
                  "Akses API penuh",
                  "Data retention 90 hari",
                  "Kolaborasi tim (5 pengguna)",
                  "Dukungan prioritas (email & chat)"
                ],
                popular: true,
                delay: 200
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "Solusi lengkap untuk pemerintah dan perusahaan besar dengan kebutuhan analisis skala enterprise",
                features: [
                  "Analisis komentar tak terbatas",
                  "Semua platform scraping",
                  "Integrasi data internal (survei, call center, berita)",
                  "Sistem rekomendasi customizable per topik & institusi",
                  "Otomatisasi pelaporan dan dashboard kolaboratif",
                  "Pelatihan staf & dukungan teknis penuh",
                  "Akses pengguna tak terbatas",
                  "SLA khusus dan NDA",
                  "Custom data retention"
                ],
                popular: false,
                delay: 300
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: plan.delay / 1000 }}
              >
                <FloatingCard delay={plan.delay}>
                  <div className={`p-6 relative h-full flex flex-col ${plan.popular ? 'ring-2 ring-blue-500/30' : ''}`}>
                    {plan.popular && (
                      <motion.div 
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-slate-400 mb-4 text-sm leading-relaxed">{plan.description}</p>
                      <motion.div 
                        className="mb-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: plan.delay / 1000 + 0.2 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-3xl font-bold text-white">
                          {plan.name === "Free" ? "Gratis" : plan.name === "Enterprise" ? "Custom" : `Rp ${plan.price}`}
                        </span>
                        <span className="text-slate-400">{plan.period}</span>
                      </motion.div>
                    </div>

                    <ul className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, fIndex) => (
                        <motion.li 
                          key={fIndex} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: plan.delay / 1000 + fIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <GlowingButton 
                      primary={plan.popular} 
                      className="w-full justify-center mt-auto"
                    >
                      {plan.name === 'Free' ? 'Start Free' : 
                       plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    </GlowingButton>
                  </div>
                </FloatingCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  )
}

export default PricingSection