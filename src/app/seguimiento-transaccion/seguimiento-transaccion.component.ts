import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../Servicios/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { Solicitud } from '../modelos/interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seguimiento-transaccion',
  templateUrl: './seguimiento-transaccion.component.html',
  styleUrls: ['./seguimiento-transaccion.component.css']
})
export class SeguimientoTransaccionComponent implements OnInit {

<<<<<<< HEAD
  constructor(private router: Router,private firestore: FirestoreService, private afAuth: AngularFireAuth, private route: ActivatedRoute, public auth: AuthService) { 
    auth.user$.forEach(u => { this.usuario=u.email});
  }
=======
  constructor(private router: Router,private firestore: FirestoreService, private afAuth: AngularFireAuth, private route: ActivatedRoute, public auth: AuthService) { }
>>>>>>> sprint3-gabo
  public solicitud: Solicitud = {};
  public totalPago;
  confirmar=0;
  Transferencias= [];
  BancosPersonales= [];
  ZellesPersonales= [];
  ListaBanco = [];
  ListaZelle = [];
  transaccion=[];
<<<<<<< HEAD
  usuario="";
  fechafull = new Date();
  formatoFecha = require('dateformat');
 
=======
  fechaActual = Date.now().toLocaleString();
>>>>>>> sprint3-gabo
 
  

  ngOnInit() {

    this.obtenerListaTransferencia();
    this.obtenerZelle();
 
    
  }

  obtenerListaTransferencia(){
<<<<<<< HEAD
=======
 

>>>>>>> sprint3-gabo
    this.firestore.obtenerListaDeTransferencia()
    .subscribe(elemento => {
        this.Transferencias =elemento;
    })
<<<<<<< HEAD
=======
  
>>>>>>> sprint3-gabo
  }

  ObtenerDatosVendedor(idSolicitud: string){
    console.log("entraaa")
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
<<<<<<< HEAD
    this.ZellesPersonales=[];
    this.Transferencias.forEach( transferencia => {
      this.ListaZelle.forEach(zelle => {
          if ((transferencia.vendedor === this.usuario)) {
            if(transferencia.comprador==zelle.usuario){
              this.ZellesPersonales.push(zelle);
            }
          } 
=======
    this.Transferencias.forEach( transferencia => {
      this.ListaZelle.forEach(zelle => {
        if(transferencia.comprador==zelle.usuario){
          this.ZellesPersonales.push(zelle);
        }
>>>>>>> sprint3-gabo
      })
    })

  }

  transferirComprador(usuario){
    var x = document.getElementById("aparecer2"); 
    x.style.display = "none";
  
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
    var x = document.getElementById("aparecer"); 
    x.style.display = "none";
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
  confirmarTransaccion(transaccion){
    this.transaccion=transaccion;
  }

  calificarTransaccion(){
   
    this.transaccion['canUsuariosConfirmaron']=this.transaccion['canUsuariosConfirmaron']+1;
    this.firestore.updateTransfer(this.transaccion['idventa'],this.transaccion);
    if(this.transaccion['canUsuariosConfirmaron']==2){
      this.transaccion['historial']=true;
<<<<<<< HEAD
      this.transaccion['fecha']=this.formatoFecha(this.fechafull, "mediumDate");
      this.transaccion['hora']=this.formatoFecha(this.fechafull, "shortTime");
=======
      this.transaccion['fecha']=new Date().toISOString();
>>>>>>> sprint3-gabo
      this.firestore.updateTransfer(this.transaccion['idventa'],this.transaccion);
    }
    
    this.router.navigate(['/inicio']);
   
  }




}
