import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VentaComponent } from './venta/lista/venta.component';
import { MenuComponent } from './menu/menu.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompraComponent } from './compra/compra.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SolicitudComponent } from './venta/solicitud/solicitud.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const config = {
  apiKey: "AIzaSyCTBMwIbR_erD_braA5rWhoIVI3MMev6VY",
  authDomain: "unidivisas-77768.firebaseapp.com",
  databaseURL: "https://unidivisas-77768.firebaseio.com",
  projectId: "unidivisas-77768",
  storageBucket: "unidivisas-77768.appspot.com",
  messagingSenderId: "740078098565",
  appId: "1:740078098565:web:ed5cb44e2f0a71366b31ec",
  measurementId: "G-6KT2L43N0D"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VentaComponent,
    MenuComponent,
    UsuarioComponent,
    CompraComponent,
    TransaccionComponent,
    SolicitudComponent,
    InicioComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [AngularFirestoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
