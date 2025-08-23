import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
interface ActiveInvestorsProps {
  creatorId: string;
}
const ActiveInvestors = ({
  creatorId
}: ActiveInvestorsProps) => {
  const [count, setCount] = useState<number>(() => {
    // Special case for creator22 (Jasmine)
    if (creatorId === 'creator22') {
      return 481;
    }
    
    // Get stored count or generate new one if none exists
    const stored = localStorage.getItem(`activeInvestors_${creatorId}`);
    if (stored) {
      const parsedCount = parseInt(stored);
      // Validate the stored count is within valid range (1-20)
      if (parsedCount >= 1 && parsedCount <= 20) {
        return parsedCount;
      }
    }
    // Generate random number between 1 and 20
    const randomCount = Math.floor(Math.random() * 20) + 1;
    localStorage.setItem(`activeInvestors_${creatorId}`, randomCount.toString());
    return randomCount;
  });
  useEffect(() => {
    // Special case for creator22 (Jasmine) - don't update automatically
    if (creatorId === 'creator22') {
      return;
    }
    
    // Update count every 2 minutes for other creators
    const interval = setInterval(() => {
      const newCount = Math.floor(Math.random() * 20) + 1;
      setCount(newCount);
      localStorage.setItem(`activeInvestors_${creatorId}`, newCount.toString());
    }, 120000); // 2 minutes in milliseconds

    return () => clearInterval(interval);
  }, [creatorId]);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg">
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <p className="text-sm md:text-sm text-gray-950">
        <span className="text-yellow-300 font-bold">{count} {count > 1 ? "personnes sont" : "personne est"}</span>
        {" "}actuellement en train d'investir sur cette créatrice
      </p>
    </motion.div>;
};
export default ActiveInvestors;