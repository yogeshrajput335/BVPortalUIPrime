import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceCreateComponent } from './invoice-create.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InvoiceCreateComponent }
	])],
	exports: [RouterModule]
})
export class InvoiceCreateRoutingModule { }
