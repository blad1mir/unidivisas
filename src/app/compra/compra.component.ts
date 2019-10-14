import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../Servicios/firestore.service';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor(private firebaseService: FirestoreService) { }
  //items: Array<any>;
  public solicitudes = [];
  public solicitud = '';
  a=10;




  ngOnInit() {
    //this.getData();
    this.firebaseService.getSolicitudes().subscribe(solicitudes =>{
      console.log('SOLICITUDES', solicitudes);
      this.solicitudes = solicitudes.slice(0,this.a);
    })
  } 
  mas(){
    this.firebaseService.getSolicitudes().subscribe(solicitudes =>{
      console.log('SOLICITUDES', solicitudes);
      this.solicitudes = solicitudes.slice(0,);
    })
    var x = document.getElementById("cargador");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  //getData(){
  //  this.firebaseService.getSolicitudes().subscribe(result =>{
  //    this.items = result;
  //    console.log(this.items);
  //  })
  //}
}