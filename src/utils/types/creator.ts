
export interface Creator {
  id: string;
  name: string;
  imageUrl: string;
  coverImageUrl: string;
  category: string;
  returnRate: number;
  investorsCount: number;
  totalInvested: number;
  monthlyRevenue: number;
  followers: number;
  creationDate: string;
  description: string;
  plans: Plan[];
}

export interface Plan {
  id: string;
  name: string;
  returnRate: number;
  minInvestment: number;
  duration: number;
  benefits: string[];
  popularity: 'low' | 'medium' | 'high';
}
