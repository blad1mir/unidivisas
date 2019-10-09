import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../Servicios/firestore.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  solicitud = [];
  constructor(private fs: FirestoreService) {
    fs.getSolicitudes().subscribe(solicitud => {
      this.solicitud = solicitud;
    });

   }

  ngOnInit() {

  }

}
