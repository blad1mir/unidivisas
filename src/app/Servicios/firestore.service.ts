import { Banco } from './../modelos/interfaces';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Solicitud } from '../modelos/interfaces';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

//  solicitudColeccion: AngularFirestoreCollection<Solicitud>;
//  solicitud: Observable<Solicitud[]>;
//  solicitudDoc: AngularFirestoreDocument<Solicitud>;
  
  constructor(private db: AngularFirestore) { 
    this.SolicitudesCollection = db.collection<Solicitud>('Solicitud'); //Setear nuestra collección
    this.Solicitudes = this.SolicitudesCollection.valueChanges();
    this.BancoCollection = db.collection<Banco>('Usuarios'); //Setear nuestra collección
    this.Banco = this.BancoCollection.valueChanges();
  }
  
  private BancoCollection: AngularFirestoreCollection <Banco>;
  private Banco: Observable<Banco[]>
  private SolicitudesCollection: AngularFirestoreCollection <Solicitud>; //Aqui se creo la propiedad de colleccion de las solicitudes
  private Solicitudes: Observable<Solicitud[]>;
  private SolicitudDoc: AngularFirestoreDocument<Solicitud>;
  private Solicitud: Observable<Solicitud>;

  getSolicitudes(){
    //return this.db.collection('/Solicitud').valueChanges(); //esto es de bladimir pero no me sirve para traerme 1 solo producto
    let x = 1;
    return this.Solicitudes = this.SolicitudesCollection.snapshotChanges().pipe(map( changes => {
      x = 1;
      return changes.map(action => {
        const data = action.payload.doc.data() as Solicitud;
        data.id = action.payload.doc.id;
        data['ref'] = x;
        x++;
        return data;
      });
    }));
  }
  
  getOneSolicitud(idSolicitud: string){
  this.SolicitudDoc = this.db.doc<Solicitud>(`Solicitud/${idSolicitud}`);
    return this.Solicitud = this.SolicitudDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists == false) {
        return null;
      } else {
        const data = action.payload.data() as Solicitud;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

//   getSolicitudes() {
//     return this.db.collection('/Solicitud').valueChanges();
  
// }

// getAllSolicitudes(){
//   let x = 1;
//   this.solicitudColeccion=this.db.collection('Solicitud');
//   this.solicitud = this.solicitudColeccion.snapshotChanges().pipe(map(actions => {
//     x = 1;
//     return actions.map(a => {
//       const data = a.payload.doc.data() as Solicitud;
//       data.id= a.payload.doc.id;
//       data['ref'] = x;
//       x++;
//       console.log("dataaa", data);
//       return data
      
//     })
//   }))

//   return this.Solicitud;
// }

deleteSolicitudes(solkey){
  return this.db.collection('Solicitud').doc(solkey).delete();
}

updateSolicitudes(Key, value){
  return this.db.collection('Solicitud').doc(Key).set(value);
}

createSolicitud(value){
  console.log(value); 
  return this.db.collection('Solicitud').add({
    monto: value.monto,
    ref: value.ref,
    tarifa: value.tarifa,
    banco: value.banco,
    pago: value.pago,
    usuario: value.usuario
  });
}
createDatos(value){
  return this.db.collection('Usuarios').add({
    nombreUsuario:  value.nombreUsuario,
    Banco: value.Banco,
    NumeroCuenta: value.NumeroCuenta,
    Cedula: value.Cedula,
    CorreoZelle: value.CorreoZelle,
    NombreZelle: value.NombreZelle
  });

}

}
