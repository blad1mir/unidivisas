import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraComponent } from './compra/compra.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { VentaComponent } from './venta/lista/venta.component';
import { SolicitudComponent } from './venta/solicitud/solicitud.component';
import { UsuarioComponent } from './usuario/datosTransferencia/usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { SeguimientoTransaccionComponent } from './seguimiento-transaccion/seguimiento-transaccion.component';
import { HistorialComponent } from './usuario/historial/historial.component';
import { DatosPersonalesComponent } from './usuario/datos-personales/datos-personales.component';

const routes: Routes = [
  {
    path: '',
    children: [
    {path: '',redirectTo:'/bienvenida',pathMatch: 'full'},
    {path: 'venta', component: SolicitudComponent,  canActivate: [AuthGuard]},
    {path: 'transaccion/:id', component: TransaccionComponent,  canActivate: [AuthGuard]},
    {path: 'compra', component: CompraComponent, canActivate: [AuthGuard]},
    {path: 'datos-transferencia', component: UsuarioComponent, canActivate: [AuthGuard]},
    {path: 'datos-personales', component: DatosPersonalesComponent, canActivate: [AuthGuard]},
    {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'bienvenida', component: BienvenidaComponent},
    {path: 'preguntas-frecuentes', component: PreguntasComponent},
    {path: 'transferencias', component: SeguimientoTransaccionComponent, canActivate: [AuthGuard]},
    {path: 'historial', component: HistorialComponent, canActivate: [AuthGuard]},
    
    ],
    },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
