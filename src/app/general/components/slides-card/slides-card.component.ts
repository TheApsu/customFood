import { Component, Input, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { SwiperOptions, Grid } from 'swiper';
SwiperCore.use([Grid])

@Component({
  selector: 'app-slides-card',
  templateUrl: './slides-card.component.html',
  styleUrls: ['./slides-card.component.scss'],
})
export class SlidesCardComponent implements OnInit {
  @Input() sectionName: string = '';
  @ViewChild('slides', {static: true}) slides: any;
  public slidesOpt: SwiperOptions = {
    slidesPerView: 3,
    grid: {
      rows: 2,
      fill: 'row'
    },
    pagination: {
      clickable: true
    }
  }
  public categories = [
    {
      name: 'Comida Rapida'
    },
    {
      name: 'Verduras'
    },
    {
      name: 'Frutas'
    },
    {
      name: 'Proteínas'
    },
    {
      name: 'Legumbres'
    },
    {
      name: 'Tortas'
    },
    {
      name: 'Panaderia'
    },
  ];
  private _length: number = undefined;
  constructor() { }

  async ngOnInit() {
    this._length = this.categories.length;
  }

  async slideChange(ev){
    
  }

  async loadData() {
    const newShops = new Array(6);
    setTimeout(() => {
      this.categories.push(...newShops);
      this._length = this.categories.length;
    }, 2000)
  }
}
