import { Component, OnInit } from '@angular/core';
import { taskI } from '../../models/task.interfaces';
import { lista } from '../../models/lista.interfaces';
import { bloque } from '../../models/bloque.interfaces';
import { TodosService } from '../../services/todos.service';
import { ActivatedRoute } from '@angular/router';
import { Edit } from '../../models/editorConfig';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Bloque_Postrvice } from 'src/app/services/traer-bloque-post.service';
import { listasService } from 'src/app/services/listas.service';
import * as firebase from 'firebase';
import {UsuariobService} from '../../services/usuarios-db.service'



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.page.html',
  styleUrls: ['./post-create.page.scss'],
})
export class PostCreatePage implements OnInit {

  private user: any;
  private listas: any;
  private usuario: any;
  private listo : boolean;

  todo: taskI = {
    id_usuario: "",
    lista_id: "",
    tags: null,
    task: "",
    prioridad: 0,
    banner_seleccionado: null,
    portada: null,
    sub_task: "",
    bloque_id: "",
    bloque_html: " </br></br> </br> </br></br></br> </br> </br></br></br> </br> </br>",
    info_user_uid: "",
    user_info: null,
    user_info_email: null,
    user_info_photo:null,
    prioridad_selec:null,
  }
  todoId = null;
  bloque: bloque = {
    bloque: "",
  }


  permitirTags: boolean;
  constructor(
    private router: ActivatedRoute,
    private nav: NavController,
    private todoservice: TodosService,
    private loadingController: LoadingController,
    private bloqueService: Bloque_Postrvice,
    private listaService: listasService,
    private userService: UsuariobService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargarLista()
    this.cargarTodo()
    this.listo = false
    this.todoId = this.router.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo()
    }
    if(this.listas){
      this.cargarLista()
      this.cargarTodo()
    }
    console.log(this.todo)
  }

empezar(){
 this.cargarLista()
    this.listo = false
    this.todoId = this.router.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo()
    }
}



  reCargarText(){
    this.todo = {
      id_usuario: null,
      lista_id: null,
      tags: null,
      task: null,
      prioridad: 0,
      banner_seleccionado: null,
      portada: null,
      sub_task: null,
      bloque_id: null,
      bloque_html: null,
      info_user_uid: null,
      prioridad_selec:null,

      user_info: null,
      user_info_email: null,
      user_info_photo:null,
    }
  }

  


  cargarHtml() {

    this.bloqueService.adjuntarBloque(this.todo)

  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Cargando..... '
    });
    await loading.present();
    this.todoservice.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
      this.permitirTags = true;
      this.cargarHtml();
    });
  }

  async MakeTodo(){
    this.revisar()
    if(this.listo == true){
          firebase.auth().onAuthStateChanged((res) => {
            this.usuario = res;
            this.user = res.uid;  
          });
          const loading = await this.loadingController.create({
            message: 'guardando.....'
          });
          await loading.present();

          if(!this.todoId || this.user){
            this.todo.id_usuario = this.user
              
                this.userService.getUsuarios().subscribe((res) => {
                  res.forEach(respuestas =>{
                    if (respuestas.id == this.todo.id_usuario) {
                      this.todo.info_user_uid = respuestas.id
                    }
                  })
                })        
                this.bloque.bloque = this.todo.bloque_html;
                this.todo.bloque_html = null;
                this.todo.bloque_id = null
                this.todo.user_info = this.usuario.displayName
                this.todo.user_info_email = this.usuario.email
                this.todo.user_info_photo = this.usuario.photoURL
                this.todo.prioridad = 0
                        this.bloqueService.addBloque(this.bloque).then((res) => {
                          this.todo.bloque_id = res.id;
                            if (this.todo.bloque_id) {
                              this.terminarGuardado()
                              loading.dismiss();
                            }
                        })    
              }
        }
  }


  async saveTodo() {
    this.revisar()
    if(this.listo == true){
          firebase.auth().onAuthStateChanged((res) => {
            this.usuario = res;
            this.user = res.uid;
            
          });
          const loading = await this.loadingController.create({
            message: 'guardando.....'
          });
          await loading.present();

          if (this.todoId) {
            
            //actualizar
            this.bloque.bloque = this.todo.bloque_html;
            this.todo.bloque_html = null;
        
            this.bloqueService.updateBloque(this.bloque, this.todo.bloque_id).then(()=>{
              loading.dismiss();
              this.nav.navigateBack('');
              
            })
          }
    }
  }

  revisar(){
    if (this.todo.task != ""  && this.todo.lista_id != "" && 
    this.todo.task != null &&  this.todo.lista_id != null ) {
      this.listo = true 
      
      
    }else{
      this.toast1()
      console.log(this.todo)
      this.listo = false
    }
  }

  
  terminarGuardado(){

    this.todoservice.addTodo(this.todo).then((res) => {
      this.reCargarText()
      this.toast2()
      this.nav.navigateBack('');
    });
  }


  async deleteTodo() {
    const loading = await this.loadingController.create({
      message: 'Borrando.....'
    });
    await loading.present();
    this.todoservice.removeTodo(this.todoId)
    loading.dismiss();
    this.toast3()
    this.nav.navigateBack('');

  }

  cargarLista() {
    this.listaService.getListas().subscribe((res) => {
      this.listas = res;
    })

  }

  guardarLista(event){
    let recibido
    let recibido2
    recibido = event.detail.value 
    recibido2 = recibido.split(', ')
    this.todo.lista_id = recibido2[0]
    this.todo.tags =  recibido2[1] + ' ' + recibido2[2] + ' ' + this.todo.task

  }

toast1(){
    const toast =  this.toastController.create({
      color: 'dark',
      duration: 2000, 
      position:'bottom',
      message: 'Se deben llenar todos los campos',
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
    message: 'Post Borrado',
    showCloseButton: true
  }).then(toast => {
    toast.present();
  });
} 

toast2(){
  const toast =  this.toastController.create({
    color: 'dark',
    duration: 2000,
    position:'bottom',
    message: 'Post Guardado',
    showCloseButton: true
  }).then(toast => {
    toast.present();
  });
} 

cargarTodo(){
  this.todo= {
    id_usuario: "",
    lista_id: "",
    tags: null,
    task: "",
    prioridad: 0,
    banner_seleccionado: null,
    portada: null,
    sub_task: "",
    bloque_id: "",
    bloque_html: " </br></br> </br> </br></br></br> </br> </br></br></br> </br> </br>",
    info_user_uid: "",
    user_info: null,
    user_info_email: null,
    user_info_photo:null,
    prioridad_selec:null,
  }
}
 
async alertEliminarTodo() {
  const alert = await this.alertController.create({
    header: '¿Eliminar?',
    message: 'Desea eliminar el post Permanentemente? ',
    buttons: [
      {
        text: 'Cancelar',
        role: 'Cancelar',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Eliminar',
        role: 'Eliminar',
        cssClass: 'danger',
        handler: (blah) => {
          this.deleteTodo()
        }
      }
    ]
  });

  await alert.present();
}



}
