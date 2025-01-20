import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./Components/header/header.component";
import {FooterComponent} from "./Components/footer/footer.component";
import {MonthSummary} from "./month-summary/month-summary";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MonthSummary],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-gestion-compte';


  // authService = inject(AuthService);
  // constructor() {
  //   this.authService.login({
  //     email: "bryan@gmail.com",
  //     password: "test"
  //   }).subscribe(auth => {
  //     console.log(auth)})
  // }
}
