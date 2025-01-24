import {ChangeDetectorRef, Component, inject, OnInit, QueryList, ViewChildren} from '@angular/core';

import {RouterLink, RouterLinkActive} from "@angular/router";
import {first} from "rxjs";

import {NgForOf, NgStyle} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {FirstLetterPipe} from "../../pipes/first-letter.pipe";
import {Household} from "../../../models/household";
import {UserService} from "../../services/api-service/user.service";
import {HouseholdService} from "../../services/api-service/household.service";
import {User} from "../../../models/user";
import {AuthService} from "../../services/auth/auth.service";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    FirstLetterPipe,
    NgStyle,
    MatIcon,
    MatToolbar,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  userService = inject(UserService);
  householdService = inject(HouseholdService);
  authService = inject(AuthService);

  household: Household = new Household();
  user: User | null = null;

  ngOnInit() {
    this.householdService.household$.subscribe({
      next: (household: Household) => {
        this.household = household;
      }
    })
    const JWT_TOKEN = localStorage.getItem("JWT_TOKEN")
    let tokenDecode = this.authService.getDecodedToken(JWT_TOKEN!)
    this.userService.getUserByEmail(tokenDecode.sub).subscribe(
      {
        next: (response: any) => {
          this.user = response.data
        }
      }
    )
  }

  protected readonly first = first;
}
