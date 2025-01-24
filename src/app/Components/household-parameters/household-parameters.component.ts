import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {Household} from "../../../models/household";
import {HouseholdService} from "../../services/api-service/household.service";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/api-service/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-household-parameters',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    RouterLink
  ],
  templateUrl: './household-parameters.component.html',
  styleUrl: './household-parameters.component.scss'
})
export class HouseholdParametersComponent implements OnInit {

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
        next: (response: any) => {
          response.data.forEach((user: User) => {
            this.users.push(user);
          });
        },
      }
    )
    this.householdService.getHousehold().subscribe(house => {
      this.household = house
    })
  }

  householdService = inject(HouseholdService);
  router = inject(Router);
  userService = inject(UserService);

  users: User[] = [];
  household!: Household;

}
