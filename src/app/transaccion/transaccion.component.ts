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

  ngOnInit() {
    const idSolicitud = this.route.snapshot.params['id'];
    this.getDetailsSolicitud(idSolicitud);

      var x = document.getElementById("aparecer");
      x.style.display="none";
  }

  
  getDetailsSolicitud(idSolicitud: string){
    this.firestore.getOneSolicitud(idSolicitud).subscribe(solicitud => {
      this.solicitud = solicitud;
      console.log('DETALLES SOLICITUD', solicitud);
    });
  }

  confirmartransaccion(){
    if(confirm('SEGURO QUE QUIERES REALIZAR ESTA TRANSACCIÓN')){
      var x = document.getElementById("aparecer");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    }


    }
}
