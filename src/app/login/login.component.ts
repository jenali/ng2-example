import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../common/services/api.service';
import {Request} from '../common/interfaces/request';
import {LoginForm} from '../common/interfaces/login-form';
import {LoggedInGuard} from '../common/services/logged-in.guard'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    readonly loginPath = '/v1/login';

    public loginForm: any;

    private request: Request;

    constructor(private fb: FormBuilder, private api: ApiService, private loggedInGuard: LoggedInGuard) {
        this.loginForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.email])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
        })
    }

    ngOnInit() {
    }

    protected onSubmit(loginForm: LoginForm) {
        if (this.sendLogin(loginForm)) {

        } else {

        }
    }

    private sendLogin(loginForm: LoginForm) {
        this.request = {
            'url': this.loginPath,
            'data': loginForm
        };
        this.api.apiPost(this.request).then((res) => {
            this.loggedInGuard.setToken(res.token);
        })

    }

}
