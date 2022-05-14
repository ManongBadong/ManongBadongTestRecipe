import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature: string = 'recipe';

  onNavigate(navigateTo: string) {
    this.loadedFeature = navigateTo;
  }
}
