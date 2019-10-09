import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitud } from '../modelos/interfaces';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  Solicitudes: FirebaseListObservable<Solicitud[]>;
  SolicitudColeccion: FirebaseObjectObservable<Solicitud>;
  solicitdDoc: AngularFirestoreDocument<Solicitud>;



  constructor(public db: AngularFirestore, private http: HttpClient,  private router: Router) { }

  getSolicitudes() {
    this.SolicitudColeccion = this.db.collection('Solicitud');
    this.Solicitudes = this.SolicitudColeccion.valueChanges();
    return this.Solicitudes;

  }
}
