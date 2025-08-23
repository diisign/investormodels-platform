// Script temporaire pour analyser les yields maximum de toutes les créatrices

// Fonction copiée de CreatorDetails.tsx pour calculer le yield
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

// Liste des créatrices (IDs extraits des données)
const creatorIds = [
  "brooks-mills-🍒",
  "aishah", 
  "creator22", // Jasmine
  "creator3",  // Kayla
  "creator25", // Natalie
  "creator20", // Melanie
  "creator10", // Elizabeth
  "creator23", // Isabel
  "creator2",  // Maria
  "creator18", // Nina
  "creator27", // Hannah
  "creator17", // Victoria
  "creator9",  // Ariana Colombian
  "creator29", // Quinn
  "creator7",  // Daisy
  "creator19", // Zoe
  "creator26", // Kim
  "creator28", // Wendy
  "creator6",  // Bryce's Flix
  "creator11", // Isabella Santos
  "creator16", // Sophia Rose
  "creator21", // Samantha
  "creator14", // Audrey Shanice
  "creator24", // Julia
  "creator5",  // Antonella
  "creator8",  // Bianca
  "creator12", // Autumn ren
  "creator1",  // Emma
  "creator13", // Charlotte
  "creator4",  // Lala Avi
  "brookmills" // Luna
];

// Noms des créatrices correspondants
const creatorNames = {
  "brooks-mills-🍒": "Brooke Mills",
  "aishah": "Aishah Sofey",
  "creator22": "Jasmine 🔥",
  "creator3": "Kayla",
  "creator25": "Natalie 💕",
  "creator20": "Melanie 🍒",
  "creator10": "🐈‍ Elizabeth",
  "creator23": "Isabel 💫",
  "creator2": "Maria 🤸🏻‍*",
  "creator18": "Nina 💜",
  "creator27": "Hannah 💎",
  "creator17": "Victoria 💋",
  "creator9": "Ariana Colombian 🌶",
  "creator29": "Quinn 🌈",
  "creator7": "Daisy 💞",
  "creator19": "Zoe 🌹",
  "creator26": "Kim 🦋",
  "creator28": "Wendy 🌊",
  "creator6": "Bryce's Flix 🎥",
  "creator11": "Isabella Santos",
  "creator16": "Sophia Rose 💫",
  "creator21": "Samantha 🌸",
  "creator14": "Audrey Shanice 🔞🔥",
  "creator24": "Julia 🌙",
  "creator5": "Antonella ❤",
  "creator8": "Bianca 🌸",
  "creator12": "🎀 Autumn ren",
  "creator1": "Emma *Asian #1*",
  "creator13": "Charlotte 🤍",
  "creator4": "Lala Avi ♡",
  "brookmills": "Luna ✨"
};

// Calculer le yield pour chaque créatrice
const results = creatorIds.map(creatorId => {
  const yieldData = getRandomYieldForCreator(creatorId);
  return {
    id: creatorId,
    name: creatorNames[creatorId],
    minYield: yieldData.min,
    maxYield: yieldData.max,
    range: yieldData.max - yieldData.min
  };
});

// Trier par yield maximum (décroissant)
results.sort((a, b) => b.maxYield - a.maxYield);

// Afficher les 10 meilleures
console.log("🏆 TOP 10 CRÉATRICES AVEC LES YIELDS MAXIMUM LES PLUS ÉLEVÉS:");
console.log("===============================================================");
results.slice(0, 10).forEach((creator, index) => {
  console.log(`${index + 1}. ${creator.name}`);
  console.log(`   Max Yield: ${creator.maxYield}%`);
  console.log(`   Range: ${creator.minYield}% - ${creator.maxYield}%`);
  console.log(`   Spread: ${creator.range.toFixed(2)}%`);
  console.log("");
});

// Afficher toutes les créatrices triées
console.log("\n📊 CLASSEMENT COMPLET (par yield maximum):");
console.log("==========================================");
results.forEach((creator, index) => {
  console.log(`${index + 1}. ${creator.name}: ${creator.maxYield}% (range: ${creator.minYield}% - ${creator.maxYield}%)`);
});