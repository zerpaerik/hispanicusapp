import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VerbosProvider } from '../../providers/verbos/verbos';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-verbo-regular',
  templateUrl: 'verbo-regular.html',
})
export class VerboRegularPage {

	verbo : any;
	verboData: any;
  verboKeys : any;

  constructor(public loadingCtrl : LoadingController, public navCtrl: NavController, public navParams: NavParams, public vp : VerbosProvider) {
  	
    this.verbo = navParams.get('verbo');
  	var loader = this.presentLoading();
    loader.present();
    vp.getVerb(this.verbo.id)
  		.subscribe(data => {
  			this.verboData = data["data"];
        console.log(data["data"]);
        this.verboKeys = Object.keys(this.verboData);
  		},error => {
        loader.dismiss();
      }, () => {
        loader.dismiss();
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    return loader;
  }

}
