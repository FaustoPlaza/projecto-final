import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-rec-contra',
  templateUrl: './rec-contra.page.html',
  styleUrls: ['./rec-contra.page.scss'],
})
export class RecContraPage implements OnInit {

  mail : string;
  constructor(
    public toastController: ToastController,
  ) { }

  ngOnInit() {
  }
  enviar(){
    if (this.mail != undefined || this.mail != null) {

      
      firebase.auth().sendPasswordResetEmail(this.mail).then(() =>   {
        this.toast1();
      }).catch(function(error) {
        this.toast2(error);
      });



    }else{
      this.toast3()
    }
  }

  toast1(){
    const toast =  this.toastController.create({
      color: 'dark',
      duration: 2000,
      position:'bottom',
      message: 'Mail Enviado',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
  }

  toast2(error: any){
    const toast =  this.toastController.create({
      color: 'dark',
      duration: 2000,
      position:'bottom',
      message: error,
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
  }

  toast3(){
    const toast =  this.toastController.create({
      color: 'dark',
      duration: 2000,
      position:'bottom',
      message: "Escribir el mail ",
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
  }


}
