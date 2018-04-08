import { Component } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { DiccionarioPage } from '../../modals/diccionario/diccionario';
import { VerboRegularPage } from '../verbo-regular/verbo-regular';
import { VerbosProvider } from '../../providers/verbos/verbos';
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

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public vp : VerbosProvider) {

     this.items = [];
     this.searching = false;
     this.initializeItems();

  }

  public addFav(item){
    console.log(item);
  }

  public initializeItems(){
    
    var loader = this.presentLoading();
    loader.present();
    this.vp.listVerbs().subscribe(data => {
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
    this.navCtrl.push(VerboRegularPage, {verbo : xverbo});
  }

  public openModal(data){
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
