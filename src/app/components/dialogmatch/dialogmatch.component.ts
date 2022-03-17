import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Rodada } from 'src/app/_models/rodada';
import { AuthenticationService } from 'src/app/_services';
import { TemporadaService } from 'src/app/_services/temporadas.service';
import { TimeService } from 'src/app/_services/time.service';
import { DialogComponent } from '../dialog/dialog.component';
import {PrimeNGConfig} from 'primeng/api';

export interface DialogData {
  description: string;
  enableCancel: boolean;
  temporada: any;
  type: string;
  rodadaData: string;
}

@Component({
  selector: 'medlog-dialogmatch',
  templateUrl: './dialogmatch.component.html',
})
export class DialogMatchComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogMatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private temporadaServices: TemporadaService, public dialog: MatDialog, private authenticationService: AuthenticationService, private router: Router, private timeServices: TimeService, private primeNGConfig: PrimeNGConfig) {
      
    }
    loading = false;
    dataSource;
    rodada = new Rodada();
    matches = [];
    dataTimes;
    totalGrad = 0;
    isAddGame = false;
    realizado = false;
    
  ngOnInit(){
    this.getAll()
    this.matches.push({ team1_id: 0,team2_id: 0, m_date: "",m_time: "",match_descr: ""})

    if(this.data.rodadaData){
      this.rodada.m_name = this.data.rodadaData;
      this.isAddGame = true;
     
    }

    this.primeNGConfig.setTranslation(
      {
        dayNames: ["Domingo", "Segunda Feira", "Terça Feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["D","S","T","Q","Q","S","S"],
        monthNames: [ "Janeiro ","Fevereiro ","Março ","Abril ","Maio ","Junho ","Julho ","Agosto ","Setembro ","Outubro ","Novembro ","Dezembro " ],
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        today: 'Hoje',
        clear: 'Limpar',
        dateFormat: 'mm/dd/yy'
      }
    );

    
  }

  onNoClick(): void {
    this.rodada.matchs = this.matches;
    this.rodada.s_id = this.data.temporada.id;
    this.rodada.is_playoff = this.realizado;
    this.dialogRef.close(this.rodada);
   
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
  addMAtch(){
    this.matches.push({ team1_id: 0,team2_id: 0, m_date: "",m_time: "",match_descr: ""})
    this.totalGrad = this.matches.length-1;
  }

  checkUncheck(){

    if(this.realizado){
      this.realizado = false;
    }else{
      this.realizado = true;
    }

   
    
  }

  deleteRow(position){
    var newSheet = this.matches;
    this.matches = [];
    var cc = 0;
    for(var i=0; i< newSheet.length ;i++){
      if(i != position){
        this.matches.push({
          nomeTurno: newSheet[i].nomeTurno, 
          jornada: newSheet[i].jornada, 
          horaInicio: newSheet[i].horaInicio, 
          horaFim: newSheet[i].horaFim, 
          profissionais: newSheet[i].profissionais
        })
        cc++;
      }

      if(i==newSheet.length-1){
        this.totalGrad = this.matches.length-1;
      }
    }
   
    //this.totalGrad = this.dataWorkedSheet.length-1;

  }

  getAll() {
    this.loading = true;
    
    this.timeServices.getAllSeason(this.data.temporada.id).pipe().subscribe(data =>{
      console.log(data)
      this.dataTimes = data["data"];
      this.loading = false;
      
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }

  onCancelClick(): void {
    this.dialogRef.close("0");
  }

}
