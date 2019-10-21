import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../Servicios/firestore.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { delay } from 'q';
import { Solicitud } from 'src/app/modelos/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';



@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})

export class VentaComponent implements OnInit {
  items: Array<any>;
  solicitud = [];
  solActual = [];
  val = 0;
  id;
  user="";
  public formGroup: FormGroup;
  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder, private router: Router, public auth: AuthService) {
    // Transformarlo en un servicio.! 
    auth.user$.forEach(u => { this.user=u.email;  console.log("usuario A: "+this.user)});
  }

  ngOnInit() {
    //this.getData();

    this.getAll();
    this. buildForm();
  }

   buildForm() {
   
        this.formGroup = this.formBuilder.group({
          ref: [''],
          monto: ['', Validators.required ],
          tarifa: ['', Validators.required ],
          banco: ['', Validators.required ],
          pago: ['', Validators.required ],
          usuario: ['', Validators.required ]
        
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
   
    let conta=0;
    this.firebaseService.getSolicitudes()
    .subscribe( solicitud =>{
      this.solicitud = solicitud;
      console.log(solicitud);
      // solicitud.forEach(element => {
      //   if(element.usuario==this.user){
      //     conta++;
      //     element.ref=conta;
      //     this.solActual.push(element);
      //   } 
      //  })
    })
  
}

  setId(item){
   this.id=item.id;
   this.solActual=item;
   //console.log("Colección: "+item.id+' '+item.ref+' '+item.banco+' '+item.monto+' '+item.tarifa);
  
   console.log("ID item: "+ this.id);
  }

  // Update(value){
  //   console.log("Inicio ")
  //   console.log(this.id+ " ")
  //   console.log(value.banco+ " ")
  //   console.log(value.usuario+" ")
  //   console.log("Fin")
  

  //   this.firebaseService.updateSolicitudes(this.id,value);
  // }

       
  Update(value: { usuario: string; banco: string; pago: string; }){
    console.log("USUARIOOO: "+this.user)
    console.log(value.banco +''+value.pago)
    value.usuario = (this.user);
    console.log(this.formGroup.controls)
    this.firebaseService.updateSolicitudes(this.id,value)
    .then(
      res => {
        this.resetForm();
        //this.router.navigate(['/venta']);
      }
    )
  }

  resetForm() {
    this.formGroup = this.formBuilder.group({
      ref: [''],
      monto: new FormControl('', Validators.required),
      tarifa: new FormControl('', Validators.required),
      banco:  new FormControl('', Validators.required),
      pago:  new FormControl('', Validators.required),
      usuario: [this.user, Validators.required ]
    });
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


