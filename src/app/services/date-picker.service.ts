import {Injectable} from '@angular/core';
import {SpendService} from "./api-service/spend.service";
import {Spend} from "../../models/Spend";
import {BehaviorSubject} from "rxjs";
import {Income} from "../../models/Income";
import {IncomeService} from "./api-service/income.service";

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  private spendsSubject = new BehaviorSubject<Spend[]>([]);
  spends$ = this.spendsSubject.asObservable();

  private incomesSubject = new BehaviorSubject<Income[]>([]);
  incomes$ = this.incomesSubject.asObservable();

  private _selectedMonth !: string; // Stocker le mois sélectionné
  private _selectedYear !: string; // Stocker l'année sélectionnée

  constructor(private spendService: SpendService, private incomeService: IncomeService) {}

  // Méthode pour changer la date
  changeDate(month: string, year: string) {
    this._selectedMonth = month;
    this._selectedYear = year;
    this.loadSpendOfMonth(month, year);
    this.loadIncomesOfMonth(month, year)
  }

  get selectedMonth(): string {
    return this._selectedMonth;
  }

  get selectedYear(): string {
    return this._selectedYear;
  }

  updateSpends(){
    this.spendService.getSpendInMonth(this._selectedMonth, this._selectedYear).subscribe({
      next: (response: any) => {
        this.spendsSubject.next(response.data);
      }
    });
  }

  private loadSpendOfMonth(month: string, year: string) {
    this.spendService.getSpendInMonth(month, year).subscribe({
      next: (response: any) => {
        this.spendsSubject.next(response.data);
      }
    });
  }


  updateIncomes(){
    this.incomeService.getIncomeInMonth(this._selectedMonth, this._selectedYear).subscribe({
      next: (response: any) => {
        this.incomesSubject.next(response.data);
      }
    });
  }

  private loadIncomesOfMonth(month: string, year: string) {
    this.incomeService.getIncomeInMonth(month, year).subscribe({
      next: (response: any) => {
        this.incomesSubject.next(response.data);
      }
    });
  }
}
