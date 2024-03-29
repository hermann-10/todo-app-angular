import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../interfaces/task';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `

    <h4>Nom: {{ task.taskName }}</h4>
    <p>À réaliser avant le : {{ task.taskDate | date: 'EEEE dd MMMM YYYY':'':'fr-FR'}}</p>
    <p class="task-footer">
      <span>
        <input type="checkbox" name="taskDone" [id]="task.id" (change)="handleTaskState($event)" [checked]="isDonSig()"/>
        <label [for]="task.id"> {{ isDonSig() ? 'fait' : 'À faire' }}</label>
      </span>
      <button (click)="handleDelete()" class="del">Supprimer</button>
    </p>
  `,
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnChanges{
 ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['task'].currentValue.taskDone);
    this.isDonSig.set(changes['task'].currentValue.taskDone);
 }
 @Input({ required: true}) task!:Task;
 @Output() onTaskStatusChange: EventEmitter<any> = new EventEmitter();
 @Output() onTaskDelete: EventEmitter<any> = new EventEmitter();

 isDonSig = signal<boolean>(false);

 handleTaskState(e: Event){
  console.log((e.target as HTMLInputElement).checked);
  this.isDonSig.update((status) => !status);
  // const status = ((e.target as HTMLInputElement).checked);
  // this.isDonSig.set(status);
  this.onTaskStatusChange.emit([this.isDonSig(), this.task.id]);
 }

 handleDelete(){
  console.log(`Delete task ${this.task.id}`);
  this.onTaskDelete.emit(this.task.id);
 }
}






