import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../model/ingredient.model';
import { IngredientService } from '../../service/ingredients.service';
import { GenericValidators } from '../../Validators/generic-validators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInput!: ElementRef;
  // @ViewChild('amountInput') amountInput!: ElementRef;

  shoppingListFormGroup!: FormGroup;
  ingredientSub!: Subscription;
  editMode: boolean = false;
  ingredientOnEdit: number = -1;

  // @Output() addedIngredient: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.shoppingListFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        GenericValidators.isNotNumber,
      ]),
    });

    this.ingredientSub = this.ingredientService.startedEditing.subscribe(
      (i: number) => {
        const ing = this.ingredientService.getIngredient(i);
        this.shoppingListFormGroup = new FormGroup({
          name: new FormControl(ing.name, [Validators.required]),
          amount: new FormControl(ing.amount, [
            Validators.required,
            GenericValidators.isNotNumber,
          ]),
        });
        this.ingredientOnEdit = i;
        this.editMode = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }

  addIngredient() {
    // const ingName = this.nameInput.nativeElement.value;
    // const ingAmount = this.amountInput.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    // this.ingredientService.addIngredient(newIngredient);
    const value = this.shoppingListFormGroup.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.ingredientService.updateIngredient(
        this.ingredientOnEdit,
        newIngredient
      );
      this.editMode = false;
    } else {
      this.ingredientService.addIngredient(newIngredient);
    }
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.shoppingListFormGroup.reset();
  }

  deleteIngredient() {
    this.ingredientService.removeIngredient(this.ingredientOnEdit);
    this.resetForm();
  }
}
