import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerbosProvider } from '../../providers/verbos/verbos'; 
import { ConfigProvider } from '../../providers/config/config'; 

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

	public verbs;

  constructor(public navCtrl: NavController, public navParams: NavParams, public verbosProvider : VerbosProvider, public configProvider : ConfigProvider) {
  	this.verbosProvider.getFavs().subscribe(res => {
    	this.verbs = res;
    });
  }

	public selectVerbo(xverbo){
    this.navCtrl.push('VerboRegularPage', {verbo : xverbo});
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

}
