import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HOST} from '../globals';

@Injectable()
export class AuthProvider {

	data : any;

  constructor(public http: HttpClient) {
    
  }

  checkUuid(){
    return this.http.get(HOST+'/api/v1/checkuuid', {
      headers: {
        'uuid' : localStorage.getItem('uuid') || 'null',
        'pass' : '!pass'
      }
    });
  }

  login(xemail, xpasword){
  	
  	let authData = {'email' : xemail, 'password' : xpasword, 'confirm_password' : xpasword, 'name' : xemail, 'origin' : '2'};

  	return this.http.post(HOST + '/api/v1/login', authData, {
  		headers : {'Accept' : 'application/json'}
  	});
  
  }

  consumeCode(uuid, pass){
    let code = {device_id: uuid, code : pass};
    return this.http.post(HOST + '/api/v1/consume_code', code, {
      headers : {'Accept' : 'application/json'}
    });
  }

  register(xname, xemail, xpassword, xconfirm){

  	let regData = {'name' : xname, 'email' : xemail, 'password' : xpassword, 'confirm_password' : xconfirm, 'origin' : '2'};
  	
  	return this.http.post(HOST + '/api/v1/register', regData, {
  		headers : {'Accept' : 'application/json'}
  	});
    
  }

  logout(){

  	let token = localStorage.getItem('token');
  	if (!token) { return; }

  	return this.http.post(HOST + '/api/v1/logout', {}, {
  		headers : {
  			'Authorization' : "Bearer " + localStorage.getItem('token'),
  			'Accept' : 'application/json'
  		}
  	});
  }

  sendMessage(message){

    let token = localStorage.getItem('token');
    if (!token) { return; }

    return this.http.post(HOST + '/api/v1/sendmessage', {msg : message}, {
      headers : {
        'Authorization' : "Bearer " + localStorage.getItem('token'),
        'Accept' : 'application/json'
      }
    });
  }  

  checkEmailNotTaken(xemail){
    let email = {'email' : xemail};
    return this.http.post(HOST + '/api/v1/checkemail', email, {
      headers : {
        'Accept' : 'application/json'
      }
    });
  }



}
