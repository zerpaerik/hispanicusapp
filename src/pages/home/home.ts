import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuVerboPage } from '../menu-verbo/menu-verbo';
import { ModalController } from 'ionic-angular';
import { ConfigPage } from '../../modals/config/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalCtrl : ModalController) {
  	
  }
  
  next(){
  	this.navCtrl.push(MenuVerboPage);
  }

  public openModal(){
  	let modal = this.modalCtrl.create(ConfigPage);
    modal.present();
  }  

}
