import {input, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstLetter',
  standalone: true
})
export class FirstLetterPipe implements PipeTransform {


  transform(input: string): string {
    if (!input) return input;
    return input.charAt(0).toUpperCase();
  }
}
