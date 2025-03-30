
export interface CreatorProfile {
  id: string;
  name: string;
  monthlyRevenue: number;
  returnRate: number;
  followers: number;
  minRevenue: number;
  maxRevenue: number;
}

// Fixed creator profiles with consistent data
export const creatorProfiles: Record<string, CreatorProfile> = {
  // Map each creator by their ID
  "creator1": {
    id: "creator1",
    name: "Emma *Asian #1*",
    monthlyRevenue: 43000,
    returnRate: 90,
    followers: 2867,
    minRevenue: 25000,
    maxRevenue: 60000
  },
  "creator2": {
    id: "creator2",
    name: "Maria 🤸🏻‍*",
    monthlyRevenue: 75150,
    returnRate: 120,
    followers: 5010,
    minRevenue: 50000,
    maxRevenue: 98000
  },
  "creator3": {
    id: "creator3",
    name: "Kayla",
    monthlyRevenue: 88800,
    returnRate: 125,
    followers: 5920,
    minRevenue: 60000,
    maxRevenue: 99650
  },
  "creator4": {
    id: "creator4",
    name: "Lala Avi ♡",
    monthlyRevenue: 32550,
    returnRate: 80,
    followers: 2170,
    minRevenue: 19650,
    maxRevenue: 58500
  },
  "creator5": {
    id: "creator5",
    name: "Antonella ❤",
    monthlyRevenue: 52300,
    returnRate: 100,
    followers: 3487,
    minRevenue: 39950,
    maxRevenue: 70000
  },
  "creator6": {
    id: "creator6",
    name: "Bryce's Flix 🎥",
    monthlyRevenue: 59000,
    returnRate: 110,
    followers: 3933,
    minRevenue: 41750,
    maxRevenue: 83000
  },
  "creator7": {
    id: "creator7",
    name: "Daisy 💞",
    monthlyRevenue: 64700,
    returnRate: 115,
    followers: 4313,
    minRevenue: 48450,
    maxRevenue: 86450
  },
  "creator8": {
    id: "creator8",
    name: "Bianca 🍎 *Domincan 🇩🇴*",
    monthlyRevenue: 49950,
    returnRate: 100,
    followers: 3330,
    minRevenue: 30150,
    maxRevenue: 72850
  },
  "creator9": {
    id: "creator9",
    name: "Ariana Colombian 🌶",
    monthlyRevenue: 67600,
    returnRate: 110,
    followers: 4507,
    minRevenue: 50000,
    maxRevenue: 90000
  },
  "creator10": {
    id: "creator10",
    name: "🐈‍ Elizabeth",
    monthlyRevenue: 78400,
    returnRate: 120,
    followers: 5227,
    minRevenue: 52000,
    maxRevenue: 95650
  },
  "creator11": {
    id: "creator11",
    name: "Isabella Santos",
    monthlyRevenue: 59150,
    returnRate: 110,
    followers: 3943,
    minRevenue: 48650,
    maxRevenue: 83650
  },
  "creator12": {
    id: "creator12",
    name: "🎀 Autumn ren",
    monthlyRevenue: 48850,
    returnRate: 95,
    followers: 3257,
    minRevenue: 27000,
    maxRevenue: 72150
  },
  "creator13": {
    id: "creator13",
    name: "Charlotte 🤍",
    monthlyRevenue: 38250,
    returnRate: 85,
    followers: 2550,
    minRevenue: 23000,
    maxRevenue: 57550
  },
  "creator14": {
    id: "creator14",
    name: "Audrey Shanice 🔞🔥",
    monthlyRevenue: 54500,
    returnRate: 100,
    followers: 3633,
    minRevenue: 36000,
    maxRevenue: 71150
  },
  "creator15": {
    id: "creator15",
    name: "Brooke Mills🍒",
    monthlyRevenue: 94950,
    returnRate: 130,
    followers: 6330,
    minRevenue: 69850,
    maxRevenue: 120350
  },
  "creator16": {
    id: "creator16",
    name: "Sophia Rose 💫",
    monthlyRevenue: 57800,
    returnRate: 105,
    followers: 3853,
    minRevenue: 42500,
    maxRevenue: 79000
  },
  // New creators
  "creator17": {
    id: "creator17",
    name: "Victoria 💋",
    monthlyRevenue: 62500,
    returnRate: 115,
    followers: 4167,
    minRevenue: 45000,
    maxRevenue: 85000
  },
  "creator18": {
    id: "creator18",
    name: "Luna 🌙",
    monthlyRevenue: 71200,
    returnRate: 118,
    followers: 4747,
    minRevenue: 48000,
    maxRevenue: 92000
  },
  "creator19": {
    id: "creator19",
    name: "Melody 🎵",
    monthlyRevenue: 53600,
    returnRate: 105,
    followers: 3573,
    minRevenue: 38000,
    maxRevenue: 74000
  },
  "creator20": {
    id: "creator20",
    name: "Rose 🌹",
    monthlyRevenue: 68900,
    returnRate: 112,
    followers: 4593,
    minRevenue: 51000,
    maxRevenue: 89000
  },
  "creator21": {
    id: "creator21",
    name: "Zoe ✨",
    monthlyRevenue: 45800,
    returnRate: 95,
    followers: 3053,
    minRevenue: 32000,
    maxRevenue: 67000
  },
  "creator22": {
    id: "creator22",
    name: "Olivia *Brazilian* 🇧🇷",
    monthlyRevenue: 81200,
    returnRate: 122,
    followers: 5413,
    minRevenue: 60000,
    maxRevenue: 105000
  },
  "creator23": {
    id: "creator23",
    name: "Amelia 💯",
    monthlyRevenue: 57300,
    returnRate: 108,
    followers: 3820,
    minRevenue: 42000,
    maxRevenue: 76000
  },
  "creator24": {
    id: "creator24",
    name: "Jade 🔮",
    monthlyRevenue: 63800,
    returnRate: 114,
    followers: 4253,
    minRevenue: 46000,
    maxRevenue: 84000
  },
  "creator25": {
    id: "creator25",
    name: "Ava *Persian* 🧿",
    monthlyRevenue: 74300,
    returnRate: 120,
    followers: 4953,
    minRevenue: 55000,
    maxRevenue: 97000
  },
  "creator26": {
    id: "creator26",
    name: "🍒 Scarlett",
    monthlyRevenue: 67000,
    returnRate: 115,
    followers: 4467,
    minRevenue: 49000,
    maxRevenue: 89000
  },
  "creator27": {
    id: "creator27",
    name: "Lily 🌸",
    monthlyRevenue: 51400,
    returnRate: 105,
    followers: 3427,
    minRevenue: 36000,
    maxRevenue: 70000
  },
  "creator28": {
    id: "creator28",
    name: "Nina 💕",
    monthlyRevenue: 58700,
    returnRate: 110,
    followers: 3913,
    minRevenue: 42000,
    maxRevenue: 78000
  },
  "creator29": {
    id: "creator29",
    name: "Stella ⭐",
    monthlyRevenue: 69500,
    returnRate: 116,
    followers: 4633,
    minRevenue: 50000,
    maxRevenue: 91000
  }
};

