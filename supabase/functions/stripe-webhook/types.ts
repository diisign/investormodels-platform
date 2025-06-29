
export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
}

export interface PaymentData {
  id: string;
  amount_total?: number;
  amount?: number;
  currency?: string;
  metadata?: {
    userId?: string;
  };
  customer_details?: {
    email?: string;
  };
  receipt_email?: string;
  billing_details?: {
    email?: string;
  };
  payment_intent?: string;
}

export interface TransactionRecord {
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_id: string;
  payment_method: string;
}
