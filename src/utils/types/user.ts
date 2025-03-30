
export interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  investments: Investment[];
  transactions: Transaction[];
}

export interface Investment {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorImage: string;
  planId: string;
  planName: string;
  amount: number;
  returnRate: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'completed';
  earnings: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'earning';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}
