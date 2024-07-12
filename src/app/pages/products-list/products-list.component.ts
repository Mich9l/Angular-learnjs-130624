import {ChangeDetectionStrategy, Component, ProviderToken, inject} from '@angular/core';
import {Product} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    // private readonly changeDetectorRef = inject(ChangeDetectorRef);
    // private readonly productsStoreService = new ProductsStoreService(ApiService(HttpService), HttpService);
    private readonly productsStoreService = inject(ProductsStoreService);
    // private readonly productsStoreService = inject('dasfds');
    // private readonly productsStoreService = inject(1231231231);

    readonly products$ = this.productsStoreService.products$;
    // readonly products$ = inject<Observable<Product[] | null>>(
    //     'products$' as unknown as ProviderToken<any>,
    // );

    // products: Product[] | null = null;

    constructor() {
        this.productsStoreService.loadProducts();

        const pseudo = inject('ProductsStoreService' as unknown as ProviderToken<unknown>);

        // eslint-disable-next-line no-console
        console.log(this.productsStoreService === pseudo);

        // this.productsStoreService.products$.subscribe(() => {
        //     this.products = productsMock;

        //     this.changeDetectorRef.markForCheck();
        // });
    }

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackBy(_index: number, item: Product): Product['_id'] {
        return item._id;
    }
}
