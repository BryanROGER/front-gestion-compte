import {Component, OnInit} from '@angular/core';
import {SpendService} from "../../services/api-service/spend.service";
import {Spend} from "../../../models/Spend";
import {FirstLetterPipe} from "../../pipes/first-letter.pipe";
import {RouterLink} from "@angular/router";
import {first} from "rxjs";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TagService} from "../../services/api-service/tag.service";
import {Tag} from "../../../models/Tag";
import {User} from '../../../models/user';
import {UserService} from "../../services/api-service/user.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTextColumn
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddSpendComponent} from "../../popup/add-spend/add-spend.component";
import {NumberFormatterPipe} from "../../pipes/number-formatter.pipe";
import {DatePickerService} from "../../services/date-picker.service";


@Component({
  selector: 'app-tableau-recap-mois',
  standalone: true,
  imports: [
    FirstLetterPipe,
    RouterLink,
    NgForOf,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgStyle,
    MatTextColumn,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    NumberFormatterPipe
  ],
  templateUrl: './spend-table.html',
  styleUrl: './spend-table.scss'
})
export class SpendTable implements OnInit {

  spends: Spend[] = []
  definedColumns = ["Nom", "Montant", "Libellé", "Acheteur", "Bénéficiaires", "Actions"]
  tags: Tag[] = []
  users: User[] = []
  idSpendModified = ""
  recipientIds : string[] = []
  newSpend: Spend = new Spend()

  ngOnInit() {
    this.tagService.getAllTags().subscribe({
      next: (response: any) => {
        this.tags = response.data
      }
    })
    this.userService.getAllUsers().subscribe({
        next: (response: any) => {
          this.users = response.data;
        }
      }
    )
    this.datePickerService.spends$.subscribe({
      next: (spends: Spend[]) => {
        this.spends = spends;
      }
    });
  }



  constructor(private spendService: SpendService,
              private tagService: TagService,
              private userService: UserService,
              private dialog: MatDialog,
              private datePickerService: DatePickerService) {
  }

  protected readonly FirstLetterPipe = FirstLetterPipe;
  protected readonly first = first;

  async onEdit(spend: Spend) {
    // this.recipientIds = []
    // spend.recipients.forEach(recipient => {
    //   this.recipientIds.push(recipient.id);
    // });
    // this.idSpendModified = spend.id

    this.addData(spend)
  }

  onDelete(spend : Spend){
    this.spendService.deleteSpend(spend.id.toString()).subscribe(res => {
        this.updateSpends()
    })
  }

  save(spend: Spend) {
    spend.recipients = this.users.filter(user => this.recipientIds.includes(user.id))
    this.spendService.saveSpend(spend)
    this.idSpendModified = ""
    this.recipientIds = []
  }

  redo() {
    this.idSpendModified = ""
  }

  updateRecipientsSelection(user: User) {

    if (this.recipientIds.includes(user.id)) {
      this.recipientIds = this.recipientIds.filter(id => id !== user.id);
    } else {
      this.recipientIds.push(user.id);
    }
  }

  addNewSpend(){
    this.newSpend.recipients = this.users.filter(user => this.recipientIds.includes(user.id))
    this.spendService.saveSpend(this.newSpend).subscribe(response => this.updateSpends())
    this.newSpend = new Spend()
    this.recipientIds = []
  }


  private updateSpends(){
    this.datePickerService.updateSpends()
  }

  protected readonly User = User;
  protected readonly String = String;

  addData(spend :Spend|null) {
    const dialogRef = this.dialog.open(AddSpendComponent,
      {data: {spend:spend}})

    dialogRef.afterClosed().subscribe(()=>{
      this.updateSpends()
    })
  }
}
