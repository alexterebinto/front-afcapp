import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';
import { TemporadaService } from 'src/app/_services/temporadas.service';
import { DialogComponent } from '../dialog/dialog.component';

export interface DialogData {
  description: string;
  enableCancel: boolean;
  type: string;
}

@Component({
  selector: 'medlog-dialogtemporadas',
  templateUrl: './dialogtemporadas.component.html',
})
export class DialogTemporadasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogTemporadasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private temporadaServices: TemporadaService, public dialog: MatDialog, private authenticationService: AuthenticationService, private router: Router) {
      
    }
    loading = false;
    dataSource;
    temporada;
  ngOnInit(){
    this.getAll()
  }

  onNoClick(): void {
    
    this.dialogRef.close(this.temporada);
   
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
      console.log(data)
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

  onCancelClick(): void {
    this.dialogRef.close("0");
  }

}
