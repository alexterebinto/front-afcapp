import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Time } from 'src/app/_models/time';
import { TimeService } from 'src/app/_services/time.service';


@Component({
  selector: 'app-newtimes',
  templateUrl: './newtimes.component.html',
  styleUrls: ['./newtimes.component.scss']
})
export class NewTimesComponent implements OnInit {
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private timeServices: TimeService, private modalService: NgbModal, private router: Router) {}

  loading = false;
  time = new Time();
  imageUrl;
  lblbtn = "Criar time";
  isEdit = false;
  idTime;
  
  ngOnInit() {

    this.route.params.subscribe(params => {
      let id = params['id'];
     
      if(id){
        this.isEdit = true;
        this.idTime = id;
        this.lblbtn = "Editar time";
        this.getTime(id);
      }
    
      
      });

  }
  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.time.t_emblem = reader.result.toString()
        this.imageUrl = reader.result.toString()
        
    };
}

openDialogSuccess(message){
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '300px',
    height:'200px',
    panelClass: 'verdePanel',
    //disableClose: true,
    data: {description: message, selectUnity: '', type: 'Sucesso'}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.router.navigate(['/times']);
  });
}

openDialogError(message){
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '300px',
    height:'200px',
    panelClass: 'vermelhoPanel',
    //disableClose: true,
    data: {description: JSON.stringify(message), selectUnity: '', type: 'Sucesso'}
  });

  dialogRef.afterClosed().subscribe(result => {
    
  });
}

  registerTime(){
    
    this.loading = true;

    if(this.isEdit){
      this.timeServices.update(this.time, this.idTime).pipe().subscribe(data =>{
        console.log(data)
        this.loading = false;
        if(data["success"]){
          this.openDialogSuccess(data["message"])
        }else{
          this.openDialogError(data["message"])
        }
      }, error => {
        console.log(error)
        this.loading = false;
     
       
        
      })
    }else{
      this.timeServices.register(this.time).pipe().subscribe(data =>{
        console.log(data)
        this.loading = false;
        if(data["type"]=="success"){
          this.openDialogSuccess(data["message"])
        }else{
          this.openDialogError(data["message"])
        }
      }, error => {
        console.log(error)
        this.loading = false;
     
       
        
      })
    }

    


  }

  getTime(id){
    

    this.loading = true;

    this.timeServices.getId(id).pipe().subscribe(data =>{
     
      this.time = data["data"];
      console.log(this.time)
      this.imageUrl = "https://images.sportmanager.com.br/curitibano/teams/"+this.time.t_emblem
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
    })



  }
  
}
