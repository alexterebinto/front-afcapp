import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Campeonato } from 'src/app/_models/campeonato';
import { Temporada } from 'src/app/_models/temporada';
import { CampeonatoService } from 'src/app/_services/campeonato.service';
import { TemporadaService } from 'src/app/_services/temporadas.service';


@Component({
  selector: 'app-newtemporadas',
  templateUrl: './newtemporadas.component.html',
  styleUrls: ['./newtemporadas.component.scss']
})
export class NewTemporadasComponent implements OnInit {
  constructor(private campeonatoServices: CampeonatoService, private temporadaServices: TemporadaService, private modalService: NgbModal, private router: Router) {}

  loading = false;
  campeonato = new Campeonato();
  temporada = new Temporada();
  dataCampeonatos = [];
  bla;
  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.loading = true;

    this.campeonatoServices.getAll().pipe().subscribe(data =>{
      this.dataCampeonatos = data['data'];
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }

  registerTemporada(){
    
    this.loading = true;

    this.temporadaServices.register(this.temporada).pipe().subscribe(data =>{
      console.log(data)
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }
  
}
