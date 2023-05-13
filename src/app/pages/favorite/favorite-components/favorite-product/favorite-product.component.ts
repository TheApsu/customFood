import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/interfaces';
import { FavoriteService } from 'src/app/services/favorite.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorite-product',
  templateUrl: './favorite-product.component.html',
  styleUrls: ['./favorite-product.component.scss'],
})
export class FavoriteProductComponent implements OnInit {
  @Input() product: Product = undefined;
  @Input() business = undefined;
  public favoriteIcon = 'heart-outline';
  public image = environment.testImg;

  constructor(
    private favoriteSv: FavoriteService
  ) { }

  ngOnInit() {
    const obj = { 
      _id: this.product._id,
      storeId: this.business.storeId, 
    }
    this.favoriteIcon = this.favoriteSv.verifyFavorite(obj);
  }

  addToFavorite(){
    this.favoriteIcon = this.favoriteSv.checkToAdd(this.favoriteIcon, this.product, this.business);

  }
}
