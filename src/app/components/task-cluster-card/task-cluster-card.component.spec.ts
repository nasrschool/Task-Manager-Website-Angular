import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskClusterCardComponent } from './task-cluster-card.component';

describe('TaskClusterCardComponent', () => {
  let component: TaskClusterCardComponent;
  let fixture: ComponentFixture<TaskClusterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskClusterCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskClusterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
