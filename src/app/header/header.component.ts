import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    @Output('featureSelected') featureSelected: EventEmitter<string> = new EventEmitter<string>();

    collapsed = false;


    navigateToRecipe() {
        this.featureSelected.emit('recipe');
    }

    navigateToShoppingList() {
        this.featureSelected.emit('shopping-list');
    }
}