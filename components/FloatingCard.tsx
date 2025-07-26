
import React from 'react';
import { motion, useInView, useTransform, useScroll } from 'framer-motion'

  type FloatingCardProps = {
    children: React.ReactNode;
    delay?: number;
    index?: number;
  };

  const FloatingCard: React.FC<FloatingCardProps> = ({ children, delay = 0}) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -20]);
    
    return (
      <motion.div
        ref={ref}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-slate-700/30 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
        transition={{ duration: 0.6, delay: delay / 1000, ease: "easeOut" }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {children}
      </motion.div>
    );
  };
export default FloatingCard;