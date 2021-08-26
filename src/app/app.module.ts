import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {MatIconModule} from '@angular/material/icon';
import { DialogComponent } from './components/dialog/dialog.component';
import { AuthenticationService } from './_services';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {ErrorInterceptor} from './_helpers/error.interceptor'
import { CampeonatosComponent } from './pages/campeonatos/campeonatos.component';
import { NewCampeonatosComponent } from './pages/campeonatos/newcampeonatos.component';
import { MatTableModule } from '@angular/material/table'; 
import { TemporadasComponent } from './pages/temporadas/temporadas.component';
import { NewTemporadasComponent } from './pages/temporadas/newtemporadas.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    MatTableModule,
  
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CampeonatosComponent,
    DialogComponent,
    NewCampeonatosComponent,
    TemporadasComponent,
    NewTemporadasComponent,
  ],
  entryComponents: [DialogComponent],
  providers: [AuthenticationService, {provide: LocationStrategy, useClass: HashLocationStrategy},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
