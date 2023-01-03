import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONST } from 'src/app/core/constants';
import { HttpCommonService } from '@coreservices/httpCommon.service';
import { Asset } from '../component/asset/asset';

@Injectable()
export class AssetService {

    constructor(private httpClient: HttpCommonService) { }

    getAllAsset() {
        return this.httpClient.get(API_CONST.GET_ASSET);
    }
    getAllAssetTypes() {
      return this.httpClient.get(API_CONST.GET_ASSETTYPE);
    }
    addAsset(asset: Asset) {
      return this.httpClient.post(API_CONST.POST_ASSET, asset);
    }
    updateAsset(asset: Asset) {
      return this.httpClient.put(API_CONST.PUT_ASSET, asset);
    }
    deleteAsset(id: number) {
      return this.httpClient.delete(API_CONST.DELETE_ASSET.replace(':id', id?.toString()));
    }
    deleteAssets(assets: Asset[]) {
      return this.httpClient.post(API_CONST.DELETE_ASSETS,assets);
    }
}
