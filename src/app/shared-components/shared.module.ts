import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from '../directive/dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { AppLoadingSpinner } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [
    AlertComponent,
    AppLoadingSpinner,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    AppLoadingSpinner,
    DropdownDirective,
    PlaceholderDirective,
  ],
})
export class SharedModule {}
