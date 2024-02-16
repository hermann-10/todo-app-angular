import { Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksSig = signal<Task[]>([]);//A signal is a wrapper around a value that can notify interested consumers when that value changes //more information -> https://angular.io/guide/signals

  createTask(taskName:string, taskDate: string): void{
    const newTask: Task = {
      id: crypto.randomUUID(), //to have a random ID
      taskName,
      taskDate: new Date(taskDate), //casting of the date because is a string
      taskState: false,
    };
    this.tasksSig.update((tasks) => [newTask, ...tasks]);
    console.log(this.tasksSig());
  }
}
