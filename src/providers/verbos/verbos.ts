import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VerbosProvider {

	data : any;

  constructor(public http: HttpClient) {
    
  }

  getFavs(){
    return this.http.get('http://104.236.57.198/api/v1/favoritos', {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        'Accept' : 'application/json'
      }
    });
  }

  getTuto(id){
    return this.http.get('http://104.236.57.198/api/v1/tutorial/' + id, {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        'Accept' : 'application/json'
      }
    });
  }

  listVerbs(tipo){
  	return this.http.get('http://104.236.57.198/api/v1/verbos/' + tipo);
  }

  getVerb(id){
  	let reg = localStorage.getItem('region') || JSON.stringify([0, 1, 2]);
  	
  	return this.http.post('http://104.236.57.198/api/v1/verbo/'+id, {region : reg}, {
  		headers : {'Accept' : 'appliacation/json'}
  	});
  }

}
