import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rule',
  templateUrl: 'rule.html',
})
export class RulePage {

	rules : any;
	forma : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.rules = navParams.get('rules') || [];
  	this.forma = navParams.get('forma') || 'Afirmativo formal';
  	console.log(this.rules);
  	console.log(this.forma);
  }

  enchular(s){
    s = s.replace(/\[/g, '<b class="rc">');
    s = s.replace(/\]/g, '</b>');
    s = s.replace(/\{/g, '<b class="bc">');
    s = s.replace(/\}/g, '</b>');
    return s;
  }

}
