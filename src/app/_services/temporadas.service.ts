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
        return this.http.post<any>(`${config.proxy}`+'?t=p&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/seasons`,temporada, { headers: config.httpHeader } )
        //return this.http.post(`${config.apiEndpoint}/seasons/`, temporada, { headers: header });
    }

    getAll() {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/seasons`, { headers: config.httpHeader } )
        //return this.http.get(`${config.apiEndpoint}/seasons`, { headers: header });
    }


}