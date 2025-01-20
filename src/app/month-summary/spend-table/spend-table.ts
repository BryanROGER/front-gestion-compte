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
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";


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
    NumberFormatterPipe,
    MatExpansionModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatIcon
  ],
  templateUrl: './spend-table.html',
  styleUrl: './spend-table.scss'
})
export class SpendTable implements OnInit {

  spends: Spend[] = []
  tags: Tag[] = []
  users: User[] = []

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
        this.spends = [...spends].sort((a, b) => a.order - b.order);
      }
    });
  }

  constructor(private spendService: SpendService,
              private tagService: TagService,
              private userService: UserService,
              private dialog: MatDialog,
              private datePickerService: DatePickerService) {
  }

  protected readonly first = first;

  async onEdit(spend: Spend) {
    console.log("dans le table")
    console.log(spend)
    this.openSpendInPopup(spend)
  }

  onDelete(spend : Spend){
    this.spendService.deleteSpend(spend.id.toString()).subscribe(() => {
        this.updateSpends()
    })
  }

  private updateSpends(){
    this.datePickerService.updateSpends()
  }

  sortedSpends(){
    this.spends.forEach(spend => console.log(spend.order))
    return this.spends.sort((a, b) => a.order - b.order)
  }

  protected readonly User = User;


  openSpendInPopup(spend :Spend|null) {
    const dialogRef = this.dialog.open(AddSpendComponent,
      {data: {spend:spend}})

    dialogRef.afterClosed().subscribe(()=>{
      this.updateSpends()
    })
  }
}
