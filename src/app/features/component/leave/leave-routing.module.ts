import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeaveComponent } from './leave.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LeaveComponent }
	])],
	exports: [RouterModule]
})
export class LeaveRoutingModule { }
