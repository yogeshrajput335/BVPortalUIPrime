import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HolidayComponent } from './holiday.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: HolidayComponent }
	])],
	exports: [RouterModule]
})
export class HolidayRoutingModule { }
