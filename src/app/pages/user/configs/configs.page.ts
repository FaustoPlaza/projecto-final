import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../../../shared/user.class';
import { usuario } from '../../../models/user.interfaces';
//import { newInfoUser } from '../../../models/newInfoUser.interfaces';
import { AuthService } from '../../../services/auth.service';
import { UsuariobService } from '../../../services/usuarios-db.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.page.html',
  styleUrls: ['./configs.page.scss'],
})
export class ConfigsPage implements OnInit {

  configurar : boolean;


  user: User;
  userDos: usuario;
  newInfoUser: any;
  guardar: boolean;



  constructor(
    private router:Router, 
    private authSvc: AuthService,
    public toastController: ToastController,
    private usuarioService : UsuariobService,
      ) { }


  ngOnInit() {
    //traer el uid del ususario
    
    firebase.auth().onAuthStateChanged((res) => {		
      this.user = res;  
      console.log(this.user)
      if( this.user != undefined){
      //  this.buscarUsuario()
      }
    });
    
    
  }

  buscarUsuario(){
    let listaUsuarios



    // this.usuarioService.getUsuarios().subscribe((res) => {
    //   listaUsuarios = res;
    //   if(listaUsuarios != undefined){
    //     listaUsuarios.forEach(usuarios => {
    //       if (usuarios.uid == this.user.uid) {
    //         this.userDos = usuarios
    //         console.log(this.userDos)
    //         console.log(this.user)
    //       }
    //     });
    // }
    // })
  }



  async onLogout(){
    this.router.navigateByUrl('/menu/login');
     
 }
 
  toast(){    


        if (this.configurar == false) {
       //   this.guardarInfo()
              const toast =  this.toastController.create({
                color: 'dark',
                duration: 2000,
                message: 'Su informacion fue Guardada',
                showCloseButton: true
              }).then(toast => {
                toast.present();
              });
        
        }else{
              const toast =  this.toastController.create({
                color: 'dark',
                duration: 2000,
                message: 'Su Informacion podra se moridificada',
                showCloseButton: true
              }).then(toast => {
                toast.present();
              });
        }
    
  }

  guardarInfo(){
        //actualizar
        this.usuarioService.updateUsuario(this.userDos,this.userDos.id).then(() => {
          this.configurar = false
          console.log("guardando")
          const toast =  this.toastController.create({
            color: 'dark',
            duration: 2000,
            position:'middle',
            message: 'Su informacion fue Guardada',
            showCloseButton: true
          }).then(toast => {
            toast.present();
          });
        });
      
  }
    
  


}

