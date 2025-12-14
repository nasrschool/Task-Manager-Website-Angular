import { Component, input } from '@angular/core';
import { Cluster } from '../../../tools/task-item';
import { DataBaseService } from '../../tools/data-base.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';

@Component({
  selector: 'app-cluster',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './cluster.component.html',
  styleUrl: './cluster.component.scss'
})
export class ClusterComponent {
  constructor(private data:DataBaseService){}
  cluster_id = input.required<number>();


  addTaskRequest(){}
  deleteTask(event:any){}
  modifyTask(event:any){

  }
}
