import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashBoardComponent } from './../../components/dash-board/dash-board.component';
import { TaskListComponent } from './../../components/task-list/task-list.component';
import { TaskFormComponent } from "./../../components/task-form/task-form.component";
import { NavbarComponent } from './../../components/navbar/navbar.component';
import { Task } from '../../../tools/task-item';
import { NgIf, NgForOf } from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, DashBoardComponent, TaskListComponent, TaskFormComponent, NavbarComponent, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
//for now i will have the main data base on app, and give every component that needs it a direct access to it
export class MainAppComponent {
  title = "something idk";

  task_list:Task[] = [];

  total_count:number = this.task_list.length;
  get in_progress_count():number{//again while updating an tasks updates their length and every item that is directly based on tasks.
    //having that information passed by filter makes it an indirect relation, as filter only executes ones, thats why we have to treat 
    //the variable that is based on tasks and filter, it self as a funtion, that way it reexecutes the filter function every
    //time it is used, ensuring that it is updated every single time
    return this.task_list.filter(task=> task.status == 'in-progress').length;}
  get done_count():number{
    return this.task_list.filter(task=> task.status == 'done').length;}
  get late_count():number{
    return this.task_list.filter(task=> 
      {return ((new Date()).getTime() > (new Date(task.date)).getTime()) && (task.status != "done")}
    ).length;
  
  }

  collectTasks(tasks:Task[]){
    this.task_list = tasks;
    console.log("tasks should be received");
    console.log("in progress count: " + this.in_progress_count);
    
    console.log("event: " + tasks)
  }
}
