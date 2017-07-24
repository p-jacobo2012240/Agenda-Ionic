import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AboutPage } from '../pages/cita/about';
import { CitaForm } from '../pages/cita/cita.form';
import { ContactPage } from '../pages/contacto/contact';
import { ContactoForm } from '../pages/contacto/contacto.form';
import { HomePage } from '../pages/tarea/home';
import { HomeForm } from '../pages/tarea/home.form';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

// servicios
import { UsuarioService } from './services/usuario.service'
import { ContactoService } from './services/contacto.service'
import { TareaService } from './services/tarea.service'
import { CitaService } from './services/cita.service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ContactoForm,
    HomeForm,
    CitaForm,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ContactoForm,
    HomeForm,
    CitaForm,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsuarioService,
    ContactoService,
    TareaService,
    CitaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
