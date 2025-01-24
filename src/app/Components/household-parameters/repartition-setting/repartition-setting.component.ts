import {Component, inject, OnInit} from '@angular/core';
import {RepartitionService} from "../../../services/api-service/repartition.service";
import {Repartition} from "../../../../models/Repartition";
import {HouseholdService} from "../../../services/api-service/household.service";
import {Household} from "../../../../models/household";
import {
  MatAccordion, MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
} from "@angular/material/expansion";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {FirstLetterPipe} from "../../../pipes/first-letter.pipe";
import {NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {AddWalletComponent} from "../../../popup/add-wallet/add-wallet.component";
import {MatDialog} from "@angular/material/dialog";
import {AddRepartitionComponent} from "../../../popup/add-repartition/add-repartition.component";

@Component({
  selector: 'app-repartition-setting',
  standalone: true,
  imports: [
    MatAccordion,

    MatExpansionPanelDescription,
    MatSlider,
    MatSliderThumb,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    FirstLetterPipe,
    NgStyle,
    MatIcon
  ],
  templateUrl: './repartition-setting.component.html',
  styleUrl: './repartition-setting.component.scss'
})
export class repartitionSettingComponent implements OnInit {

  repartitionService = inject(RepartitionService);
  householdService = inject(HouseholdService)
  dialog = inject(MatDialog);

  repartitions : Repartition[] = []
  household !: Household ;


  ngOnInit() {
    this.householdService.getHousehold().subscribe(house => {
      this.household = house
    })
    this.repartitionService.getRepartitions(this.household).subscribe({
      next: (response:any) => {
        // response.data.forEach((repartition:Repartition) => {
        //   this.repartitions.push(repartition)
        // })
        this.repartitions = response.data;
        this.sortRepartitionsByDate()
      }
    })

  }

  sortRepartitionsByDate() {
    this.repartitions.sort((a, b) => {
      const [monthA, yearA] = a.startDate.split('-').map(Number);
      const [monthB, yearB] = b.startDate.split('-').map(Number);
      console.log(monthA, monthB);
      console.log(yearA, yearB);

      // Comparaison basée sur l'année puis le mois
      if (yearA === yearB) {
        return monthA - monthB;  // Mois croissant
      }
      return yearA - yearB;  // Année croissante
    });
  }

  onEdit(repartition: Repartition) {
    const dialogRef = this.dialog.open(AddRepartitionComponent, {
      data: {repartition: repartition}
    })

    dialogRef.afterClosed().subscribe(() => {
      // this.updateIncomes()
    })
  }


}
