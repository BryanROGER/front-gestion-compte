import {Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {TagService} from "../../services/api-service/tag.service";
import {Tag} from "../../../models/Tag";

@Component({
  selector: 'app-add-wallet',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatInput,
  ],
  templateUrl: './add-wallet.component.html',
  styleUrl: './add-wallet.component.scss'
})
export class AddWalletComponent implements OnInit {

  formBuilder = inject(FormBuilder)
  tagService = inject(TagService)

  walletForm!: FormGroup;
  startDatePickerForm!: FormGroup;
  endDatePickerForm!: FormGroup;
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
  tags : Tag[] = []


  ngOnInit() {
    this.createForm();

    this.tagService.getAllTags().subscribe({
      next: (response: any) => {
        this.tags = response.data
      }
    })
  }

  createForm() {
    // TODO : voir comment faire un seul form
    this.walletForm = this.formBuilder.group({
      budgets: this.formBuilder.array([])
    });

    this.startDatePickerForm = this.formBuilder.group({
      month: ["", [Validators.required]],
      year: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });

    this.endDatePickerForm = this.formBuilder.group({
      month: ["", [Validators.required]],
      year: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  get budgets() {
    return this.walletForm.get('budgets') as FormArray;
  }

  addBudget() {
    const budgetForm = this.formBuilder.group({
      amount: ["", Validators.required],
      Tag: ["", Validators.required],
    });

    this.budgets.push(budgetForm);
  }

  onSubmit() {
    if (this.walletForm.valid) {
      console.log(this.walletForm.value);
      // Implement your submission logic here
    }
  }
}

