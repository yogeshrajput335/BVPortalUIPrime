import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { AssetType } from '../component/asset-type/asset-type';

@Injectable()
export class AssetTypeService {

    constructor(private httpClient: HttpCommonService) { }

    // getAllAssetType() {
    //     return this.httpClient.get('AssetType/GetAssetType');
    // }
    getAllAssetTypes() {
      return this.httpClient.get('AssetType/GetAssetType');
    }
    addAssetType(assettype: AssetType) {
      return this.httpClient.post('AssetType/InsertAssetType', assettype);
    }
    updateAssetType(assettype: AssetType) {
      return this.httpClient.put('AssetType/UpdateAssetType', assettype);
    }
    deleteAssetType(id?: number) {
      return this.httpClient.delete('AssetType/DeleteAssetType/' + id);
    }
    deleteAssetTypes(assettypes: AssetType[]) {
      return this.httpClient.post('AssetType/DeleteAssetTyp',assettypes);
    }
}
