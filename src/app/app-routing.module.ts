import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaComponent } from './venta/venta.component';
import { CompraComponent } from './compra/compra.component';
import { TransaccionComponent } from './transaccion/transaccion.component';

const routes: Routes = [
  {
    path: '',
    children: [
    {path: 'venta', component: VentaComponent},
    {path: 'compra', component: CompraComponent},
    {path: 'transaccion/:id', component: TransaccionComponent},
    ],
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
