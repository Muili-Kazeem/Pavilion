import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number): string {
    const newValue: string = value.toFixed(2);
    return `${newValue.padStart(2, '0')}`;
    // return `${newValue}`;
  }

}
