import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/user.class';
import { usuario } from '../../../models/user.interfaces';
import { newUser } from '../../../models/newUser.interfaces';
import { ToastController } from '@ionic/angular';
import { UsuariobService } from 'src/app/services/usuarios-db.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  newData:newUser;
  user:User = new User();
  usuario: usuario;


  constructor( 
    private authSvc: AuthService,
     private router: Router,
    public toastController: ToastController,
    private usuarioService : UsuariobService,
    
    ) { }

  ngOnInit() {
   this.newData = {

      apellido: null,
      uid:null,
      iconos:null,
      nombre:null,
      nombre_user:null,
      email:null,
      password:null,
    }

  }

  async onRegister(){
    const user = await this.authSvc.onRegister(this.user).then((res) => {
       this.newData.uid = res.user.uid;
       if(this.newData != undefined){
        this.onRegisterUser()
       }
       if(res){
        this.toast1()
        this.router.navigateByUrl('/menu/first');
      }
      
    });
      
 }

 onRegisterUser(){
  this.usuarioService.addUsuario
 }

 toast1(){
  const toast =  this.toastController.create({
    color: 'dark',
    duration: 2000,
    position:'bottom',
    message: 'Registro Realizado',
    showCloseButton: true
  }).then(toast => {
    toast.present();
  });
} 
   

    
  

}
