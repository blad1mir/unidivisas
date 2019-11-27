import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app/user.model';
import Swal from 'sweetalert2';
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
        private router: Router,
        public ngZone: NgZone
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
    SendVerificationMail() {
      return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['/inicio']);
      })
    }
    async registerEmail(email: string, pass: string, displayName: string, tel: string, adm: number){
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      return this.updateUserData(credential.user).then((success)=>{
        this.SendVerificationMail();
        this.signOut();
        Swal.fire({
          title: '¡Error!',
          text: 'Por favor valida tu email antes de ingresar. Revisa tu buzón de entrada.',
          icon: 'warning',
          confirmButtonText: 'Ok'
        }).then((result) => {
          // Reload the Page
          location.reload();
        });
          
        this.updateUserData3(credential.user.uid, displayName,email, tel, adm);
        });
    }
    private updateUserData2(user, name: string) {
      this.afs.collection('users').doc(user.uid).update({
        displayName: name
      })
    }
    async updateUserData3(id, name: string, corr: string, tele: string, ad: number) {

      this.afs.collection('users').doc(id).update({
        displayName: name,
        email: corr,
        telf: tele,
        admim: ad
      })
    }
    async loginEmail(email: string, pass: string){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.SendVerificationMail();
          this.signOut();
          Swal.fire({
            title: '¡Error!',
            text: 'Por favor valida tu email antes de ingresar. Revisa tu buzón de entrada.',
            icon: 'warning',
            confirmButtonText: 'Ok'
          });
          
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['/venta']);
            
            Toast.fire({
              icon: 'success',
              title: '¡Ha iniciado sesión!'
            })
          });
        }
      }).catch((error) => {
        Swal.fire({
          title: '¡Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      })
      
     }
  
    private updateUserData(user) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName,
        emailVerified: user.emailVerified

      } 
  
      return userRef.set(data, { merge: true })
  
    }
    ForgotPassword(passwordResetEmail) {
      return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        Swal.fire({
          title: '¡Error!',
          text: 'Email para cambiar la contraseña ha sido enviado, revisa tu buzón de entrada.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }).catch((error) => {
        Swal.fire({
          title: '¡Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      })
    }
    async signOut() {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      await this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
      Toast.fire({
        icon: 'success',
        title: 'Ha cerrado sesión'
      })
      
    }

}
