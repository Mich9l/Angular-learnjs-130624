import {Injectable, inject} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL_TOKEN} from './base-url';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    private readonly baseUrl = inject(BASE_URL_TOKEN);

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const patchRequest = request.clone({
            url: this.baseUrl + request.url,
        });

        return next.handle(patchRequest);
    }
}
