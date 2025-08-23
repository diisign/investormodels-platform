// Vérification du yield d'Antonella avec le code exact actuel

const getRandomYieldForCreator = (creatorId) => {
  // Use creator ID as seed for consistent random values
  const seed = creatorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Generate unique range for each creator between 2.23% and 42.24%
  const random1 = (seed * 9301 + 49297) % 233280 / 233280;
  const random2 = (seed * 7919 + 12345) * 16807 % 233280 / 233280;

  // Calculate min yield (between 2.23% and ~25%)
  const minYield = 2.23 + random1 * (25 - 2.23);

  // Calculate max yield (min + random spread, ensuring max doesn't exceed 42.24%)
  const maxSpread = Math.min(42.24 - minYield, 15 + random2 * 10); // Variable spread
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
    // Generate more random variation using multiple seeds and prime numbers
    const baseSeed = seed + index * 7919; // Large prime number
    const seed1 = baseSeed * 16807 % 2147483647;
    const seed2 = seed1 * 48271 % 2147483647;
    const seed3 = seed2 * 69621 % 2147483647;

    // Combine multiple random sources for better distribution
    const random1 = seed1 / 2147483647;
    const random2 = seed2 / 2147483647;
    const random3 = seed3 / 2147483647;

    // Use weighted combination for more natural distribution
    const combinedRandom = random1 * 0.4 + random2 * 0.35 + random3 * 0.25;

    // Add some variance to make it more unpredictable
    const variance = Math.sin(baseSeed * 0.01) * 0.15;
    const finalRandom = Math.abs((combinedRandom + variance) % 1);

    // Use creator-specific yield range instead of fixed range
    const value = yieldRange.min + finalRandom * (yieldRange.max - yieldRange.min);
    return {
      ...monthData,
      value: Math.round(value * 100) / 100,
      yield: `${(Math.round(value * 100) / 100).toFixed(2)} % APY`
    };
  });
};

console.log("=== DEBUG ANTONELLA ===");
const creatorId = "creator5";
console.log("Creator ID:", creatorId);

const seed = creatorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
console.log("Seed:", seed);

const yieldRange = getRandomYieldForCreator(creatorId);
console.log("Yield Range:", yieldRange);

const yieldData = generateYieldData(creatorId);
const lastYield = yieldData[yieldData.length - 1];

console.log("All months:", yieldData.map(m => `${m.fullMonth}: ${m.value}%`));
console.log(`❤ Antonella ❤ - Dernier Yield distribué: ${lastYield.value.toFixed(2)}% APY`);

// Vérification si c'est 21.36%
if (Math.abs(lastYield.value - 21.36) < 0.01) {
  console.log("✅ CORRECT - Le calcul donne bien 21.36%");
} else {
  console.log("❌ DIFFÉRENT - Le calcul ne donne pas 21.36%");
  console.log(`Calculé: ${lastYield.value.toFixed(2)}% vs Attendu: 21.36%`);
}