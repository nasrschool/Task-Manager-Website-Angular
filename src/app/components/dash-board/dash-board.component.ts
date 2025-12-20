import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { Task } from '../../../tools/task-item';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent{
  @Input() total_tasks_count!:number;
  @Input() in_progress_tasks_count!:number;
  @Input() done_tasks_count!:number;
  @Input() late_tasks_count!:number;

  get in_progress_task_percentage(){
    return ~~((this.in_progress_tasks_count / this.total_tasks_count) * 100)// ~~ is just for aproximation to an int
  }

  get done_tasks_percentage(){
    return ~~((this.done_tasks_count / this.total_tasks_count) * 100)
  }

  get late_tasks_percentage(){
    return ~~((this.late_tasks_count / this.total_tasks_count) * 100)
  }
}
