import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/general/services/ui.service';
import { Product } from 'src/app/interface/interfaces';
import { DetailProductComponent } from 'src/app/pages/business/componentsBusiness/detail-product/detail-product.component';
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
    private favoriteSv: FavoriteService,
    private uiSv: UiService
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
}
