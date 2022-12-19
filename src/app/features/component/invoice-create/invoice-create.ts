// interface AssetStatus {
//   label: string;
//   value: string;
// }
export interface Invoice {
    id?: number;
    invoiceNo?: number;
    createdDate?: Date;
    term?: string;
    termText?: string;
    dueDate?: Date;
    clientId?:number;
    clientName?:string;
    fromLine1?: string;
    fromLine2?: string;
    fromLine3?: string;
    status?: string;
    products?: any;
}
