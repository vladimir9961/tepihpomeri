import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';

// Interceptor
import { AppInterceptor } from './helper/interceptor';
// Store
import { provideState, provideStore } from '@ngrx/store';
import { productReducer } from './store/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AppInterceptor,
        multi: true
    },
    
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideAngularSvgIcon(),
    provideClientHydration(withNoHttpTransferCache()),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),

    provideStore(),
    provideState({ name: 'cart', reducer: productReducer})
]
};
