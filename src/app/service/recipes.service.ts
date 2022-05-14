import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // selectedRecipe = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Test Recipe',
      'This is a test.',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
      [
        new Ingredient('Jebs1', 5),
        new Ingredient('Jebs2', 15),
      ]
    ),
    new Recipe(
      2,
      'AnnAnn\'s Recipe',
      'This is a test.'
      ,'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272'
      ,[
        new Ingredient('Nyebe', 15),
        new Ingredient('Nyebe', 150),
      ]
    ),
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

  // getSelectedRecipe() {
  //   return this.selectedRecipe;
  // }

  addRecipe(id: number, name: string, description: string, imagePath: string) {
    this.recipes.push(new Recipe(id, name, description, imagePath,[]));
  }

  removeRecipe(index: number) {
    this.recipes.splice(index,1);
  }

  getRecipe(id: number) {
    return this.recipes.find(r => r.id === id);
  }
}
