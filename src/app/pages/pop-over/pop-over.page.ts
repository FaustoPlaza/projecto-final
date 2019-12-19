import { Component, OnInit } from '@angular/core';
import {taskI} from '../../models/task.interfaces'; 
import { PopoverController, ModalController ,NavParams } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.page.html',
  styleUrls: ['./pop-over.page.scss'],
})
export class PopOverPage implements OnInit {


  todo:taskI;
  constructor(
    private navParams: NavParams, private popoverController: PopoverController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {

    this.todo = this.navParams.get('todo');
  }

  closePopOver(){
    this.modalController.dismiss();
    
  }
}
