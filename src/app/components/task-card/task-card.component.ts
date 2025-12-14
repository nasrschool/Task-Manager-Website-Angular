import { Component, Input , Output, EventEmitter, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cluster, Task } from '../../../tools/task-item';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit{
  @Input() task!:Task;
  isCluster:boolean = false;
  @Output() deleteTask:any = new EventEmitter<Task>();
  @Output() modifyTask:any = new EventEmitter<Task>();
  @Output() expandCluster:any = new EventEmitter<Task>();

  get getClass(){
    return {'task-card':true,'cluster-card':this.isCluster};
  }

  ngOnInit(): void {
    this.isCluster = this.task instanceof Cluster
  }

  deleteRequest(){
    this.deleteTask.emit(this.task);
  }
  modifyRequest(){
    this.modifyTask.emit(this.task);
  }
  expandRequest(){
    this.expandCluster.emit(this.task);
  }
  

}
