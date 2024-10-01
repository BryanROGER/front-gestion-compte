import { Routes } from '@angular/router';
import {ProfileComponent} from "./user/profile/profile.component";
import {MonthSummary} from "./month-summary/month-summary";

export const routes: Routes = [
  {path: "", component:MonthSummary},
  {path: "user/:id", component:ProfileComponent},
  {path: "mon-profil/:id", component:ProfileComponent},
];
