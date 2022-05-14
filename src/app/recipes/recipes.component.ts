import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /* this.recipeService.selectedRecipe.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    ); */
  }

}
