import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import {VerbosProvider} from '../../providers/verbos/verbos';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

	public type : string;
	public title : any;
	public content : any;

  constructor(public vp : VerbosProvider, public sanitizer :  DomSanitizer, public translate : TranslateService, public navCtrl: NavController, public navParams: NavParams) {
  	
  	this.type = navParams.get('type');
  	this.vp.getInfo(this.type).subscribe(res => {
  		console.log(res);
  	}, error => {
  		console.log(error);
  	});

  }

}
