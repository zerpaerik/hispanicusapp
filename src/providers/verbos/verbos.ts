import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VerbosProvider {

	data : any;

  constructor(public http: HttpClient) {
    
  }

  getFavs(){
    return this.http.get('http://localhost:8000/api/v1/favoritos', {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        'Accept' : 'application/json'
      }
    });
  }

  getTuto(id){
    return this.http.get('http://localhost:8000/api/v1/tutorial/' + id, {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        'Accept' : 'application/json'
      }
    });
  }

  listVerbs(tipo){
  	return this.http.get('http://localhost:8000/api/v1/verbos/' + tipo);
  }

  getVerb(id){
  	let reg = localStorage.getItem('region') || JSON.stringify([0, 1, 2]);
    let l = localStorage.getItem('lang') || "es";
  	
  	return this.http.post('http://localhost:8000/api/v1/verbo/'+id, {region : reg, lang : l}, {
  		headers : {'Accept' : 'appliacation/json'}
  	});
  }

}
