import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Campeonato } from 'src/app/_models/campeonato';
import { AuthenticationService } from 'src/app/_services';
import { JogadoresService } from 'src/app/_services/jogadores.service';
import { TimeService } from 'src/app/_services/time.service';

@Component({
  selector: 'app-jogadores',
  templateUrl: './jogadores.component.html',
  styleUrls: ['./jogadores.component.scss']
})
export class JogadoresComponent implements OnInit {
  constructor(private timeServices: TimeService, private authenticationService: AuthenticationService, public dialog: MatDialog, private jogadoresService: JogadoresService, private modalService: NgbModal, private router: Router) {}
  
  loading = false;
  dataSource;
  page;
  pagination;
  value1 = 'off';
  stateOptions;
  jogadorSearch;
  team_id;
  dataTimes;

  ngOnInit() {
    this.stateOptions = [{label: 'Todos', value: 'off'}, {label: 'Por Time', value: 'on'}];
    this.page = 1;
    //this.getAll(this.page, "page1");
    this.getAllTimes();
  }

  parseValue(valor){
    var parsed = parseFloat(valor);
    var casted = +valor;
    return parsed === casted  && !isNaN(parsed) && !isNaN(casted);
  }

  searchCancel(){
    this.jogadorSearch = "";
    this.page = 1;
    this.getAll(this.page, "page1");
  }

  searchJogador(){
    this.loading = true;
    this.jogadoresService.getAllPlayeresSearch(this.jogadorSearch).pipe().subscribe(data =>{
      console.log(data['data'])
      this.dataSource = data['data'];
      this.pagination = [];
      this.page = 1;
      this.loading = false;
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
  getAll(page, url) {

    if(page != "..."){
      if((page == "pagination.previous") && (url != null)){
        this.page = this.page -1
      }else if((page == "pagination.next") && (url != null)){
        this.page = Number(this.page) + Number(1)
      }else{
        this.page = page;
      }
      
      this.loading = true;

      this.jogadoresService.getAll(this.page).pipe().subscribe(data =>{
        this.loading = false;
        if(data["message"] == "Expired token"){
          this.openDialogSuccess();
        }else{
          this.dataSource = data['data'];

          this.pagination = data.links ;

        

        }

      
        
      }, error => {
        console.log(error)
        this.loading = false;
    
      
        
      })
    }

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


}
