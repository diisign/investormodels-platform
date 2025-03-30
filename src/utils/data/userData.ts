import { User } from '../types/user';

// Mock user data
export const mockUser: User = {
  id: 'user1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  balance: 5000,
  investments: [
    {
      id: 'inv1',
      creatorId: 'creator1',
      creatorName: 'Emma *Asian #1*',
      creatorImage: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/k/ke/kei/keiep1nsav9m2m3e7l0ynbcttg9cfoez1657600220/186389633/avatar.jpg',
      planId: 'plan1-2',
      planName: 'Growth',
      amount: 500,
      returnRate: 12.5,
      startDate: '2023-06-15',
      endDate: '2023-12-15',
      status: 'active',
      earnings: 62.5
    },
    {
      id: 'inv2',
      creatorId: 'creator2',
      creatorName: 'Maria 🤸🏻‍*',
      creatorImage: 'https://yt3.googleusercontent.com/ytc/APkrFKbZ-jJenson-CkNJstsR4FoKWTWkSy9utsSdJqKA=s900-c-k-c0x00ffffff-no-rj',
      planId: 'plan2-1',
      planName: 'Basic',
      amount: 300,
      returnRate: 10,
      startDate: '2023-07-01',
      endDate: '2023-10-01',
      status: 'completed',
      earnings: 10
    },
    {
      id: 'inv3',
      creatorId: 'creator3',
      creatorName: 'Kayla',
      creatorImage: 'https://images.unsplash.com/photo-1544005279-09c586bf2d63?q=80&w=1976&auto=format&fit=crop',
      planId: 'plan3-3',
      planName: 'Premium',
      amount: 1000,
      returnRate: 15,
      startDate: '2023-08-01',
      endDate: '2024-08-01',
      status: 'active',
      earnings: 0
    }
  ],
  transactions: [
    {
      id: 'tx1',
      type: 'deposit',
      amount: 2000,
      date: '2023-05-01',
      status: 'completed',
      description: 'Dépôt initial'
    },
    {
      id: 'tx2',
      type: 'investment',
      amount: 500,
      date: '2023-06-15',
      status: 'completed',
      description: 'Investissement dans Emma *Asian #1*'
    },
    {
      id: 'tx3',
      type: 'withdrawal',
      amount: 100,
      date: '2023-07-01',
      status: 'completed',
      description: 'Retrait vers compte bancaire'
    },
    {
      id: 'tx4',
      type: 'earning',
      amount: 62.5,
      date: '2023-07-15',
      status: 'completed',
      description: 'Gains de Emma *Asian #1*'
    }
  ]
};
