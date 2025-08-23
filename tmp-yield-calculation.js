// Fonction pour calculer le yield range de chaque créatrice (comme dans CreatorDetails.tsx)
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

// Fonction pour générer le dernier yield distribué (juillet)
const getLastYieldDistributed = (creatorId) => {
  const seed = creatorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const yieldRange = getRandomYieldForCreator(creatorId);
  
  // Index 11 = juillet (dernier mois)
  const index = 11;
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
  return Math.round(value * 100) / 100;
};

// Liste des créatrices et leurs noms
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

// Calculer le dernier yield distribué pour toutes les créatrices
const results = creators.map(creator => ({
  ...creator,
  lastYieldDistributed: getLastYieldDistributed(creator.id)
}));

// Trier par dernier yield distribué (décroissant)
results.sort((a, b) => b.lastYieldDistributed - a.lastYieldDistributed);

// Afficher le TOP 10
console.log("🏆 TOP 10 - Dernier Yield Distribué le plus élevé:\n");
results.slice(0, 10).forEach((creator, index) => {
  console.log(`${index + 1}. **${creator.name}** - **${creator.lastYieldDistributed.toFixed(2)}%** APY`);
});

console.log("\n📊 TOP 15 pour plus de contexte:\n");
results.slice(0, 15).forEach((creator, index) => {
  console.log(`${index + 1}. ${creator.name} - ${creator.lastYieldDistributed.toFixed(2)}% APY`);
});

console.log("\n🔍 Vérification pour Bryce's Flix:");
const bryceResult = results.find(c => c.id === 'creator6');
if (bryceResult) {
  console.log(`Bryce's Flix 🎥 - ${bryceResult.lastYieldDistributed.toFixed(2)}% APY`);
}