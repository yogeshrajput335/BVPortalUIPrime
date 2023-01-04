import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReferenceComponent } from './reference.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ReferenceComponent }
	])],
	exports: [RouterModule]
})
export class ReferenceRoutingModule { }
