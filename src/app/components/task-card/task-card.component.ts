import { Component, Input , Output, EventEmitter} from '@angular/core';
import { Task } from '../../../tools/task-item';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!:Task;
  @Output() deleteTask:any = new EventEmitter<Task>();
  @Output() modifyTask:any = new EventEmitter<Task>();

  deleteRequest(){
    this.deleteTask.emit(this.task);
  }
  modifyRequest(){
    this.modifyTask.emit(this.task);
  }
  

}
