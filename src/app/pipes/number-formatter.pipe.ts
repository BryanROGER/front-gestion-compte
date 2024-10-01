import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter',
  standalone: true
})
export class NumberFormatterPipe implements PipeTransform {

  transform(value: number | string): string {
    // Convert the input to a string, remove spaces, and use a regular expression to format
    const strValue = value.toString().replace(/\s+/g, '');
    return strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
