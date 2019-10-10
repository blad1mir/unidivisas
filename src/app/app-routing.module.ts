import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {
    path: '',
    children: [
    {path: 'venta', component: VentaComponent},
    {path: 'login', component: LoginComponent},
    ],
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
