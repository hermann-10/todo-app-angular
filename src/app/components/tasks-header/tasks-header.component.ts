import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-tasks-header',
  standalone: true,
  imports: [],
  template: `
    <h3>{{messageSig()}}</h3>
  `,
  styles: ``
})
export class TasksHeaderComponent implements OnChanges {
ngOnChanges(changes: SimpleChanges): void {
  const nbTasks = changes['tasks'].currentValue.length;
  const tasksPluralize = nbTasks > 1 ? 'tâches' : 'tâche';
  const noTask = nbTasks < 1 ? 'tâche' : 'tâches';
  console.log(`nbTasks vaut ${nbTasks}`);
  if(nbTasks>0){
    this.messageSig.set(`${nbTasks} ${tasksPluralize}`);
  }
  else{
    this.messageSig.set(`${nbTasks} ${noTask}`);
  }
}
@Input({required:true}) tasks!: Task[];

messageSig = signal<string>('');
}
