import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public identify=0;

  constructor(public db: AngularFirestore) { }
  getSolicitudes() {
    return this.db.collection('/Solicitud').valueChanges();
}

deleteSolicitudes(solkey){
  return this.db.collection('Solicitud').doc(solkey).delete();
}

createSolicitud(value){
  return this.db.collection('Solicitud').add({
    monto: value.monto,
    id: value.id,
    tarifa: value.tarifa,
    banco: value.banco  
  });
}
}
