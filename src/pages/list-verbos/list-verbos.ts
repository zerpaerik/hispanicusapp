import { Component } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { DiccionarioPage } from '../../modals/diccionario/diccionario';
import { VerbosProvider } from '../../providers/verbos/verbos';
import { ConfigProvider } from '../../providers/config/config';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-list-verbos',
  templateUrl: 'list-verbos.html',
})
export class ListVerbosPage {

	@ViewChild(Content) content: Content;

  public verbs;
  public keys;
  public items;
  public searching : boolean;
  public searchQuery: string = '';
  public isLoading : boolean = false;
  public type : number;

  constructor(public smartAudio : SmartAudioProvider, public configProvider : ConfigProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public vp : VerbosProvider) {

     this.items = [];
     this.searching = false;
     this.type = navParams.get('type');
     this.initializeItems();

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

  public initializeItems(){
    
    var loader = this.presentLoading();
    loader.present();
    this.vp.listVerbs(this.type).subscribe(data => {
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

  public initItems(data){
    for (var i in data) {
       for (var j in data[i]) {
         this.items.push(data[i][j]["infinitivo"]);
       }
     }     
  }

  public selectVerbo(xverbo){
    this.smartAudio.play('tapped');
    this.navCtrl.push('VerboRegularPage', {verbo : xverbo});
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

  public getItems(ev: any) {

    this.initItems(this.verbs);
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        this.searching = true;
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    this.searching = false;
  }

  public goTo(value){

    let val = value.toString();
  	let el = document.getElementById(val.toLowerCase());

  	if(el){	
      el.scrollIntoView({behavior: 'smooth', block : 'start'});
  	}else{
  		return;
  	}
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner : 'crescent',
      showBackdrop : false
    });
    return loader;
  }

}
