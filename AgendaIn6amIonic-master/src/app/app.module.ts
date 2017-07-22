import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactoService } from './services/ContactoService';
import { AuthService } from './services/AuthService';

import { ContactosPage } from '../pages/contactos/contactos';
import { ContactoFormPage } from '../pages/contactos/contacto-form';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ContactosPage,
    HomePage,
    TabsPage,
    LoginPage,
    ContactoFormPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactosPage,
    HomePage,
    TabsPage,
    LoginPage,
    ContactoFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    ContactoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
