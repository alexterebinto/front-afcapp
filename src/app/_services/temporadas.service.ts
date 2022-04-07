import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { config } from '../_helpers/configs';
import { Temporada } from '../_models/temporada';

@Injectable({ providedIn: 'root' })
export class TemporadaService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    
    register(temporada: Temporada) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.post(`${config.apiEndpoint}/seasons`, temporada, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=p&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/seasons`,temporada, { headers: config.httpHeader } )
        }

        
    }

    registerMatch(json: any) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.post(`${config.apiEndpoint}/matchdays`, json, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=p&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/matchdays`,json, { headers: config.httpHeader } )
        }
        
    }

    registerOneMatch(json: any) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.post(`${config.apiEndpoint}/matchs`, json, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=p&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/matchs`,json, { headers: config.httpHeader } )
        }
        
    }

    registeEvent(json: any) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.post(`${config.apiEndpoint}/matchevents`, json, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=p&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/matchevents`,json, { headers: config.httpHeader } )
        }
        
    }

    update(temporada: Temporada, id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        if(config.production){
            return this.http.put(`${config.apiEndpoint}/seasons/`+id, temporada, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=a&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/seasons/`+id,temporada, { headers: config.httpHeader } )
        }
        
    }

    postSumula(formData){
        return this.http.post("http://ccfutebolsociety.com/sumula/imprimirSumulaFut7.php", formData);
    }


    updateMatch(json: any, id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        if(config.production){
            return this.http.put(`${config.apiEndpoint}/matchevents/`+id, json, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=a&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/matchevents/`+id,json, { headers: config.httpHeader } )
        }
        
    }

    getAll() {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/seasons`, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/seasons`, { headers: config.httpHeader } )
        }
        
        
    }

    getAllMatch(id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
       
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/tournaments/seasons/`+id+`/matchdays`, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/tournaments/seasons/`+id+`/matchdays`, { headers: config.httpHeader } )
        }
        
    }

    getAllseasonMatch(ids,id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token);

        if(config.production){
            return this.http.get(`${config.apiEndpoint}/tournaments/seasons/`+ids+`/matchdays/`+id, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/tournaments/seasons/`+ids+`/matchdays/`+id, { headers: config.httpHeader } )
        }
        
    }

    getId(id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/seasons/`+id, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/seasons/`+id, { headers: config.httpHeader } )
        }
        
    }

    getArbitros(){
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/arbitros/`, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/arbitros/`, { headers: config.httpHeader } )
        }
    }


}