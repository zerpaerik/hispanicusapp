import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';

import { MenuVerboPage } from '../pages/menu-verbo/menu-verbo';
import { ListVerbosPage } from '../pages/list-verbos/list-verbos';
import { VerboRegularPage } from '../pages/verbo-regular/verbo-regular';

//MODALS

import { DiccionarioPage } from '../modals/diccionario/diccionario';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    MenuVerboPage,
    ListVerbosPage,
    DiccionarioPage,
    VerboRegularPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    MenuVerboPage,
    ListVerbosPage,
    DiccionarioPage,
    VerboRegularPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
