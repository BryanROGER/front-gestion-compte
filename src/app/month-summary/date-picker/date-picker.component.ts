import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {DatePickerService} from "../../services/date-picker.service";
import {DateConverterService} from "../../services/date-converter.service";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements OnInit {

  ngOnInit() {
    const currentDate = new Date();
    this.currentMonth = this.dateConverterService.getMonthInString(currentDate.getMonth() + 1)
    this.currentYear = currentDate.getFullYear().toString()
    this.datePickerService.changeDate(this.currentMonth, this.currentYear)
    this.initializeForm()

    this.datePickerForm.valueChanges.subscribe(val => {
      if (this.datePickerForm.valid){
        this.datePickerService.changeDate(val.month, val.year)
      }
    });
  }

  constructor(private formBuilder: FormBuilder, private dateConverterService: DateConverterService, private datePickerService : DatePickerService) {
  }

  datePickerForm!: FormGroup;

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

  currentMonth!: string;
  currentYear!: string;

  initializeForm() {
    this.datePickerForm = this.formBuilder.group({
      month: [this.currentMonth, [Validators.required]],
      year: [this.currentYear, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }



}
