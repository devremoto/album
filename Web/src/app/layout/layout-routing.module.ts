import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';


const routes: Routes = [

  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
