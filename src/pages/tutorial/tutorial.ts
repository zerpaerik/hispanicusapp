import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerbosProvider } from '../../providers/verbos/verbos';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

	verbo : any;
	tutorial : any = "...";

  constructor(public navCtrl: NavController, public navParams: NavParams, public verbosProvider : VerbosProvider) {
  	this.verbo = navParams.get('verbo');
  	console.log(this.verbo);
  	this.verbosProvider.getTuto(this.verbo.id).subscribe(res => {
  		this.tutorial = res['tutorial'];
  	});
  }

}
