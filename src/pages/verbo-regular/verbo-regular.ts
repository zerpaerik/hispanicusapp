import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-verbo-regular',
  templateUrl: 'verbo-regular.html',
})
export class VerboRegularPage {

	verbo : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.verbo = navParams.get('verbo');
  }


}
