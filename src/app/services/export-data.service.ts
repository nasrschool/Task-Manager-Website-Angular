import { Injectable } from '@angular/core';
import { Cluster, Task } from '../../tools/task-item';

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {



  saveJsonArray(tasks:Task[],fileName:string){
    let jsonString:string = "[";

    for(let task of tasks){
      jsonString += JSON.stringify(task.castToJson()) + " ,"
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
