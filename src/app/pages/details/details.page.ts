import { Component, OnInit } from '@angular/core';
import {taskI} from '../../models/task.interfaces';
import {TodosService} from '../../services/todos.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import {Bloque_Postrvice} from '../../services/traer-bloque-post.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  like :boolean = true;
  user:any
  todo:taskI = {
  

    id_usuario: "",
    lista_id:"",
    tags: null,
    task: "",
    prioridad: 0,
    banner_seleccionado: '',
    portada:"",
    sub_task:"",
    bloque_id:"",
    bloque_html:"",
    info_user_uid:"",
    prioridad_selec:null,
    user_info: null,
    user_info_email: null,
    user_info_photo:null,

  }
  
  todoId = null;

  constructor(
    private router: ActivatedRoute,
    private nav: NavController,
    private todoservice: TodosService,
    private loadingController: LoadingController,
    private bloqueService: Bloque_Postrvice,
  ) { }
  
  ngOnInit() {
    this.todoId = this.router.snapshot.params['id'];

      if(this.todoId){
        this.loadTodo()
        console.log(this.todo)
      }

  }

  cargarHtml(){
    this.bloqueService.adjuntarBloque(this.todo)
  }
  
 async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Cargando..... '
    });
    await loading.present();
    this.todoservice.getTodo(this.todoId).subscribe(res =>{
      loading.dismiss();
      this.todo = res; 
      this.cargarHtml();
      this.masVista()
    });
  }

       masVista(){
      if (this.todo && this.like == true) {
      this.todo.prioridad = this.todo.prioridad + 1;
      this.todoservice.updateTodo(this.todo,this.todoId)
      this.like = false
      }
    }
  

}
