import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentOptionComponent } from './payment-option.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PaymentOptionComponent }
	])],
	exports: [RouterModule]
})
export class PaymentOptionRoutingModule { }
