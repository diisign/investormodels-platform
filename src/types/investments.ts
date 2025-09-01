
export interface Investment {
  id: string;
  creator_id: string;
  amount: number;
  initial: number;
  return_rate: number;
  created_at: string;
  status: string;
  user_id: string;
  duration_months: number;
  shares_owned: boolean;
  sold_at: string | null;
  last_dividend_date: string | null;
}

export interface Dividend {
  id: string;
  investment_id: string;
  user_id: string;
  amount: number;
  dividend_date: string;
  yield_rate: number;
  created_at: string;
}
