import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Income} from "../../../../models/Income";
import {AddIncomeComponent} from "../../../popup/add-income/add-income.component";
import {Wallet} from "../../../../models/Wallet";
import {MatDialog} from "@angular/material/dialog";
import {AddWalletComponent} from "../../../popup/add-wallet/add-wallet.component";

@Component({
  selector: 'app-wallet-setting',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './wallet-setting.component.html',
  styleUrl: './wallet-setting.component.scss'
})
export class WalletSettingComponent {

  dialog = inject(MatDialog);

  openPopup(income: Wallet | null) {
    const dialogRef = this.dialog.open(AddWalletComponent, {
      data: {income: income}
    })

    dialogRef.afterClosed().subscribe(() => {
      // this.updateIncomes()
    })
  }

}
