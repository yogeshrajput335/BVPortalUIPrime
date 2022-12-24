interface CompanyStatus {
  label: string;
  value: string;
}
export interface Company {
    id?: number;
    companyName?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    emailAddress?: string;
    phoneNumber?: number;
    companyLogo?: string;
    status?: string;
  }
