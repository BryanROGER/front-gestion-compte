import { Routes } from '@angular/router';
import {ProfileComponent} from "./user/profile/profile.component";
import {MonthSummary} from "./month-summary/month-summary";
import {authGuard} from "./auth.guard";
import {HomeComponent} from "./Components/home/home.component";
import {HouseholdParametersComponent} from "./Components/household-parameters/household-parameters.component";
import {LoginComponent} from "./Components/login/login.component";


export const routes: Routes = [
  {path: "", component:HomeComponent, canActivate: [authGuard]},
  // {path: "chat", component:HomeComponent,},
  {path: "foyer/:name", component:MonthSummary},
  {path: "user/:id", component:ProfileComponent},
  {path: "mon-profil/:email", component:ProfileComponent},
  {path: "foyer/parametre/:name", component:HouseholdParametersComponent},
  {path: "login", component:LoginComponent},
  {path: '**', redirectTo:"/login"},
];


