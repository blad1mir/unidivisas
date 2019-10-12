import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../Servicios/firestore.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { delay } from 'q';
import { Solicitud } from 'src/app/modelos/interfaces';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})

export class VentaComponent implements OnInit {
  items: Array<any>;
  solicitud= [];
  solActual=[];
  val = 0;
  id;
  public formGroup: FormGroup;
  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    //this.getData();
    this.getAll();
   // this. buildForm();
  }

   buildForm(item) {
        this.formGroup = this.formBuilder.group({
          ref: [item.ref],
          monto: [item.monto, Validators.required ],
          tarifa: [item.tarifa, Validators.required ],
          banco: [item.banco, Validators.required ],
          usuario: [item.usuario, Validators.required ]
        });
    }

  // getData() {
  //   this.firebaseService.getSolicitudes()
  //     .subscribe(result => {
  //       this.items = result;
  //       this.items.forEach(element => {
  //         if (element.ref >= this.firebaseService.ide) {
  //           this.firebaseService.ide = element.ref + 1;
  //           console.log('before: ' +this.firebaseService.ide);
  //         }
  //         //console.log('before: '+ this.val);
  //       });
  //     }
  //     );
  //   //   // await delay(5000);
  //   //   // this.wait(this.val);
  // }

  getAll(){
    this.firebaseService.getAllSolicitudes()
    .subscribe(solicitud =>{
      this.solicitud = solicitud;
      this.solicitud.forEach(element => {
    // console.log('thats element: '+element);
      })
    
    })

}

  setId(item){
   this.id=item.id;
   this.solActual=item;
   console.log("Colección: "+item.id+' '+item.ref+' '+item.banco+' '+item.monto+' '+item.tarifa);
   this. buildForm(item);
   console.log("ID coleccion: "+item.id);
  }

  Update(value){
    console.log(value+' acá '+this.id)
    this.firebaseService.updateSolicitudes(this.id,value);
  }

  
  Delete(item){
    console.log(item.id);
    this.firebaseService.deleteSolicitudes(item.id);
  }

  //   async wait(valor){
  //   await delay(5000);
  //   console.log('after: '+valor);
  //   console.log("Waited 5s");
  // };

}
