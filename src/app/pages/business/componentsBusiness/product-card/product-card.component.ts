import { Component, Input, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { environment } from 'src/environments/environment';
import { UiService } from '../../../../general/services/ui.service';
import { DetailProductComponent } from '../detail-product/detail-product.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any = undefined;
  @Input() business: any = undefined;
  public image = environment.testImg;
  public favoriteIcon = 'heart-outline';

  constructor(
    private uiSv: UiService,
    private favoriteSv: FavoriteService
  ) { }

  ngOnInit() {
    const obj = { 
      _id: this.product._id,
      storeId: this.business._id,
    }
    this.favoriteIcon = this.favoriteSv.verifyFavorite(obj);
  }

  async openProduct(ev){
    if(ev.target.dataset?.favorite){
      return
    }
    const { data } = await this.uiSv.showModal(
      DetailProductComponent, 
      { 
        product: this.product, 
        business: this.business 
      }, 
      'detailProduct',
      false
    );
    if(data){
      this.favoriteIcon = data;
    }
  }

  addToFavorite(){
    this.favoriteIcon = this.favoriteSv.checkToAdd(this.favoriteIcon, this.product, this.business);
  }
}
