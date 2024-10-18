import { Routes } from '@angular/router';
import {ProfileComponent} from "./user/profile/profile.component";
import {MonthSummary} from "./month-summary/month-summary";
import {HomeComponent} from "./home/home.component";
import {HouseholdParametersComponent} from "./household-parameters/household-parameters.component";

export const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: ":name", component:MonthSummary},
  {path: "user/:id", component:ProfileComponent},
  {path: "mon-profil/:email", component:ProfileComponent},
  {path: "parametre-foyer/:name", component:HouseholdParametersComponent},
];
