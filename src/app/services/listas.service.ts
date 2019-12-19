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


@Injectable({
  providedIn: 'root'
})
export class listasService {

  // traer las listas

  private listaCollection: AngularFirestoreCollection<lista>;
  private lista: Observable <lista[]>;

constructor(db:AngularFirestore){
    this.listaCollection = db.collection<lista>('lista');
    this.lista  = this.listaCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id  = a.payload.doc.id;
          return {id, ...data}; 
        });
      }
    ));
  }

  
  getListas(){
    return this.lista;
}

  getLista(id:string){
    return this.listaCollection.doc<lista>(id).valueChanges();
  }

  updateLista(lista:lista, id:string){
    return this.listaCollection.doc(id).update(lista);
  }

  addLista(lista:lista){
    return this.listaCollection.add(lista);
  }

  removeLista(id:string){
    return this.listaCollection.doc(id).delete();
  }


  //combinar ambos

  getUrlsTodos(todos:taskI[]){ 

     todos.forEach(todo => {
      let idLista
      let listaEncontrada:lista;
      let bannerSeleccion

        idLista = todo.lista_id
    
          this.getLista(idLista).subscribe((res) =>{

            listaEncontrada = res;
            todo.portada = listaEncontrada.portada_link;


            bannerSeleccion = todo.banner_seleccionado;
            todo.banner_seleccionado = res.Baners_link[bannerSeleccion]
          
          });
      
    });
    return todos;
  }

  

}
