import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListVerbosPage} from '../list-verbos/list-verbos';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';

@Component({
  selector: 'page-menu-verbo',
  templateUrl: 'menu-verbo.html',
})
export class MenuVerboPage {

  constructor(public smartAudio : SmartAudioProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  next(t){
  	this.smartAudio.play('tapped');
		this.navCtrl.push(ListVerbosPage, {type : t});
	}

}
