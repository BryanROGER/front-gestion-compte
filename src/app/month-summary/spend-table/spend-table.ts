import {Component, computed, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {SpendService} from "../../services/api-service/spend.service";
import {Spend} from "../../../models/Spend";
import {FirstLetterPipe} from "../../pipes/first-letter.pipe";
import {NgStyle} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TagService} from "../../services/api-service/tag.service";
import {Tag} from "../../../models/Tag";
import {User} from '../../../models/user';
import {UserService} from "../../services/api-service/user.service";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddSpendComponent} from "../../popup/add-spend/add-spend.component";
import {DatePickerService} from "../../services/date-picker.service";
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {ResponseApi} from "../../../models/response-api";


@Component({
  selector: 'app-spend-table',
  standalone: true,
  imports: [
    FirstLetterPipe,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
    MatButton,
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
  }

  constructor() {
    effect(() => {
      const {month, year} = this.datePickerService.getSelectedDate()();
      if (month && year) {
        this.spendService.getSpendsByMonth(month, year).subscribe({
          next: (response: ResponseApi) => {
            this.spendsList.set(response.data);
          }
        });
      }
    });
  }

  spendService = inject(SpendService);
  datePickerService = inject(DatePickerService);
  tagService = inject(TagService);
  userService = inject(UserService);
  dialog = inject(MatDialog);
  spends = computed(() => {
    return [...this.spendsList()].sort((a, b) => a.order - b.order);
  });
  tags: Tag[] = []
  users: User[] = []
  private spendsList = signal<Spend[]>([]);


  onEdit(spend: Spend) {
    this.openSpendInPopup(spend)
  }

  onDelete(spend: Spend) {
    this.spendService.deleteSpend(spend.id.toString()).subscribe(() => {
      this.updateSpends()
    })
  }

  private updateSpends() {
    this.datePickerService.changeDate(
      this.datePickerService.getSelectedDate()().month,
      this.datePickerService.getSelectedDate()().year
    );
  }

  openSpendInPopup(spend: Spend | null) {
    const dialogRef = this.dialog.open(AddSpendComponent,
      {data: {spend: spend}})

    dialogRef.afterClosed().subscribe(() => {
      this.updateSpends()
    })
  }
}
