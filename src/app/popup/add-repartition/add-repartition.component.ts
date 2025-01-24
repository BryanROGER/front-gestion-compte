import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../services/api-service/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-add-repartition',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatSlider,
    MatSliderThumb,
    MatButton
  ],
  templateUrl: './add-repartition.component.html',
  styleUrl: './add-repartition.component.css'
})
export class AddRepartitionComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  userService = inject(UserService);

  startDatePickerForm !: FormGroup
  users: User[] = []
  months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];
  years = [
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030"
  ];

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        response.data.forEach((user: User) => {
          this.users.push(user)
        })
      }
    })
    this.initializeForm()
  }


  initializeForm() {

    this.startDatePickerForm = this.formBuilder.group({
      month: ["", [Validators.required]],
      year: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }


}
