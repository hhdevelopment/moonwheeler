import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'i18nNumber'
})
export class I18nNumberPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private localeId: string) {

  }

  transform(value: any, ...args: any[]): any {
    const coeffTo: HTMLSpanElement = args[0];
    const result = value * parseFloat(coeffTo.innerText);
    return isNaN(result) ? '?' : Math.round(result);
  }
}
