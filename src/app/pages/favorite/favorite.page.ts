import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  constructor(
    public favoriteSv: FavoriteService
  ) { }

  ngOnInit() {
  }

}
