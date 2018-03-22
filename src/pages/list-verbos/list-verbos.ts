import { Component } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { DiccionarioPage } from '../../modals/diccionario/diccionario';
import { VerboRegularPage } from '../verbo-regular/verbo-regular';

@Component({
  selector: 'page-list-verbos',
  templateUrl: 'list-verbos.html',
})
export class ListVerbosPage {

	@ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController) {
  	
  }

  public selectVerbo(xverbo){
    this.navCtrl.push(VerboRegularPage, {verbo : xverbo});
  }

  public openModal(){
  	let modal = this.modalCtrl.create(DiccionarioPage, {data : this.fakeData });
    modal.onDidDismiss(data => {
    	if (data) {
    		this.goTo(data);
    	}
    });
    modal.present();
  }

  public goTo(value){
  	let el = document.getElementById(value.toString());
  	if(el){	
	  	let coor = el.getBoundingClientRect();
	  	this.content.scrollTo(coor.left, coor.top, 500);
  	}else{
  		return;
  	}
  }

  public fakeData = [{

  			letra : "A",
  			
  			data : [
	  			{
	  				inf : "abonar",
	  				t1  : "fertilize",
	  				t2  : "pay"
	  			},

	  			{
	  				inf : "abrazar",
	  				t1  : "burn",
	  				t2  : "scarch"
	  			},

	  			{
	  				inf : "abuchear",
	  				t1  : "boo",
	  				t2  : "jeer at"
	  			},

	  			{
	  				inf : "acampar",
	  				t1  : "camp",
	  				t2  : "set up camp"
	  			},
	  			{
	  				inf : "acelerar",
	  				t1  : "accelerate",
	  				t2  : "speed up"
	  			},
	  			{
	  				inf : "aclarar",
	  				t1  : "clarify",
	  				t2  : "rinse"
	  			},
	  			{
	  				inf : "adornar",
	  				t1  : "adorn",
	  				t2  : "decorate"
	  			},
	  		]

  		},
  		{
  			letra : "B",
  			data : [
  				{
  					inf : "bailar",
  					t1  : "dance",
  					t2  : ""
  				},
  				{
  					inf : "barrer",
  					t1  : "sweep",
  					t2  : "brush away"
  				},
  				{
  					inf : "boxear",
  					t1  : "box",
  					t2  : ""
  				},
  				{
  					inf : "bucear",
  					t1  : "scuba dive",
  					t2  : ""
  				},
  				{
  					inf : "borrar",
  					t1  : "dance",
  					t2  : ""
  				},
  				{
  					inf : "bromear",
  					t1  : "dance",
  					t2  : ""
  				},
  				{
  					inf : "brindar",
  					t1  : "dance",
  					t2  : ""
  				},
  			]
  		}
  	];

}
