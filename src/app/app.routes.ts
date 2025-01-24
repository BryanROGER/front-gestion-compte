import { Routes } from '@angular/router';
import {ProfileComponent} from "./user/profile/profile.component";
import {MonthSummary} from "./month-summary/month-summary";
import {authGuard} from "./auth.guard";
import {HomeComponent} from "./Components/home/home.component";
import {HouseholdParametersComponent} from "./Components/household-parameters/household-parameters.component";
import {LoginComponent} from "./Components/login/login.component";
import {TagsSettigsComponent} from "./Components/household-parameters/tags-settigs/tags-settigs.component";
import {
  DistributionSettingsComponent
} from "./Components/household-parameters/distribution-settings/distribution-settings.component";
import {repartitionSettingComponent} from "./Components/household-parameters/repartition-setting/repartition-setting.component";
import {WalletSettingComponent} from "./Components/household-parameters/wallet-setting/wallet-setting.component";


export const routes: Routes = [
  {path: "", component:HomeComponent, canActivate: [authGuard]},
  // {path: "chat", component:HomeComponent,},
  {path: "foyer/:name", component:MonthSummary},
  {path: "user/:id", component:ProfileComponent},
  {path: "mon-profil/:email", component:ProfileComponent},
  {path: "foyer/:name/parametres", component:HouseholdParametersComponent},
  {path: "foyer/:name/parametres/mes-libelles", component:TagsSettigsComponent},
  {path: "foyer/:name/parametres/mes-repartitions", component:repartitionSettingComponent},
  {path: "foyer/:name/parametres/ma-balance", component:DistributionSettingsComponent},
  {path: "foyer/:name/parametres/mon-portefeuille/:user", component:WalletSettingComponent},
  {path: "login", component:LoginComponent},
  {path: '**', redirectTo:"/login"},
];


