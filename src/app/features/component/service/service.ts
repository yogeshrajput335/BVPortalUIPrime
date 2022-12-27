interface ServiceStatus {
  label: string;
  value: string;
}
export interface Service {
    id?: number;
    serviceName?: string;
    unit?: string;
    rate?: number;
    status?: string;
  }
