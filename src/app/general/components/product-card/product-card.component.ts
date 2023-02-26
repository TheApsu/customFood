import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/interfaces';
import { FavoriteService } from 'src/app/services/favorite.service';
import { environment } from 'src/environments/environment';
import { UiService } from '../../services/ui.service';
import { DetailProductComponent } from '../detail-product/detail-product.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() storeId: string = undefined;
  @Input() id: any = undefined;
  public image = environment.testImg;
  public description = '900g de carne';
  public favoriteIcon = 'heart-outline';

  constructor(
    private uiSv: UiService,
    private favoriteSv: FavoriteService
  ) { }

  ngOnInit() {
    const obj = { 
      id: this.id,
      storeId: this.storeId, 
    }
    this.favoriteIcon = this.favoriteSv.verifyFavorite(obj);
  }

  async openProduct(ev){
    if(ev.target.dataset?.favorite){
      return
    }
    this.uiSv.showModal(DetailProductComponent, { id: this.id, storeId: this.storeId }, 'detailProduct');
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
