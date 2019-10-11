import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../Servicios/firestore.service';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { delay } from 'q';



@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})

export class VentaComponent implements OnInit {
  items: Array<any>;
  val=0;
  public formGroup: FormGroup;
  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder,private router: Router) {

   }

  ngOnInit() {
    this.getData();
    this.buildForm();
  }

  createID() {
    this.firebaseService.getSolicitudes()
    .subscribe(result => {
      this.items = result;
    });
  }

   

  async buildForm() {
  await delay(5000);
     console.log('IDE:'+this.val)
      this.formGroup = this.formBuilder.group({
        id: [this.val+1],
        monto: ['', Validators.required ],
        tarifa: ['', Validators.required ],
        banco: ['', Validators.required ]
      });
    
   
  }

  onSubmit(value){
    this.firebaseService.createSolicitud(value)
    .then(
      res => {
        this.resetForm();
        //this.router.navigate(['/venta']);
      }
    )
  }

  resetForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.val],
      monto: new FormControl('', Validators.required),
      tarifa: new FormControl('', Validators.required),
      banco:  new FormControl('', Validators.required)
    });
  }

    getData() {
    this.firebaseService.getSolicitudes()
      .subscribe(result => {
        this.items = result;
        this.items.forEach(element =>{
        if(element.id>=this.val){
          this.val=element.id+1;
        }
        //console.log('before: '+ this.val);
        });
      }
    );
   // await delay(5000);
   // this.wait(this.val);
  }

//   async wait(valor){
//   await delay(5000);
//   console.log('after: '+valor);
//   console.log("Waited 5s");
// };

 

}
