import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiccionarioPage } from '../../modals/diccionario/diccionario';
import { VerbosProvider } from '../../providers/verbos/verbos';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { ConfigProvider } from '../../providers/config/config';

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

  constructor(public smartAudio : SmartAudioProvider, public configProvider : ConfigProvider,
              public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl : ModalController, public vp : VerbosProvider) {
   
    this.myInput = '';
    smartAudio.preload('tapped', 'assets/audio/waterdroplet.mp3');
    smartAudio.preload('fav', 'assets/audio/fav.mp3');
  }

  onInput(e){
    
    if (e.target.value && e.target.value != '') {
      this.sortedItems = this.getMatches(e.target.value);
    }
  }

  public getMatches(val){
    var ar = [];
    for(let item of this.unsorted){
      if (this.contain(item["infinitivo"], val) || this.contain(item["def"], val)) {
        ar.push(item);
      }
    }
    return ar;
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
      this.unsorted = [];
      for (var i in this.verbs) {
         for (var j in this.verbs[i]) {
           this.unsorted.push(this.verbs[i][j]);
         }
      }
    });

  }



  public getKeys(o){
    return Object.keys(o);
  }

  public selectVerbo(xverbo){
    this.smartAudio.play('tapped');
    this.navCtrl.push('VerboRegularPage', {verbo : xverbo});
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

  type(l){
    this.smartAudio.play('tapped');
    this.myInput += l;
    this.setFocus();
  }

  setFocus(){
    var search = document.getElementsByClassName('searchbar-input');
    search[0].setAttribute('id', "searchbar");
    document.getElementById('searchbar').focus();
  }

  delete(){
    if (this.myInput == '') {
      return;
    }
    this.myInput = this.myInput.slice(0, -1);
    this.setFocus();
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

  contain(s : string, m : string){
    return (s.indexOf(m) >= 0);
  }

  isFav(item){
    let f = JSON.parse(localStorage.getItem('favs'));
    
    if (this.myInclude(f, item)) {
      return true;
    }else{
      return false;
    }
    
  }

  public addFav(item){
    let f = JSON.parse(localStorage.getItem('favs'));
    this.smartAudio.play('fav');
    
    if (this.myInclude(f, item)) {
      let i = f.indexOf(item);
      f.splice(i, 1);
    }else{
      f.push(item);
    }

    localStorage.setItem('favs', JSON.stringify(f));
    
    this.configProvider.setFavs(f).subscribe(res => {
      console.log(res);
    });
    
  }

  public myInclude(a, v){
    for(let i in a){
      if (a[i] == v) {
        return true;
      }
    }
    return false;
  }

}
