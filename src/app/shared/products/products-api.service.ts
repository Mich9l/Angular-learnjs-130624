import {map, Observable, timer} from 'rxjs';
import {Product} from './product.interface';
import {ProductsDto} from './products.dto';
import {productsMock} from './products.mock';
// import {ProductsStoreService} from './products-store.service';

export class ProductsApiService {
    // private readonly store = inject(forwardRef(() => ProductsStoreService));

    getProducts$(): Observable<Product[]> {
        return timer(2000).pipe(
            map<number, ProductsDto>(() => ({data: {items: productsMock}})),
            map(({data}) => data.items),
        );
    }
}
