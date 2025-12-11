import { Component, Input, Output, EventEmitter, NgModule} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task } from '../../../tools/task-item';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Input() isVisible:boolean = false
  @Input() form_task!:Task;


  @Output() discardEvent:any = new EventEmitter<Task>();
  @Output() saveEvent:any = new EventEmitter<Task>();
 

  discard(){
    console.log("hiding text");
    this.discardEvent.emit(this.form_task);//i aint doing anything with it, but maybe in the future, as cache or something
    this.form_task = new Task("","","","Basse","","");
  }
  save(){
    this.saveEvent.emit(this.form_task);// again passing that argument is probably useless as the list is binded to it in the first place
  }
}
