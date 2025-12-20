import { Injectable } from '@angular/core';
import { Task, Cluster } from '../../tools/task-item';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor() { }

  getData(userId:string):Task[]{
    let rawData:any = localStorage.getItem(userId);
    let strData:string = (rawData == null)?(""):(rawData);

    let jsonData:any = JSON.parse(strData).data;

    let data:Task[] = [];
    for(let json of jsonData){      
      data.push(this.reconstructJsonToTask(json));
    }

    return data;
  }

  saveData(userId:string,data:Task[]):void{//information get stored as stringyfied json objects, which get parsed and converted back 
  // later 
    let fullJson:any = {
      userId:userId,
      data:data
    }

    //console.log("userId: \n",userId,"\n saved data \n",data);
    localStorage.setItem(userId,JSON.stringify(fullJson))
  }
  
  reconstructJsonToTask(jsonData:any):Task{// as the name implies, this function is used to reconstruct the json gotten from local storage
    //to a task or a cluster object

    if(jsonData.subTasks == null){
      return new Task(jsonData.title,jsonData.date,jsonData.category,jsonData.priority,jsonData.status,jsonData.description);
    }else{
      let cluster:Cluster = new Cluster(jsonData.title,jsonData.date,jsonData.category,jsonData.priority,jsonData.status,jsonData.description);
      for(let subJson of jsonData.subTasks){
        cluster.subTasks.push(this.reconstructJsonToTask(subJson));
      }
      return cluster;
    }

  }
  //purely for testing, dont mind the uglyness

  resetLocalStorageData():void{
    this.saveData("1",[
        new Task("user1 task title","2012-12-12","work","low","todo","here is a small description of what the task says"),
        new Task("user1 task title 2","2027-10-01","work","medium","in-progress","this is just a place holder for actual task decription"),
        new Task("user1 task title 3","2023-12-12","work","high","in-progress","this is just a place holder for actual task decription"),
        new Task("user1 task title 4","2027-1-1","work","low","in-progress","this is just a place holder for actual task decription"),
        new Cluster(" user1 cluster title 5","2027-11-2","work","low","in-progress","this is just a place holder for actual task decription"),
      ]
    )
    this.saveData("2",[
        new Task("user2 task title","2012-12-12","work","low","todo","here is a small description of what the task says"),
        new Task("user2 task title 2","2027-10-01","work","medium","in-progress","this is just a place holder for actual task decription"),
        new Task("user2 task title 3","2023-12-12","work","high","in-progress","this is just a place holder for actual task decription"),
        new Task("user2 task title 4","2027-1-1","work","low","in-progress","this is just a place holder for actual task decription"),
        new Cluster(" user2 cluster title 5","2027-11-2","work","low","in-progress","this is just a place holder for actual task decription"),
      ]
    )
    this.saveData("3",[
        new Task("user3 task title","2012-12-12","work","low","todo","here is a small description of what the task says"),
        new Task("user3 task title 2","2027-10-01","work","medium","in-progress","this is just a place holder for actual task decription"),
        new Task("user3 task title 3","2023-12-12","work","high","in-progress","this is just a place holder for actual task decription"),
        new Task("user3 task title 4","2027-1-1","work","low","in-progress","this is just a place holder for actual task decription"),
        new Cluster("user3 cluster title 5","2027-11-2","work","low","in-progress","this is just a place holder for actual task decription"),
      ]
    )
  }

  
}
