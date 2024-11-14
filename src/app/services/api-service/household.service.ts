import { Injectable } from '@angular/core';
import {Household} from "../../../models/household";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HouseholdService {

  constructor() { }


  private householdSubject = new BehaviorSubject<Household | null>(null);
  household$ = this.householdSubject.asObservable();

  setHousehold(household: Household|null) {
    this.householdSubject.next(household);
  }

  getHousehold(): Observable<Household> {
    return this.household$.pipe(
      map(household => {
        if (household) {
          return household;
        } else {
          // Si le household est null, retourner une valeur par défaut ou lever une exception
          throw new Error("Household not available");
        }
      })
    );
  }
}
