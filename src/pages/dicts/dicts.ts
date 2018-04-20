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
  public myInput : string;
  public unsorted;
  public sortedItems;

  constructor(public smartAudio : SmartAudioProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public vp : VerbosProvider) {
    this.myInput = '';
    smartAudio.preload('tapped', 'assets/audio/waterdroplet.mp3');
    smartAudio.preload('fav', 'assets/audio/fav.mp3');
  }

  onInput(e){
    
    if (e.target.value && e.target.value != '') {
      this.sortedItems = this.getMatches(e.target.value);
    }
  }

 checkValues(){
   console.log(this.myInput);
   console.log(this.sortedItems);
   console.log(this.sortedItems);

 }

  public getMatches(val){
    var ar = [];
    for(let item of this.unsorted[0]){
      if (this.contain(item["infinitivo"], val) || this.contain(item["def"], val)) {
        ar.push(item);
      }
    }
    return ar;
  }

  contain(s : string, m : string){
    return (s.indexOf(m) >= 0);
  }

  public ionViewDidLoad(){
    this.initializeItems();
  }

  public initializeItems(){
    
    var loader = this.presentLoading();
    loader.present();
    this.vp.listVerbs(0).subscribe(data => {
      this.keys = Object.keys(data);
      this.verbs = data;
    }, error => {
      console.log(error);
      loader.dismiss();
    }, () => {
      loader.dismiss();
      for (var i in this.verbs) {
         this.unsorted = [];
         this.unsorted.push(this.verbs[i]);
      }
    });

  }

  public getKeys(o){
    return Object.keys(o);
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
