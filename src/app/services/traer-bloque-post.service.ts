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
import {bloque} from '../models/bloque.interfaces';
import {taskI} from '../models/task.interfaces';


import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class Bloque_Postrvice {


  private postCollection: AngularFirestoreCollection<bloque>;
  private post: Observable <bloque[]>;

constructor(db:AngularFirestore){
    this.postCollection = db.collection<bloque>('post');
    this.post = this.postCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id  = a.payload.doc.id;
          return {id, ...data}; 
        });
      }
    ));


  }

  getBloques(){
    return this.post;
}

  getBloque(id:string){
    return this.postCollection.doc<bloque>(id).valueChanges();
  } 

  updateBloque(bloque:bloque, id:string){
    return this.postCollection.doc(id).update(bloque);
  }

  addBloque(bloque:bloque){
    return this.postCollection.add(bloque);
  }

  removeBloque(id:string){
    return this.postCollection.doc(id).delete();
  }

  adjuntarBloque(todo:taskI){
    let id_bloque
    let bloque_encontrado: bloque;

    id_bloque = todo.bloque_id

    this.getBloque(id_bloque).subscribe((res) =>{
      bloque_encontrado = res;
      todo.bloque_html = bloque_encontrado.bloque
    })
    console.log(todo);
    return todo ;
  }



}
