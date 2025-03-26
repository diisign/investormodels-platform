
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
    name: "Maria *Gymnastics Girl 🤸🏻‍*",
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
    name: "Ariana 💄 Petite colombian 🌶",
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
  
  // Generate initial random fluctuations
  let volatilityFactors = monthNames.map((_, index) => {
    // Create more complex random patterns using different trigonometric functions and prime multipliers
    const primaryFactor = Math.sin(seed * (index + 3) * 0.41) * 0.5 + 0.5;
    const secondaryFactor = Math.cos((seed + 271) * (index + 5) * 0.37) * 0.4 + 0.5;
    const tertiaryFactor = Math.sin((seed + 137) * (index + 7) * 0.23) * 0.3 + 0.5;
    
    // Mix these patterns together with varying weights to create more natural randomness
    return (primaryFactor * 0.5 + secondaryFactor * 0.3 + tertiaryFactor * 0.2);
  });
  
  // Apply smoothing to avoid overly regular patterns
  // Use a simple moving average approach with noise
  const smoothedFactors = volatilityFactors.map((factor, index) => {
    if (index === 0 || index === volatilityFactors.length - 1) return factor;
    
    // Get neighboring values
    const prev = volatilityFactors[index - 1];
    const next = volatilityFactors[index + 1];
    
    // Add some noise based on creator ID to break patterns further
    const noise = Math.sin(seed * (index + 11) * 0.17) * 0.15;
    
    // Weighted average with noise
    return (prev * 0.25 + factor * 0.5 + next * 0.25) + noise;
  });
  
  // Apply additional irregularity every few months to break patterns
  smoothedFactors.forEach((_, index) => {
    // Add occasional spikes or dips (approximately every 3-4 months, but irregularly)
    if ((index % 3 === (seed % 3)) || (index % 4 === (seed % 4))) {
      const irregularityMagnitude = (Math.random() * 0.3) - 0.15; // Between -0.15 and 0.15
      smoothedFactors[index] += irregularityMagnitude;
      
      // Ensure we stay in valid range
      smoothedFactors[index] = Math.max(0.05, Math.min(0.95, smoothedFactors[index]));
    }
  });
  
  // Generate revenue data with the smoothed factors
  return monthNames.map((month, index) => {
    // For last month (March), use the exact monthlyRevenue value
    if (index === monthNames.length - 1) {
      return { month, revenue: monthlyRevenue };
    }
    
    // Calculate revenue with the more natural volatility pattern
    // Ensure it stays within the min-max range
    const factor = smoothedFactors[index];
    const revenue = Math.round(minRevenue + (range * factor));
    
    return { month, revenue };
  });
};
