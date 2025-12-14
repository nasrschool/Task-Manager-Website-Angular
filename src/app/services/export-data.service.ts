import { Injectable } from '@angular/core';
import { Cluster, Task } from '../../tools/task-item';

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {

  castToJson(task:Task):any{
    if(task instanceof Cluster){
      let subTasksJSONs:JSON[] = []
      for(let subtask of task.subTasks){
        subTasksJSONs.push(this.castToJson(subtask))
      }

      return {
        title:task.title,
        date:task.date,
        category:task.category,
        priority:task.priority,
        status:task.status,
        description:task.description,
        subTasks:subTasksJSONs
      }
    }else{
      return {
        title:task.title,
        date:task.date,
        category:task.category,
        priority:task.priority,
        status:task.status,
        description:task.description,
      }
    }
    

  }

  saveJsonArray(tasks:Task[],fileName:string){
    let jsonString:string = "[";

    for(let task of tasks){
      jsonString += JSON.stringify(this.castToJson(task)) + " ,"
    }
    jsonString = jsonString.substring(0,jsonString.length - 1);
    jsonString += "]";

    const blob = new Blob([jsonString],{type:"application/json"});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
