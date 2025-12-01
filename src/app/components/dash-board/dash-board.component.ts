import { Component, Input} from '@angular/core';
import { Task } from '../../../tools/task-item';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  @Input() total_tasks_count:number = 0;
  @Input() in_progress_tasks_count:number = 0;
  @Input() done_tasks_count:number = 0;
  @Input() late_tasks_count:number = 0;

  //TODO: search for a reliable way to use the task List as an input for the html of the dash board

  /*in_progress_tasks = this.task_list.slice();
  done_tasks = this.task_list?.filter(task=> task.status == "done")
  late_tasks = this.task_list?.filter(task=> (new Date()).getTime() > (new Date(task.date)).getTime())*/

}
