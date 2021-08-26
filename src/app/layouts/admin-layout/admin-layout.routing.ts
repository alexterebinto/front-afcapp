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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'campeonatos',    component: CampeonatosComponent },
    { path: 'newcampeonatos',    component: NewCampeonatosComponent },
    { path: 'temporadas',    component: TemporadasComponent },
    { path: 'newtemporadas',    component: NewTemporadasComponent }
];
