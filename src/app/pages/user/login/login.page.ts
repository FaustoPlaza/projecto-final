import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/user.class';
import { newUser } from '../../../models/newUser.interfaces'
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  newUser: newUser 
  private userSecion: any;
  constructor(
        private router:Router, 
        private authSvc: AuthService,
        public toastController: ToastController,
    ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((res) => {		
      this.userSecion = res;
    });



  }

  async onLogin(){
    const user = await this.authSvc.onLogin(this.user);
      if(user){
        this.toast1()
        this.router.navigateByUrl('/menu/first');
      }
  }

  async onLogout(){
     this.authSvc.onLogout();
     this.toast2()
     this.router.navigateByUrl('/menu/first');
      
  }

  toast1(){
    const toast =  this.toastController.create({
      color: 'dark',
      duration: 2000,
      position:'bottom',
      message: 'Login Realizado',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
} 

toast2(){
  const toast =  this.toastController.create({
    color: 'dark',
    duration: 2000,
    position:'bottom',
    message: 'Desconeccion Realizado',
    showCloseButton: true
  }).then(toast => {
    toast.present();
  });
} 


recContraseña(){
  console.log("res")
}

}
