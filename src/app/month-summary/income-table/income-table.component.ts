import {Component, computed, OnInit} from '@angular/core';
import {IncomeService} from "../../services/api-service/income.service";
import {Income} from "../../../models/Income";
import {NgStyle} from "@angular/common";
import {FirstLetterPipe} from "../../pipes/first-letter.pipe";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {User} from "../../../models/user";
import {UserService} from "../../services/api-service/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Tag} from "../../../models/Tag";
import {TagService} from "../../services/api-service/tag.service";
import {MatButton} from "@angular/material/button";
import {AddIncomeComponent} from "../../popup/add-income/add-income.component";
import {MatDialog} from "@angular/material/dialog";
import {NumberFormatterPipe} from "../../pipes/number-formatter.pipe";
import {DatePickerService} from "../../services/date-picker.service";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-income-table',
  standalone: true,
  imports: [
    NgStyle,
    FirstLetterPipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    ReactiveFormsModule,
    FormsModule,
    MatButton,
    NumberFormatterPipe,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon
  ],
  templateUrl: './income-table.component.html',
  styleUrl: './income-table.component.scss'
})
export class IncomeTableComponent implements OnInit {

  constructor(private incomeService: IncomeService,
              private userService: UserService,
              private tagService: TagService,
              private dialog: MatDialog,
              private datePickerService: DatePickerService) {
  }

  ngOnInit() {
    this.datePickerService.incomes$.subscribe({
      next: (incomes: Income[]) => {
        this.incomes = [...incomes].sort((a, b) => a.order - b.order)
      }
    });
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

  incomes: Income[] = []
  users: User[] = []
  tags: Tag[] = []


  onEdit(income: Income) {
    this.addData(income)
    // this.idIncomeModified = income.id
  }

  onDelete(income: Income) {
    this.incomeService.deleteSpend(income.id).subscribe(() => {
      this.updateIncomes()
    })
  }

  private updateIncomes() {
    this.datePickerService.updateIncomes()
  }

  addData(income: Income | null) {
    const dialogRef = this.dialog.open(AddIncomeComponent, {
      data: {income: income}
    })

    dialogRef.afterClosed().subscribe(() => {
      this.updateIncomes()
    })
  }
}
