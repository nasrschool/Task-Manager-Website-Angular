import { Component, Input, Output, EventEmitter, NgModule, OnInit} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Cluster, Task } from '../../../tools/task-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit{
  @Input() isVisible:boolean = false
  @Input() form_task!:Task;

  isCluster!:String;
  wasCluster!:String;

  @Output() discardEvent:any = new EventEmitter<Task>();
  @Output() saveEvent:any = new EventEmitter<Task>();
  @Output() form_taskChange = new EventEmitter<Task>();
 
  ngOnInit(): void {
    this.isCluster = ((this.form_task) instanceof Cluster)?("1"):("0");
    this.wasCluster = ((this.form_task) instanceof Cluster)?("1"):("0");
  }

  discard(){
    console.log("hiding text");
    this.discardEvent.emit();//i aint doing anything with it, but maybe in the future, as cache or something
    this.form_task = new Task("","","","Basse","","");
  }
  save(){
    if(this.isCluster === "1"){
      this.form_task = new Cluster(this.form_task.title,this.form_task.date,
        this.form_task.category,this.form_task.priority,this.form_task.status,this.form_task.description);
    }
    

    this.form_taskChange.emit(this.form_task);// changes the value of the main form task element in task list
    
    this.saveEvent.emit(); 
  }
}
