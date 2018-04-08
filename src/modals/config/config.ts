import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  lang : string;
  mode : string;

  constructor(public authProvider : AuthProvider, public navCtrl: NavController, public navParams: NavParams, private translate : TranslateService,  public viewCtrl: ViewController) {
    this.mode = localStorage.getItem("rmode") ||  '1';
    this.lang = localStorage.getItem("lang")  ||  'en';
  }

  changeLang(){
  	let xlang = this.lang || 'en';
  	this.translate.use(xlang);
  }

  changeMode(){
    let xmode = this.mode || 1;
    
    switch (xmode) {
         case '1':
           localStorage.setItem('rmode', '1');
           localStorage.setItem("region", JSON.stringify([0, 1, 2]));
           break;
         
         case '2':
           localStorage.setItem('rmode', '2');
           localStorage.setItem("region", JSON.stringify([0, 2]));
           break;  

         case '3':
           localStorage.setItem('rmode', '3');
           localStorage.setItem("region", JSON.stringify([0, 2]));
           break;

         default:
           localStorage.setItem('rmode', '1');
           localStorage.setItem("region", JSON.stringify([0, 1, 2]));           
           break;
    }
    
  }

  logout(){
    this.authProvider.logout().subscribe(res => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);      
    }, error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);      
    }, () => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);      
    });
  }

  close(e){
  	let callbackData : any = (e.target.innerText != 'Volver') ? e.target.innerText : false;
  	this.viewCtrl.dismiss(callbackData);
  }

}
