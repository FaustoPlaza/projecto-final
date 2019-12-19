import { Component, OnInit } from '@angular/core';
import {taskI} from '../../models/task.interfaces';
import {TodosFiltroService} from '../../services/todos-filtro.service';
import { listasService } from 'src/app/services/listas.service';
import { lista } from 'src/app/models/listas.interfaces';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopOverPage } from '../pop-over/pop-over.page';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage {
 
public todos: taskI[]; 
private lista: lista[];
texto: string;
buscar: boolean;
public isSearchOpended = false;

  constructor(private todoService: TodosFiltroService,
              private listaService: listasService,
              private PopOverController: PopoverController,
              private modalController: ModalController,
    ) {}


  onSearch(event){
    const textoCons = event.target.value;
    this.texto = textoCons;
  }
  ngOnInit() {
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

}
