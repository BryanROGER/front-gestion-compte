import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../services/api-service/auth.service";
import {UserService} from "../services/api-service/user.service";
import {User} from "../../models/user";
import { Router, RouterLink} from "@angular/router";
import {HouseholdService} from "../services/api-service/household.service";
import {Household} from "../../models/household";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
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
    this.householdService.setHousehold(null)

  }


  goToHousehold(household: Household) {
    this.householdService.setHousehold(household)
    const encodedName = encodeURIComponent(household.name);  // Encodage du nom
    this.router.navigate([encodedName]);
  }
}
