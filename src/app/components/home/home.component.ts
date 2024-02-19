import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { AboutComponent } from "../about/about.component";
import { TaskComponent } from '../task/task.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, ReactiveFormsModule, AboutComponent, TaskComponent]
})
export class HomeComponent implements OnInit {


  ngOnInit():void {
    this.tasks = this.taskService.readTasks();
    console.log('TASK: ', {task: this.tasks})
  }

  title="todo list app";
  taskForm = new FormGroup({
    taskName: new FormControl(''),
    taskDate: new FormControl(''),
  })

  private taskService = inject(TaskService) //No need for the constructor to inject a service since the version 17 of Angular

  tasks: Task[] = [];

  addTask(event:Event):void {
    event.preventDefault(); //avoid the reload all the page when I send the form
    //console.log(this.taskForm.value);
    const taskName = this.taskForm.value.taskName;
    const taskDate = this.taskForm.value.taskDate;
    this.taskService.createTask(taskName!, taskDate!);
    this.tasks = this.taskService.readTasks();
    this.taskForm.reset(); //Empty form after submission
  }

  updateTaskStatus(status:boolean, id: string) {
    console.log(`Parent bien recu ${status} et ${id}`);
    this.taskService.updateTaskStatus(status, id);
    this.tasks = this.taskService.readTasks();
  }
}
