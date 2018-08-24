import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuVerboPage } from '../menu-verbo/menu-verbo';
import { ModalController } from 'ionic-angular';
import { ConfigPage } from '../../modals/config/config';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private auth : AuthProvider, public alertCtrl: AlertController, public smartAudio : SmartAudioProvider, public navCtrl: NavController, private modalCtrl : ModalController, public plt : Platform) {
    this.showPrompt();
  }
  
  ionViewCanEnter(){
    if (!localStorage.getItem('token')) {
      this.navCtrl.setRoot(LoginPage);
    }
    return true;    
  }

  goFavs(){
    this.smartAudio.play('tapped');
    this.navCtrl.push('FavoritesPage');
  }

  goDict(){
    this.smartAudio.play('tapped');
    this.navCtrl.push('DictsPage');
  }

  goContact(){
    this.smartAudio.play('tapped');
    this.navCtrl.push('ContactPage');
  }

  next(){
  	this.smartAudio.play('tapped');
    this.navCtrl.push(MenuVerboPage);
  }

  exit(){
    this.plt.exitApp();
  }

  public openModal(){
    this.smartAudio.play('tapped');
  	let modal = this.modalCtrl.create(ConfigPage);
    modal.present();
  }  

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Codigo de acceso',
      enableBackdropDismiss : false,
      message: "Introduzca su codigo de acceso",
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
            this.auth.consumeCode(localStorage.getItem('uuid'), data.codigo)
            .subscribe(res => {
              console.log(res);
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
