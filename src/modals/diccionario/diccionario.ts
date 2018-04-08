import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-diccionario',
  templateUrl: 'diccionario.html',
})
export class DiccionarioPage {

  letras:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.letras = this.navParams.get('data');
    console.log(this.letras);
  }

  close(e){
  	let callbackData : any = (e.target.innerText != 'Volver') ? e.target.innerText : false;
  	this.viewCtrl.dismiss(callbackData);
  }

}
