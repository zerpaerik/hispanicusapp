import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//NATIVES
import { Globalization } from '@ionic-native/globalization';

import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


//PAGES

import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { MenuVerboPage } from '../pages/menu-verbo/menu-verbo';
import { ListVerbosPage } from '../pages/list-verbos/list-verbos';

//MODALS

import { DiccionarioPage } from '../modals/diccionario/diccionario';
import { ConfigPage } from '../modals/config/config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//PROVIDERS
import { VerbosProvider } from '../providers/verbos/verbos';
import { AuthProvider } from '../providers/auth/auth';
import { ConfigProvider } from '../providers/config/config';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuVerboPage,
    ListVerbosPage,
    DiccionarioPage,
    ConfigPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      pageTransition: 'ios-transition',
      backButtonText: '',
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuVerboPage,
    ListVerbosPage,
    DiccionarioPage,
    ConfigPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VerbosProvider,
    AuthProvider,
    ConfigProvider
  ]
})

export class AppModule {}