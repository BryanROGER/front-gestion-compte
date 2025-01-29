import {inject, Injectable, signal} from '@angular/core';
import {SpendService} from "./api-service/spend.service";
import {Income} from "../../models/Income";
import {IncomeService} from "./api-service/income.service";

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  private _selectedMonth !: string;
  private _selectedYear !: string;

  spendService: SpendService = inject(SpendService);
  incomeService: IncomeService = inject(IncomeService);


  changeDate(month: string, year: string) {
    this._selectedMonth = month;
    this._selectedYear = year;
    this.loadSpendsOfMonth(month, year);
    this.loadIncomesOfMonth(month, year);
  }

  get selectedMonth(): string {
    return this._selectedMonth;
  }

  get selectedYear(): string {
    return this._selectedYear;
  }


  private loadSpendsOfMonth(month: string, year: string) {
    this.spendService.getSpendsByMonth(month, year)
  }

  private loadIncomesOfMonth(month: string, year: string) {
    this.incomeService.getIncomesInMonth(month, year)
  }
}
