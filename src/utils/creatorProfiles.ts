import { CreatorProfile } from '@/types/creatorProfile';

// Mois pour les graphiques des profils (décalés - supprime juillet, ajoute août)
const monthNames = ['Août', 'Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Août'];

const creatorProfiles: Record<string, CreatorProfile> = {
  'brooks-mills': {
    id: 'brooks-mills',
    name: 'Brooks Mills 🍒',
    imageUrl: '/lovable-uploads/e09bb6c4-2388-4ba2-bc33-10429376180d.png',
    monthlyRevenue: 15000,
  },
  'emma-wilson': {
    id: 'emma-wilson',
    name: 'Emma Wilson',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/p/pd/pd9/pd9plrrb99cb0kkhev4iczume0abbr4h1737510365/269048356/avatar.jpg',
    monthlyRevenue: 9000,
  },
  'sophia-martinez': {
    id: 'sophia-martinez',
    name: 'Sophia Martinez',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/l/lq/lqy/lqyww860kcjl7vlskjkvhqujrfpks1rr1708457235/373336356/avatar.jpg',
    monthlyRevenue: 11000,
  },
  'kayla-smith': {
    id: 'kayla-smith',
    name: 'Kayla Smith',
    imageUrl: 'https://onlyfinder.com/cdn-cgi/image/width=160,quality=75/https://media.onlyfinder.com/d9/d95cc6ad-2b07-4bd3-a31a-95c00fd31bef/kaylapufff-onlyfans.webp',
    monthlyRevenue: 8500,
  },
  'mia-rodriguez': {
    id: 'mia-rodriguez',
    name: 'Mia Rodriguez',
    imageUrl: 'https://example.com/mia-rodriguez.jpg',
    monthlyRevenue: 7500,
  }
};

export const getCreatorProfile = (creatorId: string): CreatorProfile | undefined => {
  return creatorProfiles[creatorId];
};

export const generateMonthlyPerformanceData = (creatorId: string) => {
  const creator = getCreatorProfile(creatorId);
  if (!creator) return [];

  const baseRevenue = creator.monthlyRevenue;
  
  // Génération séquentielle pour éviter les références circulaires
  const revenueValues: number[] = [];
  
  for (let i = 0; i < monthNames.length; i++) {
    const month = monthNames[i];
    let revenue: number;
    
    switch (creatorId) {
      case 'brooks-mills':
        switch (month) {
          case 'Août': revenue = i === 0 ? 12800 : 15200; break; // Premier août: 12800, dernier août: 15200
          case 'Sept': revenue = 13500; break;
          case 'Oct': revenue = 14200; break;
          case 'Nov': revenue = 13800; break;
          case 'Déc': revenue = 15800; break;
          case 'Jan': revenue = 16500; break;
          case 'Fév': revenue = 17200; break;
          case 'Mars': revenue = 16800; break;
          case 'Avr': revenue = 18200; break;
          case 'Mai': revenue = 19500; break;
          case 'Juin': revenue = 18900; break;
          default: revenue = baseRevenue;
        }
        break;

      case 'emma-wilson':
        switch (month) {
          case 'Août': revenue = i === 0 ? 8200 : 9800; break; // Premier août: 8200, dernier août: 9800
          case 'Sept': revenue = 8800; break;
          case 'Oct': revenue = 9200; break;
          case 'Nov': revenue = 8900; break;
          case 'Déc': revenue = 10100; break;
          case 'Jan': revenue = 10800; break;
          case 'Fév': revenue = 11200; break;
          case 'Mars': revenue = 10900; break;
          case 'Avr': revenue = 11800; break;
          case 'Mai': revenue = 12500; break;
          case 'Juin': revenue = 12100; break;
          default: revenue = baseRevenue;
        }
        break;

      case 'sophia-martinez':
        switch (month) {
          case 'Août': revenue = i === 0 ? 9500 : 11200; break; // Premier août: 9500, dernier août: 11200
          case 'Sept': revenue = 10100; break;
          case 'Oct': revenue = 10600; break;
          case 'Nov': revenue = 10200; break;
          case 'Déc': revenue = 11800; break;
          case 'Jan': revenue = 12400; break;
          case 'Fév': revenue = 12900; break;
          case 'Mars': revenue = 12500; break;
          case 'Avr': revenue = 13600; break;
          case 'Mai': revenue = 14200; break;
          case 'Juin': revenue = 13800; break;
          default: revenue = baseRevenue;
        }
        break;

      case 'kayla-smith':
        switch (month) {
          case 'Août': revenue = i === 0 ? 7800 : 9200; break; // Premier août: 7800, dernier août: 9200
          case 'Sept': revenue = 8300; break;
          case 'Oct': revenue = 8700; break;
          case 'Nov': revenue = 8400; break;
          case 'Déc': revenue = 9600; break;
          case 'Jan': revenue = 10100; break;
          case 'Fév': revenue = 10500; break;
          case 'Mars': revenue = 10200; break;
          case 'Avr': revenue = 11000; break;
          case 'Mai': revenue = 11600; break;
          case 'Juin': revenue = 11300; break;
          default: revenue = baseRevenue;
        }
        break;

      case 'mia-rodriguez':
        switch (month) {
          case 'Août': revenue = i === 0 ? 6800 : 8100; break; // Premier août: 6800, dernier août: 8100
          case 'Sept': revenue = 7200; break;
          case 'Oct': revenue = 7600; break;
          case 'Nov': revenue = 7300; break;
          case 'Déc': revenue = 8400; break;
          case 'Jan': revenue = 8800; break;
          case 'Fév': revenue = 9200; break;
          case 'Mars': revenue = 8900; break;
          case 'Avr': revenue = 9600; break;
          case 'Mai': revenue = 10100; break;
          case 'Juin': revenue = 9800; break;
          default: revenue = baseRevenue;
        }
        break;

      default:
        switch (month) {
          case 'Août': revenue = i === 0 ? baseRevenue * 0.85 : baseRevenue * 1.15; break;
          case 'Sept': revenue = baseRevenue * 0.9; break;
          case 'Oct': revenue = baseRevenue * 0.95; break;
          case 'Nov': revenue = baseRevenue * 0.92; break;
          case 'Déc': revenue = baseRevenue * 1.08; break;
          case 'Jan': revenue = baseRevenue * 1.12; break;
          case 'Fév': revenue = baseRevenue * 1.16; break;
          case 'Mars': revenue = baseRevenue * 1.13; break;
          case 'Avr': revenue = baseRevenue * 1.20; break;
          case 'Mai': revenue = baseRevenue * 1.25; break;
          case 'Juin': revenue = baseRevenue * 1.22; break;
          default: revenue = baseRevenue;
        }
    }
    
    revenueValues.push(revenue);
  }

  return monthNames.map((month, index) => ({
    month,
    revenue: revenueValues[index],
    investment: Math.round(revenueValues[index] * 0.15)
  }));
};
