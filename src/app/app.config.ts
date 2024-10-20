/*import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};  

/* New config file for Firebase. da ab Angular 17 es kein environment.ts dependency stuff es mehr gibt, muss man stattdessen was in der appConfig ändern/einfügen,
was leider in der Firebase und GitHub Seite leider nicht erwähnt wird*/


import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideFirebaseApp(() => 
    initializeApp({apiKey: "AIzaSyBTYYoR_VZzv9QdNErifbeLNMwDgW9tY3o",
      authDomain: "simple-crm-a0a83.firebaseapp.com",
      projectId: "simple-crm-a0a83",
      storageBucket: "simple-crm-a0a83.appspot.com",
      messagingSenderId: "641795728446",
      appId: "1:641795728446:web:d8611e4b1af4e86c3c1d6f"})), (provideFirestore(() => getFirestore()))]
};