import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitud } from '../modelos/interfaces';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  Solicitudes: Observable<Solicitud[]>; 
  SolicitudColeccion: AngularFirestoreCollection<Solicitud>;
  solicitdDoc: AngularFirestoreDocument<Solicitud>;



  constructor(public db: AngularFirestore, private http: HttpClient,  private router: Router) { }
 
  getSolicitudes(){
    this.SolicitudColeccion = this.db.collection('solicitudes');
    this.Solicitudes = this.SolicitudColeccion.valueChanges();
    return this.Solicitudes;

  }
}
