import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobComponent } from './job.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: JobComponent }
	])],
	exports: [RouterModule]
})
export class JobRoutingModule { }
