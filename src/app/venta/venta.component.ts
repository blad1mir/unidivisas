import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../Servicios/firestore.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  items: Array<any>;
  public formGroup: FormGroup;
  id= 0;

  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.createID();
    this.getData();
    this.buildForm();
  }

  createID() {
    this.firebaseService.getSolicitudes()
    .subscribe(result => {
      this.items = result;
      console.log('item: '+this.items[1].id)
      if(this.id<this.items[1].id){
        this.id=this.items[1].id;
        
      }
      this.id=this.id+1;
      console.log('final: '+this.id)
    });
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.id],
      monto: ['', Validators.required ],
      tarifa: ['', Validators.required ],
      banco: ['', Validators.required ]
    });
  }

  onSubmit(value){
    console.log('Este es el valor: '+ value)
    console.log('Este es el otro: '+ value.banco)
    this.firebaseService.createSolicitud(value)
    .then(
      res => {
        this.resetForm();
        //this.router.navigate(['/venta']);
      }
    )
  }

  resetForm(){
    this.formGroup = this.formBuilder.group({
      id: [this.id],
      monto: new FormControl('', Validators.required),
      tarifa: new FormControl('', Validators.required),
      banco:  new FormControl('', Validators.required)
    });
  }

  getData() {
    this.firebaseService.getSolicitudes()
    .subscribe(result => {
      this.items = result;
      console.log(this.items);
    });
  }

}
