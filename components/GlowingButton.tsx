import React from 'react'
import { motion } from 'framer-motion';

  type GlowingButtonProps = {
    children: React.ReactNode;
    primary?: boolean;
    className?: string;
  };

  const GlowingButton: React.FC<GlowingButtonProps> = ({ children, primary = false, className = "" }) => (
    <motion.button
      className={`relative overflow-hidden px-8 py-2 rounded-xl font-semibold transition-all duration-300 ${
        primary
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-blue-500/30 hover:shadow-2xl'
          : 'bg-slate-800/50 border border-slate-600/30 text-slate-300 hover:border-blue-500/50 hover:text-white backdrop-blur-sm'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div
        className={`absolute inset-0 ${
          primary ? 'bg-gradient-to-r from-blue-700 to-purple-700' : 'bg-white/5'
        } opacity-0 hover:opacity-100 transition-opacity duration-300`}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );



export default GlowingButton