// Script pour extraire le "Dernier Yield distribué" de chaque créatrice
// Réplique exacte du calcul de l'interface utilisateur

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

// Liste de toutes les créatrices
const creators = [
  { id: "brooks-mills-🍒", name: "Brooke Mills" },
  { id: "aishah", name: "Aishah Sofey" },
  { id: "creator22", name: "Jasmine 🔥" },
  { id: "creator3", name: "Kayla" },
  { id: "creator25", name: "Natalie 💕" },
  { id: "creator20", name: "Melanie 🍒" },
  { id: "creator10", name: "🐈‍ Elizabeth" },
  { id: "creator23", name: "Isabel 💫" },
  { id: "creator2", name: "Maria 🤸🏻‍*" },
  { id: "creator18", name: "Nina 💜" },
  { id: "creator27", name: "Hannah 💎" },
  { id: "creator17", name: "Victoria 💋" },
  { id: "creator9", name: "Ariana Colombian 🌶" },
  { id: "creator29", name: "Quinn 🌈" },
  { id: "creator7", name: "Daisy 💞" },
  { id: "creator19", name: "Zoe 🌹" },
  { id: "creator26", name: "Kim 🦋" },
  { id: "creator28", name: "Wendy 🌊" },
  { id: "creator6", name: "Bryce's Flix 🎥" },
  { id: "creator11", name: "Isabella Santos" },
  { id: "creator16", name: "Sophia Rose 💫" },
  { id: "creator21", name: "Samantha 🌸" },
  { id: "creator14", name: "Audrey Shanice 🔞🔥" },
  { id: "creator24", name: "Julia 🌙" },
  { id: "creator5", name: "Antonella ❤" },
  { id: "creator8", name: "Bianca 🌸" },
  { id: "creator12", name: "🎀 Autumn ren" },
  { id: "creator1", name: "Emma *Asian #1*" },
  { id: "creator13", name: "Charlotte 🤍" },
  { id: "creator4", name: "Lala Avi ♡" },
  { id: "brookmills", name: "Luna ✨" }
];

// Calculer le dernier yield distribué pour chaque créatrice
const results = [];
creators.forEach(creator => {
  const yieldData = generateYieldData(creator.id);
  const lastYield = yieldData[yieldData.length - 1]; // Dernier mois (juillet)
  results.push({
    name: creator.name,
    id: creator.id,
    lastYieldDistributed: lastYield.value
  });
});

// Trier par dernier yield distribué (décroissant)
results.sort((a, b) => b.lastYieldDistributed - a.lastYieldDistributed);

// Vérification des valeurs que tu mentionnes
console.log("🔍 Vérification des valeurs mentionnées:");
const isabel = results.find(r => r.id === 'creator23');
const kayla = results.find(r => r.id === 'creator3');
console.log(`Isabel 💫: ${isabel.lastYieldDistributed.toFixed(2)}% APY`);
console.log(`Kayla: ${kayla.lastYieldDistributed.toFixed(2)}% APY`);

console.log("\n🏆 TOP 10 - Dernier Yield Distribué:");
results.slice(0, 10).forEach((creator, index) => {
  console.log(`${index + 1}. ${creator.name} - ${creator.lastYieldDistributed.toFixed(2)}% APY`);
});

console.log("\n📊 TOUS LES YIELDS CALCULÉS:");
results.forEach((creator, index) => {
  console.log(`${index + 1}. ${creator.name} - ${creator.lastYieldDistributed.toFixed(2)}% APY`);
});