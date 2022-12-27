interface AssetAllocationStatus {
  label: string;
  value: string;
}
export interface AssetAllocation {
  id?: number;
  assetName?: string;
  assetId?: number;
  allocatedBy?: string;
  allocatedById?: number;
  allocatedTo?: string;
  allocatedToId?: number;
  allocatedDate?: string;
  returnDate?: string;
  status?: string;
}
