import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';  
import { AngularFireAuth } from '@angular/fire/auth' 
import { isNullOrUndefined } from 'util';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
              public authSvc: AuthService,
              private router: Router,
              public toastController: ToastController){


  }
  canActivate(
              next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
              ): 
              Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
   {
  

    if(isNullOrUndefined(this.authSvc.islogged)){
      this.toast()
      this.router.navigate(['/menu/login'])
      return false;
    }else{
      return true;
      
    }

  }
  toast(){
          const toast =  this.toastController.create({
            color: 'dark',
            duration: 2000,
            position:'middle',
            message: 'Necesitas estar logeado para acceder',
            showCloseButton: true
          }).then(toast => {
            toast.present();
          });
      
   
    
 
} 
  
}
