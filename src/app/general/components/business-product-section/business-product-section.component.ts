import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-product-section',
  templateUrl: './business-product-section.component.html',
  styleUrls: ['./business-product-section.component.scss'],
})
export class BusinessProductSectionComponent implements OnInit {
  @Input() sectionName: string = '';
  public slidesOpts = {
    slidesPerView: 2.1
  }

  constructor() { }

  ngOnInit() {}

}
