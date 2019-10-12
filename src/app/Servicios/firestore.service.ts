import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Solicitud } from '../modelos/interfaces';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  ide=0;

  solicitudColeccion: AngularFirestoreCollection<Solicitud>;
  Solicitud: Observable<Solicitud[]>;
  solicitudDoc: AngularFirestoreDocument<Solicitud>;
  
  constructor(public db: AngularFirestore) { }
  getSolicitudes() {
    return this.db.collection('/Solicitud').valueChanges();
  
}

getAllSolicitudes(){
  let x = 1;
  this.solicitudColeccion=this.db.collection('Solicitud');
  this.Solicitud = this.solicitudColeccion.snapshotChanges().pipe(map(actions => {
    x = 1;
    return actions.map(a => {
      const data = a.payload.doc.data() as Solicitud;
      data.id= a.payload.doc.id;
      data.ref = x;
      x++;
      console.log("dataaa", data);
      return data
      
    })
  }))

  return this.Solicitud;
}

deleteSolicitudes(solkey){
  return this.db.collection('Solicitud').doc(solkey).delete();
}

updateSolicitudes(Key, value){
  return this.db.collection('Solicitud').doc(Key).set(value);
}

createSolicitud(value){
  return this.db.collection('Solicitud').add({
    monto: value.monto,
    ref: value.ref,
    tarifa: value.tarifa,
    banco: value.banco,
    usuario: value.usuario
  });
}
}
