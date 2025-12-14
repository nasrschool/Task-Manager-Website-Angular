import { Injectable } from '@angular/core';
import { Cluster, Task } from '../../tools/task-item';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  static tasks:Task[] = [
    new Task("task title","12/12/2012","work","low","todo","here is a small description of what the task says"),
    new Task("task title 2","10/01/2027","work","medium","in-progress","this is just a place holder for actual task decription"),
    new Task("task title 3","12/12/2023","work","high","in-progress","this is just a place holder for actual task decription"),
    new Task("task title 4","1/1/2027","work","low","in-progress","this is just a place holder for actual task decription")
  ];

  static clusters:Cluster[] = [];
  constructor() { }
}
