import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencyValidatorDirective } from './currency-validator.directive';


@NgModule({
  declarations: [
    CurrencyValidatorDirective
  ],
  exports: [
    CurrencyValidatorDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class LocalDirectivesModule { }


