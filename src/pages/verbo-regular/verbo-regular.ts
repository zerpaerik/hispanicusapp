import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VerbosProvider } from '../../providers/verbos/verbos';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-verbo-regular',
  templateUrl: 'verbo-regular.html',
})
export class VerboRegularPage {

	verbo : any;
	verboData: any;
  verboKeys : any;

  informal : boolean;
  afirmativo : boolean;
  condition : any;

  constructor(public plt : Platform, public translateServ : TranslateService, public alertCtrl: AlertController, public loadingCtrl : LoadingController, public navCtrl: NavController, public navParams: NavParams, public vp : VerbosProvider) {
  	
    this.informal = true;
    this.afirmativo = true;
    this.condition = "item.negativo == '0' && !item.pronombre_reflex && !item.pronombre_formal_id";
    this.verbo = navParams.get('verbo');
    this.initData();
  }

  showRule(regla){

    var rule : string;

    this.translateServ.get('GENERAL').subscribe( general => {
      rule = general.RULE;
    });

    let alert = this.alertCtrl.create({
      title: rule,
      subTitle: regla,
      buttons : ["OK"]

    });
   alert.present();
  }        

  initData(){
    var loader = this.presentLoading();
    var alert = this.showAlert();

    loader.present();
    this.vp.getVerb(this.verbo.id)
      .subscribe(data => {
        this.verboData = data["data"];
        console.log(data["tutorial"]);
        this.verboKeys = Object.keys(this.verboData);
        loader.dismiss();
      },error => {
        loader.dismiss();
        alert.present();    
      });
    }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner : 'crescent',
      showBackdrop : false
    });
    return loader;
  }

showAlert() {

    var errorTitle : string;
    var errorSubt  : string;
    var errorTryAgain : string;
    var exit : string;

    this.translateServ.get('ERROR').subscribe(error => {
      errorTitle = error.TITLE;
      errorSubt  = error.SUBTITLE;
      errorTryAgain = error.TRY_AGAIN;
    });

    this.translateServ.get('GENERAL').subscribe(general => {
      exit = general.EXIT;
    });

    let alert = this.alertCtrl.create({
      title: errorTitle,
      subTitle: errorSubt,
      buttons : [{
        text : errorTryAgain,
        handler : () => {
          this.initData();
        }
      },
      {
        text : exit,
        handler : () => {
          this.plt.exitApp();
        }
      }
      ],
      enableBackdropDismiss: false
    });
    return alert;
  }
}
