import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private toast : ToastController, public alertCtrl: AlertController, private authProvider : AuthProvider, private uniqueDeviceID: UniqueDeviceID, smartAudio: SmartAudioProvider, nativeaudio : NativeAudio, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public translate: TranslateService) {
    let lang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang(lang);
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.uniqueDeviceID.get()
        .then(this.consumeCode)
        .catch((error: any) => {
          this.consumeCode('tstts3')
        });
     
      smartAudio.preload('tapped', 'assets/audio/waterdroplet.mp3');

    });
  
  }

  consumeCode(uuid:any){
    localStorage.setItem('uuid', uuid);
    this.authProvider.checkUuid().subscribe(res => {
      this.login(uuid);
    }, error => {
      this.login(uuid);
    });
  }

  login(uuid){
    
    let email = uuid;
    let password = uuid;

    this.authProvider.login(email, password).subscribe(res => {
      
      localStorage.setItem('token', res['token']);
      localStorage.setItem('user', JSON.stringify(res['user']));
      localStorage.setItem('lang', res['lang']);
      localStorage.setItem('rmode', res['modo']);
      localStorage.setItem('favs', JSON.stringify(res['favs']));

      this.authProvider.checkUuid().subscribe(res => {
        console.log("authorized!");
      }, error => {
        if (error.status == 401) {
          this.showPrompt();
        }
      });      

    }, error => {
        if (error.status == 401) {
          this.showPrompt();
        }      
    });
  }

  showToast(msg){
    let toast = this.toast.create({
      message: msg,
      duration: 5000,
      position: 'middle'
    });
    toast.present();
  }

  showPrompt(extraMsg = '') {
    const prompt = this.alertCtrl.create({
      title: 'Codigo de acceso',
      enableBackdropDismiss : false,
      message: "Introduzca su codigo de acceso. " + extraMsg,
      inputs: [
        {
          name: 'codigo',
          placeholder: '6 digitos',
          max: 6,
          min: 6
        },
      ],
      buttons: [
        {
          text: 'Listo',
          handler: data => {
            if (data.codigo.length < 6) return this.showPrompt('No debe ser menor de 6 digitos');
            this.authProvider.consumeCode(localStorage.getItem('uuid'), data.codigo)
            .subscribe(res => {
              console.log("success");
            }, error => {
              if(error.status == 401){
                this.showToast('Ha ocurrido un error, verifique su codigo.');
              }else{
                this.showToast('Ha ocurrido un error desconocido. Verifique su conexión.');
              }
              this.showPrompt();
            });
          }
        }
      ]
    });
    prompt.present();
  }

}