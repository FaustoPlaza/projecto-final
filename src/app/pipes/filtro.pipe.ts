import { Pipe, PipeTransform } from '@angular/core';
import { taskI } from '../models/task.interfaces';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: taskI[], texto: string ): taskI[] {
    if (!texto) return null;

    texto = texto.toLocaleLowerCase();
    
   return todos.filter(todo =>{
        return todo.tags.toLocaleLowerCase().includes(texto); 
    });
  }

}
