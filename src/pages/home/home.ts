import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuVerboPage } from '../menu-verbo/menu-verbo';
import { ModalController } from 'ionic-angular';
import { ConfigPage } from '../../modals/config/config';
import { Platform } from 'ionic-angular';
import { IsLogged }  from '../../interceptors/isLogged';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalCtrl : ModalController, public plt : Platform, public islogged : IsLogged) {
  	
  }
  
  ionViewCanEnter(){
    return this.islogged.isLoggedIn();
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
