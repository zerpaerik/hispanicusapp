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

  tenses : boolean;
  tenseMsgs : any;
  tense : string;

  constructor(public plt : Platform, public translateServ : TranslateService, public alertCtrl: AlertController, public loadingCtrl : LoadingController, public navCtrl: NavController, public navParams: NavParams, public vp : VerbosProvider) {
  	
    this.informal = true;
    this.afirmativo = true;
    this.condition = "item.negativo == '0' && !item.pronombre_reflex && !item.pronombre_formal_id";
    this.verbo = navParams.get('verbo');
    this.tenseMsgs = [];

    this.translateServ.get('VERBS_MENU').subscribe(verb => {
      this.tenseMsgs = [verb.SIMPLE_TENSES, verb.COMPOUND_TENSES];
      this.tense = verb.SIMPLE_TENSES;
    });

  }

  setTense(){
    if (this.tenses) {
      this.tense = this.tenseMsgs[1];
       setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 500);
    }else{
      this.tense = this.tenseMsgs[0];
      setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 500);
    }
  }

  ionViewDidLoad(){
    this.initData();
  }

  informalNeg(){

     this.informal = true;
     this.afirmativo = false;
     setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 500);

  }

  informalAfmt(){
     this.informal = true;
     this.afirmativo = true;
     setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 500);
     

  }

  formalAfmt(){
     this.informal = false;
     this.afirmativo = true;
     setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 500);
     

  }  

  formalNeg(){
     this.informal = false;
     this.afirmativo = false;
     setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 500);
     

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
        this.verboKeys = Object.keys(this.verboData);
        loader.dismiss();
        console.log(this.verboData);
      },error => {
        loader.dismiss();
        alert.present();    
      }, () => {
        setTimeout(() => {
         this.hideEmpty();
        }, 500);
      });
    }

  showNotEmpty(){
    
    var items = document.getElementsByClassName('verbitem');

    for (var i = 0; i < items.length; i++) {
      var empty = true;

      for (var j = 1; j < items[i].children.length - 1; j++) {
        if (items[i].children[j].childElementCount > 0) {
          empty = false;
          break;
        }
      }

      if (!empty) {
        items[i]['hidden'] = false;
      }

    }
  }

  hideEmpty(){
    
    var items = document.getElementsByClassName('verbitem');

    for (var i = 0; i < items.length; i++) {
      var empty = false;

      for (var j = 1; j < items[i].children.length - 1; j++) {
        if (items[i].children[j].childElementCount > 0) {
          empty = false;
          break;
        }else{ empty = true; }
      }

      if (empty) {
        items[i]['hidden'] = true;
      }

    }
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

  goTop(){
    let el = document.getElementById('tense');
    if(el){  
      el.scrollIntoView({behavior: 'smooth', block : 'nearest'});
    }else{
      return;
    }    
  }
}
