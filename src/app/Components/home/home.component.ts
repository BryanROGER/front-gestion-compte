import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardHeader, MatCardModule} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/api-service/user.service";
import {HouseholdService} from "../../services/api-service/household.service";
import {User} from "../../../models/user";
import {Household} from "../../../models/household";



@Component({
  imports: [
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatCardModule,
  ],
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
              private userService: UserService,
              private householdService: HouseholdService,
              private router: Router) {

  }

  user: User|null = null;

  ngOnInit() {
    const JWT_TOKEN = localStorage.getItem("JWT_TOKEN")
    let tokenDecode = this.authService.getDecodedToken(JWT_TOKEN!)
    this.userService.getUserByEmail(tokenDecode.sub).subscribe(
      {
        next: (response:any) => {
          this.user = response.data
        }
    }
    )
    this.householdService.setHousehold(new Household())

  }


  goToHousehold(household: Household) {
    this.householdService.setHousehold(household)
    const encodedName = encodeURIComponent(household.name);  // Encodage du nom
    this.router.navigate(["/foyer/"+encodedName]);
  }
}
