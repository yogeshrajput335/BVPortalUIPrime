interface ProductStatus {
  label: string;
  value: string;
}
export interface Product {
    id?: number;
    productName?: string;
    unit?: string;
    rate?: number;
    status?: string;
  }
