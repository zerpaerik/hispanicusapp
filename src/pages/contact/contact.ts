import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

	msg : string;

  constructor(public authProvider : AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  sendMessage(){
  	if (this.msg.length > 10) {
  		this.authProvider.sendMessage(this.msg)
  			.subscribe(res => {
  				console.log("Mensaje Enviado");
  				this.msg = "";
  			}, error => {
  				console.log(error);
  			});
  	}
  }

}
