import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) { 
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )
      
    }
    async registerEmail(email: string, pass: string, displayName: string, tel: string, adm: number){
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      return this.updateUserData(credential.user).then((success)=>{
        this.router.navigate(['/venta']); 
        this.updateUserData2(credential.user, displayName);
        });
    }
    private updateUserData2(user, name: string) {
      this.afs.collection('users').doc(user.uid).update({
        displayName: name
      })
    }
    async updateUserData3(id, name: string, dir: string, corr: string, tele: string, ad: number) {

      this.afs.collection('users').doc(id).update({
        displayName: name,
        email: corr,
        direccion: dir,
        telf: tele,
        admim: ad
      })
    }
    async loginEmail(email: string, pass: string){
      const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        
          this.router.navigate(['/venta']);
      
     }
    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user),
      this.router.navigate(['/venta']);
      
    }
    async googleRegister() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider)
      return this.updateUserData(credential.user).then((success)=>{
        this.router.navigate(['/venta']);
      });
      }
  
    private updateUserData(user) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName,
        photoURL: user.photoURL

      } 
  
      return userRef.set(data, { merge: true })
  
    }
  
    async signOut() {
      await this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    }

}
