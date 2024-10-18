import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../services/api-service/user.service";
import {TagService} from "../../services/api-service/tag.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {User} from "../../../models/user";
import {Tag} from "../../../models/Tag";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Spend} from "../../../models/Spend";
import {SpendService} from "../../services/api-service/spend.service";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {DateConverterService} from "../../services/date-converter.service";
import {DatePickerService} from "../../services/date-picker.service";

@Component({
  selector: 'app-add-spend',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './add-spend.component.html',
  styleUrl: './add-spend.component.scss'
})
export class AddSpendComponent implements OnInit {
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
              private spendService: SpendService,
              public dialogRef: MatDialogRef<AddSpendComponent>,
              private formBuilder: FormBuilder,
              private dateConverterService: DateConverterService,
              private datePickerService: DatePickerService,
              @Inject(MAT_DIALOG_DATA) public data: { spend: Spend | null }) {
    this.newSpend = data.spend ?? new Spend()
    this.textButton = this.newSpend.id ? "Mettre à jour dépense" : "Ajouter nouvelle dépense"
    if (this.newSpend.recipients){
      this.newSpend.recipients.forEach(user =>{
        this.defaultRecipients.push(user.email)
      })
    }
    console.log(this.defaultRecipients)
    this.initializeForm()

  }

  users : User[] = []
  tags : Tag[] = []
  textButton : string;
  newSpend = new Spend()
  formAddSpend!:FormGroup;
  defaultRecipients: string[] = [];




  onFormSubmit() {
    console.log(this.formAddSpend.value)

    if(this.formAddSpend.valid){

      let payerFind = this.users.find(u=> u.email === this.formAddSpend.getRawValue().payerId) || new User()
      let tagFound = this.tags.find(t=> t.id === this.formAddSpend.getRawValue().tagId) || new Tag()
      let recipientsFound = this.users.filter(u=> this.formAddSpend.getRawValue().recipientsIds.includes(u.email))

      this.newSpend.name = this.formAddSpend.value.name!
      this.newSpend.amount = this.formAddSpend.value.amount!
      this.newSpend.tag = tagFound
      this.newSpend.payer = payerFind
      this.newSpend.recipients = recipientsFound
      this.newSpend.date = this.dateConverterService.getDateForSave(this.datePickerService.selectedMonth, this.datePickerService.selectedYear)
    }

    this.spendService.saveSpend(this.newSpend).subscribe({
      next: (res) => {
        console.log(res)
        this.dialogRef.close()
      }
    })
  }

  private initializeForm() {
    this.formAddSpend = this.formBuilder.group({
      name: [this.newSpend.name],
      amount: [this.newSpend.amount],
      payerId : [this.newSpend.payer ?  this.newSpend.payer.email : ""],
      recipientsIds : [this.defaultRecipients],
      tagId : [this.newSpend.tag ? this.newSpend.tag.id : "" ]
    })
  }
}
