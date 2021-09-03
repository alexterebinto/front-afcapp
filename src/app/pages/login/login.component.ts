import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
//import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, first, Observable } from 'rxjs';
//import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { AuthenticationService } from 'src/app/_services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    AuthenticationService, // seu provider aqui
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  
  constructor(private authServices: AuthenticationService, private modalService: NgbModal, private router: Router) {}

  

  closeResult = '';
  loginForm: FormGroup;
  email = "";
  password = "";
  loading = false;

  @ViewChild("content") content: ElementRef;

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  

  open() {
    
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  

  login(){
    this.loading = true;
    this.authServices.login(this.email, this.password).pipe(first()).subscribe(data =>{
      
      this.loading = false;

      if(data["error"]){
        this.open()
      }else{
        this.router.navigate(['/dashboard']);
      }
    }, error => {
      console.log(error)
      this.loading = false;
      this.open()
      //this.openDialog(error["message"])
      
    })

  }

}
