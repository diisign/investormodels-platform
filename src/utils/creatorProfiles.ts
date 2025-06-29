export interface CreatorProfile {
  id: string;
  name: string;
  monthlyRevenue: number;
  returnRate: number;
  followers: number;
  minRevenue: number;
  maxRevenue: number;
  imageUrl?: string; // Adding imageUrl field to the interface
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
    maxRevenue: 60000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/k/ke/kei/keiep1nsav9m2m3e7l0ynbcttg9cfoez1657600220/186389633/avatar.jpg"
  },
  "creator2": {
    id: "creator2",
    name: "Maria 🤸🏻‍*",
    monthlyRevenue: 75150,
    returnRate: 120,
    followers: 5010,
    minRevenue: 50000,
    maxRevenue: 98000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/l/lq/lqy/lqyww860kcjl7vlskjkvhqujrfpks1rr1708457235/373336356/avatar.jpg"
  },
  "creator3": {
    id: "creator3",
    name: "Kayla",
    monthlyRevenue: 88800,
    returnRate: 125,
    followers: 5920,
    minRevenue: 60000,
    maxRevenue: 99650,
    imageUrl: "/lovable-uploads/687feb0e-ff72-459b-b06e-4c560012913c.png"
  },
  "creator4": {
    id: "creator4",
    name: "Lala Avi ♡",
    monthlyRevenue: 32550,
    returnRate: 80,
    followers: 2170,
    minRevenue: 19650,
    maxRevenue: 58500,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/p/pd/pd9/pd9plrrb99cb0kkhev4iczume0abbr4h1737510365/269048356/avatar.jpg"
  },
  "creator5": {
    id: "creator5",
    name: "Antonella ❤",
    monthlyRevenue: 52300,
    returnRate: 100,
    followers: 3487,
    minRevenue: 39950,
    maxRevenue: 70000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/6/6f/6ff/6ffsabyn44okaxnazykunwo0x5zw1kmd1739911134/355023516/avatar.jpg"
  },
  "creator6": {
    id: "creator6",
    name: "Bryce's Flix 🎥",
    monthlyRevenue: 59000,
    returnRate: 110,
    followers: 3933,
    minRevenue: 41750,
    maxRevenue: 83000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/j/jm/jmc/jmceq667otzovowlp3b0rqbmvpyybjjh1733705286/104901396/avatar.jpg"
  },
  "creator7": {
    id: "creator7",
    name: "Daisy 💞",
    monthlyRevenue: 64700,
    returnRate: 115,
    followers: 4313,
    minRevenue: 48450,
    maxRevenue: 86450,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/t/tu/tue/tues2azi6vxj6yrmdec7g9vrol66frbj1731104096/445225187/avatar.jpg"
  },
  "creator8": {
    id: "creator8",
    name: "Bianca 🍎 *Domincan 🇩🇴*",
    monthlyRevenue: 49950,
    returnRate: 100,
    followers: 3330,
    minRevenue: 30150,
    maxRevenue: 72850,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/w/ww/www/wwwm2nbmdojruuvvmskbb0rfiqur4w8w1738821490/424984894/avatar.jpg"
  },
  "creator9": {
    id: "creator9",
    name: "Ariana Colombian 🌶",
    monthlyRevenue: 67600,
    returnRate: 110,
    followers: 4507,
    minRevenue: 50000,
    maxRevenue: 90000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/r/rn/rnj/rnj2ki36l6ih5ay5ecbbplaearzyhqpd1725115071/440793308/avatar.jpg"
  },
  "creator10": {
    id: "creator10",
    name: "🐈‍ Elizabeth",
    monthlyRevenue: 78400,
    returnRate: 120,
    followers: 5227,
    minRevenue: 52000,
    maxRevenue: 95650,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/l/le/lec/lecj3pxbtb4ymxfen8yurh1aqum6xooq1736534589/124057483/avatar.jpg"
  },
  "creator11": {
    id: "creator11",
    name: "Isabella Santos",
    monthlyRevenue: 59150,
    returnRate: 110,
    followers: 3943,
    minRevenue: 48650,
    maxRevenue: 83650,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/g/gc/gcl/gclytoh6ibqn1khp1cf2i6ymelztqmgl1714404792/412109090/avatar.jpg"
  },
  "creator12": {
    id: "creator12",
    name: "🎀 Autumn ren",
    monthlyRevenue: 48850,
    returnRate: 95,
    followers: 3257,
    minRevenue: 27000,
    maxRevenue: 72150,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/p/po/poq/poqsgzzsem9nmffr5e3dmnis3gdfkdjt1739306610/161871329/avatar.jpg"
  },
  "creator13": {
    id: "creator13",
    name: "Charlotte 🤍",
    monthlyRevenue: 38250,
    returnRate: 85,
    followers: 2550,
    minRevenue: 23000,
    maxRevenue: 57550,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/c/cq/cqy/cqydatlsrhxwwop9ybh9xkh4kmtmoaj41705156342/277839437/avatar.jpg"
  },
  "creator14": {
    id: "creator14",
    name: "Audrey Shanice 🔞🔥",
    monthlyRevenue: 54500,
    returnRate: 100,
    followers: 3633,
    minRevenue: 36000,
    maxRevenue: 71150,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/t/tr/tre/treu426uagi2nu0ppnuhscgqhz1vajrb1614919839/avatar.jpg"
  },
  "creator15": {
    id: "creator15",
    name: "Brooke Mills🍒",
    monthlyRevenue: 94950,
    returnRate: 130,
    followers: 6330,
    minRevenue: 69850,
    maxRevenue: 120350,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/d/dw/dwu/dwuzuukydwqt4xfgbbtnioc4u9namz1s1727441272/390390561/avatar.jpg"
  },
  "creator16": {
    id: "creator16",
    name: "Sophia Rose 💫",
    monthlyRevenue: 57800,
    returnRate: 105,
    followers: 3853,
    minRevenue: 42500,
    maxRevenue: 79000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/l/lv/lvi/lviitmbx2pppksgphr5kk2vh5tmwzo1w1704302300/6793248/avatar.jpg"
  },
  // Nouveaux profils de créatrices avec les images que vous avez fournies
  "creator17": {
    id: "creator17",
    name: "Victoria 💋",
    monthlyRevenue: 68500,
    returnRate: 115,
    followers: 4567,
    minRevenue: 45000,
    maxRevenue: 85000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/n/nl/nl7/nl7ujr6gpao7riitqgeul2kuvclb7snl1724680176/344510725/avatar.jpg"
  },
  "creator18": {
    id: "creator18",
    name: "Nina 💜",
    monthlyRevenue: 72300,
    returnRate: 118,
    followers: 4820,
    minRevenue: 48000,
    maxRevenue: 88000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/z/zr/zrj/zrjivxcnygnbhjjpnvalhffjejnk5emb1707238486/9376223/avatar.jpg"
  },
  "creator19": {
    id: "creator19",
    name: "Zoe 🌹",
    monthlyRevenue: 63400,
    returnRate: 112,
    followers: 4227,
    minRevenue: 42000,
    maxRevenue: 81000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/m/mv/mvl/mvlhwxzldrtpzkdcyqzgrr5i8atwqvot1711117694/403859232/avatar.jpg"
  },
  "creator20": {
    id: "creator20",
    name: "Melanie 🍒",
    monthlyRevenue: 81200,
    returnRate: 122,
    followers: 5413,
    minRevenue: 54000,
    maxRevenue: 97000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/s/sn/snk/snknlldkypeays71iobp4qqamgmyx83m1730686874/345711625/avatar.jpg"
  },
  "creator21": {
    id: "creator21",
    name: "Samantha 🌸",
    monthlyRevenue: 56700,
    returnRate: 105,
    followers: 3780,
    minRevenue: 38000,
    maxRevenue: 77000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/j/j4/j4s/j4szddk3kng9ryu0tu4ltlz7llofo0gs1714221649/9059542/avatar.jpg"
  },
  "creator22": {
    id: "creator22",
    name: "Jasmine 🔥",
    monthlyRevenue: 91800,
    returnRate: 128,
    followers: 6120,
    minRevenue: 61000,
    maxRevenue: 110000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/i/ik/ikh/ikhxjrnd5wxourm8hqcjibrk7smzblyn1718163760/145464089/avatar.jpg"
  },
  "creator23": {
    id: "creator23",
    name: "Isabel 💫",
    monthlyRevenue: 76900,
    returnRate: 120,
    followers: 5127,
    minRevenue: 51000,
    maxRevenue: 92000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/j/jq/jqy/jqypn1apftzib3fautwdfox0cj02c4jp1703395505/101611678/avatar.jpg"
  },
  "creator24": {
    id: "creator24",
    name: "Julia 🌙",
    monthlyRevenue: 53600,
    returnRate: 102,
    followers: 3573,
    minRevenue: 36000,
    maxRevenue: 74000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/n/na/naa/naao7csjw7xicftell1shcb9lsxjmdy91737645433/2301291/avatar.jpg"
  },
  "creator25": {
    id: "creator25",
    name: "Natalie 💕",
    monthlyRevenue: 87300,
    returnRate: 125,
    followers: 5820,
    minRevenue: 58000,
    maxRevenue: 105000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/k/kg/kgy/kgya8xp7dt359cjnl608o82odpc7rgbc1705207113/6554260/avatar.jpg"
  },
  "creator26": {
    id: "creator26",
    name: "Kim 🦋",
    monthlyRevenue: 62100,
    returnRate: 110,
    followers: 4140,
    minRevenue: 41000,
    maxRevenue: 80000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/h/hn/hnp/hnp6h41vafuzgo9lb93jyrg1khl7yusd1674778751/302999100/avatar.jpg"
  },
  "creator27": {
    id: "creator27",
    name: "Hannah 💎",
    monthlyRevenue: 70500,
    returnRate: 116,
    followers: 4700,
    minRevenue: 47000,
    maxRevenue: 87000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/w/wt/wtt/wttm01muz3ow11csonxw9vhuzbfyfjkp1714596535/365403081/avatar.jpg"
  },
  "creator28": {
    id: "creator28",
    name: "Wendy 🌊",
    monthlyRevenue: 59700,
    returnRate: 108,
    followers: 3980,
    minRevenue: 40000,
    maxRevenue: 78000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/q/q0/q0o/q0o3kw7gqhvuioaplnveb6q77j4ko6ln1673237481/13754453/avatar.jpg"
  },
  "creator29": {
    id: "creator29",
    name: "Quinn 🌈",
    monthlyRevenue: 65800,
    returnRate: 114,
    followers: 4387,
    minRevenue: 44000,
    maxRevenue: 83000,
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/l/l9/l9x/l9xmlchxkcd4qlxzgvv2rthxmcy927sl1716795807/50366283/avatar.jpg"
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

// Fonction pour calculer le "total investi" de manière cohérente
export const calculateTotalInvested = (monthlyRevenue: number): number => {
  // Generate a random number between 32,000 and 99,900
  const minValue = 32000;
  const maxValue = 99900;
  
  // Use the monthly revenue as a seed to ensure consistency for the same creator
  const seed = monthlyRevenue % 10000;
  const randomFactor = (seed / 10000) * 0.5 + 0.25; // This will give a value between 0.25 and 0.75
  
  // Calculate total invested based on the random factor and our min/max range
  const range = maxValue - minValue;
  let totalInvested = Math.round(minValue + (range * randomFactor));
  
  // Ensure the value is rounded to the nearest 100
  totalInvested = Math.round(totalInvested / 100) * 100;
  
  return totalInvested;
};
