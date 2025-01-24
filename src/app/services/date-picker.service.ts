import {inject, Injectable, signal} from '@angular/core';
import {SpendService} from "./api-service/spend.service";
import {Spend} from "../../models/Spend";
import {Income} from "../../models/Income";
import {IncomeService} from "./api-service/income.service";

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {
  // Création des signals
  private spends = signal<Spend[]>([]);
  private incomes = signal<Income[]>([]);

  private _selectedMonth !: string;
  private _selectedYear !: string;

  spendService : SpendService = inject(SpendService);
  incomeService : IncomeService = inject(IncomeService);

  // Getters pour accéder aux valeurs des signals
  getSpends() {
    return this.spends.asReadonly();
  }

  getIncomes() {
    return this.incomes.asReadonly();
  }

  changeDate(month: string, year: string) {
    this._selectedMonth = month;
    this._selectedYear = year;
    this.loadSpendOfMonth(month, year);
    this.loadIncomesOfMonth(month, year);
  }

  get selectedMonth(): string {
    return this._selectedMonth;
  }

  get selectedYear(): string {
    return this._selectedYear;
  }

  updateSpends() {
    this.spendService.getSpendInMonth(this._selectedMonth, this._selectedYear).subscribe({
      next: (response: any) => {
        console.log("dans le date picker service")
        console.log(response.data);
        this.spends.set(response.data);
      }
    });
  }

  private loadSpendOfMonth(month: string, year: string) {
    this.spendService.getSpendInMonth(month, year).subscribe({
      next: (response: any) => {
        this.spends.set(response.data);
      }
    });
  }

  updateIncomes() {
    this.incomeService.getIncomeInMonth(this._selectedMonth, this._selectedYear).subscribe({
      next: (response: any) => {
        this.incomes.set(response.data);
      }
    });
  }

  private loadIncomesOfMonth(month: string, year: string) {
    this.incomeService.getIncomeInMonth(month, year).subscribe({
      next: (response: any) => {
        this.incomes.set(response.data);
      }
    });
  }
}
