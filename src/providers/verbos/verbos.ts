import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VerbosProvider {

	data : any;

  constructor(public http: HttpClient) {
    
  }

  listVerbs(){
  	return this.http.get('http://127.0.0.1:8000/api/v1/verbos');
  }

  getVerb(id){
  	let reg = localStorage.getItem('region') || JSON.stringify([0, 1, 2]);
  	console.log(reg);
  	return this.http.post('http://127.0.0.1:8000/api/v1/verbo/'+id, {region : reg}, {
  		headers : {'Accept' : 'appliacation/json'}
  	});
  }

}
