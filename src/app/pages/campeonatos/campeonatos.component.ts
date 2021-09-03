import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Campeonato } from 'src/app/_models/campeonato';
import { AuthenticationService } from 'src/app/_services';
import { CampeonatoService } from 'src/app/_services/campeonato.service';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.component.html',
  styleUrls: ['./campeonatos.component.scss']
})
export class CampeonatosComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,public dialog: MatDialog, private campeonatoServices: CampeonatoService, private modalService: NgbModal, private router: Router) {}
  
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

    this.campeonatoServices.getAll().pipe().subscribe(data =>{
     
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
