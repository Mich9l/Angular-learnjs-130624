import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {PopupHostModule} from './components/popup-host/popup-host.module';
import {InsetShadowModule} from './shared/inset-shadow/inset-shadow.module';
// import {ProductsStoreService} from './shared/products/products-store.service';
// import {ProductsApiService} from './shared/products/products-api.service';
// import {BASE_URL_TOKEN, baseUrl} from './shared/base-url/base-url';
import {BaseUrlInterceptor} from './shared/base-url/base-url.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        ProductsListModule,
        SidenavModule,
        MatListModule,
        PopupHostModule,
        InsetShadowModule,
        HttpClientModule,
    ],
    providers: [
        // ProductsStoreService,
        // {
        //     provide: ProductsStoreService,
        //     useClass: ProductsStoreService,
        // },
        // ProductsApiService,
        // {provide: BASE_URL_TOKEN, useValue: baseUrl},
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true,
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: ErrorInterceptor,
        //     multi: true,
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
