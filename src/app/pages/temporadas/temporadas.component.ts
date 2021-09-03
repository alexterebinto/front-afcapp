import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Temporada } from 'src/app/_models/temporada';
import { AuthenticationService } from 'src/app/_services';
import { TemporadaService } from 'src/app/_services/temporadas.service';

@Component({
  selector: 'app-temporadas',
  templateUrl: './temporadas.component.html',
  styleUrls: ['./temporadas.component.scss']
})
export class TemporadasComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, public dialog: MatDialog, private temporadaServices: TemporadaService, private modalService: NgbModal, private router: Router) {}
  
  loading = false;
  dataSource;
  ngOnInit() {
    this.getAll();
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

  getAll() {
    this.loading = true;

    this.temporadaServices.getAll().pipe().subscribe(data =>{
     
      this.loading = false;

      if(data["message"] == "Expired token"){
        this.openDialogSuccess();
      }else{
        this.dataSource = data['data'];
      }
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }



}
