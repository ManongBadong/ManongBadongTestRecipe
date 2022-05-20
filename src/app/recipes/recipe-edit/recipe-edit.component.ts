import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../model/recipe.model';
import { GenericValidators } from '../../Validators/generic-validators';
import { Ingredient } from '../../model/ingredient.model';
import { RecipeService } from '../../service/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit , OnDestroy{

  editMode: boolean = false;
  recipeFormGroup!: FormGroup;
  
  constructor(private router: Router,private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        
        this.editMode = param['id'] != null;

        if (this.editMode) {
          let recipe = this.recipeService.getRecipe(+param['id'])!;
          let tmpIng = new FormArray([]);

          recipe.ingredients.map((i: Ingredient) => {
            let ingredientGroup = new FormGroup({
              name: new FormControl(i.name, Validators.required),
              amount: new FormControl(i.amount, [Validators.required, GenericValidators.isNotNumber, Validators.pattern(/[1-9]+[0-9]*$/)])
            });
            tmpIng.push(ingredientGroup);
          })
  
          this.recipeFormGroup = new FormGroup({
            id: new FormControl(recipe.id, Validators.required),
            name: new FormControl(recipe.name, Validators.required),
            description: new FormControl(recipe.description, Validators.required),
            imagePath: new FormControl(recipe.imagePath, Validators.required),
            ingredients: tmpIng
          });
        } else {
          this.recipeFormGroup = new FormGroup({
            id: new FormControl(-1, Validators.required),
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            imagePath: new FormControl(null, Validators.required),
            ingredients: new FormArray([])
          });
        }
        

      }
    );
  }

  ngOnDestroy(): void {
    
  }

  /* Getters */
  get IngredientArrayControls() {
    return (<FormArray>this.recipeFormGroup.get('ingredients')).controls;
  }

  /* Methods */
  onSubmit() {
    let recipeId: number = this.recipeFormGroup.value.id;

    if (this.editMode)
      this.recipeService.updateRecipe(<Recipe>this.recipeFormGroup.value);
    else
      recipeId = this.recipeService.addRecipe(<Recipe>this.recipeFormGroup.value);
    
    this.router.navigate(['../',recipeId], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    let ingredientGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, GenericValidators.isNotNumber, Validators.pattern(/[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeFormGroup.get('ingredients')).push(ingredientGroup);
  }

  deleteIngredients(id: number) {
    (<FormArray>this.recipeFormGroup.get('ingredients')).removeAt(id);
  }
}
