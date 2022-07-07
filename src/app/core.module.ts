import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { IngredientService } from './service/ingredients.service';
import { RecipeService } from './service/recipes.service';

@NgModule({
  providers: [
    IngredientService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
