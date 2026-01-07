import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent2/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-4"
      >
        <div className="flex items-center justify-center gap-2 mb-6 text-accent">
          <Terminal size={20} />
          <span className="text-sm tracking-widest lowercase">vibe_code // genesis</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter lowercase bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
          build your<br />web3 identity
        </h1>

        <p className="text-slate-400 max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed lowercase">
          stop airdrop farming. start shipping.
          <br />
          create a proof-of-work portfolio that actually converts.
          optimized by ai for the new internet.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative px-8 py-4 bg-surface border border-slate-800 hover:border-accent text-white rounded-none overflow-hidden transition-all duration-300"
        >
          <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center gap-4 lowercase font-medium">
            mint profile
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
      </motion.div>

      {/* Footer ticker style */}
      <div className="absolute bottom-0 w-full border-t border-slate-900 py-4 text-center">
         <p className="text-xs text-slate-600 lowercase font-mono">
           gas fee: 0.00 eth • status: online • block: 192834
         </p>
      </div>
    </div>
  );
};

export default Hero;