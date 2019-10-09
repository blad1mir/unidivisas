import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../Servicios/firestore.service';
import { Router, Params } from '@angular/router';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  items: Array<any>;

  constructor(public firebaseService: FirestoreService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getSolicitudes()
    .subscribe(result => {
      this.items = result;
      console.log(this.items);
    });
  }

}
