import {BehaviorSubject, Subscription} from 'rxjs';
import {inject} from '@angular/core';
import {Product} from './product.interface';
import {ProductsApiService} from './products-api.service';

export class ProductsStoreService {
    private readonly productsApiService = inject(ProductsApiService);

    private readonly productsStore$ = new BehaviorSubject<Product[] | null>(null);

    private activeLoadProductsSubscription: Subscription | null = null;

    readonly products$ = this.productsStore$.asObservable();

    loadProducts() {
        if (this.activeLoadProductsSubscription) {
            this.activeLoadProductsSubscription.unsubscribe();
        }

        this.activeLoadProductsSubscription = this.productsApiService
            .getProducts$()
            .subscribe(products => {
                this.productsStore$.next(products);

                this.activeLoadProductsSubscription = null;
            });
    }
}
