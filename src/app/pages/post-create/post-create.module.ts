import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';

import { IonicModule } from '@ionic/angular';

import { PostCreatePage } from './post-create.page';

const routes: Routes = [
  {
    path: '',
    component: PostCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgxEditorModule,
  ],
  declarations: [PostCreatePage]
})
export class PostCreatePageModule {}
