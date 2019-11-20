import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/Servicios/firestore.service';
import { FormBuilder, FormGroup, FormControl, Validators,AbstractControl  } from '@angular/forms';
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
  usuario="";
  ListaBanco = [];
  ListaZelle = [];
  BancosPersonales= [];
  ZellePersonal= [];
  solicitud = [];
  solicitudActual = [];
  idColeccionActual;
  Banco;

  // Crear servicio de Auth que devuelva el usuario actual, estado si esta logged in o no , etc. (Ivernon)

  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder,private router: Router, public auth: AuthService) {
    // Metodo async (Ivernon)
    auth.user$.forEach(u => { this.usuario=u.email;  console.log("usuario A: "+this.usuario)});
    
   }
  
  ngOnInit() {
    this.buildForm(); 
    this.obtenerListaBanco();
    this.obtenerListaZelle();
    this.obtenerSolicitudes();
    
this.formGroup.get('tarifa').valueChanges
.subscribe(value => {
  if(value) {
    this.formGroup.get('tarifa').setValidators(Validators.required)
  } else {
    this.formGroup.get('tarifa').clearValidators();
  }
}
);
  }

   tieneNegativo(input: FormControl) {
    const tieneneg = input.value.indexOf('-') >= 0;
    return tieneneg ? null : { necesitaneg: true };
  }
   buildForm() {
     //await delay(3000);
    console.log("Verifica esto: "+this.usuario); 

    
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
           monto: new FormControl('', [Validators.required,nega(1)]),
           tarifa: new FormControl('', [Validators.required,nega(1)]),
           banco:  new FormControl('', Validators.required),
           pago:  new FormControl(''),
           usuario: new FormControl(this.usuario),
         });
     }
     
  onSubmit(value: { usuario: string; banco: string; pago: string; }){
    console.log("USUARIOOO: "+this.usuario)
    console.log(value.banco +''+value.pago)
    value.usuario = (this.usuario);
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
      usuario: [this.usuario, Validators.required ]
    });
  }

  obtenerListaBanco(){
    this.BancosPersonales= [];
    this.firebaseService.obtenerListaDeBanco()
    .subscribe( ListaBanco =>{
      this.ListaBanco = ListaBanco;
      ListaBanco.forEach(elemento => {
        if(elemento.usuario==this.usuario){
          console.log(elemento.usuario)
          console.log(this.usuario)
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
        if(elemento.usuario==this.usuario){
          this.ZellePersonal.push(elemento);
        }
      })
    
    })

}

obtenerSolicitudes(){
  this.firebaseService.obtenerSolicitudes()
  .subscribe( solicitud =>{
    this.solicitud = solicitud;
    this.solicitud.forEach(elemento => {
    
      let tem= this.firebaseService.ObtenerUnBanco(elemento.banco)['nombreBanco'];
      elemento.banco = tem; 
      console.log(tem);
    })
   

  })

}

colocarID(item){
  this.idColeccionActual=item.id;
  this.solicitudActual=item;
  //console.log("Colección: "+item.id+' '+item.ref+' '+item.banco+' '+item.monto+' '+item.tarifa);
 }
     
 ActualizarSolicitudes(value: { usuario: string; banco: string; pago: string; }){
   console.log("USUARIOOO: "+this.usuario)
   console.log(value.banco +''+value.pago)
   value.usuario = (this.usuario);
   console.log(this.formGroup.controls)
   this.firebaseService.ActualizarSolicitudes(this.idColeccionActual,value)
   .then(
     res => {
       this.resetForm();
       //this.router.navigate(['/venta']);
     }
   )
 }

 EliminarSolicitudes(item){
  console.log(item.id);
  this.firebaseService.deleteSolicitudes(item.id);
}

ObtenerUnBanco(id){
  this.Banco=this.firebaseService.ObtenerUnBanco(id);
}


}
