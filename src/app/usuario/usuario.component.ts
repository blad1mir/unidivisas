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


  public formGroupZelle: FormGroup;
  public formGroupBanco: FormGroup;
  ListaZelle = [];
  ListaBancos = [];
  usuario="";
  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder, public auth: AuthService) { 
    auth.user$.forEach(usuario => { this.usuario=usuario.email;  });
  }

  ngOnInit() {
    this.buildFormZelle();
    this.buildFormBanco();
    this.obtenerListaZelle();

  }

  buildFormZelle() {
    this.formGroupZelle = this.formBuilder.group({
      correoZelle: new FormControl('', Validators.required),
      nombreZelle: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required)
    });
  }

  buildFormBanco() {
    this.formGroupBanco = this.formBuilder.group({
      nombreBanco: new FormControl('', Validators.required),
      cuentaBanco: new FormControl('', Validators.required),
      nombreCliente: new FormControl('', Validators.required),
      cedulaCliente: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required)
    });
  }

  obtenerListaZelle(){
    this.firebaseService.obtenerListaDeZelle()
    .subscribe( ListaZelle =>{
      this.ListaZelle = ListaZelle;
    
    })
  
}


  onSubmitZelle(value) {
    this.firebaseService.createDatos(value)
      .then(
        res => {
          this.resetForm();
        }
      )
  }

  onSubmitBanco(value) {
    this.firebaseService.createDatos(value)
      .then(
        res => {
          this.resetForm();
        }
      )
  }

  resetForm() {
    this.formGroupZelle = this.formBuilder.group({
      nombreUsuario: new FormControl('', Validators.required),
      Banco: new FormControl('', Validators.required),
      NumeroCuenta: new FormControl('', Validators.required),
      Cedula: new FormControl('', Validators.required),
      CorreoZelle: new FormControl('', Validators.required),
      NombreZelle: new FormControl('', Validators.required)
    });
  }

}


