import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-diccionario',
  templateUrl: 'diccionario.html',
})
export class DiccionarioPage {

  letras:any;
  isModel:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.letras = this.navParams.get('data');
    this.changeSize();
  }

  close(e){
  	let callbackData : any = (e.target.innerText != 'Volver') ? e.target.innerText : false;
  	this.viewCtrl.dismiss(callbackData);
  }

  changeSize(){
    if (this.letras[0].length > 1) {
        this.isModel = true;
    }
  }

}
