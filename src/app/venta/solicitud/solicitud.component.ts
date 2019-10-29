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
  ListaBanco = [];
  ListaZelle = [];
  BancosPersonales= [];
  ZellePersonal= [];
  solicitud = [];

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
    this.obtenerListaBanco();
    this.obtenerListaZelle();
    this.obtenerSolicitudes();
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

  obtenerListaBanco(){
    this.BancosPersonales= [];
    this.firebaseService.obtenerListaDeBanco()
    .subscribe( ListaBanco =>{
      this.ListaBanco = ListaBanco;
      ListaBanco.forEach(elemento => {
        if(elemento.usuario==this.user){
          console.log(elemento.usuario)
          console.log(this.user)
          this.BancosPersonales.push(elemento);
        }
      })
    })
  
  }

  obtenerListaZelle(){
    this.ZellePersonal = [];
    this.firebaseService.obtenerListaDeZelle()
    .subscribe( ListaZelle =>{
      this.ListaZelle = ListaZelle;
      ListaZelle.forEach(elemento => {
        if(elemento.usuario==this.user){
          this.ZellePersonal.push(elemento);
        }
      })
    
    })

}

obtenerSolicitudes(){
  this.firebaseService.obtenerSolicitudes()
  .subscribe( solicitud =>{
    this.solicitud = solicitud;
    console.log(solicitud);

  })

}

}
