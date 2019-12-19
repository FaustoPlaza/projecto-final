import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/user.class';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public islogged: any = false;

  constructor(public afAuth: AngularFireAuth,
    public toastController: ToastController,
    ) { 
    afAuth.authState.subscribe(user => (this.islogged = user ));
  }

    //login
    async onLogin (user:User){
      try{
        return await this.afAuth .auth.signInWithEmailAndPassword(
          user.email,
          user.password
          );
      }catch(error){
        this.toastError(error)
      }
   }

   //toast de error

   toastError(error:any){
    const toast =  this.toastController.create({
      color: 'dark',
      duration: 2000,
      position:'bottom',
      message: 'Mail o Contraseña Incorrectos',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
   }

   //Desconectarse
   async onLogout (){
    return this.afAuth.auth.signOut();
 }




   //register
   async onRegister(user:User){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
      );

   }catch(error){
    console.log('Error on Register', error);
  }
  }

}
