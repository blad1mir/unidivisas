import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/Servicios/firestore.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class ListComponent implements OnInit {
  items: Array<any>;
  request = [];
  reqCurrent = [];
  val = 0;
  id;
  user:"";
  public formGroup: FormGroup;

  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder, private router: Router, public auth: AuthService) { 
    //auth.user$.forEach(u => { this.user=u.email; console.log("usuario C: "+this.user)});
  }

  ngOnInit() {
    this.buildForm;
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      amount: ['',Validators.required],
      rate: ['',Validators.required],
      bank: ['',Validators.required],
      payment_method: ['',Validators.required],
      user1: ['',Validators.required]
    })
  }


}
