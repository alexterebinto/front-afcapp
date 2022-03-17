import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { config } from '../_helpers/configs';
import { Time } from '../_models/time';

@Injectable({ providedIn: 'root' })
export class TimeService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    
    register(time: Time) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token);

        if(config.production){
            return this.http.post(`${config.apiEndpoint}/teams`, time, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=p&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/teams`,time, { headers: config.httpHeader } )
        }
        
    }

    update(time: Time, id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.put(`${config.apiEndpoint}/teams/`+id, time, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=a&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/teams/`+id,time, { headers: config.httpHeader } )
        }
        
    }

    getAll() {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/teams`, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/teams`, { headers: config.httpHeader } )
        }
        
        
    }

    getAllSeason(id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)

        if(config.production){
            return this.http.get(`${config.apiEndpoint}/teamSeason/`+id, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/teamSeason/`+id, { headers: config.httpHeader } )
        }
        
    }

    getId(id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token);

        if(config.production){
            return this.http.get(`${config.apiEndpoint}/teams/`+id, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/teams/`+id, { headers: config.httpHeader } )
        }
        
    }

    getAllPosition() {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)

        if(config.production){
            return this.http.get(`${config.apiEndpoint}/sports/1/positions`, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/sports/1/positions`, { headers: config.httpHeader } )
        }
    }


}