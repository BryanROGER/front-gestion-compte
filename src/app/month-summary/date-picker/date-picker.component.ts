import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {DatePickerService} from "../../services/date-picker.service";
import {DateConverterService} from "../../services/date-converter.service";
import {months, years} from "../../enums/variable-enum";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
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

  formBuilder = inject(FormBuilder)
  dateConverterService = inject(DateConverterService)
  datePickerService = inject(DatePickerService)



  datePickerForm!: FormGroup;
  currentMonth!: string;
  currentYear!: string;

  initializeForm() {
    this.datePickerForm = this.formBuilder.group({
      month: [this.currentMonth, [Validators.required]],
      year: [this.currentYear, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }


  protected readonly years = years;
  protected readonly months = months;
}
