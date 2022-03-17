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
        if(config.production){
            return this.http.post(`${config.apiEndpoint}/players`, jogador, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=p&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/players`,jogador, { headers: config.httpHeader } )
        }
        
    }

    update(jogador: Jogador, id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        if(config.production){
            return this.http.put(`${config.apiEndpoint}/players/`+id, jogador, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=a&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/players/`+id,jogador, { headers: config.httpHeader } )
        }
        
    }

    getAll(page) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/players?page=`+page, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/players?page=`+page, { headers: config.httpHeader } )
        }
        
    }

   
    getAllPlayeresTeam(idTeam) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/teams/`+idTeam+`/players`, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/teams/`+idTeam+`/players`, { headers: config.httpHeader } )
        }
        
    }

    getAllPlayeresSearch(searchParam) {
        let datas = {
            "search": searchParam
        }
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)
        
        if(config.production){
            return this.http.get(`${config.apiEndpoint}/players/search?search=`+searchParam, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/players/search?search=`+searchParam, datas, { headers: config.httpHeader } )
        }
        
    }

    getId(id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)

        if(config.production){
            return this.http.get(`${config.apiEndpoint}/players/`+id, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/players/`+id, { headers: config.httpHeader } )
        }
        
    }

    getEvents() {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)

        if(config.production){
            return this.http.get(`${config.apiEndpoint}/sports/1/events`, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/sports/1/events`, { headers: config.httpHeader } )
        }
        
    }

    getInfoJogo(id) {
        var usuario = JSON.parse(localStorage.getItem('currentUser'));
        var header = new HttpHeaders().set('Authorization', 'Bearer '+ usuario.access_token)

        if(config.production){
            return this.http.get(`${config.apiEndpoint}/matchs/`+id, { headers: header });
        }else{
            return this.http.post<any>(`${config.proxy}`+'?t=g&jwt='+usuario.access_token+'&u='+`${config.apiEndpoint}/matchs/`+id, { headers: config.httpHeader } )
        }
        
    }


}