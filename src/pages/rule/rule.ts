import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rule',
  templateUrl: 'rule.html',
})
export class RulePage {

	rules : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.rules = navParams.get('rules') || [];
  	console.log(this.rules);
  }

}
