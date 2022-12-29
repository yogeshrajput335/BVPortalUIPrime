import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'asset', loadChildren: () => import('./asset/asset.module').then(m => m.AssetModule) },
        { path: 'asset-type', loadChildren: () => import('./asset-type/asset-type.module').then(m => m.AssetTypeModule) },
        { path: 'asset-allocation', loadChildren: () => import('./asset-allocation/asset-allocation.module').then(m => m.AssetAllocationModule) },
        { path: 'user', loadChildren: () => import('./users/user.module').then(m => m.UserModule) },
        { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
        { path: 'candidate', loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule) },
        { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
        { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
        { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
        { path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule) },
        { path: 'holiday', loadChildren: () => import('./holiday/holiday.module').then(m => m.HolidayModule) },
        { path: 'leave-type', loadChildren: () => import('./leave-type/leave-type.module').then(m => m.LeaveTypeModule) },
        { path: 'payment-option', loadChildren: () => import('./payment-option/payment-option.module').then(m => m.PaymentOptionModule) },
        { path: 'invoice-list', loadChildren: () => import('./invoice-list/invoice-list.module').then(m => m.InvoiceListModule) },
        { path: 'invoice-create', loadChildren: () => import('./invoice-create/invoice-create.module').then(m => m.InvoiceCreateModule) },
        // { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        // { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class FeaturesRoutingModule { }
