import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Transfer } from 'src/app/shared/models/transfer';
import { TransferModule } from '../transfer.module';

import { TransferModalComponent } from './transfer-modal.component';

import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

describe('TransferModalComponent', () => {
  let component: TransferModalComponent;
  let fixture: ComponentFixture<TransferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransferModule
      ],
      declarations: [ TransferModalComponent ],
      providers: [ModalController, CurrencyPipe, DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferModalComponent);
    component = fixture.componentInstance;
    component.transfer = new Transfer();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('amount should be properly transformed to german format', () => {
    component.formattedAmount = '13459';
    component.formatCurrencyAmount();
    const tranformedAmount: string = component.formattedAmount;
    expect(tranformedAmount).toEqual('13.459 €');
  });

  it('amount should be properly transformed back from german format to floating point', () => {
    component.formattedAmount = '13.459 €';
    component.unFormatCurrencyAmount();
    const tranformedAmount: string = component.formattedAmount;
    expect(tranformedAmount).toBe('13459');
  });
});
