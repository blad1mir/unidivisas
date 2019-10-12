import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaComponent } from './venta/lista/venta.component';
import { SolicitudComponent } from './venta/solicitud/solicitud.component';

const routes: Routes = [
  {
    path: '',
    children: [
    {path: 'venta', component: SolicitudComponent},
    {path: 'login', component: LoginComponent},
    ],
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
