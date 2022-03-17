import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Campeonato } from 'src/app/_models/campeonato';
import { Temporada } from 'src/app/_models/temporada';
import { CampeonatoService } from 'src/app/_services/campeonato.service';
import { TemporadaService } from 'src/app/_services/temporadas.service';
import { TimeService } from 'src/app/_services/time.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-newtemporadas',
  templateUrl: './newtemporadas.component.html',
  styleUrls: ['./newtemporadas.component.scss']
})
export class NewTemporadasComponent implements OnInit {
  constructor(private route: ActivatedRoute, private timeServices: TimeService, public dialog: MatDialog, private campeonatoServices: CampeonatoService, private temporadaServices: TemporadaService, private modalService: NgbModal, private router: Router) {}

  loading = false;
  campeonato = new Campeonato();
  temporada = new Temporada();
  dataCampeonatos = [];
  bla;
  selectedTimes:any;
  times = [];
  dropdownList;
  isEdit = false;
  lblbtn = "Criar Temporada";
  idTemporada;
  selectedTimess;
  dropdownSettings = {};
  selectedItems;

  openDialogSuccess(message){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height:'200px',
      panelClass: 'verdePanel',
      //disableClose: true,
      data: {description: message, selectUnity: '', type: 'Sucesso'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/temporadas']);
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

  getAllTimes() {
    this.loading = true;

    this.timeServices.getAll().pipe().subscribe(data =>{
      console.log(data)
      this.times = data['data'];
      this.dropdownList = data['data'];
      this.loading = false;
      
      if (this.isEdit){
        this.getTemporada(this.idTemporada);
      }
    }, error => {
      console.log(error)
      this.loading = false;
   })


  }


  ngOnInit() {

     this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 't_name',
      selectAllText: 'Selecionar todos',
      unSelectAllText: 'Deselecionar',
      searchPlaceholderText: 'Buscar',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
    this.getAll();

   
    this.route.params.subscribe(params => {
      let id = params['id'];
     
      if(id){
        this.isEdit = true;
        this.idTemporada = id;
        this.lblbtn = "Editar temporada";
       
      }
    
      
      });
    
  }
  getAll() {
    this.loading = true;

    this.campeonatoServices.getAll().pipe().subscribe(data =>{
      this.dataCampeonatos = data['data'];
      this.loading = false;
      this.getAllTimes();
    }, error => {
      console.log(error)
      this.loading = false;
   
     
      
    })


  }

  registerTemporada(){
   

    if (this.isEdit){

      this.temporada.s_draw_away = this.temporada.s_draw_point;
      this.temporada.s_win_away = this.temporada.s_win_point;
      this.temporada.s_lost_away = this.temporada.s_lost_point;
      this.temporada.s_extra_win = this.temporada.s_win_point;
      this.temporada.s_extra_lost = this.temporada.s_lost_point;
      var arrayTime = [];
      this.loading = true;

      for(var i = 0; i < this.selectedItems.length; i++){
        arrayTime.push({team_id: this.selectedItems[i].id});

        if(i == this.selectedItems.length-1){
          
          this.temporada.teamsSeason = arrayTime;
         
          this.temporadaServices.update(this.temporada, this.idTemporada).pipe().subscribe(data =>{
        
            this.loading = false;
            console.log(data)
            if(data["success"]){
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
    }else{
      
      this.temporada.s_draw_away = this.temporada.s_draw_point;
      this.temporada.s_win_away = this.temporada.s_win_point;
      this.temporada.s_lost_away = this.temporada.s_lost_point;
      this.temporada.s_extra_win = this.temporada.s_win_point;
      this.temporada.s_extra_lost = this.temporada.s_lost_point;
      var arrayTime = [];
      this.loading = true;

      for(var i = 0; i < this.selectedItems.length; i++){
        arrayTime.push({team_id: this.selectedItems[i].id});

        if(i == this.selectedItems.length-1){
          this.temporada.teamsSeason = arrayTime;
         
          this.temporadaServices.register(this.temporada).pipe().subscribe(data =>{
        
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
    }
    

  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getTemporada(id){
    
   
    
    this.loading = true;

    this.temporadaServices.getId(id).pipe().subscribe(data =>{
      console.log(data)
      this.temporada = data["data"];
      this.selectedTimes = [];
      var newArray = [];
      for(var i=0; i < this.temporada.teamsSeason.length; i++){
        var filterTimes = this.times.filter(item => item.id === this.temporada.teamsSeason[i].team_id)
        
        if(filterTimes.length > 0){
          
            let data = {
              id:filterTimes[0]["id"],
              t_name: filterTimes[0]["t_name"]
            }
            newArray.push(data);
            if(i == this.temporada.teamsSeason.length-1){
              this.selectedItems = newArray;
            }
          }
          
         
      }


      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
    })



  }
  
}
