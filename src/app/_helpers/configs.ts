import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

var usuario = JSON.parse(localStorage.getItem('currentUser'));
var token;
if(usuario){
  token = usuario.access_token
  
}


export const config = {
    production: true,
    proxy: 'http://localhost:3000/api/mid/proxy',
    apiEndpoint: 'https://ccfutebolsociety.com/api/v1',
    tokenJwt: token,
    httpHeader :  new HttpHeaders().set('Authorization', 'Bearer '+ token)
  };


  
  