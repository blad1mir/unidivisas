import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../Servicios/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { Solicitud } from '../modelos/interfaces';

@Component({
  selector: 'app-seguimiento-transaccion',
  templateUrl: './seguimiento-transaccion.component.html',
  styleUrls: ['./seguimiento-transaccion.component.css']
})
export class SeguimientoTransaccionComponent implements OnInit {

  constructor(private router: Router,private firestore: FirestoreService, private afAuth: AngularFireAuth, private route: ActivatedRoute, public auth: AuthService) { }
  public solicitud: Solicitud = {};
  Transferencias= [];
  BancosPersonales= [];
  ZellesPersonales= [];
  ListaBanco = [];
  ListaZelle = [];
  public totalPago;

  ngOnInit() {

    this.obtenerListaTransferencia();
    this.obtenerZelle();
    
  }

  obtenerListaTransferencia(){
    this.firestore.obtenerListaDeTransferencia()
    .subscribe(elemento => {
        this.Transferencias =elemento;
    })
  
  }

  ObtenerDatosVendedor(idSolicitud: string){
    this.firestore.getOneSolicitud(idSolicitud).subscribe(solicitud => {
      this.solicitud = solicitud;
      this.obtenerListaBanco(); 
      this.totalPago=this.solicitud.monto*this.solicitud.tarifa;
    });
   
   
  }

  obtenerListaBanco(){
    this.BancosPersonales= [];
    this.firestore.obtenerListaDeBanco()
    .subscribe( ListaBanco =>{
      this.ListaBanco = ListaBanco;
      ListaBanco.forEach(elemento => {
        if(elemento.usuario==this.solicitud.usuario && elemento.nombreBanco==this.solicitud.banco){
          this.BancosPersonales.push(elemento);
        }
      })
    })
  }

  obtenerZelle(){
    this.ListaZelle= [];
    this.firestore.obtenerListaDeZelle()
    .subscribe( ListaZelle =>{
      this.ListaZelle = ListaZelle;
      this.datosVendedor();
    })
    
  }

  datosVendedor(){
    this.Transferencias.forEach( transferencia => {
      this.ListaZelle.forEach(zelle => {
        if(transferencia.comprador==zelle.usuario){
          this.ZellesPersonales.push(zelle);
        }
      })
    })

  }

  transferirComprador(usuario){
    for (let index = 0; index <  this.Transferencias.length; index++) {
      if (this.Transferencias[index].comprador==usuario && this.Transferencias[index].pagadoVendedor==false) {
        this.Transferencias[index].pagadoVendedor=true;
        this.firestore.updateTransfer(this.Transferencias[index].idventa, this.Transferencias[index]);
       index= this.Transferencias.length;
      }
       
     }
     alert("Su transferencia fue realizada con exito");
  }

  transferirVendedor(numeroRef, usuario){
    console.log(numeroRef)
    for (let index = 0; index <  this.Transferencias.length; index++) {
     if ( this.Transferencias[index].vendedor==usuario && this.Transferencias[index].pagadoComprador==false) {
      this.Transferencias[index].refbanco=numeroRef;
      this.Transferencias[index].pagadoComprador=true;
      this.firestore.updateTransfer(this.Transferencias[index].idventa, this.Transferencias[index]);
      this.firestore.deleteSolicitudes(this.Transferencias[index].idSolicitud);
      index= this.Transferencias.length;
     }
      
    }
   
  
   alert("Su transferencia fue realizada con exito");

 }


}
