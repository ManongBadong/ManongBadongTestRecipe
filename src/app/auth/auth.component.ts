import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthenticationService,
  AuthResponseData,
} from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    this.error = null;
    this.isLoading = true;
    let userSubs: Observable<AuthResponseData>;

    if (!this.isLoginMode) {
      userSubs = this.authService.signUp(authForm.value);
    } else {
      userSubs = this.authService.login(authForm.value);
    }

    userSubs.subscribe({
      next: (resData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errMsg) => {
        this.error = errMsg;
        this.isLoading = false;
      },
    });

    authForm.reset();
  }
}
