import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Campeonato } from 'src/app/_models/campeonato';
import { CampeonatoService } from 'src/app/_services/campeonato.service';


@Component({
  selector: 'app-newcampeonatos',
  templateUrl: './newcampeonatos.component.html',
  styleUrls: ['./newcampeonatos.component.scss']
})
export class NewCampeonatosComponent implements OnInit {
  constructor(private campeonatoServices: CampeonatoService, private modalService: NgbModal, private router: Router) {}

  loading = false;
  campeonato = new Campeonato();

  ngOnInit() {

  }


  registerCampeonato(){
    
    this.loading = true;

    this.campeonatoServices.register(this.campeonato).pipe().subscribe(data =>{
      console.log(data)
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }
  
}
