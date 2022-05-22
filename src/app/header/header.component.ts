import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../service/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    constructor(private dataService: DataStorageService) {}

    @Output('featureSelected') featureSelected: EventEmitter<string> = new EventEmitter<string>();

    collapsed = false;

    navigateToRecipe() {
        this.featureSelected.emit('recipe');
    }

    navigateToShoppingList() {
        this.featureSelected.emit('shopping-list');
    }

    saveRecipes() {
        console.log('Badong!');
        this.dataService.storeRecipes();
    }

    fetchData() {
        this.dataService.fetchRecipes().subscribe(response => {
            console.log(response);
        })
    }
}