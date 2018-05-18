import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListVerbosPage} from '../list-verbos/list-verbos';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-menu-verbo',
  templateUrl: 'menu-verbo.html',
})
export class MenuVerboPage {

	spelling : string;

  constructor(public translate : TranslateService, public smartAudio : SmartAudioProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.translate.get('VERBS_MENU').subscribe(res => {
  		this.spelling = res.ORTH_CHANGE;
  	});
  }

  goInfo(t){
    this.navCtrl.push('InfoPage', {type:t});
  }

  next(t){
  	this.smartAudio.play('tapped');
		this.navCtrl.push(ListVerbosPage, {type : t});
	}

}
