interface PaymentOptionStatus {
  label: string;
  value: string;
}
export interface PaymentOption {
    id?: number;
    paymentOptionName?: string;
    status?: string;
  }
