import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerbosProvider } from '../../providers/verbos/verbos';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage()
@Component({
  selector: 'page-verbo-regular',
  templateUrl: 'verbo-regular.html',
})

export class VerboRegularPage {

	verbo : any;
	verboData: any;
  verboKeys : any;
  finalKeys : any; 
  rules : any;

  informal : boolean;
  afirmativo : boolean;
  condition : any;
  forma : string;

  tenses : boolean;
  tenseMsgs : any;
  tense : string;

  hsitem : boolean;

  formaVerbal : string;

  constructor(/*private screenOrientation: ScreenOrientation, */public smartAudio : SmartAudioProvider, public plt : Platform, public translateServ : TranslateService, public alertCtrl: AlertController, public loadingCtrl : LoadingController, public navCtrl: NavController, public navParams: NavParams, public vp : VerbosProvider) {
  	
    this.informal = true;
    this.afirmativo = true;
    this.hsitem = false;
    this.forma = 'Afirmativo informal';
    this.formaVerbal = 'todos';
    this.tenses = false;
    this.verbo = navParams.get('verbo');
    this.tenseMsgs = [];
   /* if (this.plt.is('cordova')) {
      let currentOrientation = this.screenOrientation.type;
      console.log(currentOrientation);
      console.log(this.verbo);
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }*/

    this.translateServ.get('VERBS_MENU').subscribe(verb => {
      this.tenseMsgs = [verb.SIMPLE_TENSES, verb.COMPOUND_TENSES];
      this.tense = verb.SIMPLE_TENSES;
    });

    smartAudio.preload('tapped', 'assets/audio/waterdroplet.mp3');
  }
/*
  ionViewWillLeave(){
    if (this.plt.is('cordova')) {
      this.screenOrientation.unlock();
    }
  }
*/
  setVerbalTime(){
    this.smartAudio.play('tapped');
    switch (this.formaVerbal) {
      case "fnp":
        document.getElementById("F.N.P.")['hidden'] = false;
        document.getElementById("indicativo")['hidden'] = true;
        document.getElementById("subjuntivo")['hidden'] = true;
        document.getElementById("imperativo")['hidden'] = true;
        break;
      case "indicativo":
        document.getElementById("F.N.P.")['hidden'] = true;
        document.getElementById("indicativo")['hidden'] = false;
        document.getElementById("subjuntivo")['hidden'] = true;
        document.getElementById("imperativo")['hidden'] = true;
        break;
      case "subjuntivo":
        document.getElementById("F.N.P.")['hidden'] = true;
        document.getElementById("indicativo")['hidden'] = true;
        document.getElementById("subjuntivo")['hidden'] = false;
        document.getElementById("imperativo")['hidden'] = true;
        break;
      case "imperativo":
        document.getElementById("F.N.P.")['hidden'] = true;
        document.getElementById("indicativo")['hidden'] = true;
        document.getElementById("subjuntivo")['hidden'] = true;
        document.getElementById("imperativo")['hidden'] = false;
        break;
      default:
        document.getElementById("F.N.P.")['hidden'] = false;
        document.getElementById("indicativo")['hidden'] = false;
        document.getElementById("subjuntivo")['hidden'] = false;
        document.getElementById("imperativo")['hidden'] = false;
        break;
    }
     setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 1);
  }

  public myInclude(a, v){

    if (a[0] == '*') {
       return true;
    }

    for(let i in a){
      if (a[i] == v) {
        return true;
      }
    }
    return false;
  }  

  public goTuto(xverbo){
    this.navCtrl.push('TutorialPage', {verbo : xverbo});
  }

  setTense(){

    if (this.tenses) {
      this.tense = this.tenseMsgs[1];
      if (this.forma == 'Afirmativo informal') {
        this.forma = 'Afirmativo reflexivo informal';
      }else if(this.forma == 'Afirmativo formal'){
        this.forma = 'Afirmativo reflexivo formal';
      }else if(this.forma == 'Negativo informal'){
        this.forma = 'Negativo reflexivo informal';
      }else if(this.forma == 'Negativo formal'){
        this.forma = 'Negativo reflexivo formal';
      }
    }else{
      this.tense = this.tenseMsgs[0];
      if (this.forma == 'Afirmativo reflexivo informal') {
        this.forma = 'Afirmativo informal';
      }else if(this.forma == 'Negativo reflexivo informal'){
        this.forma = 'Negativo informal';
      }else if(this.forma == 'Afirmativo reflexivo formal'){
        this.forma = 'Afirmativo formal';
      }else if(this.forma == 'Negativo reflexivo formal'){
        this.forma = 'Negativo formal';
      }
    }
    setTimeout(() => {
      this.hideEmpty();
      this.showNotEmpty();
     }, 1);

  }

  ionViewDidLoad(){
    this.initData();
  }

  initData(){
    var loader = this.presentLoading();
    var alert = this.showAlert();

    loader.present();
    this.vp.getVerb(this.verbo.id)
      .subscribe(data => {
        this.rules = data["reglas"];
        console.log(data);
        this.verboData = data["data"];
        this.verboKeys = Object.keys(this.verboData);
        
        loader.dismiss();
      },error => {
        loader.dismiss();
        alert.present();    
      }, () => {
        setTimeout(() => {
         this.hideEmpty();
        }, 1);
      });
    }

  getKeys(o){
    return Object.keys(o);
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
    this.smartAudio.play('tapped');    
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

  informalNeg(){

     this.informal = true;
     this.afirmativo = false;
     if (!this.tenses) {
       this.forma = 'Negativo informal';
     }else{
       this.forma = 'Negativo reflexivo informal';
     }
     
     setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 1);

  }

  informalAfmt(){
     this.informal = true;
     this.afirmativo = true;
     if (!this.tenses) {
       this.forma = 'Afirmativo informal';
     }else{
       this.forma = 'Afirmativo reflexivo informal';
     }
     
     setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 1);
     

  }

  capit(w:string){
    return w[0].toUpperCase() + w.substring(1);
  }

  formalAfmt(){
     this.informal = false;
     this.afirmativo = true;

     if (!this.tenses) {
       this.forma = 'Afirmativo formal';
     }else{
       this.forma = 'Afirmativo reflexivo formal';
     }
     
     setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 1);
     

  }  

  formalNeg(){
     this.informal = false;
     this.afirmativo = false;
     if (!this.tenses) {
       this.forma = 'Negativo formal'; 
     }else{
       this.forma = 'Negativo reflexivo formal'; 
     }
     
     setTimeout(() => {
       this.hideEmpty();
       this.showNotEmpty();
     }, 1);
  }

  getGramatical(value){

    switch (value) {
      case 1:
        if (localStorage.getItem("lang") == "en") {
          return (value+"st");            
        }
        return (value+"ª");
      case 2:
        if (localStorage.getItem("lang") == "en") {
          return (value+"nd");            
        }
          return (value+"ª");
      case 3:
        if (localStorage.getItem("lang") == "en") {
          return (value+"rd");    
        }
          return (value+"ª");
      default:
        return (value+"ª");  
    }
  }

  goInfo(t){
    this.navCtrl.push('InfoPage', { type:t });
  }

  goRule(rule, forma){
    this.navCtrl.push('RulePage', {rules : rule, forma : forma})
  }

}
