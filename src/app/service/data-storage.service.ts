import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../model/recipe.model";
import { RecipeService } from "./recipes.service";

@Injectable({ providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    console.log(recipes);

    this.http.put('https://ngcourserecipe-3c981-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    this.http.get('https://ngcourserecipe-3c981-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json').subscribe((recipes: Recipe[]) => {
      this.recipeService.setRecipes(recipes);
    });
  }
}