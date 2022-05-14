import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../model/recipe.model';
import { IngredientService } from '../../service/ingredients.service';
import { RecipeService } from '../../service/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe;

  constructor(private ingredientService: IngredientService, 
      private recipeService: RecipeService, 
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.recipe = this.recipeService.getRecipe(+param['id'])!;
      }
    );
  }

  addIngredientsToShoppingList() {
    this.ingredientService.addIngredients(this.recipe.ingredients);
  }
  
  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.recipe.id, 'edit'], {relativeTo: this.route}); // or
  }
}
