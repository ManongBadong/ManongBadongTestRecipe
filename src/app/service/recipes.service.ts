import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // selectedRecipe = new Subject<Recipe>();

  recipeChanged = new Subject<Recipe[]>();

  /* private recipes: Recipe[] = [
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
        new Ingredient('Nyebe1', 15),
        new Ingredient('Nyebe2', 150),
      ]
    ),
  ]; */
  private recipes: Recipe[];

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    if (this.recipes) 
      return this.recipes.slice();
    
    return [];
  }

  generateId(): number {
    return this.recipes.length + 1;
  }

  // getSelectedRecipe() {
  //   return this.selectedRecipe;
  // }

  addRecipe(recipe: Recipe): number {
    let generateId: number = this.generateId()
    this.recipes.push(new Recipe(this.generateId(), recipe.name, recipe.description, recipe.imagePath, recipe.ingredients));
    this.recipeChanged.next(this.recipes.slice());

    return generateId;
  }

  getRecipe(id: number) {
    return this.recipes.find(r => r.id === id);
  }


  updateRecipe(updatedRecipe: Recipe) {
    const ri = this.recipes.findIndex(r => r.id === updatedRecipe.id)
    this.recipes[ri] = updatedRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  removeRecipe(index: number) {
    const ri = this.recipes.findIndex(r => r.id === index)
    this.recipes.splice(ri,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
