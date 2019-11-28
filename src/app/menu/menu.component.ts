import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../Servicios/firestore.service'; 4
import { NavigationEnd, Router } from '@angular/router';
import { DolartodayService } from "../Servicios/dolartoday.service";
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user = "";
  navbarOpen = false;
  bgClass = '';
  notificacion: boolean = false;
  mostrar: boolean = true;
  
  Transferencias = [];
  numerosPendiente=0;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public montoDT: Number
  public montoDC: Number
  public montoDS: Number
  public fecha: String
  constructor(private dolartodayService: DolartodayService, public firebaseService: FirestoreService, public auth: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    // subscribe to router navigation
    this.router.events.subscribe(event => {
      // filter `NavigationEnd` events
      if (event instanceof NavigationEnd) {
        // get current route without leading slash `/`
        const eventUrl = /(?<=\/).+/.exec(event.urlAfterRedirects);
        const currentRoute = (eventUrl || []).join('');
        // set bgClass property with the value of the current route
        this.bgClass = currentRoute;
      }
    });

  }

  ngOnInit() {
    // Aquí es donde el html hace el llamado y se le da la orden de la funcion que extrae la información del API
    this.dolartodayService.getDolarToday().subscribe((data: any[]) => {
      //si quieres ver a cuanto está el Dolar Today quita el comentario del siguiente console.log
      // @ts-ignore
      //console.log(data.USD.dolartoday);
      //si se quiere ver toda la data que se trae del json quitar la nota del siguiente console.log de abajo
      //console.log(data);
      // @ts-ignore 
      this.montoDT = Number(data.USD.dolartoday)
      //@ts-ignore
      this.montoDC = Number(data.USD.efectivo_cucuta)
      //@ts-ignore
      this.montoDS = Number(data.USD.sicad1)
      //@ts-ignore
      this.fecha = String(data._timestamp.fecha)

    })
    
    this.obtenerListaTransferencia();
    this.verificar()
   
  }

 verificar(){
  setInterval( ()=>{if(this.Transferencias.length==0){
    this.notificacion=false
  }else{
    this.notificacion=true
    if(this.mostrar){
        const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
Toast.fire({
            icon: 'info',
            title: '¡solicitud de venta aceptada!'
          })

         // this.mostrar=false;
    }
  
  } },5000);
 }
 
    
  

  obtenerListaTransferencia() {
    this.numerosPendiente=0;
    this.Transferencias = [];
    this.firebaseService.obtenerListaDeTransferencia()
      .subscribe((transSnap) => {
        this.Transferencias = [];
        transSnap.forEach(elemento => {
          if (elemento.vendedor == this.afAuth.auth.currentUser.email && elemento.historial==false) {
            this.Transferencias.push(elemento);
          }
        })
      })
  }
}