import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit():void {
    this.tasks = this.taskService.readTasks();
    console.log({task: this.tasks})
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
}