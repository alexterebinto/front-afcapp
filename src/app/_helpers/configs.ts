import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

var usuario = JSON.parse(localStorage.getItem('currentUser'));
var token;
if(usuario){
  token = usuario.token
}


export const config = {
    production: false,
    apiEndpoint: 'http://ccfutebolsociety.com/api/v1',
    httpHeader :  new HttpHeaders().set('Authorization', 'Bearer '+ token)
  };


  
  