import { Component } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { DiccionarioPage } from '../../modals/diccionario/diccionario';
import { VerboRegularPage } from '../verbo-regular/verbo-regular';
import { VerbosProvider } from '../../providers/verbos/verbos';

@Component({
  selector: 'page-list-verbos',
  templateUrl: 'list-verbos.html',
})
export class ListVerbosPage {

	@ViewChild(Content) content: Content;

  public verbs;
  public keys;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public vp : VerbosProvider) {
    
  	vp.listVerbs().subscribe(data => {
      this.keys = Object.keys(data);
      this.verbs = data; 
    });

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

  public goTo(value){
  	let el = document.getElementById(value.toString());
  	if(el){	
      el.scrollIntoView({behavior: 'smooth', block : 'start'});
  	}else{
  		return;
  	}
  }
}
