import { Component, EventEmitter, Input, NgModule, Output, OnInit} from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Cluster, Task } from '../../../tools/task-item';
import { NgIf, NgForOf, NgClass } from "@angular/common";
import { TaskFormComponent } from '../task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { DataBase } from '../../../tools/data-base';
import { ExportDataService } from '../../services/export-data.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, NgIf, NgForOf, TaskFormComponent, FormsModule, NgClass],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

//TODO: link the dashboard to the subtasks, add a way to export data of both sub tasks and the entire data base


export class TaskListComponent implements OnInit{
  ngOnInit(): void {
    console.log("before emitting");
    this.task_list_output.emit(this.task_list);// this throws a binding instability error, need to look into it
    console.log("after emitting");
  }

  @Output() task_list_output:any = new EventEmitter<Task[]>();
    //idk why but if we use have an input property and another internal attribute that has a value based that property, the 
    //attribute does not get recognized by the ngif directif, and is treated as non exitent, prob cuz its based on a not definitive 
    //property
  
  dataBaseTasks:Task[] = DataBase.tasks;
  task_list:Task[] = this.dataBaseTasks;
  isCluster = false;

  constructor(private export_data:ExportDataService){}

  get visible_task_list():Task[]{//i used get to treat the value as a function, so instead of updating the value
    //every time i modify something, i will only modify the main task_list and each time the browser needs to use visble_task_list
    // the browser will execute that function, meaning it will be updated every single usecase, pretty dope
    let tmp_list:Task[] = this.task_list.slice();
    for(let i = 0; i < 4; i++){
      tmp_list = tmp_list.filter(this.FilterFunctions[i]);
    }
4

    return tmp_list;
  }
  cachedTask:Task = new Task("","","work","low","todo",""); //this represents the task we are actually modifying, not a copy of it
  // the initialisation wont be used so it shouldnt matter
  usageCase:boolean = false; //represents whether the form was called to modify or add a new task

  searchBar:string = "";

  formIsVisible = false;
  form_task = new Task("","","work","low","todo","");


  FilterFunctions = [
     (element:Task)=>element.status == this.statusFilter || this.statusFilter == "",
     (element:Task)=>element.priority == this.priorityFilter || this.priorityFilter == "",
     (element:Task)=>element.category == this.categoryFilter || this.categoryFilter == "",
     (element:Task)=>element.title.includes(this.searchBar) || element.description.includes(this.searchBar)
    ]
  statusFilter:any = "";
  priorityFilter:any = "";
  categoryFilter:any = "";

  


  deleteTask(task:Task){
    /*this.task_list = this.task_list.filter(element =>element != task);
    this.task_list_output.emit(this.task_list);*/

    this.task_list.splice(this.task_list.findIndex(element=> element == task),1);
  }

  changeTaskList(tasks:Task[]){
    this.task_list = tasks;
    this.task_list_output.emit(this.task_list);
  }

  expandCluster(cluster:Cluster){
    this.changeTaskList(cluster.subTasks);
    this.isCluster = true;
  }

  backRequest(){
    console.log("backrequest sent")
    this.changeTaskList(this.dataBaseTasks);
    this.isCluster = false;
    
  }

  addTaskRequest(){
    this.form_task = new Task("","","work","low","todo","");
    this.formIsVisible = true;
    this.usageCase = true;
  }

  modifyTask(task:Task){
    console.log("modify task request received");
    this.cachedTask = task;
    this.usageCase = false;
    this.form_task = Cluster.Clone(task);//we want to make a copy instead of directly binding to main task
    console.log("before modification: ");
    console.log(this.form_task);
    this.formIsVisible = true;
  }
  save(){
    let tmp_task:Task = Task.Clone(this.form_task);
    if(this.form_task instanceof Cluster){
      tmp_task = Cluster.Clone(this.form_task)
    }
    console.log(this.form_task);
    console.log(tmp_task);
    console.log("is Cluster? 2 : " + (typeof tmp_task));
    if(!this.usageCase){
      this.task_list[this.task_list.indexOf(this.cachedTask)] = tmp_task;
    }else{
      this.task_list.push(tmp_task);
    }
    
    this.formIsVisible = false;
  }
  discard(){
    this.formIsVisible = false;
  }

  exportData(){
    this.export_data.saveJsonArray(this.task_list,"data.json");
  }

}
