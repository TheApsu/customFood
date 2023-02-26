import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/interfaces';
import { FavoriteService } from 'src/app/services/favorite.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss'],
})
export class FavoriteCardComponent implements OnInit {
  @Input() data: any = {};
  public image = environment.testImg;

  constructor(
  ) { }

  ngOnInit() {
    
  }

  
}
