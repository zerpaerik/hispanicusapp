import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Globalization } from '@ionic-native/globalization';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginFormGroup : FormGroup;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private globalization: Globalization, public formBuilder: FormBuilder, public authProvider : AuthProvider) {
    
    this.loginFormGroup = formBuilder.group({
      email     : ['', Validators.required],
      password  : ['', Validators.compose([Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])]
    });    

  	this.globalization.getPreferredLanguage()
    .then(res => console.log(res))
    .catch(e => localStorage.setItem('lang', 'en'));

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
      this.navCtrl.setRoot(HomePage);

    }, error => {
      console.log(error);
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

}
