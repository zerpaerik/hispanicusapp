import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VerbosProvider } from '../../providers/verbos/verbos';

@Component({
  selector: 'page-verbo-regular',
  templateUrl: 'verbo-regular.html',
})
export class VerboRegularPage {

	verbo : any;
	verboData: any;
  verboKeys : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public vp : VerbosProvider) {
  	this.verbo = navParams.get('verbo');
  	vp.getVerb(this.verbo.id)
  		.subscribe(data => {
  			this.verboData = data["data"];
        this.verboKeys = Object.keys(this.verboData);
  		});
  }


}