// Get creator profile by ID, with fallback to random values if not found
export const getCreatorProfile = (creatorId: string): CreatorProfile => {
  // If we have fixed data for this creator, return it
  if (creatorProfiles[creatorId]) {
    return creatorProfiles[creatorId];
  }
  
  // Otherwise, use deterministic values based on the creator ID (fallback)
  const lastChar = creatorId.charAt(creatorId.length - 1);
  const charCode = lastChar.charCodeAt(0);
  const returnRate = 80 + (charCode % 51);
  
  // Generate deterministic revenue based on creator ID
  const firstChar = creatorId.charAt(0);
  const secondChar = creatorId.charAt(1) || 'a';
  const seedValue = (firstChar.charCodeAt(0) + secondChar.charCodeAt(0)) % 100;
  const monthlyRevenue = 30000 + (seedValue * 700) + (seedValue % 987);
  
  // Calculate followers based on monthly revenue
  const followers = Math.round(monthlyRevenue / 15);
  
  // Calculate min and max revenue for performance chart
  const minRevenue = Math.round(monthlyRevenue * 0.65);
  const maxRevenue = Math.round(monthlyRevenue * 1.35);
  
  return {
    id: creatorId,
    name: `Creator ${creatorId}`,
    monthlyRevenue,
    returnRate,
    followers,
    minRevenue,
    maxRevenue
  };
};

// Generate monthly performance data based on min and max revenue ranges
export const generateMonthlyPerformanceData = (creatorId: string) => {
  const profile = getCreatorProfile(creatorId);
  const { minRevenue, maxRevenue, monthlyRevenue } = profile;
  const range = maxRevenue - minRevenue;
  
  const monthNames = ['Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar'];
  
  // Use creatorId to generate deterministic variations
  // This ensures the same creator always gets the same performance chart
  const seed = creatorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate revenue values in a deterministic way
  const revenueValues = monthNames.map((_, index) => {
    // Use a combination of different prime numbers and the seed to create
    // a unique but deterministic pattern for each creator
    const prime1 = 31;
    const prime2 = 43;
    const prime3 = 53;
    const prime4 = 71;
    
    // Create a unique factor for each month that's deterministic based on the creator ID
    const uniqueFactor = Math.sin(seed * prime1 + index * prime2) * 0.5 + 
                         Math.cos(seed * prime3 + index * prime4) * 0.5;
    
    // Convert to a range of 0-1
    const normalized = (uniqueFactor + 1) / 2;
    
    // Convert to a revenue value within the min-max range
    // For the last month (March), use the exact monthlyRevenue value
    if (index === monthNames.length - 1) {
      return monthlyRevenue;
    }
    
    const revenue = Math.round(minRevenue + (range * normalized));
    return revenue;
  });
  
  // Create the final data array
  return monthNames.map((month, index) => ({
    month,
    revenue: revenueValues[index]
  }));
};
