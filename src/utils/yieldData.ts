// Données des yields réels fournies par l'utilisateur
export const creatorYields: Record<string, number> = {
  // Charlotte
  'creator13': 16.55,
  // Jasmine 🔥
  'creator22': 16.55,
  // Lala Avi ♡
  'creator4': 15.78,
  // Victoria 💋
  'creator17': 16.34,
  // Kim 🦋
  'creator26': 16.34,
  // Bianca 🌸
  'creator8': 26.35,
  // Luna ✨
  'brookmills': 28.31,
  // 🐈‍ Elizabeth
  'creator10': 12.16,
  // Emma *Asian #1*
  'creator1': 15.43,
  // Audrey Shanice 🔞🔥
  'creator14': 23.16,
  // Isabel 💫
  'creator23': 23.16,
  // Antonella ❤
  'creator5': 21.36,
  // Nina 💜
  'creator18': 21.60,
  // Hannah 💎
  'creator27': 21.60,
  // Ariana Colombian 🌶
  'creator9': 20.16,
  // Julia 🌙
  'creator24': 16.55,
  // Maria 🤸🏻‍*
  'creator2': 16.15,
  // Isabella Santos
  'creator11': 18.03,
  // Bryce's Flix 🎥
  'creator6': 15.21,
  // Brooke Mills
  'brooks-mills-🍒': 14.48,
  // Wendy 🌊
  'creator28': 22.18,
  // Zoe 🌹
  'creator19': 22.18,
  // Melanie 🍒
  'creator20': 18.03,
  // Samantha 🌸
  'creator21': 16.53,
  // Quinn 🌈
  'creator29': 20.53,
  // Kayla
  'creator3': 22.41,
  // Sophia Rose 💫
  'creator16': 22.49,
  // Daisy 💞
  'creator7': 26.24,
  // Aishah Sofey
  'aishah': 11.71,
  // Natalie 💕
  'creator25': 22.49,
  // 🎀 Autumn ren
  'creator12': 16.53
};

export const getCreatorYield = (creatorId: string): number => {
  return creatorYields[creatorId] || 0;
};