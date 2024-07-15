import {map, Observable, timer} from 'rxjs';
import {Product} from './product.interface';
import {ProductsDto} from './products.dto';
import {productsMock} from './products.mock';

export class ProductsApiService {
    getProducts$(): Observable<Product[]> {
        return timer(2000).pipe(
            map<number, ProductsDto>(() => ({data: {items: productsMock}})),
            map(({data}) => data.items),
        );
    }
}
