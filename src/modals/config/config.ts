import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../../pages/login/login';
import { ConfigProvider } from '../../providers/config/config';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  lang   : string;
  mode   : string;
  region : any;

  constructor(public smartAudio : SmartAudioProvider, public toastCtrl : ToastController, public configProvider : ConfigProvider, public authProvider : AuthProvider, public navCtrl: NavController, public navParams: NavParams, private translate : TranslateService,  public viewCtrl: ViewController) {
    this.mode   = localStorage.getItem("rmode") ||  '1';
    this.lang   = localStorage.getItem("lang")  ||  'en';
    this.region = localStorage.getItem("region") || [0, 2, 4];
  }

  changeLang(){
  	let xlang = this.lang || 'en';
    localStorage.setItem('lang', xlang);
  	this.translate.use(xlang);
    this.configProvider.setLang(xlang).subscribe(res => {
      
      if (res['success']) {
        this.presentToast(true);
      }else{
        this.presentToast(false);
      }
    }, error => {
      this.presentToast(false);
    });
  }

  changeMode(){
    let xmode = this.mode || 1;
    
    switch (xmode) {
         case '1':
           localStorage.setItem('rmode', '1');
           localStorage.setItem("region", JSON.stringify([0, 2, 4]));
           break;
         
         case '2':
           localStorage.setItem('rmode', '2');
           localStorage.setItem("region", JSON.stringify([0, 1, 4]));
           break;  

         case '3':
           localStorage.setItem('rmode', '3');
           localStorage.setItem("region", JSON.stringify([0, 1, 3]));
           break;

         default:
           localStorage.setItem('rmode', '1');
           localStorage.setItem("region", JSON.stringify([0, 2, 4]));           
           break;
    }

    this.configProvider.setRegion(xmode).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.presentToast(true);
      }else{
        this.presentToast(false);
      }      
    }, error => {
      this.presentToast(false);
    });
    
  }

  logout(){
    this.authProvider.logout().subscribe(res => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);      
    }, error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);      
    });
  }

  close(e){
    this.smartAudio.play('tapped');
  	let callbackData : any = (e.target.innerText != 'Volver') ? e.target.innerText : false;
  	this.viewCtrl.dismiss(callbackData);
  }

  presentToast(type : boolean) {

    let msg : string;

    this.translate.get('GENERAL').subscribe(general => {
      
      if (type) {
        msg = general.CHANGE_SUCCESS;  
      }else{
        msg = general.CHANGE_FAIL;  
      }
      
      
    });

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}