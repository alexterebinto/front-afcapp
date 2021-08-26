import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Temporada } from 'src/app/_models/temporada';
import { TemporadaService } from 'src/app/_services/temporadas.service';

@Component({
  selector: 'app-temporadas',
  templateUrl: './temporadas.component.html',
  styleUrls: ['./temporadas.component.scss']
})
export class TemporadasComponent implements OnInit {
  constructor(private temporadaServices: TemporadaService, private modalService: NgbModal, private router: Router) {}
  
  loading = false;
  dataSource;
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;

    this.temporadaServices.getAll().pipe().subscribe(data =>{
      this.dataSource = data['data'];
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }



}
