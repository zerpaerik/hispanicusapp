import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'page-diccionario',
  templateUrl: 'diccionario.html',
})
export class DiccionarioPage {

  letras:any;
  isModel:boolean;
  title : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public translate : TranslateService) {
  	this.letras = this.navParams.get('data');
    this.changeSize();
    this.translate.get('DICT').subscribe(dict => {
      if(this.isModel){
        this.title = dict.MODEL;
      }else{
        this.title = dict.LETTER;
      }
    });
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
