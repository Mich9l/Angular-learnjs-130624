import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {filter, map, switchMap, tap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly productsStoreService = inject(ProductsStoreService);

    // readonly product$ = of('96-planset-dexp-ursus-s290-32-gb-3g-cernyj').pipe(
    // readonly product$ = this.activatedRoute.params.pipe(
    readonly product$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('id')),
        filter(Boolean),
        tap(productId => {
            this.productsStoreService.loadProduct(productId);
        }),
        switchMap(() => this.productsStoreService.currentProduct$),
    );

    navigateToDescription() {
        // this.router.navigateByUrl(`/`);
        // this.router.navigateByUrl(`./description`);

        const urlTree = this.router.createUrlTree(['./', 'description'], {
            relativeTo: this.activatedRoute,
            queryParams: {
                name: 'Alex',
            },
        });

        // eslint-disable-next-line no-console
        console.log(urlTree.toString(), this.activatedRoute.toString());

        this.router.navigateByUrl(urlTree);
    }

    navigateToType() {
        // this.router.navigate(['/']);
        // this.activatedRoute => "product/:id"
        this.router.navigate(['./', 'type'], {
            relativeTo: this.activatedRoute,
            queryParams: {name: 'Egor'},
            // queryParamsHandling: undefined,
        });
        // this.router.navigate(['./', 'type']);
    }
}
