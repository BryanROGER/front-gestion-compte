import {inject, Injectable, OnInit, signal} from '@angular/core';
import {SpendService} from "./api-service/spend.service";
import {Income} from "../../models/Income";
import {IncomeService} from "./api-service/income.service";

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  private _selectedDate = signal<{month : string, year : string}>({month : "", year : ""});


  spendService: SpendService = inject(SpendService);
  incomeService: IncomeService = inject(IncomeService);


  changeDate(month: string, year: string) {
    this._selectedDate.set({ month, year });
  }

  getSelectedDate() {
    return this._selectedDate.asReadonly();
  }

}
