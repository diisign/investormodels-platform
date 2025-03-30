
import { creators } from '../data/creatorsData';

/**
 * Invests in a creator's plan
 * @param creatorId The ID of the creator to invest in
 * @param planId The ID of the plan to invest in
 * @param amount The amount to invest
 * @param userId The ID of the user making the investment
 */
export const investInCreator = async (
  creatorId: string,
  planId: string,
  amount: number,
  userId: string
): Promise<void> => {
  // Find the creator and plan
  const creator = creators.find(c => c.id === creatorId);
  if (!creator) throw new Error("Creator not found");
  
  const plan = creator.plans.find(p => p.id === planId) || creator.plans[0];
  if (!plan) throw new Error("Plan not found");
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For now we just return success, in a real app we would update the database
  return Promise.resolve();
};
