import { Component, EventEmitter, Input, NgModule, Output, OnInit} from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../../../tools/task-item';
import { NgIf, NgForOf } from "@angular/common";
import { TaskFormComponent } from '../task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, NgIf, NgForOf, TaskFormComponent, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})




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
   task_list:Task[] = [
    new Task("task title","12/12/2012","work","low","todo","here is a small description of what the task says"),
    new Task("task title 2","10/01/2027","work","medium","in-progress","this is just a place holder for actual task decription"),
    new Task("task title 3","12/12/2023","work","high","in-progress","this is just a place holder for actual task decription"),
    new Task("task title 4","1/1/2027","work","low","in-progress","this is just a place holder for actual task decription")
  ];



  get visible_task_list():Task[]{//i used get to treat the value as a function, so instead of updating the value
    //every time i modify something, i will only modify the main task_list and each time the browser needs to use visble_task_list
    // the browser will execute that function, meaning it will be updated every single usecase, pretty dope
    let tmp_list:Task[] = this.task_list.slice();
    if(this.searchBar == ""){// filter will only apply if the searh bar is completly empty
      for(let i = 0; i < 3; i++){
        tmp_list = tmp_list.filter(this.FilterFunctions[i]);
      }
    }else{
        tmp_list = tmp_list.filter(this.FilterFunctions[3]);
    }

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

  addTaskRequest(){
    this.form_task = new Task("","","work","low","todo","");
    this.formIsVisible = true;
    this.usageCase = true;
  }

  modifyTask(task:Task){
    console.log("modify task request received");
    this.cachedTask = task;
    this.usageCase = false;
    this.form_task = new Task(task.title,task.date,task.category,task.priority,task.status,task.description);//we want to make a copy instead of directly binding to main task
    console.log(this.form_task);
    this.formIsVisible = true;
  }
  save(){
    let tmp_task:Task = structuredClone(this.form_task);
    console.log(tmp_task);
    if(!this.usageCase){
      console.log(this.form_task.title);
      this.cachedTask.title = tmp_task.title;
      this.cachedTask.date = tmp_task.date;
      this.cachedTask.category = tmp_task.category;
      this.cachedTask.priority = tmp_task.priority;
      this.cachedTask.status = tmp_task.status;
      this.cachedTask.description = tmp_task.description;
    }else{
      this.task_list.push(tmp_task);
    }
    
    this.formIsVisible = false;
  }
  discard(){
    this.formIsVisible = false;
  }

}
