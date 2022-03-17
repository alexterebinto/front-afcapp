import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Campeonato } from 'src/app/_models/campeonato';
import { CampeonatoService } from 'src/app/_services/campeonato.service';


@Component({
  selector: 'app-newcampeonatos',
  templateUrl: './newcampeonatos.component.html',
  styleUrls: ['./newcampeonatos.component.scss']
})
export class NewCampeonatosComponent implements OnInit {
  constructor(private route: ActivatedRoute, private campeonatoServices: CampeonatoService, private modalService: NgbModal, private router: Router, public dialog: MatDialog) {}

  loading = false;
  campeonato = new Campeonato();
  dataEsportes;
  closeResult = '';
  isEdit = false;
  lblbtn = "Criar campeonato";
  idCampeonato;
  @ViewChild("content") content: ElementRef;
  ngOnInit() {
    this.getAllSports()

    this.route.params.subscribe(params => {
      let id = params['id'];
     
      if(id){
        this.isEdit = true;
        this.idCampeonato = id;
        this.lblbtn = "Editar campeonato";
        this.getCampeonato(id);
      }
    
      
      });
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
      this.router.navigate(['/campeonatos']);
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


  getAllSports() {
    this.loading = true;

    this.campeonatoServices.getAllSports().pipe().subscribe(data =>{
      this.dataEsportes = data['data'];
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }


  registerCampeonato(){
    
    this.loading = true;

    if(this.isEdit){
      this.campeonatoServices.update(this.campeonato, this.idCampeonato).pipe().subscribe(data =>{
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
      this.campeonatoServices.register(this.campeonato).pipe().subscribe(data =>{
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

  getCampeonato(id){
    

    this.loading = true;

    this.campeonatoServices.getId(id).pipe().subscribe(data =>{
      this.campeonato = data["data"];
      console.log(this.campeonato)
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
    })



  }
  
  
}
