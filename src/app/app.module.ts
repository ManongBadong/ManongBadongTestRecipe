import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';
import { ShoppingListRoutingModule } from './shopping-list/shopping-list-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared-components/shared.module';
import { CoreModule } from './core.module';
import { AuthenticationModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RecipesModule,
    RecipesRoutingModule,
    ShoppingListModule,
    ShoppingListRoutingModule,
    SharedModule,
    CoreModule,
    AuthenticationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
