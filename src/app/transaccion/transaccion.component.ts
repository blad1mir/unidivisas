import { User } from './../user.model';
import { Component, OnInit, ɵCompiler_compileModuleAsync__POST_R3__ } from '@angular/core';
import { FirestoreService } from '../Servicios/firestore.service';
import { Solicitud } from '../modelos/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {
  constructor(private router: Router,private firestore: FirestoreService, private afAuth: AngularFireAuth,public auth: AuthService, private route: ActivatedRoute) { 

    auth.user$.subscribe( user => { // Reestructurar todo despues de Auth
      this.user = user.email
      console.log("usuario A: " + this.user);
    })
  }
  public solicitud: Solicitud = {};
  public sumaa;
  user="";
  ListaBanco = [];
  ListaZelle = [];
  ZellePersonal= [];
  BancosPersonales= [];
  Transferencia= [];
   
  ngOnInit() {
    const idSolicitud = this.route.snapshot.params['id'];
    this.getDetailsSolicitud(idSolicitud);
    this.obtenerListaBanco();
    this.obtenerListaZelle();

      
  }

  
  getDetailsSolicitud(idSolicitud: string){
    this.firestore.getOneSolicitud(idSolicitud).subscribe(solicitud => {
      this.solicitud = solicitud;
      console.log('DETALLES SOLICITUD', solicitud);
     
      this.sumaa=this.solicitud.monto*this.solicitud.tarifa;
    });
  }
 
  obtenerListaBanco(){
    this.BancosPersonales= [];
    this.firestore.obtenerListaDeBanco()
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
    this.firestore.obtenerListaDeZelle()
    .subscribe( ListaZelle =>{
      this.ListaZelle = ListaZelle;
      ListaZelle.forEach(elemento => {
        if(elemento.usuario==this.user){
          this.ZellePersonal.push(elemento);
        }
      })
    
    })

}



  confirmartransaccion(){
    Swal.fire({
      title: '¿Deseas continuar?',
      text: "No podra cancelar despues de este punto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, comprar!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '¡Aceptado!',
          'Recuerde realizar la transferencia.',
          'success'
        ).then((result) => {
          // Reload the Page
          var x = document.getElementById("aparecer"); 
      const idSolicitud = this.route.snapshot.params['id'];
      this.solicitud.aceptada=true;
      this.firestore.ActualizarSolicitudes(idSolicitud,this.solicitud);
      this.firestore.transferneciaBancaria(this.afAuth.auth.currentUser.email,this.solicitud.usuario,0,this.solicitud.id, this.solicitud.monto,this.solicitud.monto* this.solicitud.tarifa,  this.solicitud.tarifa,idSolicitud);
      this.obtenerListaTransferencia();
          this.router.navigate(['/transferencias']);
        });
      };
      
      
    })

    


    }

    obtenerListaTransferencia(){
      this.Transferencia= [];
      this.firestore.obtenerListaDeTransferencia()
      .subscribe((transSnap) => {
        this.Transferencia = [];
        transSnap.forEach(elemento => {
          if((elemento.comprador==this.afAuth.auth.currentUser.email) && (elemento.vendedor==this.solicitud.usuario)&& (elemento.montoDolar==this.solicitud.monto) && (elemento.pagadoComprador==false)){
           
            this.Transferencia.push(elemento);
           
          }
        })
      })
    
    }
}
