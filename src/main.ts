import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  NativeDateAdapter,
} from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { LOCALE_ID, Injectable } from '@angular/core';
import { registerLocaleData, formatDate } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

@Injectable()
export class GermanDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (!date) return '';
    return formatDate(date, 'dd.MM.yyyy', this.locale);
  }
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'dd.MM.yyyy',
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'dd.MM.yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-aebf2',
        appId: '1:697344563373:web:9a6fb35f8fe9d5703b4e24',
        storageBucket: 'simple-crm-aebf2.firebasestorage.app',
        apiKey: 'AIzaSyC_gtcd9n_92H3pBDCi8uGKDOF6S4d73r0',
        authDomain: 'simple-crm-aebf2.firebaseapp.com',
        messagingSenderId: '697344563373',
      })
    ),
    provideFirestore(() => getFirestore()),

    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: DateAdapter, useClass: GermanDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },

    ...(appConfig.providers || []),
  ],
}).catch((err) => console.error(err));
