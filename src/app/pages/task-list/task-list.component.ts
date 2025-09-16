import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../../model/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  private router = inject(Router);
  private TaskService = inject(TaskService);

  ngOnInit(): void {
    this.loadTask();
  }

  newTask() {
    this.router.navigate(['/tasks/new']);
  }

  loadTask() {
    this.TaskService.findAll().subscribe((_tasks) => {
      this.tasks = _tasks;
      console.log(this.tasks);
      console.log(_tasks);
    })
  }

  deleteTask(id: number | undefined) {
    if (id && confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.TaskService.deleteTask(id).subscribe(() =>
      this.TaskService.findAll().subscribe((tasks) => {
        this.tasks = tasks;
      }));
      alert("Exclusão realizada");
    }
  }
  editTask(id: number | undefined) {
    if (id) this.router.navigate(['/tasks', id]);
  }
}
