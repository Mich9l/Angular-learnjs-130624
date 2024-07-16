import {catchError, map, Observable, of} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product.interface';
import {ProductsDto} from './products.dto';
// import {BASE_URL_TOKEN} from '../base-url/base-url';

@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    // private readonly baseUrl = inject(BASE_URL_TOKEN);
    private readonly httpClient = inject(HttpClient);

    getProducts$(): Observable<Product[]> {
        // console.log(this.baseUrl);

        return this.httpClient.get<ProductsDto>(`/products/suggestion`).pipe(
            map(({data}) => data.items),
            catchError(() => of([])),
        );
    }

    getProduct$(id: Product['_id']): Observable<Product | undefined> {
        return this.httpClient.get<{data: Product}>(`/products/${id}`).pipe(
            map(({data}) => data),
            catchError(() => of(undefined)),
        );
    }
}
