import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators,AbstractControl  } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from '../Servicios/firestore.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private formBuilder: FormBuilder, private fs: FirestoreService,public auth: AuthService) { }
  public formGroup: FormGroup;
  public email: string ='';
  public password: string='';
  public name: string='';
  public telf: string ='';
  public admin: number=0;
  



  ngOnInit() {
    //this.buildForm(); 
    
  }
/*
  buildForm() {
    //await delay(3000);

   function longitudMinima(minimum) {
     return function(input) {
       return input.value.length >= minimum ? null : { minLength: true };
     };
   }
   function nega(mi) {
     return function(input) {
       return input.value >= mi ? null : { mi: true };
     };
   }

        this.formGroup = this.formBuilder.group({
          ref: [''],
          name: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
          email:  new FormControl('', Validators.required),
          telf:  new FormControl('', Validators.required)
        });
    }
    */

    checkeo(){
     if( this.name.length >= 3 && this.telf.length > 10 && this.telf.startsWith("0") && this.email.endsWith("unimet.edu.ve")){
      this.onAddUser()
     }else if(this.name.length < 3 ){
      Swal.fire({
        title: '¡Error!',
        text: 'Debe ingresar un nombre valido',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
     }else if(this.telf.length < 11 || !this.telf.startsWith("0") ){
      Swal.fire({
        title: '¡Error!',
        text: 'Debe ingresar un numero de telefono valido',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
     }else {
      Swal.fire({
        title: '¡Error!',
        text: 'El correo debe pertenecer a la universidad metropolitana',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
     }
    }
    checkeo2(){
      if(this.email.endsWith("unimet.edu.ve")){
       this.onlogin()
      }else {
       
       Swal.fire({
        title: '¡Error!',
        text: 'El correo debe pertenecer a la universidad metropolitana',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      }
     }
     check3(){
       this.auth.ForgotPassword(this.email)
     }
  onAddUser(){
    
    this.auth.registerEmail(this.email, this.password, this.name, this.telf, this.admin)
    .then((res)=> {
      this.router.navigate(['/inicio']);
    }).catch(err =>Swal.fire({
      title: '¡Error!',
      text: err.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    }) );
  }
  onlogin(): void{
    
    this.auth.loginEmail(this.email, this.password)
    .then((res)=>{
      this.router.navigate(['/inicio']);
    }).catch( err =>Swal.fire({
      title: '¡Error!',
      text: err.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    }));
    }
  
}
