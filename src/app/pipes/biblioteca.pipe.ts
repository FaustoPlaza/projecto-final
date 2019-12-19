import { Pipe, PipeTransform } from '@angular/core';
import { taskI } from '../models/task.interfaces';

@Pipe({
  name: 'biblioteca'
})
export class BibliotecaPipe implements PipeTransform {

  transform(todos: taskI[], user: any ): taskI[] {

    while (todos !== null && todos !== undefined) {
      
      return todos.filter(todo =>{
            if (todo.id_usuario === user.uid) {
              return todo.id_usuario 
            }else{
            }

        });
    }
}

}
