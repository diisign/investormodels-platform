export interface CreatorProfile {
  id: string;
  name: string;
  imageUrl: string;
  monthlyRevenue: number;
  returnRate?: number;
  followers?: number;
  description?: string;
  hidden?: boolean;
}