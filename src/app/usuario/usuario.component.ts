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
  ListaBanco = [];
  usuario="";
  constructor(public firebaseService: FirestoreService, private formBuilder: FormBuilder, public auth: AuthService) { 
    auth.user$.forEach(usuario => { this.usuario=usuario.email;  });
  }

  //a=10;

  ngOnInit() {
    this.buildFormZelle();
    this.buildFormBanco();
    this.obtenerListaZelle();
    this.obtenerListaBanco();

  }

  buildFormZelle() {
    this.formGroupZelle = this.formBuilder.group({
      correoZelle: new FormControl('', Validators.required),
      nombreZelle: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required)
    });
  }

  buildFormBanco() {
    this.formGroupBanco = this.formBuilder.group({
      nombreBanco: new FormControl('', Validators.required),
      numeroCuenta: new FormControl('', Validators.required),
      nombreCliente: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      aliasBanco: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required)
    });
  }

  obtenerListaZelle(){
    this.firebaseService.obtenerListaDeZelle()
    .subscribe( ListaZelle =>{
      this.ListaZelle = ListaZelle;
    
    })
    
  }
  
  obtenerListaBanco(){
    this.firebaseService.obtenerListaDeBanco().subscribe( ListaBanco =>{
      //this.ListaBanco = ListaBanco.slice(0,this.a);
      this.ListaBanco = ListaBanco;
      ListaBanco.forEach(elemento => {
        console.log(elemento)
      })
    })
    
  }
  
  //mas(){
    //this.firebaseService.obtenerListaDeBanco().subscribe(ListaBanco =>{
      //this.ListaBanco = ListaBanco.slice(0,);
      /*ListaBanco.forEach(elemento =>{
        console.log(elemento)
      })*/
    //})
    //var x = document.getElementById("cargador");
    //if (x.style.display === "none") {
      //x.style.display = "block";
    //} else {
      //x.style.display = "none";
    //}
  //}
  

  RegistrarNuevoZelle(value: { correoZelle: string; nombreZelle: string; usuario: string; }) {
    value.usuario = (this.usuario);
    console.log(value)
    this.firebaseService.agregarNuevoZelle(value)
    .then(
      res => {
        this.resetForm();
        //this.router.navigate(['/venta']);
      }
    )
  }

  RegistrarNuevoBanco(value: { nombreCliente: string; nombreBanco: string;  numeroCuenta: number; cedula: string; aliasBanco: string; usuario: string;}) {
    value.usuario = (this.usuario);
    console.log(value);
    this.firebaseService.agregarNuevoBanco(value)
    .then(
      res => {
        this.resetForm();
        //this.router.navigate(['/venta']);
      }
    )
   
  }

  eliminarZelle(valor){
    console.log(valor.id);
    this.firebaseService.eliminarZelle(valor.id);
  }

  eliminarBanco(valor){
    console.log(valor.id);
    this.firebaseService.eliminarBanco(valor.id);
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


