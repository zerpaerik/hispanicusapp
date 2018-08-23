import { Component } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { DiccionarioPage } from '../../modals/diccionario/diccionario';
import { VerbosProvider } from '../../providers/verbos/verbos';
import { ConfigProvider } from '../../providers/config/config';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-list-all',
  templateUrl: 'list-all.html',
})
export class ListAllPage {

	@ViewChild(Content) content: Content;

  public verbs;
  public keys;
  public infokw;
  public items;
  public isLoading : boolean = false;
  public types   : number;
  public title   : string;
  public myInput : string = '';
  public unsorted;
  public sortedItems;  

  constructor(public plt : Platform, public alertCtrl: AlertController, public translateServ : TranslateService,
              public smartAudio : SmartAudioProvider, public configProvider : ConfigProvider, public loadingCtrl: LoadingController,
              public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public vp : VerbosProvider) {
  
    this.verbs = this.navParams.get('verbos') || [];
    this.title = this.navParams.get('letter') || '?';

  }

  onInput(e){
    e.target.value = e.target.value.toLowerCase();
    if (e.target.value && e.target.value != '' && e.target.value.length > 3) {
      this.sortedItems = this.getMatches(e.target.value);
    }
  }

  public getMatches(val){
    var ar = [];
    for(let item of this.verbs){
      if (this.contain(item["infinitivo"], val) || this.contain(item["def"], val)) {
        ar.push(item);
      }
    }
    return ar;
  }

  contain(s : string, m : string){
    return (s.indexOf(m) >= 0);
  }

  isFav(item){
    let f = JSON.parse(localStorage.getItem('favs'));
    
    if (this.myInclude(f, item)) {
      return true;
    }else{
      return false;
    }
    
  }

  public addFav(item){
    let f = JSON.parse(localStorage.getItem('favs'));
    if (this.myInclude(f, item)) {
      let i = f.indexOf(item);
      f.splice(i, 1);
    }else{
      f.push(item);
    }

    localStorage.setItem('favs', JSON.stringify(f));
    
    this.configProvider.setFavs(f).subscribe(res => {
      console.log(res);
    });
    
  }

  public myInclude(a, v){
    for(let i in a){
      if (a[i] == v) {
        return true;
      }
    }
    return false;
  }

  public selectVerbo(xverbo){
    this.smartAudio.play('tapped');
    this.navCtrl.push('VerboRegularPage', {verbo : xverbo});
  }

  goInfo(){
    this.navCtrl.push('InfoPage', {type:this.infokw});
  }

  type(l){
    this.smartAudio.play('tapped');
    this.myInput += l;
    this.setFocus();
  }

  setFocus(){
    var search = document.getElementsByClassName('searchbar-input');
    search[0].setAttribute('id', "searchbar");
    document.getElementById('searchbar').focus();
  }  

  delete(){
    if (this.myInput == '') {
      return;
    }
    this.myInput = this.myInput.slice(0, -1);
    this.setFocus();
  }

}