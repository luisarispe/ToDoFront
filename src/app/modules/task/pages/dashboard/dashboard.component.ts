import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { Observable, Subscribable, Subscriber, Subscription } from 'rxjs';
import { Status, Task } from '../../models/task.model';
import { TaskService } from '../../task.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;

};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  chartOptions: ChartOptions;
  taskSubs: Subscription = new Subscription()
  countDone: number = 0;
  countTodo: number = 0;
  countExpired: number = 0;

  constructor(private _serviceTask: TaskService) {
    this.taskSubs = this._serviceTask.tasks$.subscribe({
      next: (tasks) => {
        this.countDone = this.coutStatus(Status.Done, tasks);
        this.countTodo = this.coutStatus(Status.ToDo, tasks);
        this.countExpired = this.coutStatus(Status.Expired, tasks);
        console.log(tasks);
      }
    });

    this.chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
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
          // endingShape: "rounded"
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
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          }
        }
      }
    };

  }
  ngOnDestroy(): void {
    this.taskSubs.unsubscribe()
  }

  ngOnInit() {
  }

  coutStatus(status: Status, tasks: Task[]): number {
    let array_filter = tasks.filter(task => task.status == status);
    return array_filter.length;
  }

}
