import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {TodosService} from '../../services/todos.service';
import { taskI } from 'src/app/models/task.interfaces';
import {UserService} from '../../services/user.service';
import {TodosBibliotecasService} from '../../services/todos-biblioteca.service';
import { listasService } from 'src/app/services/listas.service';
import { lista } from 'src/app/models/listas.interfaces';

import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class secondPage implements OnInit {
 private todos: taskI[];
 private lista: lista[];


  private user: any

  constructor(
      private menuCrtl: MenuController,
      private authSvc: AuthService,
      private afAuth: AngularFireAuth,
      private router: Router,
      private todoService: TodosBibliotecasService,
      private userService: UserService,
      private listaService: listasService,

     ) {}
      async ngOnInit() {
         //traer el uid del ususario
         firebase.auth().onAuthStateChanged((res) => {		
          this.user = res;
        });


        //traer Todos
            this.todoService.getTodos().subscribe((todos) => {
              this.todos = todos;
              this.acomodarTodos();
              this.combinarlistas();
          });

    
      }

      async  acomodarTodos(){
        this.todos.sort(function (a,b) {
         const genreA = a.prioridad;
         const genreB = b.prioridad;
         
         let comparison = 0;
         if (genreA < genreB) {
           comparison = 1;
         } else if (genreA > genreB) {
           comparison = -1;
         }
         return comparison;
        }) 
         return this.todos
        }
 
       combinarlistas(){
       this.listaService.getUrlsTodos(this.todos)
        }

  
 
}
