import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FirestoreService } from '../../Servicios/firestore.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    this.verificar();

  }
  tieneNegativo(input: FormControl) {
    const tieneneg = input.value.indexOf('-') >= 0;
    return tieneneg ? null : { necesitaneg: true };
  }

  buildFormZelle() {
    function LongitudMinima(minimum) {
      return function(input) {
        return input.value.length >= minimum ? null : { minLength: true };
      };
    }
    function tieneArroba(input: FormControl) {
      const hasExclamation = input.value.indexOf('@') >= 0;
      return hasExclamation ? null : { needsExclamation: true };
    }
    function tienecom(input: FormControl) {
      const hasExclamation = input.value.indexOf('.com') >= 0;
      return hasExclamation ? null : { needsExclamation: true };
    }

    this.formGroupZelle = this.formBuilder.group({
      correoZelle: new FormControl('', [Validators.required,LongitudMinima(6),tieneArroba,tienecom]),
      nombreZelle: new FormControl('', [Validators.required,LongitudMinima(2)]),
      alias: new FormControl('', [Validators.required,LongitudMinima(2)]),
      usuario: new FormControl('')
    });
  }
  buildFormBanco() {
    function LongitudMinima(minimum) {
      return function(input) {
        return input.value.length >= minimum ? null : { minLength: true };
      };
    }
    function Longitud(long) {
      return function(input) {
        return input.value.length == long ? null : { longi: true };
      };
    }
    

    function nega(mi) {
      return function(input) {
        return input.value >= mi ? null : { mi: true };
      };
    }
    function nega2(mi) {
      return function(input) {
        return input.value = mi ? null : { mi: true };
      };
    }

    this.formGroupBanco = this.formBuilder.group({
      nombreBanco: new FormControl('', Validators.required),
      numeroCuenta: new FormControl('', [Validators.required,Longitud(20),nega(1)]),
      nombreCliente: new FormControl('', [Validators.required,LongitudMinima(7)]),
      cedula: new FormControl('', [Validators.required,LongitudMinima(4),nega(1)]),
      aliasBanco: new FormControl('', [Validators.required,LongitudMinima(2)]),
      usuario: new FormControl('')
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
  

  RegistrarNuevoZelle(value: { correoZelle: string; nombreZelle: string; usuario: string; principal: boolean; }) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    value.usuario = (this.usuario);
    let conta=0;
    this.ListaZelle.forEach(lista => {
      if (lista.usuario==this.usuario) {
        conta++;
      }
    })

    if(conta==0){
      value.principal=true;
      console.log(true)
    }else{
      value.principal=false;
      console.log(false)
    }

    this.firebaseService.agregarNuevoZelle(value)
    .then(
      res => {
        this.resetFormZelle();
        this.resetFormBanco();
        Toast.fire({
          icon: 'success',
          title: '¡Has registrado una ceunta de Zelle!'
        })
        //this.router.navigate(['/venta']);
      }
    )
  }

  verificar(){
    setInterval( ()=>{if(this.ListaZelle.length!=0){
    let conta=0;
    this.ListaZelle.forEach(lista => {
      if (lista.usuario==this.usuario && lista.principal==true) {
        conta++;
      }  
    })

    this.ListaZelle.forEach(lista => {
      if (lista.usuario==this.usuario && conta==0) {
        lista.principal=true;
        conta++;
      }  
    })
    }},10000);
   }

  RegistrarNuevoBanco(value: { nombreCliente: string; nombreBanco: string;  numeroCuenta: string; cedula: string; aliasBanco: string; usuario: string;}) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    value.usuario = (this.usuario);
    console.log(value);
    this.firebaseService.agregarNuevoBanco(value)
    .then(
      res => {
        this.resetFormBanco();
        //this.router.navigate(['/venta']);
        this.resetFormZelle();
        Toast.fire({
          icon: 'success',
          title: '¡Has registrado una ceunta de Banco!'
        })
      }
    )
   
  }

  eliminarZelle(valor){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    console.log(valor.id);
    this.firebaseService.eliminarZelle(valor.id);
    Toast.fire({
      icon: 'success',
      title: '¡Has eliminado una cuenta de Zelle!'
    })
  }

  eliminarBanco(valor){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    console.log(valor.id);
    this.firebaseService.eliminarBanco(valor.id);
    Toast.fire({
      icon: 'success',
      title: '¡Has eliminado una cuenta de Banco!'
    })
  }

  resetFormZelle() {
    function LongitudMinima(minimum) {
      return function(input) {
        return input.value.length >= minimum ? null : { minLength: true };
      };
    }
    function tieneArroba(input: FormControl) {
      const hasExclamation = input.value.indexOf('@') >= 0;
      return hasExclamation ? null : { needsExclamation: true };
    }
    function tienecom(input: FormControl) {
      const hasExclamation = input.value.indexOf('.com') >= 0;
      return hasExclamation ? null : { needsExclamation: true };
    }

    this.formGroupZelle = this.formBuilder.group({
      correoZelle: new FormControl('', [Validators.required,LongitudMinima(6),tieneArroba,tienecom]),
      nombreZelle: new FormControl('', [Validators.required,LongitudMinima(2)]),
      alias: new FormControl('', [Validators.required,LongitudMinima(2)]),
      usuario: new FormControl('')
    });
  }
  resetFormBanco() {
    function LongitudMinima(minimum) {
      return function(input) {
        return input.value.length >= minimum ? null : { minLength: true };
      };
    }
    function Longitud(long) {
      return function(input) {
        return input.value.length == long ? null : { longi: true };
      };
    }
    

    function nega(mi) {
      return function(input) {
        return input.value >= mi ? null : { mi: true };
      };
    }
    this.formGroupZelle = this.formBuilder.group({
      nombreBanco: new FormControl('', Validators.required),
      numeroCuenta: new FormControl('', [Validators.required,Longitud(20),nega(1)]),
      nombreCliente: new FormControl('', [Validators.required,LongitudMinima(7)]),
      cedula: new FormControl('', [Validators.required,LongitudMinima(4),nega(1)]),
      aliasBanco: new FormControl('', [Validators.required,LongitudMinima(2)]),
      usuario: new FormControl('')
    });
  }

  SeleccionarComoPrincipal(zelle){
    this.ListaZelle.forEach(elemento => {
      elemento.principal=false;
      this.firebaseService.ActualizarZelle(elemento.id, elemento);
    })

    zelle.principal=true;
    this.firebaseService.ActualizarZelle(zelle.id, zelle);


  }


}


