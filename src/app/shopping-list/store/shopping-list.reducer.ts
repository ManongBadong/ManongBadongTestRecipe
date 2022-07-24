
import { Ingredient } from "../../model/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions"

const initialState = {
    ingredients: Ingredient[] = [
        new Ingredient('Apple',4),
        new Ingredient('Talong',10)
    ];
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            return state;
    }
}