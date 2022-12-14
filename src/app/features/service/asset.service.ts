import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { Asset } from '../component/asset/asset';

@Injectable()
export class AssetService {

    constructor(private httpClient: HttpCommonService) { }

    getAllAsset() {
        return this.httpClient.get('Asset/GetAsset');
    }
    getAllAssetTypes() {
      return this.httpClient.get('AssetType/GetAssetType');
    }
    addAsset(asset: Asset) {
      return this.httpClient.post('Asset/InsertAsset', asset);
    }
    updateAsset(asset: Asset) {
      return this.httpClient.put('Asset/UpdateAsset', asset);
    }
    deleteAsset(id?: number) {
      return this.httpClient.delete('Asset/DeleteAsset/' + id);
    }
    deleteAssets(assets: Asset[]) {
      return this.httpClient.post('Asset/DeleteAssets',assets);
    }
}
