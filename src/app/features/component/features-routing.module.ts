import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'asset', loadChildren: () => import('./asset/asset.module').then(m => m.AssetModule) },
        { path: 'asset-type', loadChildren: () => import('./asset-type/asset-type.module').then(m => m.AssetTypeModule) },
        { path: 'user', loadChildren: () => import('./users/user.module').then(m => m.UserModule) },
        { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
        { path: 'invoice-list', loadChildren: () => import('./invoice-list/invoice-list.module').then(m => m.InvoiceListModule) },
        { path: 'invoice-create', loadChildren: () => import('./invoice-create/invoice-create.module').then(m => m.InvoiceCreateModule) },
        // { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        // { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class FeaturesRoutingModule { }
