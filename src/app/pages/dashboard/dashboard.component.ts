import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Chart from 'chart.js';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { AuthenticationService } from 'src/app/_services';
import { CampeonatoService } from 'src/app/_services/campeonato.service';
import { TemporadaService } from 'src/app/_services/temporadas.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, public dialog: MatDialog, private campeonatoServices: CampeonatoService, private temporadaServices: TemporadaService, private modalService: NgbModal, private router: Router) {}

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  loading = false;
  dataSource = [];
  dataCampeonato;
  campeonatos;
  ngOnInit() {
   // this.getClassificacao();
    this.getAllTemporada()
  }


  getAllTemporada() {
    this.loading = true;

    this.temporadaServices.getAll().pipe().subscribe(data =>{
      console.log(data)
      this.loading = false;

      if(data["message"] == "Expired token"){
        this.openDialogSuccess();
      }else{
        this.dataCampeonato = data['data'];
      }
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }


  getAll() {
    this.loading = true;

    this.campeonatoServices.getAll().pipe().subscribe(data =>{
     
      this.loading = false;

      if(data["message"] == "Expired token"){
        this.openDialogSuccess();
      }else{
        this.dataCampeonato = data['data'];
      }


    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }

  openDialogSuccess(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height:'200px',
      panelClass: 'verdePanel',
      //disableClose: true,
      data: {description: "Sua sessão expirou, favor logar novamente", selectUnity: '', type: 'Ops'}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    });
  }

  getClassificacao() {
    this.loading = true;

    this.campeonatoServices.getClassificacao(this.campeonatos).pipe().subscribe(data =>{
      
      this.loading = false;

      if(data["message"] == "Expired token"){
        this.openDialogSuccess();
      }else{
        this.dataSource = data['data']['standing'];

        console.log(data['data']['standing'])

          var resultado = [];
          this.dataSource.reduce(function (res, value) {
            if (!res[value.group_name]) {
              res[value.group_name] = {
                group: value.group_name,
                teams: 
                [{
                  draw: value.draw,
                  emblem: value.emblem,
                  goal_score: value.goal_score,
                  goals: value.goals,
                  goals_conc: value.goals_conc,
                  goals_dif: value.goals_dif,
                  group_id: value.group_id,
                  group_name: value.group_name,
                  lost: value.lost,
                  played: value.played,
                  points: value.points,
                  position: value.position,
                  team_id: value.team_id,
                  team_name: value.team_name,
                  win: value.win
                }]
                
                
              };
              resultado.push(res[value.group_name])
            }else{
              res[value.group_name].teams.push({
                draw: value.draw,
                emblem: value.emblem,
                goal_score: value.goal_score,
                goals: value.goals,
                goals_conc: value.goals_conc,
                goals_dif: value.goals_dif,
                group_id: value.group_id,
                group_name: value.group_name,
                lost: value.lost,
                played: value.played,
                points: value.points,
                position: value.position,
                team_id: value.team_id,
                team_name: value.team_name,
                win: value.win
              })
            }

            
            return res;
          }, {});

          this.dataSource = resultado;
          console.log(resultado)





      }


    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }
}
