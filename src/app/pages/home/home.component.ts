import { Component, OnInit, signal, effect } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { DashBoardComponent } from './../../components/dash-board/dash-board.component';
import { TaskListComponent } from './../../components/task-list/task-list.component';
import { TaskFormComponent } from "./../../components/task-form/task-form.component";
import { NavbarComponent } from './../../components/navbar/navbar.component';
import { Task } from '../../../tools/task-item';
import { NgIf } from "@angular/common";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, DashBoardComponent, TaskListComponent, TaskFormComponent, NavbarComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
//for now i will have the main data base on app, and give every component that needs it a direct access to it
export class HomeComponent implements OnInit{
  title = "something idk";

  //{equal: () => false} this configuration is so that set treats all its input as unique Task[], even if they are the exact same
  task_list = signal<Task[]>([],{equal: () => false});// since we get a getter timing error, I decided to use signals and update the 4 variables 
  // directly based on a signal instead of the getter.
  // a regular task array and getters wont work here because, the components passed the old get values to the child before 
  // updating it
  total_count:number = 0;
  in_progress_count:number = 0;
  done_count:number = 0;
  late_count:number = 0;

  userId:string = "";
  constructor(private route:ActivatedRoute){
    console.log("userId: ", this.userId);

    effect(()=>{//this function gets called when taskList gets updated or set, 
    // wish it also got called when the inner array got directly mutated 
      console.log("tasks got edited !!!");
      this.recalculateCounts();
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.userId= params.get("userId") ?? "";// is simply used to check if the function returns null, if it does then the right value will assigned
      console.log("userId changed: ", this.userId);
    })

  }

  recalculateCounts(){
    console.log(this.task_list());
    this.total_count = this.task_list().length;
    this.in_progress_count = this.task_list().filter(task=> task.status == 'in-progress').length;
    this.done_count = this.task_list().filter(task=> task.status == 'done').length;
    this.late_count = this.task_list().filter(task=> 
      {return ((new Date()).getTime() > (new Date(task.date)).getTime()) && (task.status != "done")}
    ).length;
  }


  collectTasks(tasks:Task[]){
    this.task_list.set(tasks);

    console.log("tasks should be received");
    console.log("in progress count: " + this.in_progress_count);
    
    console.log("event: " + tasks)
  }
}
