import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        
        return this.http.post(`${config.apiEndpoint}/tournaments/`, campeonato, { headers: config.httpHeader });
    }

    getAll() {
        
        return this.http.get(`${config.apiEndpoint}/tournaments`, { headers: config.httpHeader });
    }


}