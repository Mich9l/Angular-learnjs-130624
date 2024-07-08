import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';
import {LoadDirection} from '../../shared/scroll-with-loading/enum/load-direction';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    products: Product[] | null = null;

    constructor() {
        setTimeout(() => {
            this.products = productsMock;

            this.changeDetectorRef.markForCheck();
        }, 3000);

        setTimeout(() => {
            this.products = productsMock.map(product => ({...product, feedbacksCount: 2}));

            this.changeDetectorRef.markForCheck();
        }, 6000);
    }

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    onLoad(direction: LoadDirection) {
        // eslint-disable-next-line no-console
        console.log(direction);
    }

    trackBy(_index: number, item: Product): Product['_id'] {
        return item._id;
    }
}
