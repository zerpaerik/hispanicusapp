import { Component, ViewChild } from '@angular/core';
import { Select, NavController, NavParams, ViewController } from 'ionic-angular';
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
  @ViewChild('selectMode') selectMode: Select;
  lang   : string;
  mode   : string;
  region : any;
  infot  : string;


  constructor(public smartAudio : SmartAudioProvider, public toastCtrl : ToastController, public configProvider : ConfigProvider, public authProvider : AuthProvider, public navCtrl: NavController, public navParams: NavParams, private translate : TranslateService,  public viewCtrl: ViewController) {

    this.mode   = localStorage.getItem("rmode") ||  '1';
    this.infot  = this.mode;
    this.lang   = localStorage.getItem("lang")  ||  'en';
    this.region = localStorage.getItem("region") || [0, 2, 4];

  }

  goInfo(){
    let t;
    switch (this.mode) {
      case '1':
        t = 'esp';
        break;
      case '2':
        t = 'lat';
        break;
      case '3':
        t = 'voseo';
        break;  
      default:
        t = 'esp';
        break;
    }
    this.navCtrl.push('InfoPage', {type : t});
  }

  changeLang(){
  	
    let xlang = this.lang || 'en';
    localStorage.setItem('lang', xlang);
  	this.translate.use(xlang);
    this.translate.get('LANG').subscribe(res => {
      switch (this.mode) {
        case "1":
          this.selectMode.selectedText = res.SP;
          break;
        case "2":
          this.selectMode.selectedText = res.LAN;
          break;
        case "3":
          this.selectMode.selectedText = res.LAS;
          break;
        default:
          this.selectMode.selectedText = res.SP;
          break;
      }
    });

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
    
    this.infot = this.mode;

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