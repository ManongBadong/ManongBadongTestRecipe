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

    this.http.post('https://ngcourserecipe-3c981-default-rtdb.asia-southeast1.firebasedatabase.app/post.json', recipes).subscribe(
      response => {
        console.log('Data save successfully.');
      }
    );
  }
}