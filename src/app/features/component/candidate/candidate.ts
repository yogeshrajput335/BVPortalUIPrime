interface Status {
  label: string;
  value: string;
}
export interface Candidate {
    id?: number;
    createdDate?: Date;
    firstName?:string;
    lastName?:string;
    name?:string;
    technology?: string;
    visa?: string;
    rate?: string;
    client?: string;
    clientContact?: string;
    clientMail?: string;
    vendor?: string;
    vendorContact?: string;
    vendorMail?: string;
    status?: string;
  }
