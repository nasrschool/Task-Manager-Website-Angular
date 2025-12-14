import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cluster, Task } from '../../../tools/task-item';

@Component({
  selector: 'app-task-cluster-card',
  standalone: true,
  imports: [],
  templateUrl: './task-cluster-card.component.html',
  styleUrl: './task-cluster-card.component.scss'
})
export class TaskClusterCardComponent {
  @Input() cluster!:Cluster;
  @Output() deleteTask:any = new EventEmitter<Task>();
  @Output() modifyTask:any = new EventEmitter<Task>();
  
  deleteRequest(){
    this.deleteTask.emit(this.cluster);
  }
  expandRequest(){
    //expand cluster
  }

}
