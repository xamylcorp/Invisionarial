'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            🧠 Invisionarial
          </h1>
          <p className="text-2xl mb-8 text-gray-200">
            The Genius, Perfect, Definitely not terrible, AI Imaginative Innovative Breakthrough
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {[
            { emoji: '🤖', title: 'AI-Powered', desc: 'Cutting-edge artificial intelligence' },
            { emoji: '🎨', title: 'Beautiful UI', desc: 'Modern and intuitive design' },
            { emoji: '⚡', title: 'Lightning Fast', desc: 'Optimized for performance' },
            { emoji: '🧪', title: 'Innovative', desc: 'Pushing the boundaries' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all"
            >
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            {isHovered ? '🚀 Let\'s Go!' : '✨ Get Started'}
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
