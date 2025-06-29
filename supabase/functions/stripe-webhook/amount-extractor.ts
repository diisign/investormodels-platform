
import type { PaymentData } from "./types.ts";

export function extractAmount(paymentData: PaymentData): number {
  let amount = 0;
  
  if (paymentData.amount_total) {
    amount = paymentData.amount_total / 100;
  } else if (paymentData.amount) {
    amount = paymentData.amount / 100;
  }
  
  return amount;
}
