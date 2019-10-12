import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/Servicios/firestore.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'q';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  public formGroup: FormGroup;
  user="";
  

  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder,private router: Router, public auth: AuthService) { }
  
  ngOnInit() {
    this.buildForm();
    this.auth.user$.forEach(u => { this.user=u.email
    console.log("usuario: "+this.user) })
  }

   buildForm() {
     //await delay(6000);
     console.log("NOJODA: "+this.user)
     this.auth.user$.forEach(u => { this.user=u.email; console.log("COÑOO: "+u.email)});
         this.formGroup = this.formBuilder.group({
           ref: [''],
           monto: ['', Validators.required ],
           tarifa: ['', Validators.required ],
           banco: ['', Validators.required ],
           usuario: [this.user, Validators.required ]
         });
     }

     
  onSubmit(value){
    this.firebaseService.createSolicitud(value)
    .then(
      res => {
        this.resetForm();
        //this.router.navigate(['/venta']);
      }
    )
  }

  resetForm() {
    this.formGroup = this.formBuilder.group({
      ref: [''],
      monto: new FormControl('', Validators.required),
      tarifa: new FormControl('', Validators.required),
      banco:  new FormControl('', Validators.required),
      usuario: [this.user, Validators.required ]
    });
  }

}
