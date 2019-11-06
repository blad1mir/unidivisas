import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../Servicios/firestore.service';4
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user ="";
  bgClass = '';

  constructor(public firebaseService: FirestoreService, public auth: AuthService, private router: Router) { 
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
//$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function(data) {
//    $("#texto").html('Transferencia: '+data.USD.transferncia+ '<br> Sicad: '+data.USD.sicad2);
//    $("#al").html('DolarToday al: '+data._timestamp.fecha);
//  });
    }

  ngOnInit() {
}

}