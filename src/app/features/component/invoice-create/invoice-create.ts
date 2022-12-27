// interface AssetStatus {
//   label: string;
//   value: string;
// }
export interface Invoice {
    id?: number;
    invoiceNumber?: number;
    invoiceDate?: Date;
    term?: string;
    dueDate?: Date;
    companyId?:number;
    companyName?:string;
    companyAddressLine1?:string;
    companyAddressLine2?: string;
    companyAddressLine3?: string;
    companyEmailAddress?: string;
    companyPhoneNumber?: string;
    customerId?:number;
    customerName?:string;
    customerAddressLine1?:string;
    customerAddressLine2?: string;
    customerAddressLine3?: string;
    status?: string;
    total?:number;
    noteToCustomer?: string;
    getPaidNotes?: string;
    products?: any;
}
