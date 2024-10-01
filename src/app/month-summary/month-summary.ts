import {
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {SpendTable} from "./spend-table/spend-table";
import {MatTab, MatTabContent, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {IncomeTableComponent} from "./income-table/income-table.component";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-recapitulatif-du-mois',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    KeyValuePipe,
    SpendTable,
    MatTabGroup,
    MatTab,
    IncomeTableComponent,
    MatTabContent,
    MatTabsModule,
    DatePickerComponent,
    FormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './month-summary.html',
  styleUrl: './month-summary.scss',
  encapsulation: ViewEncapsulation.None,

})
export class MonthSummary {


}
