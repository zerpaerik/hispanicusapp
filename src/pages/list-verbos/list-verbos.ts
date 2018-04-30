import { Component } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { DiccionarioPage } from '../../modals/diccionario/diccionario';
import { VerbosProvider } from '../../providers/verbos/verbos';
import { ConfigProvider } from '../../providers/config/config';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-list-verbos',
  templateUrl: 'list-verbos.html',
})
export class ListVerbosPage {

	@ViewChild(Content) content: Content;

  public verbs;
  public keys;
  public items;
  public isLoading : boolean = false;
  public types : number;
  public title : string;
  public myInput : string = '';
  public unsorted;
  public sortedItems;  

  constructor(public plt : Platform, public alertCtrl: AlertController, public translateServ : TranslateService,
              public smartAudio : SmartAudioProvider, public configProvider : ConfigProvider, public loadingCtrl: LoadingController,
              public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public vp : VerbosProvider) {

     this.items = [];
     this.types = navParams.get('type');
     this.initializeItems();
     this.translateServ.get('VERBS_MENU').subscribe(word => {
      switch (this.types) {
       case 1:
         this.title = word.REGULAR;
         break;
       case 2:
         this.title = word.ORTH_CHANGE;
         break;
       case 3:
         this.title = word.IRREGULAR;
         break; 
       default:
         this.title = word.ALL;
         break;
      }
     }, error => {
      switch (this.types) {
       case 1:
         this.title = "Regular";
         break;
       case 2:
         this.title = "Regular <br> (With spelling change)";
         break;
       case 3:
         this.title = "Irregular";
         break; 
       default:
         this.title = "All";
         break;
      }
    });
     
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

  public initializeItems(){
    
    var loader = this.presentLoading();
    loader.present();
    this.vp.listVerbs(this.types).subscribe(data => {
      this.keys = Object.keys(data);
      this.verbs = data;
      console.log(data);
    }, error => {
      this.showAlert().present();
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

  showAlert() {

    var errorTitle : string;
    var errorSubt  : string;
    var errorTryAgain : string;
    var exit : string;

    this.translateServ.get('ERROR').subscribe(error => {
      errorTitle = error.TITLE;
      errorSubt  = error.SUBTITLE;
      errorTryAgain = error.TRY_AGAIN;
    });

    this.translateServ.get('GENERAL').subscribe(general => {
      exit = general.EXIT;
    });

    let alert = this.alertCtrl.create({
      title: errorTitle,
      subTitle: errorSubt,
      buttons : [{
        text : errorTryAgain,
        handler : () => {
          this.initializeItems();
        }
      },
      {
        text : exit,
        handler : () => {
          this.plt.exitApp();
        }
      }
      ],
      enableBackdropDismiss: false
    });
    return alert;
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


}
