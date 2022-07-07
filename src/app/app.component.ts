import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // loadedFeature: string = 'recipe';
  // onNavigate(navigateTo: string) {
  //   this.loadedFeature = navigateTo;
  // }

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
