import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { config } from '../_helpers/configs';
import { Campeonato } from '../_models/campeonato';

@Injectable({ providedIn: 'root' })
export class CampeonatoService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    
    register(campeonato: Campeonato) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        if(config.production){
            return this.http.post(`${config.apiEndpoint}/tournaments`, campeonato, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=p&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/tournaments`,campeonato, { headers: config.httpHeader } )
        }
        
    }

    update(campeonato: Campeonato, id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        if(config.production){
            return this.http.put(`${config.apiEndpoint}/tournaments/`+id, campeonato, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=a&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/tournaments`+id,campeonato, { headers: config.httpHeader } )
        }
        
    }

    getAll() {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/tournaments`, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/tournaments`, { headers: config.httpHeader } )
        }
        
    }

    getClassificacao(campeonato) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/dashboard/`+campeonato, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/dashboard/`+campeonato, { headers: config.httpHeader } )
        }
        
    }

    getId(id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/tournaments/`+id, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/tournaments/`+id, { headers: config.httpHeader } )
        }
        
    }

    getAllSports() {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/sports`, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/sports`, { headers: config.httpHeader } )
        }

        
    }


}