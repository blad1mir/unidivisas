import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../Servicios/firestore.service';
import { Solicitud } from '../modelos/interfaces';
import { ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {
  constructor(private firestore: FirestoreService, private route: ActivatedRoute) { }
  public solicitud: Solicitud = {};
  public sumaa;
  user="";
  ListaBanco = [];
  BancosPersonales= [];
   
  ngOnInit() {
    const idSolicitud = this.route.snapshot.params['id'];
    this.getDetailsSolicitud(idSolicitud);
    this.obtenerListaBanco();

      var x = document.getElementById("aparecer");
      x.style.display="none";
      var y = document.getElementById("desaparecer");
      y.style.display="block";
  }

  
  getDetailsSolicitud(idSolicitud: string){
    this.firestore.getOneSolicitud(idSolicitud).subscribe(solicitud => {
      this.solicitud = solicitud;
      console.log('DETALLES SOLICITUD', solicitud);
     
      this.sumaa=this.solicitud.monto*this.solicitud.tarifa;
    });
  }
  obtenerListaBanco(){
    this.BancosPersonales= [];
    this.firestore.obtenerListaDeBanco()
    .subscribe( ListaBanco =>{
      this.ListaBanco = ListaBanco;
      ListaBanco.forEach(elemento => {
        if(elemento.usuario==this.solicitud.usuario && elemento.nombreBanco==this.solicitud.banco){
          console.log(elemento.usuario)
          console.log(this.user)
          this.BancosPersonales.push(elemento);
        }
      })
    })
  
  }
  

  confirmartransaccion(){
    if(confirm('Seguro que quieres realizar esta transacción, no podra cancelar despues de este punto.')){
      var x = document.getElementById("aparecer");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

    var y = document.getElementById("desaparecer");
    if (y.style.display === "block") {
      y.style.display = "none";
    } else {
      y.style.display = "block";
    }
    }
    


    }
}
