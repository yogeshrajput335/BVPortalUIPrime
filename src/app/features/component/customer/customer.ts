interface CustomerStatus {
  label: string;
  value: string;
}
export interface Customer {
    id?: number;
    customerName?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    emailAddress?: string;
    phoneNumber?: number;
    term?: number;
    status?: string;
  }
