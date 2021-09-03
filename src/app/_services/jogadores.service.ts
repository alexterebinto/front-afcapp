import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { config } from '../_helpers/configs';
import { Campeonato } from '../_models/campeonato';
import { Jogador } from '../_models/jogador';

@Injectable({ providedIn: 'root' })
export class JogadoresService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    
    register(jogador: Jogador) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        return this.http.post<any>(`${config.proxy}`+'?t=p&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/players`,jogador, { headers: config.httpHeader } )
        //return this.http.post(`${config.apiEndpoint}/players/`, jogador, { headers: header });
    }

    update(jogador: Jogador, id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        return this.http.post<any>(`${config.proxy}`+'?t=a&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/players/`+id,jogador, { headers: config.httpHeader } )
        //return this.http.post(`${config.apiEndpoint}/players/`+id, jogador, { headers: header });
    }

    getAll() {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/players`, { headers: config.httpHeader } )
        //return this.http.get(`${config.apiEndpoint}/players`, { headers: header });
    }

    getId(id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/players/`+id, { headers: config.httpHeader } )
        //return this.http.get(`${config.apiEndpoint}/players`+id, { headers: header });
    }


}