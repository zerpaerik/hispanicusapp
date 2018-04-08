import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//NATIVES
import { Globalization } from '@ionic-native/globalization';

import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MailValidator } from '../pages/register/email-validator';

import { MenuVerboPage } from '../pages/menu-verbo/menu-verbo';
import { ListVerbosPage } from '../pages/list-verbos/list-verbos';
import { VerboRegularPage } from '../pages/verbo-regular/verbo-regular';

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
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    MenuVerboPage,
    ListVerbosPage,
    DiccionarioPage,
    VerboRegularPage,
    ConfigPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    MenuVerboPage,
    ListVerbosPage,
    DiccionarioPage,
    VerboRegularPage,
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
    MailValidator,
    ConfigProvider
  ]
})

export class AppModule {}