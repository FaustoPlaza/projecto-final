import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { BibliotecaPipe } from './biblioteca.pipe';



@NgModule({
  declarations: [FiltroPipe, BibliotecaPipe],
  exports:[FiltroPipe, BibliotecaPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
