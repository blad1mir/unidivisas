import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public db: AngularFirestore) { }
  getSolicitudes() {
    return this.db.collection('/Solicitud').valueChanges();
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
