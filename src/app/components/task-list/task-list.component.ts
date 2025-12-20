import { Component, EventEmitter, Input, NgModule, Output, OnInit, SimpleChanges} from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Cluster, Task } from '../../../tools/task-item';
import { NgIf, NgForOf, NgClass } from "@angular/common";
import { TaskFormComponent } from '../task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { DataBase } from '../../../tools/data-base';
import { ExportDataService } from '../../services/export-data.service';
import { FetchDataService } from '../../services/fetch-data.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, NgIf, NgForOf, TaskFormComponent, FormsModule, NgClass],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

//TODO: link the dashboard to the subtasks, add a way to export data of both sub tasks and the entire data base


export class TaskListComponent implements OnInit{
  constructor(private export_data:ExportDataService,private fetcher:FetchDataService){}
  @Input() userId!:string;

  dataBaseTasks!:Task[];
  task_list!:Task[];
  isCluster!:boolean;
  
  ngOnInit(): void {
    this.dataBaseTasks = this.fetcher.getData(this.userId);
    this.task_list = this.dataBaseTasks;
    this.isCluster = false;

    this.task_list_output.emit(this.task_list);// this throws a binding instability error, need to look into it

    console.log(localStorage)

  }

  ngOnChanges(change:SimpleChanges):void{//this methode gets called when an @Input() property gets its value changed
    if(change["userId"]){
      this.dataBaseTasks = this.fetcher.getData(this.userId);
      this.changeTaskList(this.dataBaseTasks);// task list may have already be equal to databaseTasks, meaning they both
      // point to the same object, but here assigning the fetched data to dataBaseTasks only means it changes which
      // objects its referencing to, not the object itself
      
    }
    
  }
 

  @Output() task_list_output:any = new EventEmitter<Task[]>();
    //idk why but if we use have an input property and another internal attribute that has a value based that property, the 
    //attribute does not get recognized by the ngif directif, and is treated as non exitent, prob cuz its based on a not definitive 
    //property
  

  // make a system that detects userId change and assigns the correct data base value based on it

  get visible_task_list():Task[]{//i used get to treat the value as a function, so instead of updating the value
    //every time i modify something, i will only modify the main task_list and each time the browser needs to use visble_task_list
    // the browser will execute that function, meaning it will be updated every single usecase, pretty dope
    let tmp_list:Task[] = this.task_list.slice();
    for(let i = 0; i < 4; i++){
      tmp_list = tmp_list.filter(this.FilterFunctions[i]);
    }

    this.fetcher.saveData(this.userId,this.dataBaseTasks);//while not the simplest code to read, i figured since visible tasks get changed
    //so often and is based the the modification of tasks_lists, then it would be a good time to update the localstorage aswell.


    return tmp_list;
  }


  cachedTask!:Task; //this represents the task we are actually modifying, not a copy of it
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
    /*
      this.task_list = this.task_list.filter(element =>element != task);
      this.task_list_output.emit(this.task_list);
    */

    this.task_list.splice(this.task_list.findIndex(element=> element == task),1);
    this.task_list_output.emit(this.task_list);//pretty terrible aproach, but since signal cant detected if its 
    // content is directly mutated, then it has to be passed by the set function, therefore the collect task function
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

    this.formIsVisible = true;
  }
  save(){
    let tmp_task:Task = Task.Clone(this.form_task);
    if(this.form_task instanceof Cluster){
      tmp_task = Cluster.Clone(this.form_task)
    }
    if(!this.usageCase){
      this.task_list[this.task_list.indexOf(this.cachedTask)] = tmp_task;
    }else{
      this.task_list.push(tmp_task);
    }
    
    this.formIsVisible = false;
    this.task_list_output.emit(this.task_list);
  }
  discard(){
    this.formIsVisible = false;
  }

  exportData(){
    this.export_data.saveJsonArray(this.task_list,"data.json");
  }

}
