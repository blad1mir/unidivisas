import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../Servicios/firestore.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { delay } from 'q';
import { Solicitud } from 'src/app/modelos/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';



@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})

export class VentaComponent implements OnInit {
  solicitud = [];
  solicitudActual = [];
  idColeccionActual;
  usuario="";
  Transferencias= [];
  public formGroup: FormGroup;
  constructor(public firebaseService: FirestoreService,private afAuth: AngularFireAuth, private formBuilder: FormBuilder, private router: Router, public auth: AuthService) {
    // Transformarlo en un servicio.! 
    auth.user$.forEach(u => { this.usuario=u.email;  console.log("usuario A: "+this.usuario)});
  }

  ngOnInit() {
    //this.getData();

    this.obtenerSolicitudes();
    this.buildForm();
    this.obtenerListaTransferencia();
  }

   buildForm() {
   
        this.formGroup = this.formBuilder.group({
          ref: [''],
          monto: ['', Validators.required ],
          tarifa: ['', Validators.required ],
          banco: ['', Validators.required ],
          pago: ['', Validators.required ],
          usuario: ['', Validators.required ]
        
        });
    }


  obtenerSolicitudes(){
    this.firebaseService.obtenerSolicitudes()
    .subscribe( solicitud =>{
      this.solicitud = solicitud;
      console.log(solicitud);
  
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

  obtenerListaTransferencia(){
    this.Transferencias= [];
    this.firebaseService.obtenerListaDeTransferencia()
    .subscribe((transSnap) => {
      this.Transferencias = [];
      transSnap.forEach(elemento => {
        if(elemento.vendedor==this.afAuth.auth.currentUser.email){
          this.Transferencias.push(elemento);
        }
      })
    })
  
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


  EliminarSolicitudes(item){
    console.log(item.id);
    this.firebaseService.deleteSolicitudes(item.id);
  }

  EliminarTransferencias(item){
    console.log(item);
    this.firebaseService.eliminarTransferencias(item.idventa);
  }
  aceptar(item){
    console.log(item.id);
    //this.firebaseService.updateTransfer(item.id);
  }

  //   async wait(valor){
  //   await delay(5000);
  //   console.log('after: '+valor);
  //   console.log("Waited 5s");
  // };

}