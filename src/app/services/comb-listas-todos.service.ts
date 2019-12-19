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
export class CombService {

  private listaCollection: AngularFirestoreCollection<lista>;
  private lista: Observable <lista[]>;
  private todo: Observable <taskI[]>;


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


getlistas(){
  return this.lista;
}

getUrlsTodos(todo:taskI){


  todo.banner_seleccionado 

}


}