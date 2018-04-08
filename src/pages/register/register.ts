import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	registerFormGroup : FormGroup;

  constructor(public loadingCtrl: LoadingController, public translateServ : TranslateService, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authProvider : AuthProvider) {
  	this.registerFormGroup = formBuilder.group({
  		email 		: ['', Validators.required],
  		name 		  : ['', Validators.compose([Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
  		password  : ['', Validators.compose([Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
  		cpassword : ['', Validators.compose([Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])]
  	});
  }

  register(){

  	let email = this.registerFormGroup.get('email').value;
  	let name = this.registerFormGroup.get('name').value;
  	let password = this.registerFormGroup.get('password').value;
  	let cpassword = this.registerFormGroup.get('cpassword').value;
  	let loader = 	this.presentLoading();
  	loader.present();
  	this.authProvider.register(name, email, password, cpassword).subscribe(res => {

  		loader.dismiss();
			localStorage.setItem('token', res['token']);
  		localStorage.setItem('user', JSON.stringify(res['user']));
  		this.navCtrl.setRoot(HomePage);

  	}, data => {

  		loader.dismiss();
  		var err;

  		for(let d in data.error){
  			err = data.error[d];
  		}

  		if (err.confirm_password) {
  			this.presentToast('pass', 'bottom');
  		}
  		if (err.email) {
  			this.presentToast('email', 'middle');	
  		}
  	});
  }

  presentToast(type, pos) {

  let msg : string;

  this.translateServ.get('ERROR').subscribe(error => {
  	if (type == 'email') {
  		msg = error.EMAIL_TAKEN;		
  	}else if(type == 'pass'){
  		msg = error.PASS_MISMATCH;
  	}else{
  		msg = error.UNKNOW;
  	}
  });

  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: pos
  });
  toast.present();
}

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner : 'crescent',
      showBackdrop : false
    });
    return loader;
  }


}
