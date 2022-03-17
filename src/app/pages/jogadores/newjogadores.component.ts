import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Jogador } from 'src/app/_models/jogador';
import { Time } from 'src/app/_models/time';
import { JogadoresService } from 'src/app/_services/jogadores.service';
import { TimeService } from 'src/app/_services/time.service';


@Component({
  selector: 'app-newjogadores',
  templateUrl: './newjogadores.component.html',
  styleUrls: ['./newjogadores.component.scss']
})
export class NewJogadoresComponent implements OnInit {
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private timeServices: TimeService, private jogadoresService: JogadoresService, private modalService: NgbModal, private router: Router) {}

  loading = false;
  time = new Time();
  jogador = new Jogador();
  imageUrl;
  dataTimes;
  dataPosicao;
  isEdit = false;
  lblbtn = "Criar jogador";
  idJogador;


  ngOnInit() {
    this.getAllPosition();

    this.route.params.subscribe(params => {
      let id = params['id'];
     
      if(id){
        this.isEdit = true;
        this.idJogador = id;
        this.lblbtn = "Editar jogador";
        this.getJogador(id);
      }
    
      
      });

  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.jogador.def_img = reader.result.toString()
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
      this.router.navigate(['/jogadores']);
    });
  }

  openDialogError(message){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height:'200px',
      panelClass: 'vermelhoPanel',
      //disableClose: true,
      data: {description: JSON.stringify(message), selectUnity: '', type: 'Ops'}
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  getAllPosition(){
    this.loading = true;

      this.timeServices.getAllPosition().pipe().subscribe(data =>{
        this.dataPosicao = data["data"][0]["positions"];
        this.loading = false;
        this.getAllTimes();
      }, error => {
        console.log(error)
        this.loading = false;
    
      
        
      })
  }

  getAllTimes(){
    this.loading = true;

      this.timeServices.getAll().pipe().subscribe(data =>{
      this.dataTimes = data['data'];
        this.loading = false;
        
      }, error => {
        console.log(error)
        this.loading = false;
    
      
        
      })
  }

  registerJogador(){
    

    if((this.jogador.position_id) && (this.jogador.team_id)){

      this.loading = true;

      console.log(this.jogador)

      if(this.isEdit){
        this.jogadoresService.update(this.jogador, this.idJogador).pipe().subscribe(data =>{
          console.log(data)
          this.loading = false;
          if(data["success"]){
            this.openDialogSuccess(data["message"])
          }else if(data["type"] == "fail"){
            this.openDialogError("Campos nome, sobrenome e posição do jogador são obrigatórios")
          }else{
            this.openDialogError(data["message"])
          }
        }, error => {
          console.log(error)
          this.loading = false;
      
        
          
        })
      }else{
        this.jogadoresService.register(this.jogador).pipe().subscribe(data =>{
          console.log(data)
          this.loading = false;
          if(data["type"]=="success"){
            this.openDialogSuccess(data["message"])
          }else if(data["type"] == "fail"){
            this.openDialogError("Campos nome, sobrenome e posição do jogador são obrigatórios")
          }else{
            this.openDialogError(data["message"])
          }
        }, error => {
          console.log(error)
          this.loading = false;
      
        
          
        })
      }

    }else{
      this.openDialogError("Campo posição do jogador e time são obrigatórios")
    }


  }

  getJogador(id){
    

    this.loading = true;

    this.jogadoresService.getId(id).pipe().subscribe(data =>{
     
      this.jogador = data["data"];
      this.imageUrl = "https://ccfutebolsociety.com/storage/players/"+this.jogador.def_img
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
    })



  }
  
}
