import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssetAllocationComponent } from './asset-allocation.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AssetAllocationComponent }
	])],
	exports: [RouterModule]
})
export class AssetAllocationRoutingModule { }
