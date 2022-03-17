import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DialogEventComponent } from 'src/app/components/dialogevent/dialogevent.component';
import { DialogMatchComponent } from 'src/app/components/dialogmatch/dialogmatch.component';
import { Campeonato } from 'src/app/_models/campeonato';
import { AuthenticationService } from 'src/app/_services';
import { JogadoresService } from 'src/app/_services/jogadores.service';
import { TemporadaService } from 'src/app/_services/temporadas.service';
import { TimeService } from 'src/app/_services/time.service';

@Component({
  selector: 'app-rodada',
  templateUrl: './rodada.component.html',
  styleUrls: ['./rodada.component.scss']
})
export class RodadaComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, public dialog: MatDialog, private temporadaServices: TemporadaService, private modalService: NgbModal, private router: Router) {}
  
  @ViewChild("htmlForm")
  htmlForm: ElementRef;

  loading = false;
  dataSource;
  isEdit = false;
  idRodada;
  idTemporada;
  sname;
  form: FormGroup;
  id_match;
  token;
  temporada;
  isSelected = false;

  ngOnInit() {

    this.route.params.subscribe(params => {
      let id = params['id'];
      let ids = params['ids'];
      let sname = params['sname'];
     
      if(id){
        this.isEdit = true;
        this.idRodada = id;
        this.idTemporada = ids;
        this.sname = sname;
        this.getAll(this.idTemporada,this.idRodada);
        this.getTemporada(ids);
      }else{
        this.openDialogRodada();
      }
    
      
      });

    
  }

  getTemporada(id){
   
    this.loading = true;

    this.temporadaServices.getId(id).pipe().subscribe(data =>{
      this.isSelected = true;
      this.temporada = data["data"];
      this.loading = false;
      //this.getMatchesSeason();
    }, error => {
      console.log(error)
      this.loading = false;
    })



  }



  submit(idrodada) {
    var usuario = JSON.parse(localStorage.getItem('currentUser'));
    this.id_match = idrodada;
    this.token = usuario.access_token

    setTimeout(function () {
      this.htmlForm.nativeElement.submit();
    }.bind(this), 200);


   
  }

  openDialogMatch(){
    const dialogRef = this.dialog.open(DialogMatchComponent, {
      width: '900px',
      height: window.innerHeight.toString()+'px',
      panelClass: 'azulPanel',
      disableClose: true,
      data: {description: "Selecione a temporada", temporada: this.temporada, type: 'Criando rodada', enableCancel: true, rodadaData: this.sname}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      if((result != undefined) && (result !="0")){
        
       

        for(var i=0; i < result.matchs.length;i++){
          var arraySave = []
          arraySave.push({m_name: result.m_name, s_id: result.s_id, matchs: [], m_id: this.idRodada, is_playoff: result.is_playoff});
          for(var i=0; i < result.matchs.length;i++){
            
            if((result.matchs[i].m_date != "") || (result.matchs[i].m_time != "")){
              var newDate = new Date(result.matchs[i].m_date).toISOString().split("T");
              var newtime = new Date(result.matchs[i].m_time).toLocaleTimeString().split(":");
              result.matchs[i].m_date = newDate[0];
              result.matchs[i].m_time = newtime[0]+':'+newtime[1];
              result.matchs[i]["m_id"] = this.idRodada;
              arraySave[arraySave.length-1].matchs.push( result.matchs[i]);
            }

            if(i == result.matchs.length-1){
              console.log(arraySave[0])
              this.loading = true;

              this.temporadaServices.registerOneMatch(arraySave[0]).pipe().subscribe(data =>{
                console.log(data)
                this.loading = false;
                if(data["type"]=="success"){
                  this.openDialogSuccessPost(data["message"])
                }else{
                  this.openDialogError(data["message"])
                }
              }, error => {
                console.log(error)
                this.loading = false;
            
              })
            }
          }

        }

          

      }

      
    });
  }
  openEvent(rodada){


    const dialogRef = this.dialog.open(DialogEventComponent, {
      width: '1000px',
      height: window.innerHeight.toString()+'px',
      panelClass: 'azulPanel',
      disableClose: true,
      data: {description: "Selecione a temporada", rodada: rodada, type: 'Criando rodada', enableCancel: true}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      var dataReturn = result
      //console.log(dataReturn.m_date);

      var splitDate = dataReturn.m_date.toString().split("/")
      var newDate;
      var newtime;
      if(splitDate.length > 1){
        newDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
      }else{
        let dd = new Date(dataReturn.m_date).toISOString().split("T");
        newDate = dd[0];
      }

      dataReturn.m_date = newDate;

      var splitTime = dataReturn.m_time.toString().split(":")

      if(splitTime.length == 2){
        newtime = dataReturn.m_time;
      }else{
        let tt = new Date(dataReturn.m_time).toLocaleTimeString().split(":");
        newtime = tt[0]+":"+tt[1];
      }
      dataReturn.m_time = newtime;
      result = dataReturn;

      if((result != undefined) && (result !="0")){
        this.loading = true;
        
        
        this.temporadaServices.updateMatch(result, result.id).pipe().subscribe(data =>{
          console.log(data)
          this.loading = false;
          if(data["type"]=="success"){
            this.openDialogSuccessPost(data["message"])
          }else{
            this.openDialogError(data["message"])
          }
    
         
          
        }, error => {
          console.log(error)
          this.loading = false;
       
         
          
        })
      }

      
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

  openDialogSuccessPost(message){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height:'200px',
      panelClass: 'verdePanel',
      //disableClose: true,
      data: {description: message, selectUnity: '', type: 'Sucesso'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.idRodada){
        this.getAll(this.idTemporada,this.idRodada);
      }else{
        this.openDialogRodada();
      }
    });
  }


  getAll(ids, id) {
    this.loading = true;

    this.temporadaServices.getAllseasonMatch(ids, id).pipe().subscribe(data =>{
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

  openDialogRodada(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height:'200px',
      panelClass: 'verdePanel',
      //disableClose: true,
      data: {description: "Nenhuma rodada selecionada", selectUnity: '', type: 'Ops'}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/jogos']);
    });
  }


}
