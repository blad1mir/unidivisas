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
  }
  private SolicitudesCollection: AngularFirestoreCollection <Solicitud>; //Aqui se creo la propiedad de colleccion de las solicitudes
  private Solicitudes: Observable<Solicitud[]>;
  private SolicitudDoc: AngularFirestoreDocument<Solicitud>;
  private Solicitud: Observable<Solicitud>;

  getSolicitudes(){
    //return this.db.collection('/Solicitud').valueChanges(); //esto es de bladimir pero no me sirve para traerme 1 solo producto
    return this.Solicitudes = this.SolicitudesCollection.snapshotChanges().pipe(map( changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Solicitud;
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

}
