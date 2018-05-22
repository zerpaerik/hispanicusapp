import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import {VerbosProvider} from '../../providers/verbos/verbos';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

	public type : string;
	public title : string;
  public info : string;
	public content : any;

  constructor(public plt : Platform, public alertCtrl: AlertController, public vp : VerbosProvider, public translate : TranslateService, public navCtrl: NavController, public navParams: NavParams) {
  	this.title = "...";
    
  	this.type = navParams.get('type');
    this.initializeItems();

  }

 initializeItems(){
    this.vp.getInfo(this.type).subscribe(res => {
      this.info = res["info"];
      this.title = res["title"];
    }, error => {
      if(!(error.status == 404)){
        this.showAlert().present();
      }
      
    });   
 }

showAlert() {

    var errorTitle : string;
    var errorSubt  : string;
    var errorTryAgain : string;
    var exit : string;

    this.translate.get('ERROR').subscribe(error => {
      errorTitle = error.TITLE;
      errorSubt  = error.SUBTITLE;
      errorTryAgain = error.TRY_AGAIN;
    });

    this.translate.get('GENERAL').subscribe(general => {
      exit = general.EXIT;
    });

    let alert = this.alertCtrl.create({
      title: errorTitle,
      subTitle: errorSubt,
      buttons : [{
        text : errorTryAgain,
        handler : () => {
          this.initializeItems();
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

  pro(t){
    if(!t) return "";
    t = t.replace(/\[/g, '<b class="rc">');
    t = t.replace(/\]/g, '</b>');
    t = t.replace(/\{/g, '<b class="bc">');
    t = t.replace(/\}/g, '</b>');
    return t;    
  }

}
