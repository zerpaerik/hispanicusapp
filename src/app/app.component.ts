import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(smartAudio: SmartAudioProvider, nativeaudio : NativeAudio, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public translate: TranslateService) {
    let lang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang(lang);
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      nativeaudio.preloadSimple('tapped', 'assets/audio/waterdroplet.mp3').then(() => {
        console.log("tapped audio loaded");
        smartAudio.preload('tapped', 'assets/audio/waterdroplet.mp3');  
      }).catch((error) => {
        console.log(error);
      });
    
      nativeaudio.preloadSimple('fav', 'assets/audio/fav.mp3').then(() => {
        console.log("fav Audio loaded");
        smartAudio.preload('fav', 'assets/audio/fav.mp3');
      }).catch((error) => {
        console.log(error);
      });      

    });
  }
}