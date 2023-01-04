interface JobStatus {
  label: string;
  value: string;
}
export interface Job {
    id?: number;
    jobName?: string;
    profile?: string;
    description?: string;
    startDate?: Date;
    country?: string;
    status?: string;
  }
