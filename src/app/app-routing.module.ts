import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    // RouterModule.forRoot(appRoutes, {useHash: true}) // Used for old browser
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
