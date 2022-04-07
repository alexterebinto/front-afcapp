import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Rodada } from 'src/app/_models/rodada';
import { AuthenticationService } from 'src/app/_services';
import { TemporadaService } from 'src/app/_services/temporadas.service';
import { TimeService } from 'src/app/_services/time.service';
import { DialogComponent } from '../dialog/dialog.component';
import {PrimeNGConfig, SelectItemGroup} from 'primeng/api';
import { JogadoresService } from 'src/app/_services/jogadores.service';
import { Jogo } from 'src/app/_models/jogo';
import { Arbitros } from 'src/app/_models/arbitros';

export interface DialogData {
  description: string;
  enableCancel: boolean;
  temporada: any;
  rodada: any;
  type: string;
}

@Component({
  selector: 'medlog-dialogevent',
  templateUrl: './dialogevent.component.html',
})
export class DialogEventComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private temporadaServices: TemporadaService, private jogadoresServices: JogadoresService, public dialog: MatDialog, private authenticationService: AuthenticationService, private router: Router, private timeServices: TimeService, private primeNGConfig: PrimeNGConfig) {
      
    }
    @ViewChild('ref', {static: true}) ref;
    loading = false;
    dataSource;
    rodada = new Rodada();
    events = [];
    dataTimes;
    totalGrad = 0;
    groupedTimes: SelectItemGroup[];
    selectedJogador;
    dataEvento;
    dataJogo = new Jogo();
    time1;
    time2;
    pt;
    dataJuiz = new Arbitros();
    
    realizado = false;
    

    ngOnInit(){
      var strs = this.data.rodada.match_descr.split(" X ");
      console.log(strs)
      this.time1 = strs[0];
      this.time2 = strs[1];
      //this.events.push({ e_id: 0, player_id: 0, match_id: this.data.rodada.id, ecount: 0, minutes: 0, t_id: 0})
      this.getPlayer(this.data.rodada.team1_id)
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

      this.getArbitros();
      
    }

    getPlayer(idTeam) {
      this.loading = true;
      this.groupedTimes = [];
      this.jogadoresServices.getAllPlayeresTeam(idTeam).pipe().subscribe(data =>{
        
        let subItem = [];
        for(var i = 0; i < data["data"][0]["players"].length; i++){
          subItem.push({label: data["data"][0]["players"][i]["first_name"]+ " "+ data["data"][0]["players"][i]["last_name"], value:data["data"][0]["players"][i]["id"], team: data["data"][0]["id"] })
        
          if(i == data["data"][0]["players"].length-1){
            let item = {
              label: data["data"][0]["t_name"], 
              value: data["data"][0]["id"],
              items: subItem
            }
            this.groupedTimes.push(item);
            this.getPlayer2(this.data.rodada.team2_id);
            this.getEvents();
          }
        
        }

        
        //this.loading = false;

        
      
        
      }, error => {
        console.log(error)
        this.loading = false;
    
      
        
      })


    }

    getEvents(){
      //this.loading = true;
      this.jogadoresServices.getEvents().pipe().subscribe(data =>{
        
        this.dataEvento = data["data"];
        //this.loading = false;
      }, error => {
        console.log(error)
        this.loading = false;
      })
    }

    getPlayer2(idTeam) {
      //this.loading = true;

      this.jogadoresServices.getAllPlayeresTeam(idTeam).pipe().subscribe(data =>{
        

        let subItem = [];
        for(var i = 0; i < data["data"][0]["players"].length; i++){
          subItem.push({label: data["data"][0]["players"][i]["first_name"]+ " "+ data["data"][0]["players"][i]["last_name"], value:data["data"][0]["players"][i]["id"], team: data["data"][0]["id"] })
        
          if(i == data["data"][0]["players"].length-1){
            let item = {
              label: data["data"][0]["t_name"], 
              value: data["data"][0]["id"],
              items: subItem
            }
            this.groupedTimes.push(item);
          }
        
        }

        //this.loading = false;
        this.getInfoJogo();

      }, error => {
        console.log(error)
        this.loading = false;
    
      
        
      })


    }

    getValue(idPlayer, position){
      //console.log(idPlayer)

      for(var i = 0; i < this.groupedTimes.length; i ++){
        var findPlayer = this.groupedTimes[i].items.find(item => item.value === idPlayer);
        if(findPlayer){
          this.events[position].t_id = findPlayer["team"];
        }
        
      }

      
    }

    getInfoJogo(){
      //this.loading = true;

      this.jogadoresServices.getInfoJogo(this.data.rodada.id).pipe().subscribe(data =>{
        
        this.dataJogo = data["data"];
        var nnData = this.dataJogo.m_date.split(" ");
        var convertDate = nnData[0].split("-");
        this.dataJogo.m_date = convertDate[2]+"/"+convertDate[1]+"/"+convertDate[0];
        this.events = [];
        this.events = data["data"]["events"];
        if(this.dataJogo.m_played =="0"){
          this.realizado = false;
        }else{
          this.realizado = true;
        }

        var strs = this.dataJogo.match_descr.split(" X ");
        //this.time1 = strs[0];
        //this.time2 = strs[1];
        
        this.loading = false;

      }, error => {
        console.log(error)
        this.loading = false;
    
      
        
      })
    }

    checkUncheck(){

      if(this.realizado){
        this.realizado = false;
      }else{
        this.realizado = true;
      }

     
      
    }

    onNoClick(): void {
    
      if(this.realizado){
        this.dataJogo.m_played = '1';
      }else{
        this.dataJogo.m_played = '0';
      }
      this.dataJogo.match_id = this.dataJogo.id;
      this.dataJogo.events = this.events;
      //
     
    // this.rodada.matchs = this.matches;
    // this.rodada.s_id = this.data.temporada.id;
    this.dialogRef.close(this.dataJogo);
    // this.dialogRef.close("0");
    
    }

 
  addEvent(){
    this.events.push({ e_id: 0, player_id: 0, match_id: this.data.rodada.id, ecount: 0, minutes: 0, t_id: 0})
    this.totalGrad = this.events.length-1;
  }

  removeEvent(){
    var newSheet = this.events;
    this.events = [];
    var cc = 0;
    for(var i=0; i< newSheet.length-1 ;i++){
      
        this.events.push({
          e_id: newSheet[i].e_id, 
          player_id: newSheet[i].player_id, 
          match_id: newSheet[i].match_id, 
          ecount: newSheet[i].ecount, 
          minutes: newSheet[i].minutes,
          t_id: newSheet[i].t_id
        })
        cc++;
      

      if(i==newSheet.length-1){
        this.totalGrad = this.events.length-1;
      }
    }
   
    //this.totalGrad = this.dataWorkedSheet.length-1;

  }

  getAll() {
    this.loading = true;
    
    this.timeServices.getAllSeason(this.data.temporada.id).pipe().subscribe(data =>{
      console.log(data)
      this.dataTimes = data["data"];
      //this.loading = false;
      
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }


  getArbitros() {
 
    
    this.temporadaServices.getArbitros().pipe().subscribe(data =>{
      console.log(data)
      this.dataJuiz = data["data"];
      
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }


  onCancelClick(): void {
    this.dialogRef.close("0");
  }

}
