import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from '../Servicios/firestore.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private fs: FirestoreService,public auth: AuthService) { }

  public email: string ='';
  public password: string='';
  public name: string='';
  public telf: string ='';
  public admin: number=0;
  



  ngOnInit() {
  }
  onAddUser(){
    this.auth.registerEmail(this.email, this.password, this.name, this.telf, this.admin)
    .then((res)=> {
      this.router.navigate(['/inicio']);
    }).catch(err => alert("Error: "+err.message));
  }
  onlogin(): void{
    
    this.auth.loginEmail(this.email, this.password)
    .then((res)=>{
      this.router.navigate(['/inicio']);
    }).catch( err =>alert("Error: "+err.message));
    }
  
}
