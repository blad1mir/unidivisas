import { Banco, Zelle } from './../modelos/interfaces';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Solicitud } from '../modelos/interfaces';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  
  constructor(private db: AngularFirestore) { 
    this.SolicitudesCollection = db.collection<Solicitud>('Solicitud'); //Setear nuestra collección
    this.Solicitudes = this.SolicitudesCollection.valueChanges();

    this.ListaZelleCollection = db.collection<Zelle>('DatosZelle'); //Setear nuestra collección
    this.ListaZelle = this.ListaZelleCollection.valueChanges();

    
    this.ListaBancoCollection = db.collection<Banco>('DatosBanco'); //Setear nuestra collección
    this.ListaBanco = this.ListaBancoCollection.valueChanges();
   
  }
  
 
  private SolicitudesCollection: AngularFirestoreCollection <Solicitud>; //Aqui se creo la propiedad de colleccion de las solicitudes
  private Solicitudes: Observable<Solicitud[]>;
  private SolicitudDoc: AngularFirestoreDocument<Solicitud>;
  private Solicitud: Observable<Solicitud>;

  private ListaZelleCollection: AngularFirestoreCollection <Zelle>; //Aqui se creo la propiedad de colleccion de las solicitudes
  private ListaZelle: Observable<Zelle[]>;
  private ListaZelleDoc: AngularFirestoreDocument<Zelle>;
  private ListaZellePersonal: Observable<Zelle>;

  private ListaBancoCollection: AngularFirestoreCollection <Banco>; //Aqui se creo la propiedad de colleccion de las solicitudes
  private ListaBanco: Observable<Banco[]>;
  private ListaBancoDoc: AngularFirestoreDocument<Banco>;
  private ListaBancoPersonal: Observable<Banco>;

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

  obtenerListaDeZelle(){
    //return this.db.collection('/Solicitud').valueChanges(); //esto es de bladimir pero no me sirve para traerme 1 solo producto
    return this.ListaZelle = this.ListaZelleCollection.snapshotChanges().pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Zelle;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  obtenerListaDeBanco(){
    //return this.db.collection('/Solicitud').valueChanges(); //esto es de bladimir pero no me sirve para traerme 1 solo producto
    return this.ListaBanco = this.ListaBancoCollection.snapshotChanges().pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Banco;
        data.id = action.payload.doc.id;
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


deleteSolicitudes(solkey){
  return this.db.collection('Solicitud').doc(solkey).delete();
}

eliminarZelle(solkey){
  return this.db.collection('DatosZelle').doc(solkey).delete();
}

eliminarBanco(solkey){
  return this.db.collection('DatosBanco').doc(solkey).delete();
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

agregarNuevoZelle(value){
  return this.db.collection('DatosZelle').add({
    alias: value.alias,
    correoZelle: value.correoZelle,
    nombreZelle: value.nombreZelle,
    usuario: value.usuario
  });
}

agregarNuevoBanco(value){
  return this.db.collection('DatosBanco').add({
    cedula: value.cedula,
    nombreBanco: value.nombreBanco,
    nombreCliente: value.nombreCliente,
    numeroCuenta: value.numeroCuenta,
    aliasBanco: value.aliasBanco,
    usuario: value.usuario
  });
}

}
