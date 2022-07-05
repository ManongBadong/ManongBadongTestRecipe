import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IngredientService } from './service/ingredients.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './service/recipes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';
import { ShoppingListRoutingModule } from './shopping-list/shopping-list-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AppLoadingSpinner } from './shared-components/loading-spinner/loading-spinner.component';
import { SharedModule } from './shared-components/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RecipesModule,
    RecipesRoutingModule,
    ShoppingListModule,
    ShoppingListRoutingModule,
    SharedModule,
  ],
  providers: [
    IngredientService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
