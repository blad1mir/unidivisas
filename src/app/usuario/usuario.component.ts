import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../Servicios/firestore.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public solicitudes = [];
  public solicitud = '';
  public formGroup: FormGroup;
  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
    this.buildForm();
    
  }

  buildForm() {

    this.formGroup = this.formBuilder.group({
      nombreUsuario:  new FormControl('', Validators.required),
      Banco: new FormControl('', Validators.required),
      NumeroCuenta: new FormControl('', Validators.required),
      Cedula: new FormControl('', Validators.required),
      CorreoZelle: new FormControl('', Validators.required),
      NombreZelle: new FormControl('', Validators.required)
    });
}

onSubmit(value) {
  this.firebaseService.createDatos(value)
  .then(
    res => {
      this.resetForm();
    }
  )
}

resetForm() {
  this.formGroup = this.formBuilder.group({
      nombreUsuario:  new FormControl('', Validators.required),
      Banco: new FormControl('', Validators.required),
      NumeroCuenta: new FormControl('', Validators.required),
      Cedula: new FormControl('', Validators.required),
      CorreoZelle: new FormControl('', Validators.required),
      NombreZelle: new FormControl('', Validators.required)
  });
}

}


