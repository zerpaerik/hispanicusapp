import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuVerboPage } from '../menu-verbo/menu-verbo';
import { ModalController } from 'ionic-angular';
import { ConfigPage } from '../../modals/config/config';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalCtrl : ModalController, public plt : Platform) {
    
  }
  
  ionViewCanEnter(){
    if (!localStorage.getItem('token')) {
      this.navCtrl.setRoot(LoginPage);
    }
    return true;    
  }

  goFavs(){
    this.navCtrl.push('FavoritesPage');
  }

  next(){
  	this.navCtrl.push(MenuVerboPage);
  }

  exit(){
    this.plt.exitApp();
  }

  public openModal(){
  	let modal = this.modalCtrl.create(ConfigPage);
    modal.present();
  }  

}
