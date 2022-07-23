import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  // { path: '', component: AuthComponent, pathMatch: 'full' },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./recipes/recipes.module').then((x) => x.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then((x) => x.ShoppingListModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((x) => x.AuthenticationModule),
  },
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    // RouterModule.forRoot(appRoutes, {useHash: true}) // Used for old browser
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
