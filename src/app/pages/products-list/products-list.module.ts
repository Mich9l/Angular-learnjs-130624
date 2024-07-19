import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {IfModule} from '../../shared/if/if.module';
import {ScrollWithLoadingModule} from '../../shared/scroll-with-loading/scroll-with-loading.module';
import {PaginationModule} from '../../shared/pagination/pagination.module';
import {FilterByPropertyModule} from '../../shared/filter-by-property/filter-by-property.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [
        CardModule,
        CommonModule,
        MatProgressSpinnerModule,
        IfModule,
        ScrollWithLoadingModule,
        MatButtonModule,
        MatIconModule,
        PaginationModule,
        FilterByPropertyModule,
        RouterModule,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
