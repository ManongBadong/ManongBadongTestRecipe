import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../model/ingredient.model';
import { IngredientService } from '../service/ingredients.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private ingredientSub!: Subscription;
  
  // ingredients: Ingredient[] = []
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
      private ingredientService: IngredientService,
      private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.ingredientService.getIngredients();
    // this.ingredientSub = this.ingredientService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }

  onEditItem(i: number) {
    this.ingredientService.startedEditing.next(i);
  }
}
