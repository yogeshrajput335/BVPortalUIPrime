import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssetTypeComponent } from './asset-type.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AssetTypeComponent }
	])],
	exports: [RouterModule]
})
export class AssetTypeRoutingModule { }
