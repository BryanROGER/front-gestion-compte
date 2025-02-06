import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router : Router) {
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('bryan@gmail.com', [Validators.required]),
    password: new FormControl('Azertyuiop10&10', [Validators.required]),
  });


  submit() {
    if (this.loginForm.invalid) {
      console.log("login component / fomulaire invalide")
    }

    this.authService.login({
      email: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }).subscribe({
      next: (response: any) => {
        console.log("response ",response)
        console.log(response.status)
        if (response.status == 403) {
          console.log("login component / mauvais identifiants")
          return
        }
        this.router.navigate(['/'])

      }
    })

  }

}
