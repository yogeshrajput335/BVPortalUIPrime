import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { CountryService } from './demo/service/country.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { AssetService } from './features/service/asset.service';
import { AssetTypeService } from './features/service/asset-type.service';
import { UserService } from './features/service/user.service';
import { EmployeeService } from './features/service/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { InvoiceService } from './features/service/invoice-list.service';
import { CandidateService } from './features/service/candidate.service ';
import { CommonService } from './features/service/common.service';
import { CompanyService } from './features/service/company.service ';
// import { CustomerService } from './demo/service/customer.service';
import { ProductService } from './features/service/product.service';
import { CustomerService } from './features/service/customer.service ';
import { ServiceService } from './features/service/service.service';
import { PaymentOptionService } from './features/service/payment-option.service ';
import { AssetAllocationService } from './features/service/asset-allocation.service';
import { HolidayService } from './features/service/holiday.service ';
import { LeaveTypeService } from './features/service/leave-type.service';
import { LeaveService } from './features/service/leave.service';
import { JobService } from './features/service/job.service';
import { ReferenceService } from './features/service/reference.service';


export function tokenGetter() {
    return localStorage.getItem("token");
}

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: ["localhost:7037"],
            disallowedRoutes: []
          }
        }),

    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, AssetService,AssetTypeService,UserService,
        InvoiceService ,EmployeeService,CandidateService,CommonService,CompanyService,
        ProductService,ServiceService,PaymentOptionService,AssetAllocationService,HolidayService,
        LeaveTypeService,LeaveService,JobService,ReferenceService,

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
