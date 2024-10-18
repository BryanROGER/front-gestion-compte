import {ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UserService} from "../services/api-service/user.service";
import {User} from "../../models/user";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {first} from "rxjs";
import {FirstLetterPipe} from "../pipes/first-letter.pipe";
import {NgForOf, NgStyle} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {Household} from "../../models/household";
import {HouseholdService} from "../services/api-service/household.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    FirstLetterPipe,
    NgForOf,
    NgStyle,
    MatMenu,
    MatIcon,
    MatMenuItem,
    MatMenuTrigger,
    MatIconButton,
    MatToolbar,
    MatButton,
    CdkConnectedOverlay,
    CdkOverlayOrigin
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  household: Household|null = null;

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        this.users = response.data
        this.cdr.detectChanges();
      }
    })
    this.householdService.household$.subscribe({
      next: (household: Household | null) => {
        this.household = household;
      }
    })
  }



  constructor(private userService: UserService, private cdr: ChangeDetectorRef, private householdService : HouseholdService) {
  }

  users!: User[];
  @ViewChildren(MatMenuTrigger) menuTriggers!: QueryList<MatMenuTrigger>;
  @ViewChildren('menu') menus!: QueryList<any>;

  openMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  closeMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  protected readonly first = first;
}
