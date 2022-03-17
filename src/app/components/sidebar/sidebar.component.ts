import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
/*export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];*/


export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/campeonatos', title: 'Campeonatos',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/temporadas', title: 'Temporadas',  icon:'ni-calendar-grid-58 text-pink', class: '' },
  { path: '/times', title: 'Times',  icon:'ni-user-run text-blue', class: '' },
  { path: '/jogadores', title: 'Jogadores',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/jogos', title: 'Jogos e Rodadas',  icon:'ni-chart-pie-35 text-primary', class: '' }
  
  
  
];


export const ROUTESLIST: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/campeonatos', title: 'Campeonatos',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/temporadas', title: 'Temporadas',  icon:'ni-calendar-grid-58 text-pink', class: '' },
  { path: '/times', title: 'Times',  icon:'ni-user-run text-blue', class: '' },
  { path: '/jogadores', title: 'Jogadores',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/jogos', title: 'Jogos e Rodadas',  icon:'ni-chart-pie-35 text-primary', class: '' },
  { path: '/newcampeonatos',    title: 'Criar Editar Campeonatos' ,  icon:'ni-chart-pie-35 text-primary', class: ''},
  { path: '/newtemporadas',    title: 'Criar Editar Temporadas',  icon:'ni-chart-pie-35 text-primary', class: '' },
  { path: '/newtimes',    title: 'Criar Editar Times' ,  icon:'ni-chart-pie-35 text-primary', class: ''},
  { path: '/newjogadores',    title: 'Criar Editar Jogadores' ,  icon:'ni-chart-pie-35 text-primary', class: ''},
  { path: '/rodada',    title: 'Jogos e Rodadas',  icon:'ni-chart-pie-35 text-primary', class: '' },

  
  
  
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
