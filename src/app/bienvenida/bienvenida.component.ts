import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../Servicios/firestore.service'; 4
import { NavigationEnd, Router } from '@angular/router';
import { DolartodayService } from "../Servicios/dolartoday.service";

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {
  user = "";
  navbarOpen = false;
  bgClass = '';

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public montoDT: Number
  public montoDC: Number
  public montoDS: Number
  public fecha: String
  constructor(private dolartodayService: DolartodayService, public firebaseService: FirestoreService, public auth: AuthService, private router: Router) {
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


  }

}