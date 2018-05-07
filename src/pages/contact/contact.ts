import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

	msg : string;

  constructor(public loadCtrl : LoadingController, public translate : TranslateService, public toastCtrl : ToastController, public authProvider : AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  sendMessage(){
  	if (this.msg.length > 10) {
  		let load = this.presentLoading();
  		load.present();
  		this.authProvider.sendMessage(this.msg)
  			.subscribe(res => {
  				
  				this.msg = "";
  				this.presentToast();  				
					this.navCtrl.pop();
					load.dismiss();

  			}, error => {
  				load.dismiss();
  				console.log(error);
  			});
  	}
  }

  presentLoading() {

  	let msg = "";

  	this.translate.get('HOME.CONTACT').subscribe(res => {
  		msg = res.SENDING;
  	}, error => {
  		msg = "Enviando";
  	});

    let loader = this.loadCtrl.create({
      spinner : 'crescent',
      content : msg, 
      showBackdrop : false
    });
    return loader;
  }

  presentToast(){
  	
  	let msg = "";

  	this.translate.get('HOME.CONTACT').subscribe(res => {
  		msg = res.SENT;
  	}, error => {
  		msg = "Su mensaje ha sido enviado";
  	});

  	let toast = this.toastCtrl.create({
 	    message: msg,
      duration: 3000,
      position: 'middle'
		});
  	toast.present();
  }

}
