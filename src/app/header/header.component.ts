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


  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        this.users = response.data
        this.cdr.detectChanges();
      }
    })

  }

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {
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
