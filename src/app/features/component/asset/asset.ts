interface AssetStatus {
  label: string;
  value: string;
}
export interface Asset {
    id?: number;
    name?: string;
    typeId?: number;
    type?: string;
    modelNumber?: string;
    status?: AssetStatus;
  }
