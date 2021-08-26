import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Campeonato } from 'src/app/_models/campeonato';
import { CampeonatoService } from 'src/app/_services/campeonato.service';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.component.html',
  styleUrls: ['./campeonatos.component.scss']
})
export class CampeonatosComponent implements OnInit {
  constructor(private campeonatoServices: CampeonatoService, private modalService: NgbModal, private router: Router) {}
  
  loading = false;
  dataSource;
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;

    this.campeonatoServices.getAll().pipe().subscribe(data =>{
      this.dataSource = data['data'];
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }



}
