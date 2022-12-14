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
    addAsset(asset: Asset): void {
      this.httpClient.post('Asset/InsertAsset', asset).subscribe((data: any) => {
      },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
    }
    updateAsset(asset: Asset): void {
      this.httpClient.put('Asset/UpdateAsset', asset).subscribe((data: any) => {
      },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
    }
    deleteAsset(id?: number): void {
      this.httpClient.delete('Asset/DeleteAsset/' + id).subscribe((data: any) => {
      },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
    }
    deleteAssets(assets: Asset[]): void {
      this.httpClient.post('Asset/DeleteAssets',assets).subscribe((data: any) => {
      },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
    }
}
