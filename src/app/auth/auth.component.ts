import {
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  AuthenticationService,
  AuthResponseData,
} from '../service/auth.service';
import { AlertComponent } from '../shared-components/alert/alert.component';
import { PlaceholderDirective } from '../shared-components/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private viewContainRef: ViewContainerRef
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
        this.showErrorAlert(errMsg);
        this.isLoading = false;
      },
    });

    authForm.reset();
  }

  private showErrorAlert(err: string) {
    const component = this.viewContainRef.createComponent(AlertComponent);
    component.instance.message = err;
    this.closeSub = component.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      component.destroy();
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {

    }
  }
}
