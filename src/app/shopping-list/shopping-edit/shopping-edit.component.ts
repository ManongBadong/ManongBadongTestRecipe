import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../model/ingredient.model';
import { IngredientService } from '../../service/ingredients.service';
import { GenericValidators } from '../../Validators/generic-validators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // @ViewChild('nameInput') nameInput!: ElementRef;
  // @ViewChild('amountInput') amountInput!: ElementRef;

  shoppingListFormGroup!: FormGroup;

  // @Output() addedIngredient: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  
  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.shoppingListFormGroup = new FormGroup({
      name: new FormControl('test', [Validators.required]),
      amount: new FormControl('24', [Validators.required, GenericValidators.isNotNumber])
    });


  }

  addIngredient() {
    // const ingName = this.nameInput.nativeElement.value;
    // const ingAmount = this.amountInput.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    // this.ingredientService.addIngredient(newIngredient);
    const value = this.shoppingListFormGroup.value
    const newIngredient = new Ingredient(value.name, value.amount);
    this.ingredientService.addIngredient(newIngredient);
  }
}
