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
  @Input() id = undefined;
  @Input() storeId = undefined;
  public favoriteIcon = 'heart-outline';
  public image = environment.testImg;

  constructor(
    private favoriteSv: FavoriteService
  ) { }

  ngOnInit() {
    const obj = { 
      id: this.id,
      storeId: this.storeId, 
    }
    this.favoriteIcon = this.favoriteSv.verifyFavorite(obj);
  }

  addToFavorite(){
    const favorite = this.favoriteIcon === 'heart' ? false : true;
    const products: Product = {
      id: this.id,
    }
    const obj = { 
      id: this.id, 
      storeId: this.storeId, 
      favorite, 
      products: [products] 
    }
    this.favoriteSv.addFavorite(obj);
    this.favoriteIcon = this.favoriteSv.verifyFavorite(obj);
  }
}
