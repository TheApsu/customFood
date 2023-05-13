import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-centered-header',
  templateUrl: './centered-header.component.html',
  styleUrls: ['./centered-header.component.scss'],
})
export class CenteredHeaderComponent implements OnInit {
  @Input() name: string = '';

  constructor() { }

  ngOnInit() {}

}
