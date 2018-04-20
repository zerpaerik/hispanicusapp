import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

	public type : number;
	public title : any;
	public content : any;

  constructor(public sanitizer :  DomSanitizer, public translate : TranslateService, public navCtrl: NavController, public navParams: NavParams) {
  	
  	this.type = navParams.get('type');

  	this.translate.get('INFO').subscribe(info => {
  		switch (this.type) {
  			case 1:
  				this.title = this.sanitizer.bypassSecurityTrustHtml(info.PERSONAL_PRONOUN.TITLE);
  				this.content = this.sanitizer.bypassSecurityTrustHtml(info.PERSONAL_PRONOUN.CONTENT);
  				break;
  			
        case 2:
          this.title = this.sanitizer.bypassSecurityTrustHtml(info.PERSONAL_PRONOUN.TITLE);
          this.content = this.sanitizer.bypassSecurityTrustHtml(info.PERSONAL_PRONOUN.CONTENT);
          break;

  			default:
  				this.title = "Titulo de la informacion";
          this.content = "Cotenido";
  				break;
  		}
  	});


  }

}
