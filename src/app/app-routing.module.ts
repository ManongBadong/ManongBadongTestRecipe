import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  { path: '', component: AuthComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    // RouterModule.forRoot(appRoutes, {useHash: true}) // Used for old browser
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
