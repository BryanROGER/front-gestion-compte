import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../services/api-service/user.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user = new User()

  async ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          const idUser = params['id'];
          return this.userService.GetUserById(idUser);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.user = response.data;
        },
        error: (err: any) => {
          console.error('Error fetching user data:', err);
        }
      });
  }

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }


}
