import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  lang : string; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate : TranslateService,  public viewCtrl: ViewController) {

  }

  changeLang(){
  	let xlang = this.lang || 'en';
  	this.translate.use(xlang);
  }

  close(e){
  	let callbackData : any = (e.target.innerText != 'Volver') ? e.target.innerText : false;
  	this.viewCtrl.dismiss(callbackData);
  }

}
