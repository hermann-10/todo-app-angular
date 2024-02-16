import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title="todo list ";
  taskForm = new FormGroup({
    taskName: new FormControl(''),
    taskDate: new FormControl(''),
  })

  private taskService = inject(TaskService) //No need for the constructor to inject a service since the version 17 of Angular

  addTask(event:Event):void {
    event.preventDefault(); //avoid the reload all the page when I send the form
    //console.log(this.taskForm.value);
    const taskName = this.taskForm.value.taskName;
    const taskDate = this.taskForm.value.taskDate;
    this.taskService.createTask(taskName!, taskDate!);
    this.taskForm.reset(); //Empty form after submission
  }
}
