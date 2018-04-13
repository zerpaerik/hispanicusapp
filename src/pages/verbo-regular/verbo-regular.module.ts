import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerboRegularPage } from './verbo-regular';
import { VerbosProvider } from '../../providers/verbos/verbos';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    VerboRegularPage,
  ],
  imports: [
    IonicPageModule.forChild(VerboRegularPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })    
  ],
  providers : [VerbosProvider]
})
export class FavoritesPageModule {}
