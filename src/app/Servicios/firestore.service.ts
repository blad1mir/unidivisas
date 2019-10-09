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
}
