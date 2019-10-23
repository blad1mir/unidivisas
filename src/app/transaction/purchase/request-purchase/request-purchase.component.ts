import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/Servicios/firestore.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-request-purchase',
  templateUrl: './request-purchase.component.html',
  styleUrls: ['./request-purchase.component.css']
})
export class RequestPurchaseComponent implements OnInit {
  public formGroup: FormGroup;
  user="";
  constructor(public firebaseService: FirestoreService, private formBuilder:FormBuilder, private router: Router, public auth: AuthService) { 
    auth.user$.subscribe( user => {
      this.user = user.email
      console.log("usuario X: "+this.user);
    })
  }

  ngOnInit() {
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      amount: new FormControl('', Validators.required),
      rent: new FormControl('', Validators.required),
      bank:  new FormControl('', Validators.required),
      paymant_method:  new FormControl('', Validators.required),
      user1: new FormControl(this.user, Validators.required),
    });
  }

  onSubmit(value: { user1: string; bank: string; paymant_method: string}){
    console.log("USUARIOOO: "+this.user)
    console.log(value.bank +''+value.paymant_method)
    value.user1 = (this.user);
    console.log(this.formGroup.controls)
    
    this.firebaseService.createSolicitud(value)
    .then(
      res => {
        this.resetForm();
      }
    )
  }

  resetForm() {
    this.formGroup = this.formBuilder.group({
      amount: new FormControl('', Validators.required),
      rent: new FormControl('', Validators.required),
      bank:  new FormControl('', Validators.required),
      paymant_method:  new FormControl('', Validators.required),
      user1: [this.user, Validators.required ]
    });
  }
}
