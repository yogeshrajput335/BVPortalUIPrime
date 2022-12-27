import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { AssetAllocation } from '../component/asset-allocation/asset-allocation';

@Injectable()
export class AssetAllocationService {

    constructor(private httpClient: HttpCommonService) { }
    getAllAssetAllocations() {
      return this.httpClient.get('AssetAllocation/GetAssetAllocation');
    }
    getAllEmployees() {
      return this.httpClient.get('Employee/GetEmployee');
    }
    addAssetAllocation(assetAllocation: AssetAllocation) {
      return this.httpClient.post('AssetAllocation/InsertAssetAllocation', assetAllocation);
    }
    updateAssetAllocation(assetAllocation: AssetAllocation) {
      return this.httpClient.put('AssetAllocation/UpdateAssetAllocation', assetAllocation);
    }
    deleteAssetAllocation(id?: number) {
      return this.httpClient.delete('AssetAllocation/DeleteAssetAllocation/' + id);
    }
    deleteAssetAllocations(assetAllocations: AssetAllocation[]) {
      return this.httpClient.post('AssetAllocation/DeleteAssetAllocation',assetAllocations);
    }
}
