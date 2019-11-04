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
        if(transferencia.vendedor==zelle.usuario){
          this.ZellesPersonales.push(zelle);
        }
      })
    })

  }

  pagoZelle(){
    this.Transferencias[0].pagadoVendedor=true;
 
    this.firestore.updateTransfer(this.Transferencias[0].idventa, this.Transferencias[0]);

  }

  transferencia(numeroRef){
    console.log(numeroRef)
   this.Transferencias[0].refbanco=numeroRef;
   this.Transferencias[0].pagadoComprador=true;

   this.firestore.updateTransfer(this.Transferencias[0].idventa, this.Transferencias[0]);
   //this.firestore.deleteSolicitudes(idSolicitud);
   alert("Su transferencia fue realizada con exito");
   //this.router.navigate(['/compra']);
 }


}
