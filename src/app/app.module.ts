import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/venta.component';
import { MenuComponent } from './menu/menu.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompraComponent } from './compra/compra.component';
import { TransaccionComponent } from './transaccion/transaccion.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VentaComponent,
    MenuComponent,
    UsuarioComponent,
    CompraComponent,
    TransaccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)


  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
