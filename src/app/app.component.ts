import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MonthSummary} from "./month-summary/month-summary";
import {AuthService} from "./services/api-service/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MonthSummary],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-gestion-compte';


  authService = inject(AuthService);
  constructor() {
    this.authService.login({
      email: "bryan@gmail.com",
      password: "test"
    })
  }
}
