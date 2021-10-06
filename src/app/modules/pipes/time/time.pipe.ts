import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(
    milliseconds: unknown,
    maxUnit: 'h' | 'm' | 's' | 'ms' = 'ms'
  ): string | null {
    if (typeof milliseconds != 'number') return null;
    let hours, minutes, seconds;
    switch (maxUnit) {
      case 'h':
        hours = Math.floor(milliseconds / (1000 * 60 * 60));
        minutes = Math.floor(
          (milliseconds - hours * (1000 * 60 * 60)) / (1000 * 60)
        );
        seconds = Math.floor(
          (milliseconds - hours * (1000 * 60 * 60) - minutes * 1000 * 60) / 1000
        );
        return `${hours}:${minutes.toLocaleString(undefined, {
          minimumIntegerDigits: 2,
        })}:${seconds.toLocaleString(undefined, {
          minimumIntegerDigits: 2,
        })}.${milliseconds % 1000}`;
      case 'm':
        minutes = Math.floor(milliseconds / (1000 * 60));
        seconds = Math.floor((milliseconds - minutes * 1000 * 60) / 1000);
        return `${minutes}:${seconds.toLocaleString(undefined, {
          minimumIntegerDigits: 2,
        })}.${milliseconds % 1000}`;
      case 's':
        seconds = Math.floor(milliseconds / 1000);
        return `${seconds}.${milliseconds % 1000}`;
      default:
        return `${Math.round(milliseconds / 10)}`;
    }
  }
}
