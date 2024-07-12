import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    inject,
} from '@angular/core';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    @Input() product: Product | null = null;

    @Output() readonly buy = new EventEmitter<Product['_id']>();

    constructor() {
        // eslint-disable-next-line no-console
        console.log('CardComponent Created');

        setInterval(() => {
            this.changeDetectorRef.detectChanges();
        }, 500);
    }

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (!this.product) {
            return;
        }

        this.buy.emit(this.product._id);
    }

    isStarActive(starIndex: number): boolean {
        return !!this.product && this.product.rating >= starIndex;
    }

    currency(price: number | undefined | null, symbol = '$'): string {
        // eslint-disable-next-line no-console
        console.log('Currency method');

        return `${price || 0} ${symbol}`;
    }

    // readonly currency = currency
}

// function currency(price: number): string {
//     return ...
// }
