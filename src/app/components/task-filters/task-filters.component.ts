import { Component, EventEmitter, Output } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.css'
})
export class TaskFiltersComponent {
  statusFilter:any = "";
  priorityFilter:any = "";
  categoryFilter:any = "";
  searchBar:any = "";

  @Output() Filters = new EventEmitter<String>();
  
  

  addTaskRequest(){}
}
