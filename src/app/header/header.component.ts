import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/auth.service';
import { DataStorageService } from '../service/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  ngOnInit() {
    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user;
      },
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  constructor(
    private dataService: DataStorageService,
    private authService: AuthenticationService
  ) {}

  @Output('featureSelected') featureSelected: EventEmitter<string> =
    new EventEmitter<string>();

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
    this.dataService.fetchRecipes().subscribe();
  }
}
