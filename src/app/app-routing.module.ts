import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    { path: 'recipe', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent, pathMatch: 'full'},
        { path: 'new', component: RecipeEditComponent},
        { path: ':id', component: RecipeDetailComponent},
        { path: ':id/edit', component: RecipeEditComponent}
    ]},
    { path: 'shopping-list', component: ShoppingListComponent, children: [
        { path: ':id', component: ShoppingEditComponent}
    ]},
    { path: '', component: RecipesComponent, pathMatch: 'full'},
    { path: '**', redirectTo: 'recipe' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
        // RouterModule.forRoot(appRoutes, {useHash: true}) // Used for old browser
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
