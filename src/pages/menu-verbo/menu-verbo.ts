import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ListVerbosPage} from '../list-verbos/list-verbos';

@Component({
  selector: 'page-menu-verbo',
  templateUrl: 'menu-verbo.html',
})
export class MenuVerboPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  next(){
		this.navCtrl.push(ListVerbosPage);
	}

}
