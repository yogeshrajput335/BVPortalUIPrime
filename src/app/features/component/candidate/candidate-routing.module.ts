import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CandidateComponent } from './candidate.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CandidateComponent }
	])],
	exports: [RouterModule]
})
export class CandidateRoutingModule { }
