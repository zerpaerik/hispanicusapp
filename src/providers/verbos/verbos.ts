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

  getInfo(tipo){

    let xlang = localStorage.getItem('lang') || 'en';
    tipo = tipo.replace(/ /g, "_");
    tipo = tipo.replace(/_$/, "");
    tipo = tipo.replace(/á/g, "a");
    tipo = tipo.replace(/é/g, "e");
    tipo = tipo.replace(/í/g, "i");
    tipo = tipo.replace(/ó/g, "o");
    tipo = tipo.replace(/ú/g, "u");
    tipo = tipo.replace(/\(/g, "");
    tipo = tipo.replace(/\)/g, "");
    tipo = tipo.toLowerCase();
    return this.http.get(HOST + '/api/v1/info/'+xlang+'/'+tipo);
    
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
  	return this.http.get(HOST + '/api/v1/verbos/' + tipo + '/' + xlang, {
      headers : {
        'uuid' : localStorage.getItem('uuid')
      }
    });
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