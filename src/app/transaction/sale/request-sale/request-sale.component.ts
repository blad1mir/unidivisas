import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/Servicios/firestore.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'q';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './request-sale.component.html',
  styleUrls: ['./request-sale.component.css']
})
export class SolicitudComponent implements OnInit {
  public formGroup: FormGroup;
  user="";

  // Crear servicio de Auth que devuelva el usuario actual, estado si esta logged in o no , etc. (Ivernon)

  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder,private router: Router, public auth: AuthService) {
    // Metodo async (Ivernon)
    auth.user$.subscribe( user => { // Reestructurar todo despues de Auth
      this.user = user.email
      console.log("usuario A: " + this.user);
    })
    
   }
  
  ngOnInit() {
    this.buildForm(); 
  }

   buildForm() {
     //await delay(3000);
    console.log("Verifica esto: "+this.user); 
   

         this.formGroup = this.formBuilder.group({
           ref: [''],
           monto: new FormControl('', Validators.required),
           tarifa: new FormControl('', Validators.required),
           banco:  new FormControl('', Validators.required),
           pago:  new FormControl('', Validators.required),
           usuario: new FormControl(this.user, Validators.required),
         });
     }

     
  onSubmit(value: { usuario: string; banco: string; pago: string; }){
    console.log("USUARIOOO: "+this.user)
    console.log(value.banco +''+value.pago)
    value.usuario = (this.user);
    console.log(this.formGroup.controls)
    
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
      pago:  new FormControl('', Validators.required),
      usuario: [this.user, Validators.required ]
    });
  }

}
