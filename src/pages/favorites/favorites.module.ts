import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritesPage } from './favorites';
import { VerbosProvider } from '../../providers/verbos/verbos';
import { ConfigProvider } from '../../providers/config/config';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "../../assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    FavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritesPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })    
  ],
  providers : [VerbosProvider, ConfigProvider]
})
export class FavoritesPageModule {}
