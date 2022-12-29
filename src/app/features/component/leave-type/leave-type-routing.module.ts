import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeaveTypeComponent } from './leave-type.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LeaveTypeComponent }
	])],
	exports: [RouterModule]
})
export class LeaveTypeRoutingModule { }
