import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { TabsPage } from '../tabs/tabs.page';
import {PopOverPage} from '../pop-over/pop-over.page';
import { PopOverPageModule } from '../pop-over/pop-over.module';

const routes: Routes = [


  
  {
    path: 'menu',
    component: MenuPage,
      children: [
          {path: '', loadChildren: '../first/first.module#FirstPageModule',},
          {path: 'first', loadChildren: '../first/first.module#FirstPageModule',},
          {path: 'second', loadChildren: '../second/second.module#SecondPageModule', canActivate : [AuthGuard]},
          {path: 'lobby', loadChildren: '../lobby/lobby.module#LobbyPageModule'},
          {path: 'busqueda', loadChildren: '../busqueda/busqueda.module#BusquedaPageModule'},
          {path: 'post-view', loadChildren: '../post-view/post-view.module#PostViewPageModule', canActivate : [AuthGuard]},
          {path: 'post-create', loadChildren: '../post-create/post-create.module#PostCreatePageModule'},
          {path: 'post-create/:id', loadChildren: '../post-create/post-create.module#PostCreatePageModule'},
          {path: 'register', loadChildren: '../user/register/register.module#RegisterPageModule'},
          {path: 'configs', loadChildren: '../user/configs/configs.module#ConfigsPageModule',canActivate : [AuthGuard]},
          {path: 'login', loadChildren: '../user/login/login.module#LoginPageModule'},
          {path: 'details/:id', loadChildren: '../details/details.module#DetailsPageModule'},
          {path: 'details', loadChildren: '../details/details.module#DetailsPageModule'},
          {path: 'tabs', loadChildren: '../tabs/tabs.module#TabsPageModule' },
          {path: 'rec-contra', loadChildren: '../user/rec-contra/rec-contra.module#RecContraPageModule'},
          
      ]},

     {path: '', loadChildren: '../first/first.module#FirstPageModule'}, 

                        ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PopOverPageModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
