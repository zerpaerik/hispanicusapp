import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
 
@Injectable()
export class MailValidator {
 
  debouncer: any;
 
  constructor(public authProvider: AuthProvider){}
 
  checkEmail(control: FormControl): any {
 
    clearTimeout(this.debouncer);
 
    return new Promise(resolve => {
 
      this.debouncer = setTimeout(() => {
 
        this.authProvider.checkEmailNotTaken(control.value).subscribe(res => {
          console.log(res['res']);
          if(res['res']){
            resolve(true);
          }else{
            resolve(null);
          }
        }, (err) => {
          resolve(true);
        });
 
      }, 1500);     
 
     });
  }
 
}
