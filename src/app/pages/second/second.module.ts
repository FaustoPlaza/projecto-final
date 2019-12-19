import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {PipesModule} from '../../pipes/pipes.module';

import { IonicModule } from '@ionic/angular';

import { secondPage } from './second.page';

const routes: Routes = [
  {
    path: '',
    component: secondPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
  ],
  declarations: [secondPage]
})
export class SecondPageModule {}
