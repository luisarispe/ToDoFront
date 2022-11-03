import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

import { TaskService } from '../../task.service';
import { ChartOptions } from '../../interfaces/chart-options-interface';

@Component({
  selector: 'task-chart-column',
  templateUrl: './chart-column.component.html',
})
export class ChartColumnComponent implements OnInit, OnDestroy {
  chartOptions!: ChartOptions;
  taskSubs: Subscription = new Subscription();
  yearNow: number = new Date().getFullYear();
  toDoMonth: number[] = [];
  doneMonth: number[] = [];
  expiredMonth: number[] = [];
  arrayYears: string[] = [];

  constructor(private _serviceTask: TaskService) {
    this.taskSubs = this._serviceTask.tasks$.subscribe({
      next: (tasks) => {
        let arrayTask: any[] = [];
        let arrayTemp: string[] = [];
        tasks.forEach(task => {
          let datePipe: DatePipe = new DatePipe('en-US');
          let defeated: string = datePipe.transform(task.defeated, 'MM/yyyy')!;
          let year: number = +defeated!.slice(-4);
          if (year === this.yearNow) {
            arrayTask.push({ ...task, defeated });
            arrayTemp.push(defeated);
          }
        });
        //END FOREACH
        this.arrayYears = [...new Set(arrayTemp)].sort();

        this.arrayYears.forEach(year => {
          let toDoTemp = arrayTask.filter(task => task.defeated == year && task.status == 'TODO').length;
          let doneTemp = arrayTask.filter(task => task.defeated == year && task.status == 'DONE').length;
          let expiredTemp = arrayTask.filter(task => task.defeated == year && task.status == 'EXPIRED').length;
          this.toDoMonth.push(toDoTemp);
          this.doneMonth.push(doneTemp);
          this.expiredMonth.push(expiredTemp);
        });
      }
    });

    this.loadChart();

  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.taskSubs.unsubscribe()
  }
  loadChart() {
    this.chartOptions = {
      series: [
        {
          name: "Que Hacer",
          data: this.toDoMonth,
          color: '#ffa500'
        },
        {
          name: "Hecho",
          data: this.doneMonth,
          color: '#0000FF'
        },
        {
          name: "Expirado",
          data: this.expiredMonth,
          color: '#FF0000'
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: this.arrayYears
      },
      yaxis: {
        title: {
          text: "# Tareas"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "# " + val + " Tareas";
          }
        }
      }
    };
  }

}
