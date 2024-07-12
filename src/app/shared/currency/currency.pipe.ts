import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'currency',
    pure: true,
})
export class CurrencyPipe implements PipeTransform {
    transform(price: number | undefined | null, symbol = '$'): string {
        // eslint-disable-next-line no-console
        console.log('CurrencyPipe');

        return `${price || 0} ${symbol}`;
    }
}
