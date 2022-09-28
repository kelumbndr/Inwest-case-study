import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { IonicModule } from '@ionic/angular';
import { AngularIbanModule } from 'angular-iban';
import { LocalDirectivesModule } from '../shared/directives/local-directives.module';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { TransferModalComponent } from './transfer-modal/transfer-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TransferRoutingModule,
    MatTableModule,
    MatInputModule,
    AngularIbanModule,
    LocalDirectivesModule,
    MatSortModule
  ],
  declarations: [
    TransferComponent,
    TransferModalComponent
  ]
})
export class TransferModule { }
