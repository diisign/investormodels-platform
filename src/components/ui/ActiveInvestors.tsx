
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ActiveInvestorsProps {
  creatorId: string;
}

const ActiveInvestors = ({ creatorId }: ActiveInvestorsProps) => {
  const [count, setCount] = useState<number>(() => {
    // Get stored count or generate new one if none exists
    const stored = localStorage.getItem(`activeInvestors_${creatorId}`);
    if (stored) {
      return parseInt(stored);
    }
    // Generate random number between 1 and 20
    const randomCount = Math.floor(Math.random() * 20) + 1;
    localStorage.setItem(`activeInvestors_${creatorId}`, randomCount.toString());
    return randomCount;
  });

  useEffect(() => {
    // Update count every 2 minutes
    const interval = setInterval(() => {
      const newCount = Math.floor(Math.random() * 20) + 1;
      setCount(newCount);
      localStorage.setItem(`activeInvestors_${creatorId}`, newCount.toString());
    }, 120000); // 2 minutes in milliseconds

    return () => clearInterval(interval);
  }, [creatorId]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg"
    >
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <p className="text-sm md:text-base">
        <span className="text-yellow-300 font-bold">{count} {count > 1 ? "personnes sont" : "personne est"}</span>
        {" "}actuellement en train d'investir sur cette créatrice
      </p>
    </motion.div>
  );
};

export default ActiveInvestors;
