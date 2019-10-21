import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../Servicios/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user ="";

  constructor(public firebaseService: FirestoreService, public auth: AuthService) { }

  ngOnInit() {
  }

}
