import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkVeil from "../Backgrounds/DarkVeil/darkveil";

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress <= 100) {
      let delay = 30; // default cepat
      
      // kalau sudah mau selesai, perlambat
      if (progress >= 98) delay = 120;
      else if (progress >= 95) delay = 50;

      const timer = setTimeout(() => setProgress(progress + 1), delay);
      return () => clearTimeout(timer);
    } else {
      // selesai loading
      const finishTimer = setTimeout(onFinish, 800); 
      return () => clearTimeout(finishTimer);
    }
  }, [progress, onFinish]);

  return (
    // loading screen
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background DarkVeil */}
          <DarkVeil />

          {/* Angka persen */}
          <span className="text-white text-8xl font-extrabold tracking-wide drop-shadow-lg z-10">
            {progress}%
          </span>

          {/* Tulisan loading */}
          <p className="mt-4 text-gray-500 text-lg uppercase tracking-wider z-10">
            Loading...
          </p>
        </motion.div>
      )}
    </AnimatePresence>

    //homepage
  );
}
