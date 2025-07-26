
import { motion } from 'framer-motion'
import Image from 'next/image';

function Footer() {
  return (
          <footer className="border-t border-slate-800/30 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.div 
                className="flex items-center space-x-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/S.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SentimAIn
                </span>
              </motion.div>
              <motion.p 
                className="text-slate-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Platform terdepan untuk otomasi scraping dan analisis sentimen menggunakan teknologi AI.
              </motion.p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Documentation"]
              },
              {
                title: "Company", 
                links: ["About", "Blog", "Careers", "Contact"]
              },
              {
                title: "Support",
                links: ["Help Center", "Status", "Security", "Privacy"]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2 text-slate-400">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (index + 1) * 0.1 + linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <a href="#" className="hover:text-white transition-colors">{link}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="border-t border-slate-800/30 mt-12 pt-8 text-center text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 SentimAIn. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
  )
}

export default Footer