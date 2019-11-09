import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/Servicios/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private router: Router,private firestore: FirestoreService, private afAuth: AngularFireAuth, private route: ActivatedRoute, public auth: AuthService) { }
  Transferencias= [];
  fechaActual = Date.now();
  ngOnInit() {
    this.obtenerListaTransferencia();
    this. obtenerFecha();
  }

  obtenerListaTransferencia(){
    this.firestore.obtenerListaDeTransferencia()
    .subscribe(elemento => {
        this.Transferencias =elemento;
    })
  }

  obtenerFecha(){
  //let dateFormat = require('dateformat');
  let fechafull = new Date();
  console.log(fechafull);

  let now = new Date();
  let formatoFecha = require('dateformat');

  console.log(formatoFecha(now, "shortTime"))
  console.log(formatoFecha(now, "mediumDate"))

  
  

  

  }

}
