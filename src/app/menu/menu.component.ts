import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../Servicios/firestore.service';4
import { NavigationEnd, Router } from '@angular/router';
import { DolartodayService } from "../Servicios/dolartoday.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user =""; 
  navbarOpen = false;
  bgClass="";
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public monto: Number
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
    this.dolartodayService.getDolarToday().subscribe((data: any[])=>{
      // @ts-ignore
      console.log(data.USD.dolartoday);
      // @ts-ignore 
      this.monto = Number(data.USD.dolartoday)

    })  


}

}