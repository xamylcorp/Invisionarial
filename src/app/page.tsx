'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Terrible type definitions
declare global {
  interface Window {
    electron: {
      saveFile: (content: string) => Promise<{ success: boolean; error?: string }>;
      getTheme: () => Promise<string>;
      playSound: (sound: string) => void;
      showNotification: (title: string, body: string) => void;
    };
  }
}

const TERRIBLE_SOUNDS = [
  'typewriter.mp3',
  'error.mp3',
  'success.mp3',
  'notification.mp3',
  'dramatic.mp3'
];

const RANDOM_EMOJIS = ['🐛', '💩', '🤪', '😱', '🤔', '🙄', '😴', '🤮', '💀', '👻'];

export default function Home() {
  const [code, setCode] = useState('// Welcome to the worst code editor ever!\n// Try to write some code... if you dare!');
  const [isTyping, setIsTyping] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [saveStatus, setSaveStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showEmojiRain, setShowEmojiRain] = useState(false);
  const [randomEmojis, setRandomEmojis] = useState<string[]>([]);
  const [typoCount, setTypoCount] = useState(0);
  const [isInverted, setIsInverted] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Randomly move cursor
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCursorPosition({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Random popups
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Terrible auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        handleSave();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [code]);

  // Random emoji rain
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setShowEmojiRain(true);
        setRandomEmojis(Array.from({ length: 20 }, () => RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)]));
        setTimeout(() => setShowEmojiRain(false), 2000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Random screen glitch
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.97) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Random screen inversion
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.98) {
        setIsInverted(true);
        setTimeout(() => setIsInverted(false), 1000);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(true);
    let newCode = e.target.value;

    // Randomly add typos
    if (Math.random() > 0.9) {
      const words = newCode.split(' ');
      const randomIndex = Math.floor(Math.random() * words.length);
      if (words[randomIndex].length > 3) {
        words[randomIndex] = words[randomIndex].split('').sort(() => Math.random() - 0.5).join('');
        newCode = words.join(' ');
        setTypoCount(prev => prev + 1);
      }
    }

    // Randomly play sounds
    if (Math.random() > 0.8) {
      window.electron?.playSound(TERRIBLE_SOUNDS[Math.floor(Math.random() * TERRIBLE_SOUNDS.length)]);
    }

    setCode(newCode);
    setTimeout(() => setIsTyping(false), 100);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await window.electron?.saveFile(code);
      setSaveStatus(result.success ? 'Saved! (Maybe)' : 'Failed to save! (Probably)');
      if (result.success) {
        window.electron?.showNotification('Save Status', 'Your code might have been saved!');
      }
    } catch (error) {
      setSaveStatus('Error! (Definitely)');
    }
    setTimeout(() => {
      setSaveStatus('');
      setIsSaving(false);
    }, 2000);
  };

  const randomTheme = async () => {
    try {
      const newTheme = await window.electron?.getTheme();
      setTheme(newTheme);
    } catch (error) {
      const themes = ['dark', 'light', 'matrix', 'comic-sans'];
      setTheme(themes[Math.floor(Math.random() * themes.length)]);
    }
  };

  const scrambleText = () => {
    const words = code.split(' ');
    const scrambledWords = words.map(word => 
      word.length > 3 ? word.split('').sort(() => Math.random() - 0.5).join('') : word
    );
    setCode(scrambledWords.join(' '));
  };

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-colors duration-500 ${isInverted ? 'invert' : ''} ${isGlitching ? 'glitch' : ''}`}>
      {/* Annoying floating cursor */}
      <motion.div
        animate={cursorPosition}
        className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none z-50"
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Random popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 bg-yellow-400 text-black p-4 rounded-lg shadow-lg z-50"
          >
            Did you know? This editor is terrible! 🎉
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji rain */}
      <AnimatePresence>
        {showEmojiRain && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {randomEmojis.map((emoji, index) => (
              <motion.div
                key={index}
                initial={{ y: -100, x: Math.random() * window.innerWidth }}
                animate={{ y: window.innerHeight }}
                transition={{ duration: 2, ease: "linear" }}
                className="absolute text-4xl"
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto p-4">
        {/* Terrible toolbar */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <button 
            onClick={randomTheme}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            🎨 Random Theme
          </button>
          <button 
            onClick={() => setCode(code + '\n// Added some random comments\n// Because why not?')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            📝 Add Comments
          </button>
          <button 
            onClick={() => setCode(code.split('').reverse().join(''))}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            🔄 Reverse Code
          </button>
          <button 
            onClick={handleSave}
            className={`px-4 py-2 ${isSaving ? 'bg-gray-600' : 'bg-green-600'} text-white rounded hover:bg-green-700 transition-colors`}
            disabled={isSaving}
          >
            💾 {isSaving ? 'Saving...' : 'Save (Maybe)'}
          </button>
          <button 
            onClick={scrambleText}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          >
            🔀 Scramble Text
          </button>
        </div>

        {/* The terrible editor */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
            className={`w-full h-[70vh] p-4 font-mono text-lg rounded-lg resize-none
              ${theme === 'dark' ? 'bg-gray-800 text-green-400' : 
                theme === 'light' ? 'bg-gray-100 text-black' :
                theme === 'matrix' ? 'bg-black text-green-500' :
                'bg-pink-100 text-purple-600 font-comic'}
              ${isTyping ? 'animate-pulse' : ''}
              transition-all duration-300`}
            style={{
              fontFamily: theme === 'comic-sans' ? 'Comic Sans MS' : 'monospace',
              lineHeight: '1.5',
              tabSize: 4,
              transform: isGlitching ? `skew(${Math.random() * 10 - 5}deg)` : 'none',
            }}
          />
          
          {/* Random floating elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute top-4 right-4 text-4xl"
          >
            🐛
          </motion.div>
        </div>

        {/* Status bar with random messages */}
        <div className="mt-4 p-2 bg-gray-800 text-white rounded-lg font-mono text-sm">
          <span className="mr-4">Lines: {code.split('\n').length}</span>
          <span className="mr-4">Chars: {code.length}</span>
          <span className="mr-4">Theme: {theme}</span>
          <span className="mr-4">Status: {isTyping ? 'Typing...' : 'Idle'}</span>
          <span className="mr-4">{saveStatus}</span>
          <span className="mr-4">Typos: {typoCount}</span>
          <span>Random Fact: This editor is definitely not terrible! 😉</span>
        </div>
      </div>
    </main>
  );
} 