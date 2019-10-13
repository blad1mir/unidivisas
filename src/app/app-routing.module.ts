import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraComponent } from './compra/compra.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { VentaComponent } from './venta/lista/venta.component';
import { SolicitudComponent } from './venta/solicitud/solicitud.component';
import { AuthGuard } from './auth.guard';
import { UsuarioComponent } from './usuario/usuario.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    children: [
    {path: '',redirectTo:'/login',pathMatch: 'full'},
    {path: 'venta', component: SolicitudComponent,  canActivate: [AuthGuard]},
    {path: 'transaccion/:id', component: TransaccionComponent,  canActivate: [AuthGuard]},
    {path: 'compra', component: CompraComponent, canActivate: [AuthGuard]},
    {path: 'ajustes', component: UsuarioComponent, canActivate: [AuthGuard]},
    {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent}
    ],
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
