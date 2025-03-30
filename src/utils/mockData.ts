
// Re-export everything from the separated files
// This maintains backward compatibility with existing imports

export type { Creator, Plan } from './types/creator';
export type { User, Investment, Transaction } from './types/user';

export { creators } from './data/creatorsData';
export { mockUser } from './data/userData';
export { investInCreator } from './services/investmentService';
