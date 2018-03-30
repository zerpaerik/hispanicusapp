import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class VerbosProvider {

	data : any;

  constructor(public http: HttpClient) {
    
  }

  listVerbs(){
  	return this.http.get('http://127.0.0.1:8000/api/v1/verbos');
  }

}
