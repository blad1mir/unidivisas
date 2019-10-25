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
  items: Array<any>;
  solicitud = [];
  solActual = [];
  val = 0;
  id;
  user="";
  ListaTrans = [];
  Transfers= [];
  public formGroup: FormGroup;
  constructor(public firebaseService: FirestoreService,private afAuth: AngularFireAuth, private formBuilder: FormBuilder, private router: Router, public auth: AuthService) {
    // Transformarlo en un servicio.! 
    auth.user$.forEach(u => { this.user=u.email;  console.log("usuario A: "+this.user)});
  }

  ngOnInit() {
    //this.getData();

    this.getAll();
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


  getAll(){
   
    let conta=0;
    this.firebaseService.getSolicitudes()
    .subscribe( solicitud =>{
      this.solicitud = solicitud;
      console.log(solicitud);
  
    })
  
}

  setId(item){
   this.id=item.id;
   this.solActual=item;
   //console.log("Colección: "+item.id+' '+item.ref+' '+item.banco+' '+item.monto+' '+item.tarifa);
  
   console.log("ID item: "+ this.id);
  }


       
  Update(value: { usuario: string; banco: string; pago: string; }){
    console.log("USUARIOOO: "+this.user)
    console.log(value.banco +''+value.pago)
    value.usuario = (this.user);
    console.log(this.formGroup.controls)
    this.firebaseService.updateSolicitudes(this.id,value)
    .then(
      res => {
        this.resetForm();
        //this.router.navigate(['/venta']);
      }
    )
  }

  obtenerListaTransferencia(){
    this.Transfers= [];
    this.firebaseService.obtenerListaDeTransferencia()
    .subscribe((transSnap) => {
      this.Transfers = [];
      transSnap.forEach(elemento => {
        if(elemento.vendedor==this.afAuth.auth.currentUser.email){
          console.log(elemento.vendedor)
          console.log("aqui"+this.user)
          this.Transfers.push(elemento);
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
      usuario: [this.user, Validators.required ]
    });
  }


  Delete(item){
    console.log(item.id);
    this.firebaseService.deleteSolicitudes(item.id);
  }
  aceptar(item){
    console.log(item.id);
    this.firebaseService.updateTransfer(item.id);
  }

  //   async wait(valor){
  //   await delay(5000);
  //   console.log('after: '+valor);
  //   console.log("Waited 5s");
  // };

}