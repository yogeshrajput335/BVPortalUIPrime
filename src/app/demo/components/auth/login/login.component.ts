import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HttpCommonService } from 'src/app/core/services/httpCommon.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    public loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    get usernameControl(): FormControl {
        return this.loginForm.get('username') as FormControl;
    }

    get passwordControl(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService, private authenticationService: AuthenticationService,
        private route: Router, private httpService:HttpCommonService) { }

    ngOnInit(): void {
        this.loginForm.controls['username'].setValue('');
        this.loginForm.controls['password'].setValue('');
    }

    onSignIn() {
        let username = this.loginForm.get('username')!.value;
        let password = this.loginForm.get('password')!.value;
        this.authenticationService.login(username!, password);
    }
}
