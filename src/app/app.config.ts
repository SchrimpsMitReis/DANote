import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { routes } from './app.routes';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideFirebaseApp(() => initializeApp({ "projectId": "DANotes" })),
    // provideFirestore(() => getFirestore()),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      "projectId":"danote-36550",
      "appId":"1:56153945629:web:e341ed8f83238f4954f8f4",
      "storageBucket":"danote-36550.appspot.com",
      "apiKey":"AIzaSyBysxr7Od1kefG8Pjit_6XiB4e6TFRUGAU",
      "authDomain":"danote-36550.firebaseapp.com",
      "messagingSenderId":"56153945629"
    }))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
  ]

};
