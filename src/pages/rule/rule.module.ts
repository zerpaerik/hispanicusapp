import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RulePage } from './rule';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    RulePage,
  ],
  imports: [
    IonicPageModule.forChild(RulePage),
		TranslateModule.forChild({
    loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
    }
    })       
  ],
})
export class RulePageModule {}
