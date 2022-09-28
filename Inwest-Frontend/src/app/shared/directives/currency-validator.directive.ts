/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getCurrencySymbol } from '@angular/common';
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
selector: '[appCurrencyValidator]',
providers: [{provide: NG_VALIDATORS, useExisting: CurrencyValidatorDirective, multi: true}]
})
export class CurrencyValidatorDirective implements Validator {

    @Input() minCurrencyLength = 0;
    @Input() maxCurrencyLength = 100;

    @Input() minCurrencyValue = 0;
    @Input() maxCurrencyValue = 100000000;

    constructor(
    ) { }

    public validate(control: AbstractControl): ValidationErrors | null {
        return currencyValidator(this.minCurrencyLength, this.maxCurrencyLength, this.minCurrencyValue, this.maxCurrencyValue)(control);
    }
}


export function currencyValidator(
    minCurrencyLength: number,
    maxCurrencyLength: number,
    minCurrencyValue: number,
    maxCurrencyValue: number
    ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let unformattedValue = control.value;
      if(control.value){
        unformattedValue = control.value.replace(getCurrencySymbol('EUR', 'narrow','de'),'').trim().replaceAll('.','').replace(',','.');
      } else {
        return;
      }
      // could have used diffrerent keys for errors but in this case not much required
    return (isNaN(unformattedValue))
                ? {invalidCurrency: ('Invalid Currency')} :
            (unformattedValue.length > maxCurrencyLength)
                ? {invalidCurrency: ('Length of the currency exceeds ' + maxCurrencyLength)} :
            (unformattedValue.length < minCurrencyLength)
                ? {invalidCurrency: ('Length of the currency should exceed ' + minCurrencyLength)} :
            (unformattedValue < minCurrencyValue)
                ? {invalidCurrency: ('Amount shold be more than ' + minCurrencyValue + ' ' + getCurrencySymbol('EUR', 'narrow','de'))} :
            (unformattedValue > maxCurrencyValue)
                ? {invalidCurrency: ('Amount shold be less than ' + maxCurrencyValue + ' ' + getCurrencySymbol('EUR', 'narrow','de'))} : null;

    };
  }
