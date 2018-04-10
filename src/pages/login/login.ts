import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Globalization } from '@ionic-native/globalization';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginFormGroup : FormGroup;

  constructor(public translateServ : TranslateService, public toastCtrl : ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private globalization: Globalization, public formBuilder: FormBuilder, public authProvider : AuthProvider) {
    
    this.loginFormGroup = formBuilder.group({
      email     : ['', Validators.required],
      password  : ['', Validators.compose([Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])]
    });    

  	this.globalization.getPreferredLanguage()
    .then(res => console.log(res))
    .catch(e => console.log(e));

  }

  ionViewCanEnter(){
    if (localStorage.getItem('token')) {
      this.navCtrl.setRoot(HomePage);
    }
    return true;
  }

  login(){
    
    let email = this.loginFormGroup.get('email').value;
    let password = this.loginFormGroup.get('password').value;
    let loader =   this.presentLoading();
    loader.present();    

  	this.authProvider.login(email, password).subscribe(res => {
      
      loader.dismiss();
      localStorage.setItem('token', res['token']);
      localStorage.setItem('user', JSON.stringify(res['user']));
      localStorage.setItem('lang', res['lang']);
      localStorage.setItem('rmode', res['modo']);
      localStorage.setItem('favs', JSON.stringify(res['favs']));
      this.translateServ.setDefaultLang(res['lang']);
      this.navCtrl.setRoot(HomePage);

    }, error => {
      loader.dismiss();
      if (error.status == 401) {
        this.presentToast(true);
      }else{
        this.presentToast(false);
      }
    });
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }  

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner : 'crescent',
      showBackdrop : false
    });
    return loader;
  }

  presentToast(type) {

  let msg : string;

  this.translateServ.get('ERROR').subscribe(error => {
    if (type) {
      msg = error.CHECK_CREDS;    
    }else{
      msg = error.SUBTITLE;
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
