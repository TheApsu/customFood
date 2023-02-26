import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/interface/interfaces';
import { FavoriteService } from 'src/app/services/favorite.service';
import { CartService } from 'src/app/services/general/services/cart.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  @Input() id: number = 0;
  @Input() storeId = undefined;
  public background = 'rgb(255 255 255 / 85%)';
  public image = 'assets/testImg/card.jpg';
  public opacity = 1;
  public favoriteIcon = 'heart-outline';

  constructor(
    private modalController: ModalController,
    private cartSv: CartService,
    private route: ActivatedRoute,
    private favoriteSv: FavoriteService
  ) {
    
  }

  ngOnInit() {
    const obj = { 
      id: this.id, 
      storeId: this.storeId, 
    }
    this.favoriteIcon = this.favoriteSv.verifyFavorite(obj);
  }

  doEvent(ev){
    const top = (ev.target.scrollTop / 350) * 100; //porcentaje de scroll
    const percentBackground = 85 + ((top/100) * 15);
    this.background = `rgb(255 255 255 / ${percentBackground}%)`;
    this.opacity = (100 - top) / 100;
  }

  async back(){
    await this.modalController.dismiss();
  }

  addCart(quantity){
    const products: Product = {
      id: this.id,
      quantity
    }
    this.cartSv.addProduct({products: [products], storeId: Number(this.storeId)});
  }

  addToFavorite(){
    const favorite = this.favoriteIcon === 'heart' ? false : true;
    const products: Product = {
      id: this.id,
    }
    console.log(this.storeId);
    
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
