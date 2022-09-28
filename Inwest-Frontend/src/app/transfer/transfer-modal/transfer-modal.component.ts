import { CurrencyPipe, DatePipe, getCurrencySymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transfer } from 'src/app/shared/Models/transfer';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.scss']
})
export class TransferModalComponent implements OnInit {

  transfer: Transfer;
  isNew: boolean;

  formattedAmount;
  minDate: string;

  constructor(
    private modalCtrl: ModalController,
    private currencyPipe: CurrencyPipe,
    private datepipe: DatePipe,
    ) {}

  ngOnInit(): void {
    this.formattedAmount = this.transfer.amount;
    this.formatCurrencyAmount();
    this.minDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }


  formatCurrencyAmount(){
    if(!isNaN(this.formattedAmount)){
      this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, 'EUR', 'symbol', '1.0-2', 'de');
    } else {
      this.unFormatCurrencyAmount();
      this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, 'EUR', 'symbol', '1.0-2', 'de');
    }
  }

  unFormatCurrencyAmount(){
    if(this.formattedAmount){
      // eslint-disable-next-line max-len
      this.formattedAmount = this.formattedAmount.replace(getCurrencySymbol('EUR', 'narrow','de'),'').trim().replaceAll('.','').replace(',','.');
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.transfer, 'confirm');
  }

}
