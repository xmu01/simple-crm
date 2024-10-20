import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};  

/* New config file for Firebase. da ab Angular 17 es kein environment.ts dependency stuff es mehr gibt, muss man stattdessen was in der appConfig ändern/einfügen,
was leider in der Firebase und GitHub Seite leider nicht erwähnt wird*/


