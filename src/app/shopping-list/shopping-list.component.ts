import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../model/ingredient.model';
import { IngredientService } from '../service/ingredients.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private ingredientSub!: Subscription;
  
  ingredients: Ingredient[] = [];

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredients = this.ingredientService.getIngredients();
    this.ingredientSub = this.ingredientService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }
}
