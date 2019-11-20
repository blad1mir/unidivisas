import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../Servicios/firestore.service';
import * as _ from 'lodash';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor(private firebaseService: FirestoreService, public auth: AuthService) { }
  //items: Array<any>;
  public solicitudes = [];
  public solicitud = '';
  a=10;

  ventasFiltradas: any;
  filtros = {}

  f1;
  f2;
  
  ngOnInit() {
    //this.getData();
    this.firebaseService.obtenerSolicitudes().subscribe(solicitudes =>{
      console.log('SOLICITUDES', solicitudes);
      this.solicitudes = solicitudes.slice(0,this.a);
      this.AplicarFiltro()
    })
    this.firebaseService.obtenerf1().subscribe(f1 =>{
      this.f1 = f1
    })
    this.firebaseService.obtenerf2().subscribe(f2 =>{
      this.f2 = f2
    })
  } 
  mas(){
    this.firebaseService.obtenerSolicitudes().subscribe(solicitudes =>{
      console.log('SOLICITUDES', solicitudes);
      this.solicitudes = solicitudes.slice(0,);
      this.AplicarFiltro()
    })
    var x = document.getElementById("cargador");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


  private AplicarFiltro() {
    this.ventasFiltradas = _.filter(this.solicitudes, _.conforms(this.filtros) )
   
  }
  private AplicarFiltro2() {
    this.ventasFiltradas = _.filter(this.solicitudes, _.conforms(this.filtros) )
  }
 /// filter property by equality to rule
  filtrarExacto(property: string, rule: any) {
    this.filtros[property] = val => val == rule
    this.AplicarFiltro()
  }
  /// filter  numbers greater than rule
  filtrarMayorQue(property: string, rule: number) {
    this.filtros[property] = val => val > rule
    this.AplicarFiltro()
  }
  filtrarMenorQue(property: string, rule: number) {
    this.filtros[property] = val => val > rule
    this.AplicarFiltro()
  }
  filtrarMayor(property: string, rule: number) {
    this.filtros[property] = val => val >= rule
    this.AplicarFiltro()
  }
  filtrarMenor(property: string, rule: number) {
    this.filtros[property] = val => val <= rule
    this.AplicarFiltro2()
  }
   /// filter properties that resolve to true
   filtrarBoolean(property: string, rule: boolean) {
    if (!rule) this.QuitarFiltro(property)
    else {
      this.filtros[property] = val => val
      this.AplicarFiltro()
    }
  }
  QuitarFiltro(property: string) {
    delete this.filtros[property]
    this[property] = null
    this.AplicarFiltro()
  }
  QuitarFiltro2(property: string) {
    delete this.filtros[property]
    this[property] = null
    this.AplicarFiltro2()
  }

  //getData(){
  //  this.firebaseService.getSolicitudes().subscribe(result =>{
  //    this.items = result;
  //    console.log(this.items);
  //  })
  //}
}