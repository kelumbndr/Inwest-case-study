import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController, AlertController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Transfer } from '../shared/Models/transfer';
import { getTransfers, addTransfer, updateTransfer, deleteTransfer } from '../shared/Store/Actions/transfer.action';
import { TransferState } from '../shared/Store/Reducers/movie.reducers';
import { transferSelector } from '../shared/Store/Selector/movie.selector';
import { TransferModalComponent } from './transfer-modal/transfer-modal.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  transfers$ = this.store.pipe(select(transferSelector));
  transferStatesSubscription = new Subscription();

  isModalOpen = false;
  displayedColumns: string[] = ['iban', 'accountHolder', 'date', 'amount', 'note', 'action'];
  dataSource = new MatTableDataSource([]);

  constructor(
    private store: Store<TransferState>,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    public datepipe: DatePipe
    ) {}

  ngOnInit(): void {
    this.transferStatesSubscription = this.transfers$.subscribe((data) => {
      console.log(data);
      if(data){
        console.log(data);
        const transfers = JSON.parse(JSON.stringify(data));
        this.dataSource = new MatTableDataSource(transfers);
        this.refreshSorting();
      }
    });
    this.store.dispatch(getTransfers());
  }

  ngAfterViewInit(): void {
    this.refreshSorting();
  }

  refreshSorting(){
    this.dataSource.sort = this.sort;
  }


  /**
   * On input focus: setup filterPredicate to only filter by input column
   *
   *  @param column relevant column def as a string ex: 'note'
   */
  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: MatTableDataSource<any>, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async openModal(transfer: Transfer, isNew: boolean) {
    if(isNew){
      transfer = new Transfer();
      transfer.date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    } else {
      // decouple the reference object
      transfer = Object.assign({}, transfer);
    }
    const modal = await this.modalCtrl.create({
      component: TransferModalComponent,
      componentProps: {
        transfer,
        isNew
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    this.createOrUpdateTransfer(isNew, data);
  }

  public createOrUpdateTransfer(isNew: boolean, tranfer: Transfer){
    if(isNew){
      this.store.dispatch(addTransfer(tranfer));
    } else {
      this.store.dispatch(updateTransfer(tranfer));
    }
  }

  /**
   * delete warning message
   *
   * @param data transfer object
   */
  async onDelete(data: Transfer) {
    const alert = await this.alertController.create({
      header: 'You are about to delete a tranfer record. continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.store.dispatch(deleteTransfer(data.id));
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnDestroy(): void {
    this.transferStatesSubscription.unsubscribe();
  }

}
