import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HOST} from '../globals';

@Injectable()
export class VerbosProvider {

	data : any;

  constructor(public http: HttpClient) {
    
  }

  getFavs(){
    return this.http.get(HOST + '/api/v1/favoritos', {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        'Accept' : 'application/json'
      }
    });
  }

  getTuto(id){
    return this.http.get(HOST + '/api/v1/tutorial/' + id, {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        'Accept' : 'application/json'
      }
    });
  }

  listVerbs(tipo){
    let xlang = localStorage.getItem('lang') || "en";
  	return this.http.get(HOST + '/api/v1/verbos/' + tipo + '/' + xlang);
  }

  getVerb(id){
  	let reg = localStorage.getItem('region') || JSON.stringify([0, 2, 4]);
    let m = localStorage.getItem('rmode') || 1;
    let l = localStorage.getItem('lang') || "es";
  	
  	return this.http.post(HOST + '/api/v1/verbo/'+id, {region : reg, lang : l, modo : m}, {

  		headers : {'Accept' : 'appliacation/json'}
  	});
  }

}