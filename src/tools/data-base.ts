import { Task, Cluster } from "./task-item";


export class DataBase {
  static tasks:Task[] = [
    new Task("user1 title","2012-12-12","work","low","todo","here is a small description of what the task says"),
    new Task("user1 title 2","2027-10-01","work","medium","in-progress","this is just a place holder for actual task decription"),
    new Task("user1 title 3","2023-12-12","work","high","in-progress","this is just a place holder for actual task decription"),
    new Task("user1 title 4","2027-1-1","work","low","in-progress","this is just a place holder for actual task decription"),
    new Cluster(" user1 cluster title 5","2027-11-2","work","low","in-progress","this is just a place holder for actual task decription"),
  ];

  //static clusters:Cluster[] = [];
  constructor() { }
}
