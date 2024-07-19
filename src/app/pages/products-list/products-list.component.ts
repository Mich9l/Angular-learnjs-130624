import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Product} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly productsStoreService = inject(ProductsStoreService);
    private readonly router = inject(Router);

    readonly products$ = this.productsStoreService.products$;

    constructor() {
        this.productsStoreService.loadProducts();
    }

    onProductBuy(id: Product['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackBy(_index: number, item: Product): Product['_id'] {
        return item._id;
    }

    navigateToProduct(id: string) {
        // this.router.navigateByUrl(`/product/${id}/description`);
        this.router.navigate(['product', id, 'description']);
    }
}
