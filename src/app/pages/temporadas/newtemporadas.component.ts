import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Campeonato } from 'src/app/_models/campeonato';
import { Temporada } from 'src/app/_models/temporada';
import { CampeonatoService } from 'src/app/_services/campeonato.service';
import { TemporadaService } from 'src/app/_services/temporadas.service';
import { TimeService } from 'src/app/_services/time.service';


@Component({
  selector: 'app-newtemporadas',
  templateUrl: './newtemporadas.component.html',
  styleUrls: ['./newtemporadas.component.scss']
})
export class NewTemporadasComponent implements OnInit {
  constructor(private timeServices: TimeService, public dialog: MatDialog, private campeonatoServices: CampeonatoService, private temporadaServices: TemporadaService, private modalService: NgbModal, private router: Router) {}

  loading = false;
  campeonato = new Campeonato();
  temporada = new Temporada();
  dataCampeonatos = [];
  bla;
  selectedTimes;
  times = [];

  openDialogSuccess(message){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height:'200px',
      panelClass: 'verdePanel',
      //disableClose: true,
      data: {description: message, selectUnity: '', type: 'Sucesso'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/temporadas']);
    });
  }

  getAllTimes() {
    this.loading = true;

    this.timeServices.getAll().pipe().subscribe(data =>{
      console.log(data)
      this.times = data['data'];
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }


  ngOnInit() {
    
    this.getAll();
    
  }
  getAll() {
    this.loading = true;

    this.campeonatoServices.getAll().pipe().subscribe(data =>{
      this.dataCampeonatos = data['data'];
      this.loading = false;
      this.getAllTimes();
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }

  registerTemporada(){
    console.log(this.selectedTimes)
    /*this.loading = true;

    this.temporadaServices.register(this.temporada).pipe().subscribe(data =>{
      
      this.loading = false;

      if(data["type"]=="success"){
        this.openDialogSuccess(data["message"])
      }else{
        
      }


    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })*/


  }
  
}
