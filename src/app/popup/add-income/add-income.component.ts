import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Income} from "../../../models/Income";
import {User} from "../../../models/user";
import {Tag} from "../../../models/Tag";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {UserService} from "../../services/api-service/user.service";
import {TagService} from "../../services/api-service/tag.service";
import {MatButton} from "@angular/material/button";
import {IncomeService} from "../../services/api-service/income.service";
import {DatePickerService} from "../../services/date-picker.service";
import {DateConverterService} from "../../services/date-converter.service";

@Component({
  selector: 'app-add-income',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel,
    MatButton
  ],
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.scss'
})
export class AddIncomeComponent implements OnInit {

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
        next: (response: any) => {
          this.users = response.data;
        }
      }
    )
    this.tagService.getAllTags().subscribe({
      next: (response: any) => {
        this.tags = response.data
      }
    })
  }

  constructor(private userService: UserService,
              private tagService: TagService,
              private incomeService: IncomeService,
              public dialogRef: MatDialogRef<AddIncomeComponent>,
              private formBuilder: FormBuilder,
              private datePickerService: DatePickerService,
              private dateConverterService: DateConverterService,
              @Inject(MAT_DIALOG_DATA) public data: { income: Income | null }) {

    this.newIncome = data.income ?? new Income()
    this.textButton = this.newIncome.id ? "Mettre à jour revenu" : "Ajouter nouveau revenu"
    this.initializeForm()
  }

  users: User[] = []
  tags: Tag[] = []
  newIncome;
  formAddIncome!: FormGroup;
  textButton :string;

  initializeForm() {
    this.formAddIncome = this.formBuilder.group({
      amount: [this.newIncome.amount, [Validators.required, Validators.min(0)]],
      userId: [this.newIncome.user ? this.newIncome.user.id : '', Validators.required], // Utiliser l'ID pour lier
      tagId: [this.newIncome.tag ? this.newIncome.tag.id : '', Validators.required],    // Utiliser l'ID pour lier
      date: [this.newIncome.date]
    });
  }


  onFormSubmit() {
    console.log("in onFormSubmit")
    console.log(this.formAddIncome.value)
    console.log(this.users.find(u => u.id === this.formAddIncome.value.user))

    let userFind = this.users.find(u => u.id === this.formAddIncome.value.userId)
    let tagFound = this.tags.find(u => u.id === this.formAddIncome.getRawValue().tagId)
    if (userFind != undefined && tagFound != undefined) {

      this.newIncome.amount = this.formAddIncome.value.amount
      this.newIncome.user = userFind
      this.newIncome.tag = tagFound
      this.newIncome.date = this.dateConverterService.getDateForSave(this.datePickerService.selectedMonth, this.datePickerService.selectedYear)
    }

    console.log(this.newIncome)

    this.incomeService.saveIncome(this.newIncome).subscribe({
      next: (res) => {
        console.log(res)
        this.dialogRef.close()
      }
    })

  }
}
