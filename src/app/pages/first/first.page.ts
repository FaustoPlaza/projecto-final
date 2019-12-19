import { Component, OnInit } from '@angular/core';
import {TodosService} from '../../services/todos.service';
import { taskI } from 'src/app/models/task.interfaces';
import { lista } from 'src/app/models/listas.interfaces';
import { listasService } from 'src/app/services/listas.service';
import { PopoverController, ModalController ,NavParams } from '@ionic/angular';
import { PopOverPage } from '../pop-over/pop-over.page';

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {
 private todos: taskI[];
 private lista: lista[];
 value = 0;

  constructor(
      private todoService: TodosService,
      private listaService: listasService,
      private PopOverController: PopoverController,
      private modalController: ModalController,
     ) {}


       ngOnInit() {
                this.todoService.getTodos().subscribe((todos) => {
                this.todos = todos;
                this.combinarlistas();
                this.acomodarTodos();
              })
              
              
      }

       

       async  acomodarTodos(){
       this.todos.sort(function (a,b) {
        const genreB = a.prioridad;
        const genreA = b.prioridad;
        
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
       

      async combinarlistas(){
       this.listaService.getUrlsTodos(this.todos)
       }

      async OpenPop(ev: Event, todo:taskI){
        const popover = await this.PopOverController.create({
            component: PopOverPage,
            componentProps:{
              todo:todo
              
            },
            event:ev
        });
        popover.present();
       }

       async openModal(todo:taskI){
         const modal = await this.modalController.create({
          component: PopOverPage,
          componentProps:{
            todo:todo
          },
          });
          modal.present()
       }

       async contarPriodad(){

        this.todos.forEach(todo =>{

          if(todo.prioridad_selec != null){
            todo.prioridad = todo.prioridad_selec.length
          }else{
            todo.prioridad = 0
            
          }

        
        })

       }


      
}

