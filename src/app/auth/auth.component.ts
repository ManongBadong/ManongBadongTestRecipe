import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;

  constructor(private authService: AuthenticationService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    this.isLoading = true;
    let userSubs: Subscription;

    if (!this.isLoginMode) {
      this.authService.signUp(authForm.value);
    } else {
      this.authService.login(authForm.value);
    }
    this.isLoading = false;
  }
}
