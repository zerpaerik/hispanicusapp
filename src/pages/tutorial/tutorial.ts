import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerbosProvider } from '../../providers/verbos/verbos';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

	verbo : any;
	tutorial : any = "...";
  tenses : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public verbosProvider : VerbosProvider) {
  	
    this.verbo = navParams.get('verbo');
    this.tenses = navParams.get('isReflex');
  	this.verbosProvider.getTuto(this.verbo.id).subscribe(res => {
  		this.tutorial = res['tutorial'];
  	});
  }

  pro(t){
    t = t.replace(/\[/g, '<b class="rc">');
    t = t.replace(/\]/g, '</b>');
    t = t.replace(/\{/g, '<b class="bc">');
    t = t.replace(/\}/g, '</b>');
    return t;    
  }

  appendSe(){
    let w = this.verbo.infinitivo;
    console.log(w);
    console.log(this.tenses);
    if (this.tenses) {
      if (w.indexOf(".") >= 0) {
        w = w.replace(/.[0-9]/g, "se");
        return w;
      }else{
        return w+"se";
      }
    }else{
      return this.verbo.infinitivo;
    }
  }  

}
