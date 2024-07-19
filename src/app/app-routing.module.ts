import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './pages/products-list/products-list.component';
import {ProductComponent} from './pages/product/product.component';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {ProductModule} from './pages/product/product.module';
import {DescriptionComponent} from './pages/product/description/description.component';
import {TypeComponent} from './pages/product/type/type.component';
import {DescriptionModule} from './pages/product/description/description.module';
import {TypeModule} from './pages/product/type/type.module';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NotFoundModule} from './pages/not-found/not-found.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/products-list',
        pathMatch: 'full',
    },
    {
        path: 'products-list',
        component: ProductsListComponent,
    },
    {
        path: 'product/:id',
        component: ProductComponent,
        children: [
            // {
            //     path: '',
            //     redirectTo: 'description',
            //     pathMatch: 'full',
            // },
            {
                path: 'description',
                component: DescriptionComponent,
            },
            {
                path: 'type',
                component: TypeComponent,
            },
            {
                path: '**',
                // component: NotFoundComponent,
                redirectTo: 'description',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
    // ...
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        ProductsListModule,
        ProductModule,
        DescriptionModule,
        TypeModule,
        NotFoundModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

/**
 * url === http://localhost:4200/product/id/description
 *
 * urlSegments === 'product/id/description'
 *
 * current url segments: ['', 'product', 'id', 'fdsfdsfwerew']
 *
 * search indexes: 0 -> 1 -> 2 -> 3 -> ...
 */

/**
 *            ___________________ undefined ___________________
 *           /                  /           \                  \
 *          /                  /             \                  \
 *       ['']       ['products-list']    ['product', ':id'] ___  ['**']
 *                                     /         |         \   \________
 *                                    /          |          \           \
 *                                 ['']   ['description']   ['type']   ['**']
 */
