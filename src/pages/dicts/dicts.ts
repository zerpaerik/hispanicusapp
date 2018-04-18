import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiccionarioPage } from '../../modals/diccionario/diccionario';
import { VerbosProvider } from '../../providers/verbos/verbos';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';


@IonicPage()
@Component({
  selector: 'page-dicts',
  templateUrl: 'dicts.html',
})

export class DictsPage {

  public verbs;
  public keys;

  constructor(public smartAudio : SmartAudioProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public vp : VerbosProvider) {
  	this.initializeItems();
    smartAudio.preload('tapped', 'assets/audio/waterdroplet.mp3');
    smartAudio.preload('fav', 'assets/audio/fav.mp3');
  }

  public initializeItems(){
    
    var loader = this.presentLoading();
    loader.present();
    this.vp.listVerbs(0).subscribe(data => {
      this.keys = Object.keys(data);
      this.verbs = data;
      console.log(data);
    }, error => {
      console.log(error);
      loader.dismiss();
    }, () => {
      loader.dismiss();
    });

  }

  public selectVerbo(xverbo){
    this.smartAudio.play('tapped');
    this.navCtrl.push('TutorialPage', {verbo : xverbo});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner : 'crescent',
      showBackdrop : false
    });
    return loader;
  }

  public openModal(data){
    this.smartAudio.play('tapped');
  	let modal = this.modalCtrl.create(DiccionarioPage, {data : this.keys});
    modal.onDidDismiss(data => {
    	if (data) {
    		this.goTo(data);
    	}
    });
    modal.present();
  }

  public goTo(value){
    this.smartAudio.play('tapped');
    let val = value.toString();
  	let el = document.getElementById(val.toLowerCase());

  	if(el){	
      el.scrollIntoView({behavior: 'smooth', block : 'start'});
  	}else{
  		return;
  	}
  }

}
