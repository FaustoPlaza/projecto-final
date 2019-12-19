import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
 { path: '', redirectTo:'menu',pathMatch:'full'},
 
 //esto funciona
  { path: '', loadChildren: './pages/menu/menu.module#MenuPageModule'},

  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule'},
  { path: '**' , redirectTo:'menu',pathMatch:'full'},
  { path: '**', loadChildren: './pages/menu/menu.module#MenuPageModule'},
  
];
console.log("hola")

 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
