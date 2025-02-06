import {Component, inject, Inject, OnInit} from '@angular/core';
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
import {MatDatepicker} from "@angular/material/datepicker";
import {Spend} from "../../../models/Spend";

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
        var allTags = response.data;
        if (allTags instanceof Array) {
          this.tags = allTags.filter(tag => tag.income === true);
        }      }
    })

    this.newIncome = this.data.income ?? new Income()
    this.textTitle = this.newIncome.id ? "Modifier dépense" : "Ajouter dépense"
    this.textButton = this.newIncome.id ? "Mettre à jour revenu" : "Ajouter nouveau revenu"
    this.initializeForm()
  }

  userService = inject(UserService);
  tagService = inject(TagService);
  incomeService = inject(IncomeService);
  dialogRef = inject(MatDialogRef<AddIncomeComponent>);
  formBuilder = inject(FormBuilder);
  datePickerService = inject(DatePickerService);
  dateConverterService = inject(DateConverterService);
  public data = inject(MAT_DIALOG_DATA) as { income: Income | null };


  users: User[] = []
  tags: Tag[] = []
  newIncome!: Income;
  formAddIncome!: FormGroup;
  textButton!: string;
  textTitle!: string;


  initializeForm() {
    this.formAddIncome = this.formBuilder.group({
      amount: [this.newIncome.amount != 0 ? this.newIncome.amount : "", [Validators.required, Validators.min(0)]],
      userId: [this.newIncome.user ? this.newIncome.user.email : '', Validators.required], // Utiliser l'ID pour lier
      tagId: [this.newIncome.tag ? this.newIncome.tag.id : '', Validators.required],    // Utiliser l'ID pour lier
      date: [this.newIncome.date]
    });
  }


  onFormSubmit() {
    console.log("in onFormSubmit")
    console.log(this.formAddIncome.value)
    console.log(this.users.find(u => u.email === this.formAddIncome.value.user))

    let userFind = this.users.find(u => u.email === this.formAddIncome.value.userId)
    let tagFound = this.tags.find(u => u.id === this.formAddIncome.getRawValue().tagId)
    if (userFind != undefined && tagFound != undefined) {

      this.newIncome.amount = this.formAddIncome.value.amount
      this.newIncome.user = userFind
      this.newIncome.tag = tagFound
      const {month, year} = this.datePickerService.getSelectedDate()();
      this.newIncome.date = this.dateConverterService.getDateForSave(month, year)

    }

    console.log(this.newIncome)

    if (this.newIncome.id) {
      this.incomeService.saveIncome(this.newIncome, this.newIncome.id).subscribe({
        next: (res) => {
          console.log(res)
          this.dialogRef.close()
        }
      })
      return
    }

    this.incomeService.createIncome(this.newIncome).subscribe({
      next: (res) => {
        console.log(res)
        this.dialogRef.close()
      }
    })

  }
}
