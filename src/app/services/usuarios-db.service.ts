import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Http } from '@angular/http';
import { firestore, Observer } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import {AngularFirestore,AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { lista } from '../models/listas.interfaces';
import {taskI} from '../models/task.interfaces';
import {newInfoUser} from '../models/newInfoUser.interfaces';
import {usuario} from '../models/user.interfaces';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UsuariobService {

  private usuariosCollection: AngularFirestoreCollection<usuario>;
  private usuario: Observable <usuario[]>;

  constructor(db:AngularFirestore){
    this.usuariosCollection = db.collection<usuario>('usuario');
    this.usuario  = this.usuariosCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id  = a.payload.doc.id;
          return {id, ...data}; 
        });
      }
    ));
  }

  
  getUsuarios(){
    return this.usuario;
}

  getUsuario(id:string){
    return this.usuariosCollection.doc<usuario>(id).valueChanges();
  }

  updateUsuario(usuario:usuario, id:string){
    return this.usuariosCollection.doc(id).update(usuario);
  }

  addUsuario(usuario:usuario){
    return this.usuariosCollection.add(usuario);
  }

  removeUsuario(id:string){
    return this.usuariosCollection.doc(id).delete();
  }

  traerUsuario(id:string){
    let idEncontrado
    let usuariosLista
    this.getUsuarios().subscribe((res) => {
      usuariosLista = res
    });
    if (usuariosLista != undefined) {
      usuariosLista.forEach(usuario => {
        if (usuario.id == id) {
          idEncontrado = usuario.id
          return idEncontrado
        }
      });
      return idEncontrado
    }
        
    return idEncontrado
  }


  //combinar usuario en Todos

  getUidUsuarios(todos:taskI[]){

    todos.forEach(todo => {
      let idUser
      let usuarioEncontrado
      
      idUser = todo.info_user_uid

        this.getUsuario(idUser).subscribe((res) =>{
          usuarioEncontrado = res;
          todo.user_info = usuarioEncontrado
        })
      return todos;
    });

  }
  
  //// traer usuario por UID

  getUserUid( id :string ){
    let actualUser
    let usuariosLista
    this.getUsuarios().subscribe((res) => {
      usuariosLista = res
    });
    if(usuariosLista != undefined){
    usuariosLista.forEach(respuesta => {
      if (respuesta.uid == id) {
        actualUser = respuesta
        return actualUser
        
      }
    })
    return actualUser
  }

      
    return actualUser
  }

  

}
