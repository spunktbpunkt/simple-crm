import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // 👈 Wichtig für den Datepicker

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideNativeDateAdapter(), // 👈 Hier aktivieren wir den DateAdapter
    ...(appConfig.providers || []), provideFirebaseApp(() => initializeApp({
      "projectId": "simple-crm-aebf2",
      "appId": "1:697344563373:web:9a6fb35f8fe9d5703b4e24",
      "storageBucket": "simple-crm-aebf2.firebasestorage.app",
      "apiKey": "AIzaSyC_gtcd9n_92H3pBDCi8uGKDOF6S4d73r0",
      "authDomain": "simple-crm-aebf2.firebaseapp.com",
      "messagingSenderId": "697344563373"
    })), provideFirestore(() => getFirestore()) // falls du im app.config noch Provider hast
  ]
}).catch((err) => console.error(err));
