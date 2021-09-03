import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CampeonatosComponent } from '../../pages/campeonatos/campeonatos.component';
import { NewCampeonatosComponent } from 'src/app/pages/campeonatos/newcampeonatos.component';
import { TemporadasComponent } from 'src/app/pages/temporadas/temporadas.component';
import { NewTemporadasComponent } from 'src/app/pages/temporadas/newtemporadas.component';
import { TimesComponent } from 'src/app/pages/times/times.component';
import { NewTimesComponent } from 'src/app/pages/times/newtimes.component';
import { NewJogadoresComponent } from 'src/app/pages/jogadores/newjogadores.component';
import { JogadoresComponent } from 'src/app/pages/jogadores/jogadores.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'campeonatos',    component: CampeonatosComponent },
    { path: 'newcampeonatos/:id',    component: NewCampeonatosComponent },
    { path: 'newcampeonatos',    component: NewCampeonatosComponent },
    { path: 'temporadas',    component: TemporadasComponent },
    { path: 'newtemporadas/:id',    component: NewTemporadasComponent },
    { path: 'newtemporadas',    component: NewTemporadasComponent },
    { path: 'times',    component: TimesComponent },
    { path: 'newtimes/:id',    component: NewTimesComponent },
    { path: 'newtimes',    component: NewTimesComponent },
    { path: 'jogadores',    component: JogadoresComponent },
    { path: 'newjogadores/:id',    component: NewJogadoresComponent },
    { path: 'newjogadores',    component: NewJogadoresComponent },

   
];
