import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuVerboPage } from '../menu-verbo/menu-verbo';
import { ModalController } from 'ionic-angular';
import { ConfigPage } from '../../modals/config/config';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public smartAudio : SmartAudioProvider, public navCtrl: NavController, private modalCtrl : ModalController, public plt : Platform) {
  
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



}
