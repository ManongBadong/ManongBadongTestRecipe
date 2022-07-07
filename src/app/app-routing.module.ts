import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./recipes/recipes.module').then((x) => x.RecipesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    // RouterModule.forRoot(appRoutes, {useHash: true}) // Used for old browser
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
