import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DialogMatchComponent } from 'src/app/components/dialogmatch/dialogmatch.component';
import { DialogTemporadasComponent } from 'src/app/components/dialogtemporadas/dialogtemporadas.component';
import { Campeonato } from 'src/app/_models/campeonato';
import { AuthenticationService } from 'src/app/_services';
import { JogadoresService } from 'src/app/_services/jogadores.service';
import { TemporadaService } from 'src/app/_services/temporadas.service';
import { TimeService } from 'src/app/_services/time.service';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.scss']
})
export class JogosComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, public dialog: MatDialog, private jogadoresService: JogadoresService, private modalService: NgbModal, private router: Router, private temporadaServices: TemporadaService) {}
  
  loading = false;
  dataSource;
  isSelected = false;
  temporada;
  rodadas;
  dialogRefTemp;
  idTemporada;
  ngOnInit() {

    this.route.params.subscribe(params => {
      let id = params['id'];
     
      if(id){
        
        this.ngOnInit = id;
        this.getTemporada(id);
      }else{
        this.openDialogTemporada();
      }
    
      
      });
    
   // this.getAll();
  }

  getAll() {
    this.loading = true;

    this.jogadoresService.getAll(1).pipe().subscribe(data =>{
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
      if(this.dialogRefTemp){
        this.dialogRefTemp.close("1");
      }
      this.authenticationService.logout();
      this.router.navigate(['/login']);
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
      this.getMatchesSeason();
    });
  }

  openDialogTemporada(){
    this.dialogRefTemp = this.dialog.open(DialogTemporadasComponent, {
      width: '400px',
      height:'250px',
      panelClass: 'azulPanel',
      //disableClose: true,
      data: {description: "Selecione a temporada", selectUnity: '', type: 'Selecione a temporada', enableCancel: true}
    });
  
    this.dialogRefTemp.afterClosed().subscribe(result => {

      if((result != undefined) && (result !="0")){
        this.temporada = result;
        this.isSelected = true;
        this.getMatchesSeason();
      }

      
    });
  }

  registerMatch(){
    this.loading = true;

    this.jogadoresService.getAll(1).pipe().subscribe(data =>{
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

  openDialogMatch(){
    const dialogRef = this.dialog.open(DialogMatchComponent, {
      width: '900px',
      height: window.innerHeight.toString()+'px',
      panelClass: 'azulPanel',
      disableClose: true,
      data: {description: "Selecione a temporada", temporada: this.temporada, type: 'Criando rodada', enableCancel: true}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      if((result != undefined) && (result !="0")){
        var arraySave = []
        var r = "0";
        if(result.is_playoff){
          r = "1";
        }
        arraySave.push({m_name: result.m_name, s_id: result.s_id, matchs: [], is_playoff: r});
        for(var i=0; i < result.matchs.length;i++){
          
          if((result.matchs[i].m_date != "") || (result.matchs[i].m_time != "")){
            var newDate = new Date(result.matchs[i].m_date).toISOString().split("T");
            var newtime = new Date(result.matchs[i].m_time).toLocaleTimeString().split(":");
            result.matchs[i].m_date = newDate[0];
            result.matchs[i].m_time = newtime[0]+':'+newtime[1];
            arraySave[arraySave.length-1].matchs.push( result.matchs[i]);
          }

          if(i == result.matchs.length-1){
            this.loading = true;

            this.temporadaServices.registerMatch(arraySave[0]).pipe().subscribe(data =>{
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
    });
  }

  getMatchesSeason(){
    this.rodadas = [];
    //getAllMatch
    this.loading = true;
    this.temporadaServices.getAllMatch(this.temporada.id).pipe().subscribe(data =>{
      
      this.rodadas = data["data"][0]["matchdays"]
      this.loading = false;
      /*if(data["success"]){
        this.openDialogSuccess(data["message"])
      }else{
        this.openDialogError(data["message"])
      }*/

    
      
    }, error => {
      console.log(error)
      this.loading = false;
  
    
      
    })
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

  getTemporada(id){
   
    this.loading = true;

    this.temporadaServices.getId(id).pipe().subscribe(data =>{
      this.isSelected = true;
      this.temporada = data["data"];
      this.loading = false;
      this.getMatchesSeason();
    }, error => {
      console.log(error)
      this.loading = false;
    })



  }

}
