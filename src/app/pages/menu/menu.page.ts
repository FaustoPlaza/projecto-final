import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from  '@angular/router';
import * as firebase from 'firebase';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../../services/auth.service';
import {AuthGuard} from '../../guards/auth.guard'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private authSvc: AuthService
  private user: any
  private coneccion: boolean


    page1 = {title: 'Home', url: '/menu/first'};
    page2 = {title: 'Perfil', url: '/menu/configs'};
    page3 = {title: 'Busqueda', url: '/menu/busqueda'};
    page4 = {title: 'post-view', url: '/menu/post-view'};
    page5 = {title: 'Crear Reseña', url: '/menu/post-create'};
    page6 = {title: 'Login', url: '/menu/login'};
    page7 = {title: 'Desconectarse', url: '/menu/login'};


    selectedPath = '';
    selectPath = '';

  constructor(private router: Router,
              private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private auth: AuthGuard
             
    
    
    ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });


   }
  ngOnInit() {
    this.cargarUser()
  }

  cargarUser(){
    if(this.auth.authSvc){
      firebase.auth().onAuthStateChanged((res) => {
        this.user = res;    
        console.log(this.user)
      });
    }
    

    
  }

}
