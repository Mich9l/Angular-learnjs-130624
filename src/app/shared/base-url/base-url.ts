import {InjectionToken} from '@angular/core';

export const baseUrl = `https://course-angular.javascript.ru/api`;

// export const BASE_URL_TOKEN = {} as any as InjectionToken<any>;
export const BASE_URL_TOKEN = new InjectionToken('Base url token', {
    providedIn: 'root',
    factory: () => baseUrl,
});
