import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  open: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  openMenu() {
    this.open = this.open ? false : true;
  }
}
