import { FirestoreService } from './../Servicios/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private firebaseService: FirestoreService) { }
  //items: Array<any>;
  public solicitudes = [];
  public solicitud = '';

  ngOnInit() {
    //this.getData();
    this.firebaseService.obtenerSolicitudes().subscribe(solicitudes =>{
      console.log('SOLICITUDES', solicitudes);
      this.solicitudes = solicitudes;
    })
  } 

}
