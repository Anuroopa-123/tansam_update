import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule, // Required for Toastr
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 10000,
        progressBar: true,
        closeButton: true,              
        newestOnTop: true,
        preventDuplicates: true,
      }) 
    )
  ]
};
