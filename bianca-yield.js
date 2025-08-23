// Calcul du Dernier Yield distribué pour Bianca 🌸

const getRandomYieldForCreator = (creatorId) => {
  const seed = creatorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random1 = (seed * 9301 + 49297) % 233280 / 233280;
  const random2 = (seed * 7919 + 12345) * 16807 % 233280 / 233280;
  const minYield = 2.23 + random1 * (25 - 2.23);
  const maxSpread = Math.min(42.24 - minYield, 15 + random2 * 10);
  const maxYield = minYield + maxSpread;
  return {
    min: Math.round(minYield * 100) / 100,
    max: Math.round(Math.min(42.24, maxYield) * 100) / 100
  };
};

const generateYieldData = (creatorId) => {
  const seed = creatorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const yieldRange = getRandomYieldForCreator(creatorId);
  const months = [
    { month: 'août', fullMonth: 'août' },
    { month: 'sept.', fullMonth: 'sept.' },
    { month: 'oct.', fullMonth: 'oct.' },
    { month: 'nov.', fullMonth: 'nov.' },
    { month: 'déc.', fullMonth: 'déc.' },
    { month: 'janv.', fullMonth: 'janv.' },
    { month: 'févr.', fullMonth: 'févr.' },
    { month: 'mars', fullMonth: 'mars' },
    { month: 'avr.', fullMonth: 'avr.' },
    { month: '', fullMonth: 'mai' },
    { month: 'juin', fullMonth: 'juin' },
    { month: '', fullMonth: 'juil.' }
  ];
  
  return months.map((monthData, index) => {
    const baseSeed = seed + index * 7919;
    const seed1 = baseSeed * 16807 % 2147483647;
    const seed2 = seed1 * 48271 % 2147483647;
    const seed3 = seed2 * 69621 % 2147483647;
    const random1 = seed1 / 2147483647;
    const random2 = seed2 / 2147483647;
    const random3 = seed3 / 2147483647;
    const combinedRandom = random1 * 0.4 + random2 * 0.35 + random3 * 0.25;
    const variance = Math.sin(baseSeed * 0.01) * 0.15;
    const finalRandom = Math.abs((combinedRandom + variance) % 1);
    const value = yieldRange.min + finalRandom * (yieldRange.max - yieldRange.min);
    return {
      ...monthData,
      value: Math.round(value * 100) / 100,
      yield: `${(Math.round(value * 100) / 100).toFixed(2)} % APY`
    };
  });
};

// Bianca 🌸 a l'ID creator8
const biancaId = "creator8";
const biancaYieldData = generateYieldData(biancaId);
const biancaLastYield = biancaYieldData[biancaYieldData.length - 1];

console.log(`🌸 Bianca 🌸 - Dernier Yield distribué: ${biancaLastYield.value.toFixed(2)}% APY`);