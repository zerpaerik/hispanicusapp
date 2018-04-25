import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {

	data : any;

  constructor(public http: HttpClient) {}

  setLang(xlang){
    
    let lang = {'lang' : xlang};

    return this.http.post('http://104.236.57.198/api/v1/lang', lang, {
      headers : {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    });
  
  }

  getLang(){

    return this.http.get('http://104.236.57.198/api/v1/lang', {
      headers : {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    });

  }

  setFavs(xfavs){
  	
  	let favs = {'favs' : xfavs};

  	return this.http.post('http://104.236.57.198/api/v1/favs', favs, {
  		headers : {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
  	});
  
  }

  getFavs(){

  	return this.http.get('http://104.236.57.198/api/v1/favs', {
  		headers : {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
  	});
    
  }

  setRegion(xregion){

    let region = {'modo' : xregion};

    return this.http.post('http://104.236.57.198/api/v1/region', region, {
      headers : {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    });

  }

  getRegion(){

    return this.http.get('http://104.236.57.198/api/v1/region', {
      headers : {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    });
    
  }

}
