import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/interface/interfaces';
import { FavoriteService } from 'src/app/services/favorite.service';
import { CartService } from 'src/app/services/general/services/cart.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit, AfterViewInit {
  @Input() product: Product = undefined;
  @Input() business = undefined;
  public background = 'rgb(255 255 255 / 85%)';
  public image = 'assets/testImg/card.jpg';
  public opacity = 1;
  public favoriteIcon = 'heart-outline';

  constructor(
    private modalController: ModalController,
    private cartSv: CartService,
    private favoriteSv: FavoriteService
  ) {
    
  }

  ngOnInit() {}
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      const obj = { 
        _id: this.product._id, 
        storeId: this.business._id, 
      }
      this.favoriteIcon = this.favoriteSv.verifyFavorite(obj);
    })
  }

  doEvent(ev){
    const top = (ev.target.scrollTop / 350) * 100; //porcentaje de scroll
    const percentBackground = 85 + ((top/100) * 15);
    this.background = `rgb(255 255 255 / ${percentBackground}%)`;
    this.opacity = (100 - top) / 100;
  }

  async back(){
    await this.modalController.dismiss(this.favoriteIcon);
  }

  addCart(amount){

    const products = {
      productId: this.product._id,
      amount
    }
    
    this.cartSv.addProduct(
      { 
        products: [ products ], 
        business: this.business,
      }, 
      products
    );

  }

  addToFavorite(){
    this.favoriteIcon = this.favoriteSv.checkToAdd(this.favoriteIcon, this.product, this.business);
  }
  
}
