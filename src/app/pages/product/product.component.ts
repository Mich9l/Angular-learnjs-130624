import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {filter, of, switchMap, tap} from 'rxjs';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    private readonly productsStoreService = inject(ProductsStoreService);

    readonly product$ = of('96-planset-dexp-ursus-s290-32-gb-3g-cernyj').pipe(
        filter(Boolean),
        tap(productId => {
            this.productsStoreService.loadProduct(productId);
        }),
        switchMap(() => this.productsStoreService.currentProduct$),
    );
}
