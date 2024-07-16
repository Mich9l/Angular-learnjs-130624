import {Injectable, inject} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {BASE_URL_TOKEN} from './base-url';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    private readonly baseUrl = inject(BASE_URL_TOKEN);

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // if (whiteList.include(request.url)) {
        //     return next.handle(request);
        // }

        // patch reaquest start

        const patchRequest = request.clone({
            url: this.baseUrl + request.url,
        });

        // patch reaquest end
        return next.handle(patchRequest).pipe(
            // patch responce start
            tap(),
            // patch responce end
        );
    }
}
